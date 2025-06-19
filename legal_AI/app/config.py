from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    db_host: str = os.getenv("DB_HOST")
    db_user: str = os.getenv("DB_USER")
    db_password: str = os.getenv("DB_PASSWORD")
    db_name: str = os.getenv("DB_NAME")
    ai_model: str = "all-MiniLM-L6-v2"
    together_model: str = os.getenv("TOGETHER_MODEL")
    together_api_key: str = os.getenv("TOGETHER_API_KEY")

    class Config:
        env_file = ".env"

settings = Settings()