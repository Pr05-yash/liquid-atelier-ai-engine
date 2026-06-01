import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [roomType, setRoomType] = useState("Office Space");
  const [style, setStyle] = useState("Liquid Architecture");
  const [morphedImage, setMorphedImage] = useState(null); // Naye image ke liye state
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
      setMorphedImage(null); // Nayi file upload hote hi purana render saaf
    }
  };

  const handleMorph = async () => {
    if (!imageFile) {
      alert("Pehle ek photo upload karo bhai!");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("style", style);
    formData.append("roomType", roomType);

    try {
      // Sahi backend port (8000) par request bhej rahe hain
      const response = await fetch("http://localhost:8000/api/morph", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.success && data.morphed_image_url) {
        // 🔥 SABSE ZAROORI LINE: State ko naye AI URL se update karo
        setMorphedImage(data.morphed_image_url); 
      } else {
        alert("AI Model se response nahi mila, check backend logs.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Backend se connect nahi ho paya.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Liquid Atelier</h1>
      <p>Computational Space & AI Virtual Staging</p>
      
      <div style={{ marginBottom: "15px" }}>
        <label>Upload Room Photo: </label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Room Type: </label>
        <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="Office Space">Office Space</option>
          <option value="Bedroom">Bedroom</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Design Vibe: </label>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="Liquid Architecture">Liquid Architecture</option>
          <option value="Futuristic Minimalist">Futuristic Minimalist</option>
        </select>
      </div>

      <button onClick={handleMorph} disabled={loading} style={{ padding: "10px 20px", cursor: "pointer" }}>
        {loading ? "Morphing Space... Please Wait..." : "Morph Interior"}
      </button>

      <hr style={{ margin: "20px 0" }} />

      {/* 🔥 IMAGE DISPLAY LOGIC FIX */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div>
          <h3>Original Structure</h3>
          {image && <img src={image} alt="Original" style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px" }} />}
        </div>

        {morphedImage && (
          <div>
            <h3 style={{ color: "#00ffcc" }}>AI Morphed Render ✨</h3>
            <img src={morphedImage} alt="Morphed AI Result" style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px", border: "2px solid #00ffcc" }} />
          </div>
        )}
      </div>
    </div>
  );
}