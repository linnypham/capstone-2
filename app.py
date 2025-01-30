import streamlit as st
import requests

def main():
    # Set page title and layout
    st.set_page_config(page_title="AI Question Answer App", layout="columns")
    
    # API endpoint configuration
    api_url = "http://localhost:8080/api/chat/completions"
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyNDljY2Y0LTU3OTQtNDZlMS05NDYzLTViMTBkZTc4MWZjNyJ9.1cp-3kgjPiLG9RKmRnQFTuB6PRwhZWKN-8QKKXh9UqM",
        "Content-Type": "application/json"
    }
    
    # Streamlit UI components
    st.header("AI Question & Answer App")
    st.markdown("Ask any question and get answers from AI.")
    
    # Input section
    with st.expander("Options", expanded=True):
        col1, col2 = st.columns(2)
        with col1:
            max_tokens = st.number_input("Max Tokens", min_value=1, max_value=4096, value=1000)
        with col2:
            temperature = st.slider("Temperature", 0.0, 1.0, 0.7)
    
    user_question = st.text_input("Enter your question here:")
    
    # Send request to API
    if st.button("Generate Answer"):
        data = {
            "model": "pypanther",
            "messages": [
                {"role": "user", "content": user_question}
            ]
        }
        
        try:
            response = requests.post(
                api_url,
                headers=headers,
                json=data
            )
            
            if response.status_code == 200:
                result = response.json()
                st.markdown("### AI Response:")
                st.markdown(result.get('choices', [{}])[0].get('message', {}).get('content', 'No response'))
            else:
                st.error(f"API request failed with status code {response.status_code}")
                
        except Exception as e:
            st.error(f"Error occurred: {str(e)}")

if __name__ == "__main__":
    main()