from app.database import db_pool
from app.config import settings
from sentence_transformers import SentenceTransformer
from rank_bm25 import BM25Okapi
from nltk.tokenize import word_tokenize
import logging
import nltk
nltk.data.path.append('./nltk_data')

# Ensure 'punkt' is available, download if missing
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', download_dir='./nltk_data')

logger = logging.getLogger(__name__)

def fetch_sections_from_db():
    conn = db_pool.get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT chapter_id, section_number, section_title, section_desc, source FROM sections")
        sections = cursor.fetchall()
        cursor.execute("SELECT id, chapter_number, chapter_title FROM chapters")
        chapters = cursor.fetchall()
        return sections, chapters
    finally:
        cursor.close()
        conn.close()

def initialize_data():
    sections_data, chapters_data = fetch_sections_from_db()
    
    section_map = {
        f"{row['source'].strip()}::Section {row['section_number']}": row
        for row in sections_data
    }
    
    chapter_lookup = {ch["id"]: ch for ch in chapters_data}
    
    section_texts = [
        f"{row['source'].strip()}::Section {row['section_number']}: {row['section_title']} - {row['section_desc']}"
        for row in sections_data
    ]
    
    tokenized_corpus = [word_tokenize(text.lower(), language='english') for text in section_texts]
    bm25 = BM25Okapi(tokenized_corpus)
    
    bert_model = SentenceTransformer(settings.ai_model)
    section_embeddings = bert_model.encode(section_texts, convert_to_tensor=True)
    
    return {
        "sections_data": sections_data,
        "chapters_data": chapters_data,
        "section_map": section_map,
        "chapter_lookup": chapter_lookup,
        "section_texts": section_texts,
        "bm25": bm25,
        "bert_model": bert_model,
        "section_embeddings": section_embeddings
    }