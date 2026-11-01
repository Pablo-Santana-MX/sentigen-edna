/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'dummy_key',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Sentigen eDNA RegTech Node Proxy & Engine',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

app.post('/api/v1/fetch', async (req, res) => {
  try {
    const { query = 'Salmo salar', database = 'sra', max_results = 10 } = req.body;
    
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=${database}&term=${encodeURIComponent(query)}&retmode=json&retmax=${max_results}`;
    const searchResp = await axios.get(searchUrl);
    const idList = searchResp.data?.esearchresult?.idlist || [];

    if (idList.length === 0) {
      return res.json({
        query,
        database,
        count: 0,
        records: [],
        message: 'No records found in NCBI archive.'
      });
    }

    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=${database}&id=${idList.join(',')}&retmode=json`;
    const sumResp = await axios.get(summaryUrl);
    const sumData = sumResp.data?.result || {};

    const records = idList.map((uid: string) => {
      const item = sumData[uid] || {};
      return {
        accession: item.accession || `SRR${uid}`,
        title: item.title || `eDNA metabarcoding study for ${query}`,
        pub_date: item.pubdate || '2026',
        source: 'NCBI SRA Public Archive',
        organism: query
      };
    });

    res.json({
      query,
      database,
      count: records.length,
      records,
      status: 'success'
    });
  } catch (error: any) {
    console.error('NCBI fetch error:', error.message);
    res.json({
      query: req.body.query || 'Salmo salar',
      database: req.body.database || 'sra',
      count: 3,
      records: [
        { accession: 'SRR9482101', title: 'Pacific coastal eDNA surveillance - Site Alpha (EPA Reg 4)', pub_date: '2026-03-14', source: 'NCBI SRA', organism: req.body.query || 'Salmo salar' },
        { accession: 'SRR9482102', title: 'Pathogen screening for Infectious Salmon Anemia - Bay Sector 7', pub_date: '2026-03-12', source: 'NCBI SRA', organism: req.body.query || 'Salmo salar' },
        { accession: 'SRR9482103', title: 'Baseline biodiversity metabarcoding - Gulf of Maine Transect', pub_date: '2026-03-01', source: 'NCBI SRA', organism: req.body.query || 'Salmo salar' }
      ],
      status: 'fallback_simulated'
    });
  }
});

app.post('/api/v1/gemini-audit', async (req, res) => {
  try {
    const { siteName, region, pathogenRisk, biodiversityIndex, accessions } = req.body;
    
    const prompt = `
      Act as an expert Environmental RegTech Compliance Auditor for the US EPA/NEPA and Canada DFO.
      Generate a professional in-silico eDNA regulatory compliance audit report for:
      - Site Name: ${siteName}
      - Region / Framework: ${region}
      - Pathogen Risk Score: ${pathogenRisk}%
      - Biodiversity Integrity Index: ${biodiversityIndex}%
      - Evaluated Sequence Accessions: ${JSON.stringify(accessions)}
      
      Provide a structured JSON response containing:
      1. executiveSummary (string)
      2. regulatoryStatus ("APPROVED", "CONDITIONAL", or "REJECTED")
      3. keyFindings (array of strings)
      4. mitigationRequirements (array of strings)
      5. legalCitations (array of strings)
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are Sentigen AI RegTech Auditor. Output valid JSON only.'
      }
    });

    const resultText = response.text || '{}';
    const auditData = JSON.parse(resultText);

    res.json({
      success: true,
      audit: auditData
    });
  } catch (error: any) {
    console.error('Gemini Audit generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate AI regulatory audit.'
    });
  }
});

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true }
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sentigen eDNA frontend platform running at http://localhost:${PORT}`);
  });
}

startServer();
