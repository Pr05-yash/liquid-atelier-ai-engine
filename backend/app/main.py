from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os
import requests
import time
import urllib.parse  # Clean URL Encoding ke liye native library
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

def generate_morphed_interior_pollinations(style: str, vibe: str):
    """
    Upgraded Smart Prompt Generator jo naye styles aur space scales ko validate karke
    Flux Engine ke liye dynamic, ultra-realistic architecture prompts banata hai.
    """
    # 1. Dynamic Design Style Prompting
    if style == "Liquid Architecture":
        style_prompt = "high-end computational luxury, futuristic fluid design elements, curvilinear organic structures, flowing metallic surfaces"
    elif style == "Parametric Fluidity":
        style_prompt = "sweeping parametric curves, continuous structural ribbing, avant-garde geometric morphing inspired by Zaha Hadid architecture"
    elif style == "Biophilic Cyberpunk":
        style_prompt = "hyper-modern architectural structure integrated with cascading vertical gardens, intelligent ambient neon accent lighting, micro-climate greenery"
    elif style == "Futuristic Brutalism":
        style_prompt = "raw raw-textured monolithic concrete blocks, massive fluid structural sweeps, minimalist imposing scale, high-contrast shadows"
    elif style == "Luxury Minimalist":
        style_prompt = "ultra-clean seamless matte surfaces, muted earth tones, hidden warm linear LEDs, sophisticated brushed gold and titanium accents"
    elif style == "Modern Minimalist":
        style_prompt = "sleek minimalist layout, sharp geometric lines, functional aesthetic, neutral tone palette"
    elif style == "Biophilic Design":
        style_prompt = "natural indoor plants, organic sustainable wooden textures, maximum daylight integration, soothing earthy colors"
    else:
        style_prompt = f"premium bespoke {style} design aesthetic"

    # 2. Dynamic Vibe & Room Scale Handling
    if vibe == "Grand Corporate Hall":
        spatial_guideline = f"A massive, expansive open-plan corporate lounge and grand exhibition hall. Maintain huge scale, monolithic columns, open ceiling grid, and panoramic glass facade. Integration of {style_prompt}. DO NOT partition into small rooms."
    
    elif vibe == "Luxury Fashion Atelier":
        spatial_guideline = f"An elite haute-couture fashion studio and display atelier gallery. Features fluid architectural garment racks, sculpted center mannequins, curved spotlight tracks, and seamless floating product islands. Beautiful integration of {style_prompt}."
    
    elif vibe == "Futuristic Restaurant Lounge":
        spatial_guideline = f"An ultra-luxury fine dining establishment and bar lounge. Sculpted fluid ceiling booths, glowing kinetic liquid back-bar design, premium spatial seating geometry, and ambient moody luxury mood lighting. Integrated with {style_prompt}."
    
    elif vibe == "Executive Cabin":
        spatial_guideline = f"An elite executive private office suite, private luxury desk workspace with custom cabinetry, premium materials, and tailored warm lighting accents. Integration of {style_prompt}."
    
    elif vibe == "Avant-Garde Living Room":
        spatial_guideline = f"A high-end residential grand living room, featuring low-profile organic curved sofas, a fluid architectural fireplace feature wall, double-height ceiling, and large minimalist artwork. Infused with {style_prompt}."
    
    elif vibe == "Master Bedroom Suite":
        spatial_guideline = f"A premium futuristic master bedroom oasis. Floating sculpted bed platform, fluid wrap-around custom headboard structure, hidden walk-in wardrobe portal, and serene luxury morning light filtration. Combined with {style_prompt}."
    
    else:
        spatial_guideline = f"A premium architecturally enhanced functional space with {style_prompt}."

    # Final prompt combination for Flux Engine
    final_prompt = f"Photorealistic, premium architectural digest photography of a fully furnished interior. {spatial_guideline} Seamless geometric flow, ultra-detailed textures, 8k resolution, cinematic atmosphere."

    try:
        print(f"\n🔮 Optimized Prompt for {vibe}: {final_prompt}")
        print("🔮 Hitting Stable Free Flux Pipeline via Pollinations Network...")
        
        # Safe encoding taaki URL me brackets ya spaces crash na karein
        encoded_prompt = urllib.parse.quote(final_prompt)
        
        # Seed random rakhte hain taaki har baar unique/fresh layouts milein
        current_seed = int(time.time()) % 100000
        API_URL = f"https://image.pollinations.ai/p/{encoded_prompt}?width=1024&height=1024&model=flux&seed={current_seed}"
        
        # Free model queue ke liye 60s timeout safe hai
        response = requests.get(API_URL, timeout=60)

        if response.status_code != 200:
            print(f"🔥 Pipeline Error Log Status Code: {response.status_code}")
            return None

        # Image bytes read karke static folder mein dump karna
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
async def morph_space(
    image: UploadFile = File(...), 
    style: str = Form(...),
    vibe: str = Form("Grand Corporate Hall")  # Frontend incoming vibe structure
):
    try:
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)
        file_location = f"{temp_dir}/{image.filename}"
        
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
            
        print(f"\n📦 Processing image for style: {style} | Target Space Suggestion: {vibe}")
        
        # Smart pipeline calling with both updated parameters
        result_url = generate_morphed_interior_pollinations(style, vibe)
        
        if os.path.exists(file_location):
            os.remove(file_location)
            
        if not result_url:
            raise HTTPException(status_code=500, detail="AI Space Morphing Failed. Check Backend Console.")
            
        print(f"🚀 Success! Generated Local URL: {result_url}")
        return {"success": True, "morphed_image_url": result_url}
        
    except Exception as e:
        print(f"🔥 API Route Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Server via Clean Stable Pipeline...")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)