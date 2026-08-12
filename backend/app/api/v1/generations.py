import os
from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Generation
from app.schemas.generation import GenerationCreate, GenerationResponse, VariationRequest
from app.services.orchestrator import run_generation_pipeline, OUTPUT_DIR

router = APIRouter()

@router.post("/", response_model=dict, status_code=202)
def create_generation(request: GenerationCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_gen = Generation(
        status="queued",
        original_prompt=request.prompt,
        seed=request.seed,
        steps=request.steps,
        guidance_scale=request.guidance_scale,
        lora_strength=request.lora_strength,
        width=request.width,
        height=request.height
    )
    db.add(db_gen)
    db.commit()
    db.refresh(db_gen)
    
    background_tasks.add_task(run_generation_pipeline, db_gen.id, db)
    
    return {"id": db_gen.id, "status": "queued"}

@router.get("/", response_model=list[GenerationResponse])
def get_generations(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    generations = db.query(Generation).order_by(Generation.created_at.desc()).offset(skip).limit(limit).all()
    return generations

@router.get("/{id}", response_model=GenerationResponse)
def get_generation(id: str, db: Session = Depends(get_db)):
    gen = db.query(Generation).filter(Generation.id == id).first()
    if not gen:
        raise HTTPException(status_code=404, detail="Generation not found")
    return gen

@router.get("/{id}/image")
def get_generation_image(id: str, db: Session = Depends(get_db)):
    gen = db.query(Generation).filter(Generation.id == id).first()
    if not gen or not gen.image_url:
        raise HTTPException(status_code=404, detail="Image not found or generation not completed")
        
    image_path = os.path.join(OUTPUT_DIR, f"{id}.png")
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image file missing from server")
        
    return FileResponse(image_path, media_type="image/png")

@router.post("/{id}/variation", response_model=dict, status_code=202)
def create_variation(id: str, request: VariationRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    parent_gen = db.query(Generation).filter(Generation.id == id).first()
    if not parent_gen:
        raise HTTPException(status_code=404, detail="Parent generation not found")
        
    db_gen = Generation(
        status="queued",
        original_prompt=parent_gen.original_prompt,
        seed=request.seed,
        steps=parent_gen.steps,
        guidance_scale=parent_gen.guidance_scale,
        lora_strength=parent_gen.lora_strength,
        width=parent_gen.width,
        height=parent_gen.height
    )
    db.add(db_gen)
    db.commit()
    db.refresh(db_gen)
    
    background_tasks.add_task(run_generation_pipeline, db_gen.id, db)
    return {"id": db_gen.id, "status": "queued"}

