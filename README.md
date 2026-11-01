# Sentigen eDNA: In-Silico RegTech SaaS Platform

Sentigen eDNA is an enterprise Regulatory Technology (RegTech) SaaS platform providing automated **in-silico environmental impact audits** and **pathogen monitoring (eDNA)** for aquaculture farms and coastal developments in the United States (EPA / NEPA) and Canada (DFO).

## Business Model & Zero-Cost Data Architecture

Sentigen operates entirely **in-silico via secondary data mining**. By eliminating expensive physical field sampling and wet-lab sequencing runs, Sentigen connects asynchronously to public sequence archives (such as NCBI SRA E-utilities, GenBank, and ENCODE) to download metadata and environmental DNA sequences **100% free of charge**, processing them through local Qdrant vector databases and Google Gemini generative models to produce instant regulatory compliance reports.

---

## Repository Directory Tree (Monorepo)

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

---

## Technology Stack

- **Backend (Python 3.11+)**: FastAPI, `httpx` for asynchronous NCBI SRA / E-utilities requests, Pydantic v2, Qdrant vector database (RAG), and `@google/genai` (Gemini AI API).
- **Frontend (React 18 / Vite)**: Tailwind CSS v4 with automatic Light/Dark mode support, Recharts for biometric and outbreak trends, Lucide React icons.
- **Infrastructure**: Docker & Docker Compose for monorepo orchestration, pre-configured for Vercel and AWS deployment.

---

## Local Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm
- Docker & Docker Compose

### 1. Clone & Configure Environment
```bash
git clone https://github.com/sentigen/edna-regtech-saas.git
cd sentigen-edna-monorepo
cp .env.example .env
```
*(Configure your `GEMINI_API_KEY` in `.env` or via AI Studio Secrets)*

### 2. Run with Docker Compose (Full Stack)
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

---

## API Endpoints (`/api/v1`)

- `GET /api/v1/health` — System status and database connectivity check.
- `POST /api/v1/fetch` — Asynchronous NCBI SRA eDNA ingestor querying public repositories for target species / pathogen signatures.
- `POST /api/v1/gemini-audit` — AI-powered regulatory compliance audit generator (EPA/NEPA & DFO frameworks).
- `GET /api/v1/surveillance` — Real-time pathogen incidence and regional outbreak distribution metrics.

---

## Vercel Deployment

The frontend is fully optimized for Vercel static deployment:
1. Push your repository to GitHub.
2. Import project into Vercel.
3. Set root directory to `frontend/`.
4. Add environment variables (`GEMINI_API_KEY`).
5. Deploy.
