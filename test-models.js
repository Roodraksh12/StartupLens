import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: "Hello"
    });
    console.log("Success with gemini-3.5-flash:", response.text);
  } catch (err) {
    console.error("Error with gemini-3.5-flash:", err.message);
    try {
        const response2 = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: "Hello"
        });
        console.log("Success with gemini-2.0-flash:", response2.text);
    } catch(err2) {
        console.error("Error with gemini-2.0-flash:", err2.message);
    }
  }
}

run();
