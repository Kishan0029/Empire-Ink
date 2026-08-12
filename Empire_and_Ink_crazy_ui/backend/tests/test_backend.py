import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db.database import Base, engine, get_db
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os
import json

# Setup Test Database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_empire_ink.db"
engine_test = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine_test)

Base.metadata.create_all(bind=engine_test)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def run_around_tests():
    Base.metadata.create_all(bind=engine_test)
    yield
    Base.metadata.drop_all(bind=engine_test)

def test_fastapi_starts():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Empire & Ink API"}

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert "api_status" in data
    assert data["api_status"] == "online"
    assert "gpu" in data
    assert "models" in data

def test_generation_request_validation():
    # Missing prompt
    response = client.post("/api/v1/generations", json={"steps": 20})
    assert response.status_code == 422
    
    # Invalid steps (too high)
    response = client.post("/api/v1/generations", json={"prompt": "Test", "steps": 500})
    assert response.status_code == 422
    
    # Valid request
    response = client.post("/api/v1/generations", json={
        "prompt": "Emperor Akbar",
        "enhance_prompt": False
    })
    assert response.status_code == 202
    data = response.json()
    assert "id" in data
    assert data["status"] == "queued"

# To run the smoke test manually against the real service, we can use a separate script
# or mark a pytest as @pytest.mark.smoke which is skipped by default.
