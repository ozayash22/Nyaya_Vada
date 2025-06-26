from pydantic import BaseModel
from typing import Optional, List

class QuestionRequest(BaseModel):
    query: str
    session_id: str

class AIResponse(BaseModel):
    question: str
    answer: str
    session_id: Optional[str] = None
    references: Optional[List[str]] = None
    confidence: Optional[float] = None