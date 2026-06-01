# Liquid Atelier AI Engine 🔮
> **Computational Space & AI Virtual Staging Node**

Liquid Atelier is a cutting-edge, end-to-end AI virtual staging platform designed to transform raw architectural structures into fluid, visionary spaces. Built for the modern designer, it allows users to upload any spatial base canvas and instantly render it using futuristic design languages—featuring concepts like **Liquid Architecture** (inspired by the House of Prajapati brand concept) and **Parametric Fluidity**.

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
