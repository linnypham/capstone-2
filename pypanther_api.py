import requests
import re

#models: "aics" for Computer Sciece Ai
def pypanther(models,API_KEY,messages):
    API_URL = "http://localhost:3000/api/chat/completions"  

    HEADERS = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
            "model": f"{models}",
            "messages": f"{messages}"
        }

    response = requests.post(API_URL, headers=HEADERS, json=payload)
    if response.status_code == 200:
        raw_reply = response.json().get("choices", [{}])[0].get("message", {}).get("content", "Error: No response")
        reply = re.sub(r"<think>.*?</think>", "", raw_reply, flags=re.DOTALL).strip()
    else:
        reply = f"Error {response.status_code}: {response.text}"
        
    return reply
        