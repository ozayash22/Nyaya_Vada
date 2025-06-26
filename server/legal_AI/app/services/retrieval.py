import re
from app.utils import normalize, extract_references
from app.services.generation import generate_with_together
from nltk.tokenize import word_tokenize
import numpy as np
from sentence_transformers import SentenceTransformer, util

def process_query(query, data):
    # Direct section match
    section_match = re.findall(r'section\s+(\d+[A-Z]*)', query, re.IGNORECASE)
    if section_match:
        matches = []
        for section_num in section_match:
            section_num = section_num.upper()
            matches += [
                v for k, v in data['section_map'].items()
                if k.endswith(f"Section {section_num}")
            ]
        if matches:
            response = []
            references = []
            for s in matches:
                response.append(
                    f"{s['source']} - Section {s['section_number']}\n"
                    f"Title: {s['section_title']}\n"
                    f"Description: {s['section_desc']}"
                )
                references.append(f"{s['source']} - Section {s['section_number']}")
            return {
                "answer": "\n\n".join(response),
                "references": references,
                "confidence": 1.0
            }

    # Chapter lookup
    chapter_match = re.search(r'chapter\s+(\d+)', query, re.IGNORECASE)
    chapter_title_match = re.search(r'chapter.*?(?=of|under)?\s*([a-zA-Z ]+)', query, re.IGNORECASE)

    if chapter_match or chapter_title_match:
        relevant_sections = []
        chapter_title_found = ""

        if chapter_match:
            chap_num = int(chapter_match.group(1))
            relevant_sections = [
                s for s in data['sections_data'] 
                if data['chapter_lookup'].get(s["chapter_id"], {}).get("chapter_number") == chap_num
            ]
            if relevant_sections:
                chapter_title_found = data['chapter_lookup'].get(relevant_sections[0]["chapter_id"], {}).get("chapter_title", "")
        
        elif chapter_title_match:
            chap_title = chapter_title_match.group(1).strip().lower()
            matched_chapter_ids = [ch['id'] for ch in data['chapters_data'] if chap_title in ch['chapter_title'].lower()]
            relevant_sections = [s for s in data['sections_data'] if s["chapter_id"] in matched_chapter_ids]
            if relevant_sections:
                chapter_title_found = data['chapter_lookup'][relevant_sections[0]["chapter_id"]]["chapter_title"]

        source_match = re.search(r'\b(ipc|crpc)\b', query, re.IGNORECASE)
        if source_match:
            target_source = source_match.group(1).upper()
            relevant_sections = [
                s for s in relevant_sections if s["source"].strip().upper() == target_source
            ]

        if not relevant_sections:
            return {
                "answer": "No matching sections found.",
                "confidence": 0.0
            }

        sections_info = []
        references = []
        for s in relevant_sections:
            sections_info.append(
                f"{s['source']} - Section {s['section_number']}: {s['section_title']}"
            )
            references.append(f"{s['source']} - Section {s['section_number']}")

        return {
            "answer": f"Chapter: {chapter_title_found.title()}\n\n" + "\n".join(sections_info),
            "references": references,
            "confidence": 0.9
        }

    # Hybrid BM25 + BERT
    query_tokens = word_tokenize(query.lower())
    bm25_scores = data['bm25'].get_scores(query_tokens)
    query_embedding = data['bert_model'].encode(query, convert_to_tensor=True)
    cosine_scores = util.pytorch_cos_sim(query_embedding, data['section_embeddings'])[0].cpu().numpy()

    bm25_norm = normalize(bm25_scores)
    cos_norm = normalize(cosine_scores)
    hybrid_scores = 0.5 * bm25_norm + 0.5 * cos_norm

    top_indices = np.argsort(hybrid_scores)[::-1][:8]
    top_score = hybrid_scores[top_indices[0]]
    filtered_indices = [i for i in top_indices if hybrid_scores[i] >= 0.7 * top_score]

    retrieved_sections = []
    for i in filtered_indices:
        match = re.match(r"(.+?)::Section\s+(\d+[A-Z]*)", data['section_texts'][i])
        if not match:
            continue
        source_str, sec_num_str = match.groups()
        key = f"{source_str.strip()}::Section {sec_num_str}"
        section_data = data['section_map'].get(key)
        if section_data:
            section_line = (
                f"{section_data['source']} - Section {section_data['section_number']}:\n"
                f"{section_data['section_title']}\n"
                f"{section_data['section_desc']}"
            )
            retrieved_sections.append(section_line)

    if not retrieved_sections:
        return {
            "answer": "No relevant legal content found.",
            "confidence": 0.0
        }

    references = extract_references(filtered_indices, data['section_texts'])
    prompt = (
        f"Using the legal definitions and provisions below, answer the user's query clearly and concisely.\n\n"
        f"{chr(10).join(retrieved_sections)}\n\n"
        f"Query: {query}"
    )
    generated_text = generate_with_together(prompt)

    return {
        "answer": generated_text,
        "references": references,
        "confidence": float(top_score)
    }