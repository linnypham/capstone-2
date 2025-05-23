import streamlit as st
import requests
import re
import time
import socket
import os
from qrcode import QRCode
#initial config
st.set_page_config(page_title="PyPanther", page_icon="img/main_logo.png", layout="centered", initial_sidebar_state="auto",
                   menu_items={'Get Help': "https://technology.gsu.edu/guides/it-resources-for-students/",
                                'Report a bug': 'mailto:help@gsu.edu',
                                'About': "# AI chatbot for graduate students."})
#get IP
def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = "127.0.0.1"
    finally:
        s.close()
    return IP
#qrcode
os.makedirs("assets", exist_ok=True)
port = 8501
ip = get_local_ip()
network_url = f"http://{ip}:{port}"
qr = QRCode(version=1, box_size=10, border=5)
qr.add_data(network_url)
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")
img.save("assets/url_qrcode.png")

# Set up API details
API_URL = "http://localhost:3000/api/chat/completions"  

HEADERS = {
    "Authorization": f"Bearer {st.secrets['API_KEY']}",
    "Content-Type": "application/json"
}
#logo and title
st.logo("assets\images\gsu.png",size = "large",link="https://www.gsu.edu/",icon_image="assets\images\main_logo.png")
st.title(":blue[PyPanther]")

#sidebar to choose departments
models ={"Computer Science (deepseek7b)":"aics","Music (deepseek1.5b)":"aimusic","Anthropology (gemma1b)":"aianthropology"}
with st.sidebar:
    option = st.selectbox("Choose your departments:",("Computer Science (deepseek7b)", "Music (deepseek1.5b)", "Anthropology (gemma1b)"),)
    st.markdown(" ")
    st.markdown("Wifi: PyPanther")
    st.markdown("Password: pypanther")
    st.markdown("Scan me to your phone")
    st.image("assets/url_qrcode.png")
    

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []



#hello message
with st.chat_message("assistant"):
    st.markdown("Hello! I'm a bot. Please let me know your question.")
    
    

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
        "model": models[option],
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
