# Use slim Python image to reduce size
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /code

# Install system dependencies for some Python packages (like numpy, chromadb)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv (fast Python package manager)
RUN pip install --no-cache-dir uv

# Copy dependency files first (to leverage Docker caching)
COPY requirements.txt ./

# Install Python dependencies
RUN uv pip install -r requirements.txt --system --no-cache-dir

# Copy the rest of the application
COPY . .

# Render will assign a dynamic port in $PORT
# Use ${PORT:-8000} for local default (8000) if PORT is not set
CMD uvicorn src.latest_ai_development.api:app --host 0.0.0.0 --port ${PORT:-8000}
