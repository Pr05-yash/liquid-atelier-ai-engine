import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [style, setStyle] = useState("Liquid Architecture");
  const [vibe, setVibe] = useState("Grand Corporate Hall");
  const [morphedImage, setMorphedImage] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
      setMorphedImage(null);
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
    formData.append("vibe", vibe);

    try {
      const response = await fetch("http://localhost:8000/api/morph", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.success && data.morphed_image_url) {
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
    // ✨ BACKGROUND UPGRADE: Premium dark sleek gradient with fullviewport spacing
    <div style={{ 
      minHeight: "100vh", 
      background: "radial-gradient(circle at 50% 0%, #1a1a1e 0%, #0d0d0f 100%)", 
      color: "#fff",
      padding: "50px 20px", 
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }}>
      
      {/* Header Section with Neon Glow Text */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ 
          fontSize: "2.8rem", 
          fontWeight: "900", 
          letterSpacing: "-0.05em",
          margin: "0 0 10px 0",
          background: "linear-gradient(180deg, #ffffff 0%, #a3a3a3 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Liquid Atelier AI Engine
        </h1>
        <p style={{ 
          fontSize: "1.1rem", 
          color: "#8e8e93", 
          textTransform: "uppercase", 
          letterSpacing: "0.15em",
          fontWeight: "500" 
        }}>
          Computational Space & AI Virtual Staging Node
        </p>
      </div>
      
      {/* Modern Card Layout (Glassmorphism effect) */}
      <div style={{ 
        background: "rgba(255, 255, 255, 0.03)", 
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "32px", 
        borderRadius: "24px", 
        marginBottom: "40px",
        maxWidth: "850px",
        margin: "0 auto 40px auto",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
      }}>
        
        {/* 📦 1. Upload Field */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontSize: "0.9rem", color: "#a1a1a6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Upload Spatial Base (Image):</label>
          <div style={{
            border: "1px dashed rgba(255, 255, 255, 0.15)",
            padding: "16px",
            borderRadius: "12px",
            background: "rgba(0,0,0,0.2)"
          }}>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: "#a1a1a6" }} />
          </div>
        </div>

        {/* 🎨 2. Upgraded Visionary Styles */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontSize: "0.9rem", color: "#a1a1a6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Select Visionary Style:</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ padding: "12px 16px", width: "100%", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "#1c1c1e", color: "#fff", fontSize: "1rem", cursor: "pointer", outline: "none" }}>
            <option value="Liquid Architecture">Liquid Architecture (House of Prajapati Concept)</option>
            <option value="Parametric Fluidity">Parametric Fluidity (Zaha Hadid Inspired)</option>
            <option value="Biophilic Cyberpunk">Biophilic Cyberpunk (Neon + Nature)</option>
            <option value="Futuristic Brutalism">Futuristic Brutalism (Monolithic Concrete)</option>
            <option value="Luxury Minimalist">Luxury Minimalist (Premium Matte & Gold)</option>
            <option value="Modern Minimalist">Modern Minimalist</option>
            <option value="Biophilic Design">Biophilic Design</option>
          </select>
        </div>

        {/* 🏢 3. Upgraded Space Types & Scale */}
        <div style={{ marginBottom: "32px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontSize: "0.9rem", color: "#a1a1a6", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Select Space Type / Scale:</label>
          <select value={vibe} onChange={(e) => setVibe(e.target.value)} style={{ padding: "12px 16px", width: "100%", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "#1c1c1e", color: "#fff", fontSize: "1rem", cursor: "pointer", outline: "none" }}>
            <option value="Grand Corporate Hall">Grand Corporate Hall (Bade Halls / Open Spaces)</option>
            <option value="Luxury Fashion Atelier">Luxury Fashion Atelier (Studio / Display Gallery)</option>
            <option value="Futuristic Restaurant Lounge">Futuristic Restaurant Lounge (Fine Dining / Bar)</option>
            <option value="Executive Cabin">Executive Cabin (Private Workspace / Office)</option>
            <option value="Avant-Garde Living Room">Avant-Garde Living Room (Premium Residential Lounge)</option>
            <option value="Master Bedroom Suite">Master Bedroom Suite (Luxury Bedding & Fluid Walk-in)</option>
          </select>
        </div>

        {/* 🚀 Action Button with Premium Look */}
        <button onClick={handleMorph} disabled={loading} style={{ 
          padding: "16px 24px", 
          cursor: loading ? "not-allowed" : "pointer",
          width: "100%",
          background: loading ? "#3a3a3c" : "linear-gradient(90deg, #ffffff 0%, #e5e5ea 100%)",
          color: loading ? "#8e8e93" : "#000",
          border: "none",
          borderRadius: "12px",
          fontWeight: "700",
          fontSize: "1rem",
          letterSpacing: "0.02em",
          boxShadow: loading ? "none" : "0 8px 24px rgba(255,255,255,0.1)",
          transition: "transform 0.2s ease, cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          {loading ? "🔮 Morphing Space Canvas... Please Wait..." : "Generate Liquid Design"}
        </button>
      </div>

      {/* 🖼️ Premium Split Display Studio */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", maxWidth: "1100px", margin: "40px auto 0 auto" }}>
        
        {/* Input Block */}
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#a1a1a6", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Base Canvas</h3>
          {image ? (
            <img src={image} alt="Original" style={{ width: "100%", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 12px 32px rgba(0,0,0,0.4)", maxHeight: "450px", objectFit: "cover" }} />
          ) : (
            <div style={{ border: "2px dashed rgba(255,255,255,0.1)", borderRadius: "16px", padding: "80px 20px", color: "#636366", background: "rgba(255,255,255,0.01)" }}>Spatial photo upload ka intezar hai...</div>
          )}
        </div>

        {/* Output Block */}
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: morphedImage ? "#fff" : "#a1a1a6", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {morphedImage ? "Morphed Masterpiece ✨" : "Morphed Masterpiece"}
          </h3>
          {morphedImage ? (
            <img src={morphedImage} alt="Morphed AI Result" style={{ width: "100%", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 16px 40px rgba(0,0,0,0.6)", maxHeight: "450px", objectFit: "cover" }} />
          ) : (
            <div style={{ border: "2px dashed rgba(255,255,255,0.1)", borderRadius: "16px", padding: "80px 20px", color: "#636366", background: "rgba(255,255,255,0.01)" }}>
              {loading ? "AI is computationally rendering lines..." : "Render canvas yahan load hoga..."}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}