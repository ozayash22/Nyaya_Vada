from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import requests
import logging
import os
from dotenv import load_dotenv
from typing import List, Optional, Dict
import mysql.connector
from mysql.connector import Error
from fastapi.responses import StreamingResponse
import io

# Load .env for API Key
load_dotenv()

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("NyayaVaad")

app = FastAPI(title="NyayaVaad - Legal Consultant AI")


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Calling the MySQL database
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "legal_db")
#get the database connection from line 41  to 53
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        return connection
    except Error as e:
        logger.error(f"Database connection failed: {e}")
        return None

#function to fetch legal documents from the database from line 55 to 103

def fetch_pdf_metadata(user_id: int) -> List[Dict[str, str]]:
    connection = get_db_connection()
    if not connection:
        return []

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT id, title, uploaded_at FROM legal_documents WHERE user_id = %s", (user_id,))
        records = cursor.fetchall()
        return records
    except Error as e:
        logger.error(f"Error fetching PDF metadata: {e}")
        return []
    finally:
        cursor.close()
        connection.close()

# Function to fetch and convert PDF binary data
def download_pdf_by_id(document_id: int) -> Optional[StreamingResponse]:
    connection = get_db_connection()
    if not connection:
        return None

    try:
        cursor = connection.cursor()
        cursor.execute("SELECT file_data, title FROM legal_documents WHERE id = %s", (document_id,))
        result = cursor.fetchone()
        if result:
            pdf_data, title = result
            return convert_binary_to_pdf(pdf_data, title)
        return None
    except Error as e:
        logger.error(f"Error downloading PDF: {e}")
        return None
    finally:
        cursor.close()
        connection.close()

# Converts raw binary into a StreamingResponse
def convert_binary_to_pdf(binary_data: bytes, title: str) -> StreamingResponse:
    buffer = io.BytesIO(binary_data)
    headers = {
        "Content-Disposition": f"attachment; filename={title or 'document'}.pdf"
    }
    return StreamingResponse(buffer, media_type="application/pdf", headers=headers)

#below this the real code starts, this is the main code for the AI legal consultant

#the way we are fetching the details from the frontend and giving the answers, 
#two baseModels are used from Pydantic library
class LegalConsultRequest(BaseModel):
    query: str
    history: Optional[List[dict]] = []

class LegalConsultResponse(BaseModel):
    response: str
    follow_up: Optional[bool] = False
    confidence: Optional[float] = 0.95

# Environment Variables that needs to fetch ferom .env files
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
LLAMA_MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"


def build_prompt(query: str, history: Optional[List[Dict]] = None) -> List[Dict]:
    system_message = (
        "You are NyayaVaad, a senior Indian legal AI specializing in any legal drafting in India, that includes crime also "
        "Your role is strictly limited to Indian legal matters. Follow these rules:\n\n"
        "1. Legal Queries Only:\n"
        "   - If user asks non-legal questions, respond: 'I specialize only in Indian legal matters. "
        "Please ask about criminal/civil cases, document drafting, or legal procedures.'\n\n"
        "2. Information Gathering Phase:\n"
        "   - Ask one precise question per response\n"
        "   - Prioritize: Nature of case, parties involved, jurisdiction, dates, relief sought\n"
        "   - Maintain Socratic questioning style\n\n"
        "3. Document Drafting Phase:\n"
        "   - When sufficient details are gathered, announce: 'DRAFTING LEGAL DOCUMENT: <Document Type>'\n"
        "   - Use maximum token allocation for comprehensive drafts\n"
        "   - Follow strict format:\n"
        "       [COURT HEADER]\n"
        "       [TITLE]\n"
        "       [PARTIES]\n"
        "       [PREAMBLE]\n"
        "       [BODY WITH NUMBERED PARAS]\n"
        "       [PRAYER]\n"
        "       [VERIFICATION]\n\n"
        "4. Tone & Structure:\n"
        "   - Always use formal Indian legal terminology\n"
        "   - Section references to IPC/CPC/Evidence Act where applicable\n"
        "   - Maintain hierarchical paragraph numbering"
    )
    
    messages = [{"role": "system", "content": system_message}]
    
    if history:
        messages.extend(history)
    
    messages.append({"role": "user", "content": query})
    return messages


# this helps in generating text after fetching the details and passing it to the API
def generate_response(messages: List[dict]) -> str:
    url = "https://api.together.xyz/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }
    #here we are adjusting the tokens given to the API, for better utilization
    payload = {
        "model": LLAMA_MODEL,
        "messages": messages,
        "temperature": 0.6,
        "max_tokens": 1000  
    }
    res = requests.post(url, headers=headers, json=payload)
    res.raise_for_status()
    return res.json()["choices"][0]["message"]["content"].strip()

#when we call from frontend it calls this function and rest work is done by this
@app.post("/consult", response_model=LegalConsultResponse)
async def consult_legal_ai(request: LegalConsultRequest):
    try:
        logger.info(f"User query: {request.query}")
        prompt = build_prompt(request.query, request.history)
        response = generate_response(prompt)

        return LegalConsultResponse(
            response=response,
            follow_up="?" in response or "please provide" in response.lower()
        )
    except Exception as e:
        logger.error(f"Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "up", "model": LLAMA_MODEL}
