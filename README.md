# 🧬 Sentigen eDNA: In-Silico RegTech SaaS Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Python Version](https://img.shields.io/badge/python-3.11%2B-blue)
![React Version](https://img.shields.io/badge/react-18-61dafb?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)
![License](https://img.shields.io/badge/license-Proprietary-red)

Sentigen eDNA is an enterprise Regulatory Technology (RegTech) SaaS platform providing automated **in-silico environmental impact audits** and **pathogen monitoring (eDNA)** for aquaculture farms and coastal developments in the United States (EPA / NEPA) and Canada (DFO).

## Table of Contents
- [Business Model & Zero-Cost Data Architecture](#business-model--zero-cost-data-architecture)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Repository Directory Tree](#repository-directory-tree)
- [Local Setup & Installation](#local-setup--installation)
- [API Reference](#api-reference)
- [Deployment](#deployment)

## Business Model & Zero-Cost Data Architecture

Sentigen operates entirely **in-silico via secondary data mining**. By eliminating expensive physical field sampling and wet-lab sequencing runs, Sentigen connects asynchronously to public sequence archives (such as NCBI SRA E-utilities, GenBank, and ENCODE). 

It downloads metadata and environmental DNA sequences **100% free of charge**, processing them through local Qdrant vector databases and Google Gemini generative models to produce instant regulatory compliance reports.

## Key Features

- **Automated Biovigilance:** Real-time tracking of pathogen incidence and regional outbreak distribution.
- **Zero-Cost Ingestor:** Direct pipeline to NCBI E-utilities for rapid metadata retrieval.
- **AI Audit Engine:** Powered by Google Gemini to parse genomic data and generate EPA/DFO compliant PDF reports.
- **Glassmorphism UI:** Modern, responsive dashboard with automatic light/dark mode and fluid micro-interactions.

## Technology Stack

- **Backend (Python 3.11+)**: FastAPI, `httpx` for asynchronous NCBI SRA / E-utilities requests, Pydantic v2, Qdrant vector database (RAG), and `@google/genai` (Gemini AI API).
- **Frontend (React 18 / Vite)**: Tailwind CSS v4, Recharts for biometric and outbreak trends, Lucide React icons.
- **Infrastructure**: Docker & Docker Compose for monorepo orchestration, pre-configured for Vercel and AWS deployment.

## Repository Directory Tree

```text
sentigen-edna-monorepo/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── api/
│   │   └── main.py
│   └── db/
│       └── qdrant_client.py
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── index.html
    ├── server.ts
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css
        └── components/
            ├── Sidebar.tsx
            ├── Header.tsx
            ├── KPIGrid.tsx
            ├── SurveillanceCharts.tsx
            ├── IngestorConsole.tsx
            ├── AuditGenerator.tsx
            └── SampleTracker.tsx
```

## Local Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm
- Docker & Docker Compose

### 1. Clone & Configure Environment

```bash
git clone [https://github.com/sentigen/edna-regtech-saas.git](https://github.com/sentigen/edna-regtech-saas.git)
cd sentigen-edna-monorepo
cp .env.example .env
```
> **Note:** Configure your `GEMINI_API_KEY` in the `.env` file or via your deployment provider's secrets manager.

### 2. Run with Docker Compose (Full Stack)

For an out-of-the-box local environment containing both the backend and frontend:
```bash
docker-compose up --build
```

### 3. Run Development Servers Manually

**Backend (FastAPI):**
```bash
cd backend
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

**Frontend / Preview Server (Node + Vite):**
```bash
cd frontend
npm install
npm run dev
```

## API Reference

Base URL: `/api/v1`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | System status and database connectivity check. |
| `POST` | `/fetch` | Asynchronous NCBI SRA eDNA ingestor querying public repositories. |
| `POST` | `/gemini-audit` | AI-powered regulatory compliance audit generator (EPA/NEPA & DFO). |
| `GET` | `/surveillance` | Real-time pathogen incidence and regional outbreak distribution metrics. |

## Deployment

### Vercel (Frontend)

The frontend is fully optimized for Vercel static deployment:
1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Set the **Root Directory** to `frontend/`.
4. Add environment variables (e.g., `VITE_API_BASE_URL`).
5. Deploy.

---
*© 2026 Sentigen eDNA. All rights reserved.*