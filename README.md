# Liquid Atelier AI Engine 🔮
> **Computational Space & AI Virtual Staging Node**

Liquid Atelier is a cutting-edge, end-to-end AI virtual staging platform designed to transform raw architectural structures into fluid, visionary spaces. Built for the modern designer, it allows users to upload any spatial base canvas and instantly render it using futuristic design languages—featuring concepts like **Liquid Architecture** (inspired by the House of Prajapati brand concept) and **Parametric Fluidity**.

---

## 🚀 Before / After Transformation

| Original Base Canvas | AI Morphed Masterpiece (Liquid Architecture) |
| :---: | :---: |
| "<alt="base room" src="https://github.com/user-attachments/assets/5ac054b1-148f-423f-97ea-a012aedfc8a9" />" width="100%" alt="Original Base Canvas"> | <img src="<alt="morphed_1780295168" src="https://github.com/user-attachments/assets/177c3cc0-7ede-4d38-9569-606106833b8f" />

" width="100%" alt="AI Morphed Masterpiece"> |

---

## ✨ Features

- **Visionary Architectural Styles:** Choose from premium pre-mapped prompts like *Liquid Architecture*, *Parametric Fluidity (Zaha Hadid Inspired)*, *Biophilic Cyberpunk*, and *Futuristic Brutalism*.
- **Multi-Scale Spatial Adaptability:** Seamlessly transforms spaces across multiple scales—from *Grand Corporate Halls* and *Luxury Fashion Ateliers* to premium *Master Bedroom Suites*.
- **Glassmorphic Studio UI:** A premium, dark-themed, ultra-minimalist interactive dashboard optimized for creative professionals.
- **Asynchronous AI Rendering:** Connects directly to a high-speed FastAPI backend powered by advanced generative diffusion models via Pollinations AI.

---

## 🏗️ Project Architecture

The system is cleanly separated into two distinct, scalable modules:

```text
liquid-atelier-ai-engine/
├── frontend/     # Next.js Application (Pages Router Setup)
└── backend/      # FastAPI Server (Python Prompt Engineering & Image Generation)
