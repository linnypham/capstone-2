import streamlit as st
import requests
import re
import time
#initial config
st.set_page_config(page_title="PyPanther", page_icon="img/main_logo.png", layout="wide", initial_sidebar_state="auto",
                   menu_items={'Get Help': 'https://www.extremelycoolapp.com/help',
                                'Report a bug': "https://www.extremelycoolapp.com/bug",
                                'About': "# This is a header. This is an *extremely* cool app!"})
# Set up API details
API_URL = "http://localhost:3000/api/chat/completions"  
api_key=st.secrets["API_KEY"]
HEADERS = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}
#logo and title
st.logo("img/gsu.png",size = "large",link="https://www.gsu.edu/",icon_image="img/main_logo.png")
st.title("PyPanther")

#sidebar to choose departments
models ={"Computer Science":"cs_ai","Business":"b_ai","Law":"l_ai"}
with st.sidebar:
    option = st.selectbox(
        "Choose your departments:",
    ("Computer Science", "Business", "Law")
    )
#hello message
with st.chat_message("assistant"):
    st.markdown("Hello! I'm a bot. Please let me know your question.")
# Initialize chat history
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
        "model": f"{models[option]}",
        "messages": st.session_state.messages
    }
    
    # Send request to API
    with st.status("Sending to PyPanther...", expanded=True) as status:
        time.sleep(1)
        status.update(label="Thinking...")
        response = requests.post(API_URL, headers=HEADERS, json=payload)
        status.update(label="Got it!!!", state="complete", expanded=False)
    #prepare reply, strip out thinking part
    if response.status_code == 200:
        raw_reply = response.json().get("choices", [{}])[0].get("message", {}).get("content", "Error: No response")
        reply = re.sub(r"<think>.*?</think>", "", raw_reply, flags=re.DOTALL).strip()
    else:
        reply = f"Error {response.status_code}: {response.text}"
        
    with st.chat_message("assistant"):
        st.markdown(reply)
    # Add user message to chat history
    st.session_state.messages.append({"role": "assistant", "content": reply})
