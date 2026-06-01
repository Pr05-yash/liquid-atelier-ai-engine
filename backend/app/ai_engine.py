import replicate
import os
from dotenv import load_dotenv

load_dotenv()

# Ensure REPLICATE_API_TOKEN is set in your .env file
def generate_morphed_interior(image_bytes, style, room_type):
    # Prompt engineering for ultra-luxury outcome
    luxury_prompt = f"A professional ultra-luxury {room_type} in {style} style, photorealistic, 8k resolution, architectural digest photography, highly detailed, interior design masterpiece, perfect lighting"
    negative_prompt = "low quality, distorted, bad architecture, messy, cheap furniture, blurry, deformed structure"

    # Uploading bytes to a temporary URL or converting to data URI is required by Replicate.
    # For simplicity, we use Replicate's standard ControlNet Interior architecture model
    
    try:
        # We use a standard stable-diffusion + controlnet model hosted on Replicate
        # Example model: jagilley/controlnet-hough or similar architectural depth models
        output = replicate.run(
            "stability-ai/sdxl:39ed52f2a78e434b496e5e24173e78b37572cd43f259de2ef2ad58a32669e1d10", # Or specialized ControlNet model
            input={
                "image": image_bytes,
                "prompt": luxury_prompt,
                "negative_prompt": negative_prompt,
                "num_outputs": 1,
                "guidance_scale": 7.5,
                "num_inference_steps": 50,
                "controlnet_conditioning_scale": 0.8 # Keeps the room structure intact
            }
        )
        return output[0] # Returns the URL of the generated image
    except Exception as e:
        print(f"Error in AI generation: {e}")
        raise e