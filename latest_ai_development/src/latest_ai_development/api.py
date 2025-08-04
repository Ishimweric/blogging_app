# src/crew_blog_backend/api.py

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from latest_ai_development.crew import BlogContentCrew
from fastapi.middleware.cors import CORSMiddleware
from latest_ai_development.ingestion import retrieve_similar_docs

import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BlogRequest(BaseModel):
    topic: str
    tone: str
    audience: str
    platform: str

@app.post("/api/generate-blog")
def generate_blog(request: BlogRequest):
    try:
        context = retrieve_similar_docs(request.topic)
        crew = BlogContentCrew()
        result = crew.crew().kickoff(inputs={
            **request.dict(),
            "context": "\n\n".join(context)
        })
        return {
            "status": "success",
            "generated_blog": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# Optional for local testing
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 10000))  # Use Render's port if available
    uvicorn.run("crew_blog_backend.api:app", host="0.0.0.0", port=port, reload=True)
