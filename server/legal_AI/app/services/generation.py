import requests
from app.config import settings

def generate_with_together(prompt: str) -> str:
    url = "https://api.together.xyz/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {settings.together_api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": settings.together_model,
        "messages": [
            {"role": "system", "content": "You are a helpful legal assistant. Answer clearly based on provided sections."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 512,
        "temperature": 0.7
    }

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"].strip()