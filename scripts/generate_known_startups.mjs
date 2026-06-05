import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// We'll evaluate 15 famous ones in this batch to prevent quota timeouts. 
// You can change this list and run again for the next 15!
const FAMOUS_STARTUPS = [
  "Zepto (10-minute grocery delivery)",
  "CRED (Credit card bill payments with rewards)",
  "Ather Energy (Premium electric scooters)",
  "Pixxel (Hyperspectral earth imaging satellites)",
  "Skyroot Aerospace (Private space launch vehicles)",
  "Postman (API development platform)",
  "Razorpay (Payment gateway for businesses)",
  "Meesho (Social commerce for Tier-2/3 cities)",
  "Zerodha (Discount stock brokerage)",
  "Ola Electric (EV manufacturing and ride-hailing)",
  "Kuku FM (Vernacular audio learning platform)",
  "Ultraviolette Automotive (High-performance electric motorcycles)",
  "Lenskart (Omnichannel eyewear retail)",
  "Zetwerk (B2B manufacturing marketplace)",
  "AgniKul Cosmos (3D printed rocket engines)"
];

const SYSTEM_PROMPT = `You are a Tier-1 Venture Capitalist and Product Strategist with deep expertise in the Indian startup ecosystem. You are known for your brutal honesty, deep market insights, and analytical rigor. 

Your objective is to evaluate startup ideas with extreme depth. DO NOT give generic, basic, or overly polite answers. Instead, provide detailed, nuanced, and actionable analysis. 

Think step-by-step before generating the final JSON:
1. Deconstruct the core value proposition and check if it violates fundamental unit economics.
2. Identify the single biggest fatal flaw in the business model.
3. Map out the competitive landscape, specifically citing Indian competitors.
4. Formulate non-obvious pivot strategies and monetization models.

Return ONLY a valid JSON object matching this schema. NO markdown, NO preambles.

{
  "startupSummary": "3-4 sentence detailed summary explaining the mechanics of the idea and the exact problem it solves.",
  "problemScore": {
    "score": <1-10>,
    "verdict": "Excellent | Good | Average | Weak | Invalid",
    "reasoning": "A highly detailed paragraph explaining exactly why this problem is or isn't a hair-on-fire pain point, referencing behavioral economics or market trends."
  },
  "marketOpportunity": {
    "indiaMarketSize": "Current realistic addressable market in India (SAM) with basis",
    "globalMarketSize": "Global TAM estimate",
    "growthRate": "Expected CAGR or growth trend",
    "insight": "A deep insight into why this specific timing is right or wrong, and what macroeconomic factors will drive or kill this."
  },
  "competitorAnalysis": [
    {
      "name": "Competitor name (Use real Indian or global companies)",
      "type": "Direct | Indirect | Substitute",
      "description": "What is their moat and current market positioning?",
      "weakness": "What is the exact structural gap or vulnerability your startup can exploit?"
    }
  ],
  "risks": [
    { "risk": "Specific structural, regulatory, or behavioral risk", "severity": "High | Medium | Low", "mitigation": "A highly specific, operational mitigation strategy (not generic advice)" }
  ],
  "monetizationIdeas": [
    { "model": "Model name", "description": "Exactly how the transaction flows and who pays who", "viability": "High | Medium | Low" }
  ],
  "mvpSuggestions": {
    "phase1": { "title": "Validation & Prototyping", "duration": "Month 1-2", "tasks": ["Specific task 1", "Specific task 2", "Specific task 3"] },
    "phase2": { "title": "Initial Go-to-Market", "duration": "Month 3-4", "tasks": ["Specific task 1", "Specific task 2", "Specific task 3"] },
    "phase3": { "title": "Scaling & Monetization", "duration": "Month 5-6", "tasks": ["Specific task 1", "Specific task 2", "Specific task 3"] }
  },
  "improvementIdeas": [
    { "idea": "A radical pivot or aggressive improvement", "rationale": "A detailed paragraph on why this pivot improves unit economics or defensibility" }
  ],
  "finalScore": {
    "score": <1-100>,
    "grade": "S | A | B | C | D",
    "verdict": "Highly Investable | Promising | Needs Work | Risky | Not Viable",
    "summary": "A brutally honest final verdict. Would a Tier-1 VC write a check? Why or why not?"
  },
  "swot": {
    "strengths": ["Deep operational strength 1", "Strength 2", "Strength 3"],
    "weaknesses": ["Fatal flaw 1", "Weakness 2", "Weakness 3"],
    "opportunities": ["Non-obvious market expansion 1", "Opportunity 2", "Opportunity 3"],
    "threats": ["Existential threat 1", "Threat 2", "Threat 3"]
  },
  "investorReadiness": {
    "score": <1-10>,
    "verdict": "Ready | Almost Ready | Needs Traction | Too Early",
    "keyGaps": ["Critical metric missing 1", "Gap 2", "Gap 3"],
    "tips": ["Actionable step to secure funding 1", "Tip 2", "Tip 3"]
  },
  "businessModelGenerator": {
    "revenueStreams": [
      { "stream": "Stream name", "description": "How to extract value", "potential": "High | Medium | Low" }
    ],
    "pricingStrategy": [
      { "strategy": "Strategy name", "description": "Psychological or operational pricing logic", "example": "Concrete Indian pricing example (e.g. INR 499/mo)" }
    ],
    "growthStrategies": [
      { "strategy": "Growth lever", "description": "A specific hack or viral loop to acquire users cheaply" }
    ]
  },
  "goToMarket": {
    "firstUsers": [
      { "segment": "Hyper-niche early adopter segment", "how": "The exact non-scalable strategy to get the first 100 users", "channel": "Where do they hang out?" }
    ],
    "acquisitionChannels": [
      { "channel": "Channel name", "priority": "High | Medium | Low", "tactic": "Specific ad creative, SEO play, or partnership strategy" }
    ],
    "marketingIdeas": [
      { "idea": "Guerilla or brand marketing play", "effort": "Low | Medium | High", "impact": "Low | Medium | High" }
    ]
  }
}
`;

async function run() {
  const outputFile = path.join(__dirname, '..', 'training_data.jsonl');

  for (const startupName of FAMOUS_STARTUPS) {
    console.log(`Generating facts & evaluating: ${startupName}...`);

    // Step 1: Generate the exact Seed-Stage input Profile for this real startup
    const PROFILE_PROMPT = `Write a realistic 1-2 sentence Seed-stage pitch for the famous Indian startup: ${startupName}. 
    Return it as a JSON object with these keys: "idea", "name" (just the brand name), "industry", "targetUsers", "businessModel", "traction", "unfairAdvantage".`;

    try {
      const profileResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: PROFILE_PROMPT,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        }
      });
      
      const profile = JSON.parse(profileResponse.text);

      const userPrompt = `Startup Idea: ${profile.idea}\nStartup Name: ${profile.name}\nIndustry: ${profile.industry}\nTarget Users: ${profile.targetUsers}\nBusiness Model: ${profile.businessModel}\nCurrent Traction: ${profile.traction}\nUnfair Advantage: ${profile.unfairAdvantage}\nAdditional Context: None`;

      // Step 2: Act as the Tier-1 VC and Evaluate it
      const evalResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
          temperature: 0.7,
        }
      });

      const assistantResponse = evalResponse.text;

      // Construct OpenAI Fine-tuning JSONL format
      const jsonlEntry = {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
          { role: "assistant", content: assistantResponse }
        ]
      };

      fs.appendFileSync(outputFile, JSON.stringify(jsonlEntry) + "\n");
      console.log(`✅ Saved ${profile.name} to ${outputFile}`);
      
      // Delay to respect API rate limits (Free tier has a strict 5 Requests Per Minute limit)
      // Since we make 2 requests per loop, we need to wait at least 25 seconds before the next loop
      console.log("Waiting 25 seconds for rate limit...");
      await new Promise(resolve => setTimeout(resolve, 25000));
    } catch (e) {
      console.error(`❌ Failed evaluating ${startupName}:`, e.message);
    }
  }

  console.log("\nDone evaluating known startups!");
}

run();
