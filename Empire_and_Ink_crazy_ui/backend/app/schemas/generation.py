from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class GenerationCreate(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=1000)
    enhance_prompt: bool = True
    seed: Optional[int] = Field(None, ge=0, le=2147483647)
    steps: int = Field(28, ge=1, le=100)
    guidance_scale: float = Field(3.5, ge=1.0, le=20.0)
    lora_strength: float = Field(0.7, ge=0.0, le=2.0)
    width: int = Field(1024, ge=256, le=2048)
    height: int = Field(1024, ge=256, le=2048)

class GenerationResponse(BaseModel):
    id: str
    status: str
    original_prompt: str
    enhanced_prompt: Optional[str] = None
    image_url: Optional[str] = None
    seed: int
    width: int
    height: int
    steps: int
    guidance_scale: float
    lora_strength: float
    generation_time: Optional[float] = None
    error: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class VariationRequest(BaseModel):
    seed: int
