from groq import Groq

import os
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

print("⚔️  Welcome to ArgueIQ — Never Lose An Argument Again!")
print("=" * 60)
print("Languages: English, Hindi, Telugu, Tamil, Kannada, Malayalam")
print("=" * 60)

while True:
    print("\nWhat did your opponent say? (type 'quit' to exit)")
    argument = input("👤 Opponent said: ")
    
    if argument.lower() == "quit":
        print("Thanks for using ArgueIQ! Go win those arguments! 💪")
        break
    
    print("\n🤔 ArgueIQ is analyzing...")
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """You are ArgueIQ, an expert argument coach supporting English, Hindi, Telugu, Tamil, Kannada and Malayalam. 
                Detect the language of the input and respond in the SAME language.
                Give exactly this format:
                
                ⚡ LOGICAL WEAKNESS:
                [weakness here]
                
                🛡️ STRONGEST COUNTER:
                [counter here]
                
                🔥 BEST COMEBACK:
                [comeback here]
                
                🧠 PSYCHOLOGICAL STRATEGY:
                [strategy here]
                
                💯 CONFIDENCE SCORE: [X]/10
                [reason here]"""
            },
            {
                "role": "user",
                "content": f"My opponent said: {argument}"
            }
        ]
    )
    
    print("\n" + "=" * 60)
    print(response.choices[0].message.content)
    print("=" * 60)