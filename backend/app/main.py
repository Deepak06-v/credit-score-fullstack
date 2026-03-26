import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router

# Load variables from .env (locally) or Render Environment Settings (live)
load_dotenv()

app = FastAPI(title="Credit Score Generator API")

# CRITICAL: This allows your Vercel frontend to talk to this backend
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],  # Allows all origins for the hackathon demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your logic routes
app.include_router(predict_router, prefix="/predict", tags=["predict"])

@app.get("/")
def root():
    return {
        "message": "Credit score generator backend is running",
        "openai_enabled": bool(os.getenv("OPENAI_API_KEY")),
        "status": "online"
    }

# Render uses the $PORT environment variable, so we don't hardcode a port here.