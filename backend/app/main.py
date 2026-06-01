from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os
import requests
import time
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Liquid Atelier AI Engine")

# CORS setup taaki tumhara React frontend bina kisi dikkat ke connect ho sake
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_morphed_interior_pollinations(style):
    if style == "Liquid Architecture":
        style_prompt = "A high-end computational luxury office interior, futuristic fluid furniture, curvilinear organic white desks, biomorphic glass structures."
    else:
        style_prompt = f"A modern professional furnished office in {style} design."

    # Prompt optimization for Flux Engine
    final_prompt = f"A photorealistic, fully furnished luxury executive office with {style_prompt}, seamless design, 8k, architectural digest."

    try:
        print("🔮 Hitting Stable Free Flux Pipeline via Pollinations Network...")
        
        # Space cleanup for URL parameter encoding
        encoded_prompt = requests.utils.quote(final_prompt)
        
        # Flux Model via Pollinations Endpoint (Bina kisi token aur billing ke jhanjhat ke)
        API_URL = f"https://image.pollinations.ai/p/{encoded_prompt}?width=1024&height=1024&model=flux&seed=42"
        
        response = requests.get(API_URL, timeout=45)

        if response.status_code != 200:
            print(f"🔥 Pipeline Error Log: {response.status_code}")
            return None

        # Image bytes read karke static folder mein local dumping karna
        image_bytes = response.content
        
        output_dir = "static"
        os.makedirs(output_dir, exist_ok=True)
        
        output_filename = f"morphed_{int(time.time())}.webp"
        output_path = os.path.join(output_dir, output_filename)
        
        with open(output_path, "wb") as f:
            f.write(image_bytes)
        
        return f"http://127.0.0.1:8000/static/{output_filename}"

    except Exception as e:
        print(f"🔥 Exception during Generation: {e}")
        return None

# Static Files Allocation
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/api/morph")
async def morph_space(image: UploadFile = File(...), style: str = Form(...)):
    try:
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)
        file_location = f"{temp_dir}/{image.filename}"
        
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
            
        print(f"📦 Processing image for style: {style}")
        
        # Fire alternative pipeline
        result_url = generate_morphed_interior_pollinations(style)
        
        if os.path.exists(file_location):
            os.remove(file_location)
            
        if not result_url:
            raise HTTPException(status_code=500, detail="AI Space Morphing Failed.")
            
        print(f"🚀 Success! Generated Local URL: {result_url}")
        return {"success": True, "morphed_image_url": result_url}
        
    except Exception as e:
        print(f"🔥 API Route Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Server via Clean Stable Pipeline...")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)