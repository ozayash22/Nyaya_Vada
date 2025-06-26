from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from app.routers import ai
from app.services.data_loader import initialize_data
import logging

logger = logging.getLogger(__name__)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Initializing data and models...")
    app.state.data = initialize_data()
    logger.info("Data and models initialized")

app.include_router(ai.router)

@app.exception_handler(Exception)
async def universal_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content=jsonable_encoder({
            "message": "An error occurred processing your request",
            "detail": str(exc)
        })
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)