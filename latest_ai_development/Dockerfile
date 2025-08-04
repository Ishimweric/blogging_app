FROM python:3.11-slim

# Install uv
RUN pip install uv

# Set a clean working directory (optional but neat)
WORKDIR /code

# Copy files
COPY . .

# Install dependencies with uv
RUN uv pip install -r requirements.txt --system --no-cache-dir || \
    uv pip install . --system --no-cache-dir

# Expose the port (if using FastAPI or similar)
EXPOSE 8000

# Run your app (adjust this if your entry point is different)
CMD ["uvicorn", "src.latest_ai_development.api:app", "--host", "0.0.0.0", "--port", "8000"]
