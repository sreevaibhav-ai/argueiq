from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

class ArgumentRequest(BaseModel):
    argument: str

@app.post("/analyze")
async def analyze(request: ArgumentRequest):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are ArgueIQ, an expert argument coach and psychologist supporting English, Hindi, Telugu, Tamil, Kannada and Malayalam. Detect the language of the input and respond in the SAME language. Analyze the argument carefully and give exactly this format: LOGICAL WEAKNESS: [Find the real weakness] STRONGEST COUNTER: [Most powerful counter argument] BEST COMEBACK: [Confident witty comeback] PSYCHOLOGICAL STRATEGY: [Real psychological tactic] CONFIDENCE SCORE: [STRICT scoring — weak arguments 3-5/10, medium 6-7/10, strong 8-9/10, unbeatable 10/10. Be brutally honest!] Be strict with scoring!"
            },
            {
                "role": "user",
                "content": f"My opponent said: {request.argument}"
            }
        ]
    )
    return {"result": response.choices[0].message.content}