import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: "What is the current exact share price of Zomato today? Return as JSON like { price: 'val' }",
        config: {
            responseMimeType: "application/json",
            tools: [{ googleSearch: {} }]
        }
    });
    console.log("Response:", response.text);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
