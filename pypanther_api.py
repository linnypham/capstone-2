import requests
import re
from data.api_key import API_KEY

def pypanther(model,API_KEY,message):
    API_URL = "http://localhost:3000/api/chat/completions"  

    HEADERS = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
            "model": f"{model}",
            "messages": f"{message}"
        }

    response = requests.post(API_URL, headers=HEADERS, json=payload)
    if response.status_code == 200:
        raw_reply = response.json().get("choices", [{}])[0].get("message", {}).get("content", "Error: No response")
        reply = re.sub(r"<think>.*?</think>", "", raw_reply, flags=re.DOTALL).strip()
    else:
        reply = f"Error {response.status_code}: {response.text}"
        
    return reply
        
print(pypanther("aics",API_KEY, "what can you do?"))