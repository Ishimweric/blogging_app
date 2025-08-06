# 🧠 AI-Powered Blog Generation Backend (CrewAI + FastAPI)

---

## 🚀 Project Description

### 🎯 Objective:

### 👥 CrewAI Agents:

| Agent       | Role                                      |
|-------------|-------------------------------------------|
| `Trend Hunter` | Identifies trending blog topics using Serper.dev |
| `Writer`        | Drafts the blog content based on topic, tone, and audience |
| `Editor`        | Refines and improves clarity, tone, grammar |
| `Summarizer`    | Creates meta description + social snippet |

These agents are managed sequentially to simulate a real editorial pipeline.


cd src/crew_blog_backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt
# Create a .env file or set GOOGLE_API_KEY in your environment
uvicorn api:app --reload
