import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const SYSTEM_PROMPT = `You are an expert startup analyst, venture capitalist, and product strategist with deep knowledge of the Indian startup ecosystem. Evaluate startup ideas with brutal honesty, data-backed insights, and actionable guidance.

Return ONLY a valid JSON object with no markdown, no backticks, no preamble — just raw JSON matching this schema:

{
  "startupSummary": "2-3 sentence clear summary of the idea",
  "problemScore": {
    "score": 8,
    "verdict": "Excellent | Good | Average | Weak | Invalid",
    "reasoning": "2-3 sentences on whether this is a real painful problem worth solving"
  },
  "marketOpportunity": {
    "indiaMarketSize": "Current estimated market size in India with basis",
    "globalMarketSize": "Global market size estimate",
    "growthRate": "Expected CAGR or growth trend",
    "insight": "2-3 sentences on timing and opportunity"
  },
  "competitorAnalysis": [
    {
      "name": "Competitor name",
      "type": "Direct | Indirect | Substitute",
      "description": "What they do and why relevant",
      "weakness": "Their gap your startup can exploit"
    }
  ],
  "risks": [
    { "risk": "Risk title", "severity": "High | Medium | Low", "mitigation": "How to address it" }
  ],
  "monetizationIdeas": [
    { "model": "Model name", "description": "How it works", "viability": "High | Medium | Low" }
  ],
  "mvpSuggestions": {
    "phase1": { "title": "Phase title", "duration": "e.g. Month 1-2", "tasks": ["task1", "task2", "task3"] },
    "phase2": { "title": "Phase title", "duration": "e.g. Month 3-4", "tasks": ["task1", "task2", "task3"] },
    "phase3": { "title": "Phase title", "duration": "e.g. Month 5-6", "tasks": ["task1", "task2", "task3"] }
  },
  "improvementIdeas": [
    { "idea": "Improvement or pivot idea", "rationale": "Why this angle is stronger" }
  ],
  "finalScore": {
    "score": 85,
    "grade": "S | A | B | C | D",
    "verdict": "Highly Investable | Promising | Needs Work | Risky | Not Viable",
    "summary": "2-3 sentence final judgment"
  },
  "swot": {
    "strengths": ["strength1", "strength2", "strength3"],
    "weaknesses": ["weakness1", "weakness2", "weakness3"],
    "opportunities": ["opp1", "opp2", "opp3"],
    "threats": ["threat1", "threat2", "threat3"]
  },
  "investorReadiness": {
    "score": 7,
    "verdict": "Ready | Almost Ready | Needs Traction | Too Early",
    "keyGaps": ["gap1", "gap2", "gap3"],
    "tips": ["tip1", "tip2", "tip3"]
  },
  "businessModelGenerator": {
    "revenueStreams": [
      { "stream": "Stream name", "description": "How it generates revenue", "potential": "High | Medium | Low" }
    ],
    "pricingStrategy": [
      { "strategy": "Strategy name", "description": "How to price", "example": "Concrete example" }
    ],
    "growthStrategies": [
      { "strategy": "Growth lever", "description": "How to execute" }
    ]
  },
  "goToMarket": {
    "firstUsers": [
      { "segment": "Who", "how": "How to reach them", "channel": "Where" }
    ],
    "acquisitionChannels": [
      { "channel": "Channel name", "priority": "High | Medium | Low", "tactic": "Specific tactic" }
    ],
    "marketingIdeas": [
      { "idea": "Marketing idea", "effort": "Low | Medium | High", "impact": "Low | Medium | High" }
    ]
  }
}

Rules:
- Return 3-5 items per array section
- Be specific to India's market where relevant
- Use real competitor names
- Be honest — if idea is weak say so, but always provide constructive improvements
- improvementIdeas should always appear regardless of how good or bad the idea is
`;

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
  const prompt = `Startup Idea: A food delivery app for pets
Startup Name: PetPals
Industry: Other
Target Users: Consumers (B2C)
Business Model: Freemium
Additional Context: None`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: "application/json",
            temperature: 0.7,
        }
    });
    
    console.log("Raw response:", response.text);
    const parsed = JSON.parse(response.text);
    console.log("Parsed successfully!", Object.keys(parsed));
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
