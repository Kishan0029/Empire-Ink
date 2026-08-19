
import sys, time, gc, os
sys.stdout.reconfigure(encoding='utf-8')
import torch
from backend.services.generation_service import EmpireInkGenerator

with open('/home/jovyan/empire-and-ink/pipeline_test.txt', 'w') as f:
    try:
        generator = EmpireInkGenerator()
        
        # PHASE 6: 4-step test
        f.write("=== PHASE 6: 4-STEP TEST ===\n")
        res1 = generator.generate(
            "A Mughal emperor standing in a grand palace courtyard",
            seed=42, steps=4, guidance=3.5, lora_strength=0.7
        )
        f.write(f"Enhanced Prompt: {res1['enhanced_prompt']}\n")
        f.write(f"Qwen Time: {res1['qwen_time']:.2f}s\n")
        f.write(f"FLUX Time: {res1['flux_time']:.2f}s\n")
        f.write(f"Total Time: {res1['total_time']:.2f}s\n")
        f.write(f"Image Path: {res1['image_path']}\n")
        
        # PHASE 7: 20-step quality test
        f.write("\n=== PHASE 7: 20-STEP QUALITY TEST ===\n")
        res2 = generator.generate(
            "A Mughal emperor seated in an ornate palace courtyard, surrounded by attendants, fountains, marble arches and intricate Persian-inspired decorations",
            seed=42, steps=20, guidance=3.5, lora_strength=0.7
        )
        f.write(f"Enhanced Prompt: {res2['enhanced_prompt']}\n")
        f.write(f"Qwen Time: {res2['qwen_time']:.2f}s\n")
        f.write(f"FLUX Time: {res2['flux_time']:.2f}s\n")
        f.write(f"Total Time: {res2['total_time']:.2f}s\n")
        f.write(f"Image Path: {res2['image_path']}\n")
        f.write(f"Peak VRAM: {torch.cuda.max_memory_allocated() / 1e9:.2f} GB\n")
        f.write("SUCCESS\n")
    except Exception as e:
        import traceback
        f.write(f"ERROR: {e}\n")
        f.write(traceback.format_exc() + "\n")
