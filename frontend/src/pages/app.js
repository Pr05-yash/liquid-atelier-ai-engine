import React, { useState } from 'react';

function LiquidAtelierUI() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [style, setStyle] = useState('Liquid Architecture');
  const [loading, setLoading] = useState(false);
  const [morphedImage, setMorphedImage] = useState(null);
  const [error, setError] = useState(null);

  // 📦 1. Handle File Selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 🚀 2. Trigger API Hit to FastAPI Backend
  const handleMorphSpace = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Bhai, pehle ek interior image upload karo!");
      return;
    }

    setLoading(true);
    setError(null);
    setMorphedImage(null); // Purani image clear karne ke liye

    // FastAPI Form-Data format expect karta hai, isliye FormData object banayenge
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('style', style);

    try {
      console.log("📡 Sending data to FastAPI...");
      const response = await fetch('http://127.0.0.1:8000/api/morph', {
        method: 'POST',
        body: formData, // Headers set karne ki zaroorat nahi hai, browser automatic multipart/form-data handles karega
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("🎯 Success! Image Generated:", data.morphed_image_url);
        setMorphedImage(data.morphed_image_url);
      } else {
        throw new Error(data.detail || "AI generation failed.");
      }
    } catch (err) {
      console.error("🔥 Frontend Error:", err);
      setError("Backend se connection nahi ho paya. Check karo server chalu hai ya nahi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontWeight: '800' }}>Liquid Atelier AI Engine</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Futuristic Luxury Space Morphing Node</p>

      <form onSubmit={handleMorphSpace} style={{ background: '#f5f5f7', padding: '24px', borderRadius: '12px', marginBottom: '30px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Upload Spatial Base (Image):</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select Visionary Style:</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ padding: '8px', width: '100%', borderRadius: '6px' }}>
            <option value="Liquid Architecture">Liquid Architecture (House of Prajapati Concept)</option>
            <option value="Modern Minimalist">Modern Minimalist</option>
            <option value="Biophilic Design">Biophilic Design</option>
          </select>
        </div>

        <button type="submit" disabled={loading} style={{
          background: loading ? '#ccc' : '#000',
          color: '#fff',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%',
          fontWeight: 'bold'
        }}>
          {loading ? '🔮 Morphing Space Canvas...' : 'Generate Liquid Design'}
        </button>
      </form>

      {/* 🚨 Error Log Alert */}
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}

      {/* 🖼️ Canvas Display Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* Original Input Preview */}
        {selectedFile && (
          <div style={{ textAlign: 'center' }}>
            <h3>Base Canvas</h3>
            <img src={URL.createObjectURL(selectedFile)} alt="Original" style={{ width: '100%', borderRadius: '8px', height: 'auto', objectFit: 'cover' }} />
          </div>
        )}

        {/* Morphed Output Preview */}
        {morphedImage && (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#0070f3' }}>Morphed Masterpiece</h3>
            <img src={morphedImage} alt="Morphed Output" style={{ width: '100%', borderRadius: '8px', height: 'auto', objectFit: 'cover', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LiquidAtelierUI;