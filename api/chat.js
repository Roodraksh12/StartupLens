import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are a Tier-1 Venture Capitalist and Product Strategist with deep expertise in the Indian startup ecosystem. You are known for your brutal honesty, deep market insights, and analytical rigor.
You have just evaluated a startup idea and generated a comprehensive report.
The user is now asking follow-up questions about the report or asking for further advice.
Use the provided startup report context to answer their questions intelligently, concisely, and consistently with the original evaluation.
Maintain your strict, analytical VC tone. Do not be overly polite or generic. Provide actionable, specific advice.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isLocal = process.env.USE_LOCAL_LLM === 'true';
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  
  if (!isLocal && !apiKey) {
    return res.status(500).json({ error: "Server misconfiguration: GEMINI_API_KEY is missing on the server." });
  }

  const { messages, resultsContext } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  // Format the context for the first message
  const contextPrefix = `[CONTEXT: The following is the startup evaluation report previously generated:]\n${JSON.stringify(resultsContext, null, 2)}\n[END CONTEXT]\n\nUser Question:\n`;

  // We map the messages to Gemini's expected format.
  // Assuming messages from frontend are in { role: 'user' | 'model', content: '...' } format
  const formattedContents = messages.map((msg, index) => {
    let text = msg.content;
    if (index === 0 && msg.role === 'user') {
        text = contextPrefix + text;
    }
    return {
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text }]
    };
  });

  try {
    if (isLocal) {
      const modelName = process.env.LOCAL_MODEL_NAME || 'llama3';
      
      const ollamaMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((msg, index) => {
          let text = msg.content;
          if (index === 0 && msg.role === 'user') {
              text = contextPrefix + text;
          }
          return {
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: text
          };
        })
      ];

      const ollamaResponse = await fetch('http://127.0.0.1:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelName,
          messages: ollamaMessages,
          stream: false,
          options: { temperature: 0.7 }
        })
      });

      if (!ollamaResponse.ok) {
        throw new Error(`Ollama connection failed: ${ollamaResponse.statusText}. Is Ollama running?`);
      }
      
      const data = await ollamaResponse.json();
      return res.status(200).json({ reply: data.message.content });
    } else {
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: formattedContents,
          config: {
              systemInstruction: SYSTEM_PROMPT,
              temperature: 0.7,
          }
      });

      if (!response.text) {
        throw new Error("Empty response from AI");
      }

      return res.status(200).json({ reply: response.text });
    }
  } catch (error) {
    console.error("API Route Error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate chat response" });
  }
}
