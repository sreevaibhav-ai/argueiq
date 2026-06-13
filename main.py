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
                "content": "Give a VARIED confidence score based on actual argument strength:
- Weak arguments: 3-5/10
- Medium arguments: 6-7/10  
- Strong arguments: 8-9/10
- Unbeatable arguments: 10/10
Be honest and strict with scoring!"
            },
            {
                "role": "user",
                "content": f"My opponent said: {request.argument}"
            }
        ]
    )
    return {"result": response.choices[0].message.content}