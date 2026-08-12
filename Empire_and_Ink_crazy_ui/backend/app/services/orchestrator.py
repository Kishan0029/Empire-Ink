import asyncio
import time
import os
import random
from sqlalchemy.orm import Session
from app.db.models import Generation
from fastapi import HTTPException

# Global lock to ensure only one generation runs at a time (MVP Single GPU)
generation_lock = asyncio.Lock()

# Define the local output directory for MVP
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Attempt to import the real generation service.
# For local dev without the real file, we will fallback or error gracefully in tests,
# but the architecture will be fully integrated.
try:
    # Assuming generation_service.py is located at backend/services/generation_service.py
    import sys
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))
    from backend.services.generation_service import EmpireInkGenerator
    generator_instance = EmpireInkGenerator()
except ImportError:
    generator_instance = None


async def run_generation_pipeline(generation_id: str, db: Session):
    """
    Executes the real AI pipeline.
    Maintains sequential execution using generation_lock to prevent OOM on DGX.
    """
    async with generation_lock:
        gen = db.query(Generation).filter(Generation.id == generation_id).first()
        if not gen:
            return
            
        gen.status = "processing"
        db.commit()
        
        start_time = time.time()
        
        try:
            if not generator_instance:
                raise RuntimeError("EmpireInkGenerator is not available on this system.")
                
            enhanced_prompt = gen.original_prompt
            
            # Step 1: Qwen Prompt Enhancement
            if gen.enhance_prompt:
                gen.status = "enhancing_prompt"
                db.commit()
                
                # Mocking the generator method calls based on the architecture constraints
                # In reality, this delegates to the EmpireInkGenerator methods.
                if hasattr(generator_instance, 'load_qwen'):
                    generator_instance.load_qwen()
                    
                enhanced_prompt = generator_instance.enhance_prompt(gen.original_prompt)
                gen.enhanced_prompt = enhanced_prompt
                db.commit()
                
                if hasattr(generator_instance, 'unload_qwen'):
                    generator_instance.unload_qwen()  # Release memory to avoid OOM
            
            # Step 2: FLUX Generation
            gen.status = "generating"
            db.commit()
            
            if hasattr(generator_instance, 'load_flux'):
                generator_instance.load_flux()
                
            image_filename = f"{gen.id}.png"
            image_path = os.path.join(OUTPUT_DIR, image_filename)
            
            # Use requested seed or generate one if not provided
            seed = gen.seed if gen.seed is not None else random.randint(0, 2147483647)
            gen.seed = seed
            
            # Call the actual generation
            generator_instance.generate(
                prompt=enhanced_prompt,
                seed=seed,
                steps=gen.steps,
                guidance_scale=gen.guidance_scale,
                lora_strength=gen.lora_strength,
                width=gen.width,
                height=gen.height,
                output_path=image_path
            )
            
            # Unload FLUX if required (or keep resident if safe without Qwen)
            if hasattr(generator_instance, 'unload_flux'):
                generator_instance.unload_flux()
                
            # Step 3: Complete
            if not os.path.exists(image_path):
                raise FileNotFoundError("Generation completed but PNG was not saved.")
                
            gen.status = "completed"
            gen.image_url = f"/api/v1/generations/{generation_id}/image"
            gen.generation_time = time.time() - start_time
            db.commit()
            
        except Exception as e:
            gen.status = "failed"
            gen.error = str(e)
            db.commit()
            # We don't re-raise because this is a background task
