# Use an official Python runtime as a parent image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the application files to the container
COPY pypanther.py .
COPY requirements.txt .
COPY .streamlit/secrets.toml /root/.streamlit/secrets.toml

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Streamlit runs on
EXPOSE 8501

# Set environment variables for Streamlit
ENV STREAMLIT_SERVER_HEADLESS=true

# Run the Streamlit app
CMD ["streamlit", "run", "pypanther.py", "--server.port=8501", "--server.address=0.0.0.0"]
