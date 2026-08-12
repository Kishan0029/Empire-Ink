import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime
from app.db.database import Base

class Generation(Base):
    __tablename__ = "generations"

    id = Column(String, primary_key=True, default=lambda: f"gen_{uuid.uuid4().hex[:8]}")
    status = Column(String, default="submitting")
    original_prompt = Column(String, nullable=False)
    enhanced_prompt = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    seed = Column(Integer, nullable=False)
    width = Column(Integer, default=1024)
    height = Column(Integer, default=1024)
    steps = Column(Integer, default=28)
    guidance_scale = Column(Float, default=3.5)
    lora_strength = Column(Float, default=0.7)
    generation_time = Column(Float, nullable=True)
    error = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
