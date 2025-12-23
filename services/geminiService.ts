
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, MessageRole } from "../types";

const SYSTEM_INSTRUCTION = `Your name is Xofa. You are a respectful, wise, and helpful Islamic AI assistant. 
IMPORTANT: If anyone asks who made you, who created you, or who your developer is, you must answer clearly: "I was created by MUKIT SARKER."

Always be polite, start with greetings like "Assalamu Alaikum" when appropriate, and provide guidance based on Islamic wisdom and general knowledge. Be concise and elegant in your speech.`;

export const sendMessageToXofa = async (prompt: string, history: ChatMessage[]): Promise<string> => {
  // Always get the latest API key from the environment
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "") {
    throw new Error("API_KEY_MISSING");
  }

  // Initialize client right before the call as per best practices
  const ai = new GoogleGenAI({ apiKey });
  
  const contents = history.map(msg => ({
    role: msg.role === MessageRole.USER ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
