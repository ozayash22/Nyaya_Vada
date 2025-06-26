from fastapi import APIRouter, HTTPException, Request
from app.models import QuestionRequest, AIResponse
from app.services.retrieval import process_query
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/ask", response_model=AIResponse)
async def ask_question(request: Request, question: QuestionRequest):
    try:
        query = question.query.strip()
        session_id = question.session_id

        if not query:
            return AIResponse(
                question=query,
                answer="Please enter a valid question.",
                session_id=session_id
            )

        logger.info(f"Processing query: {query}")
        data = request.app.state.data
        result = process_query(query, data)

        return AIResponse(
            question=query,
            answer=result.get("answer", "No response generated"),
            session_id=session_id,
            references=result.get("references"),
            confidence=result.get("confidence")
        )

    except Exception as e:
        logger.error(f"Error processing query: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "healthy", "models_loaded": True}