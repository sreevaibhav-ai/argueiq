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
                "content": "You are ArgueIQ, an expert argument coach supporting English, Hindi, Telugu, Tamil, Kannada and Malayalam. Detect the language of the input and respond in the SAME language. Give exactly this format: LOGICAL WEAKNESS: [weakness] STRONGEST COUNTER: [counter] BEST COMEBACK: [comeback] PSYCHOLOGICAL STRATEGY: [strategy] CONFIDENCE SCORE: [X]/10 [reason]"
            },
            {
                "role": "user",
                "content": f"My opponent said: {request.argument}"
            }
        ]
    )
    return {"result": response.choices[0].message.content}