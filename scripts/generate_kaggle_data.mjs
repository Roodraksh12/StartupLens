import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

async function readKaggleCSV(filePath, maxRows = 30) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let isFirstLine = true;
  const startups = [];

  for await (const line of rl) {
    if (isFirstLine) { isFirstLine = false; continue; } // skip header
    const columns = line.split(',');
    if (columns.length >= 5) {
      const name = columns[2].replace(/"/g, '').trim();
      const industry = columns[3].replace(/"/g, '').trim();
      const subVertical = columns[4].replace(/"/g, '').trim();
      
      if (name && subVertical) {
        startups.push({ name, industry, subVertical });
      }
    }
    if (startups.length >= maxRows) break;
  }
  return startups;
}

async function run() {
  const csvPath = path.join(__dirname, '..', 'startup_funding.csv');
  const outputFile = path.join(__dirname, '..', 'training_data.jsonl');

  if (!fs.existsSync(csvPath)) {
    console.error("Could not find startup_funding.csv! Make sure it is in the project root.");
    return;
  }

  console.log("Reading from Kaggle CSV...");
  const kaggleStartups = await readKaggleCSV(csvPath, 150); // We will process up to 150 startups from the CSV
  
  console.log(`Found ${kaggleStartups.length} startups to evaluate.`);

  for (const startup of kaggleStartups) {
    console.log(`Generating facts & evaluating: ${startup.name} (${startup.subVertical})...`);

    const PROFILE_PROMPT = `Write a realistic 1-2 sentence Seed-stage pitch for the real Indian startup: ${startup.name}. 
    They operate in the "${startup.industry}" space, specifically: "${startup.subVertical}".
    Return it as a JSON object with these keys: "idea", "name", "industry", "targetUsers", "businessModel", "traction", "unfairAdvantage".`;

    try {
      const profileResponse = await groq.chat.completions.create({
        messages: [{ role: 'user', content: PROFILE_PROMPT }],
        model: 'llama-3.1-8b-instant',
        temperature: 0.3,
        response_format: { type: 'json_object' }
      });
      
      const profile = JSON.parse(profileResponse.choices[0].message.content);

      const userPrompt = `Startup Idea: ${profile.idea}\nStartup Name: ${profile.name}\nIndustry: ${profile.industry}\nTarget Users: ${profile.targetUsers}\nBusiness Model: ${profile.businessModel}\nCurrent Traction: ${profile.traction}\nUnfair Advantage: ${profile.unfairAdvantage}\nAdditional Context: None`;

      // Evaluate it
      const evalResponse = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        response_format: { type: 'json_object' }
      });

      const assistantResponse = evalResponse.choices[0].message.content;

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
      
      // Groq is extremely fast, 1 second delay is enough
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      console.error(`❌ Failed evaluating ${startup.name}:`, e.message);
    }
  }

  console.log("\nDone evaluating Kaggle startups!");
}

run();
