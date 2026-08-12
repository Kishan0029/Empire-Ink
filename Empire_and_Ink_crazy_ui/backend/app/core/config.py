from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Empire & Ink API"
    API_V1_STR: str = "/api/v1"
    
    # SQLite Database URL
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./empire_ink.db"
    
    # CORS Origins (allow all for MVP development with ngrok)
    BACKEND_CORS_ORIGINS: list[str] = ["*"]
    
    class Config:
        case_sensitive = True

settings = Settings()
