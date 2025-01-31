import streamlit as st
import requests
import re

# Set up API details
API_URL = "http://localhost:8080/api/chat/completions"  

HEADERS = {
    "Authorization": f"Bearer {st.secrets[API_KEY]}",
    "Content-Type": "application/json"
}
st.title("PyPanther")

with st.chat_message("assistant"):
    st.markdown("Hello! I'm a bot. Please let me know your question.")
    
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display past messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Handle user input
if prompt := st.chat_input("Ask me anything..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # Prepare API request data
    payload = {
        "model": "pypanther",
        "messages": st.session_state.messages
    }
    
    # Send request to API
    with st.status("Sending request to PyPanther...", expanded=True) as status:
        status.update(label="Thinking...")
        response = requests.post(API_URL, headers=HEADERS, json=payload)
        status.update(label="Got it!!!", state="complete", expanded=False)
    
    if response.status_code == 200:
        raw_reply = response.json().get("choices", [{}])[0].get("message", {}).get("content", "Error: No response")
        reply = re.sub(r"<think>.*?</think>", "", raw_reply, flags=re.DOTALL).strip()
    else:
        reply = f"Error {response.status_code}: {response.text}"
        
    with st.chat_message("assistant"):
        st.markdown(reply)
    
    st.session_state.messages.append({"role": "assistant", "content": reply})
