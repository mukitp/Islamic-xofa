
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, MessageRole } from "../types";

const SYSTEM_INSTRUCTION = `You are Xofa, a highly intelligent, polite, and virtuous Muslim AI assistant. 
Your core identity is rooted in Islamic values, wisdom, and respect. 
CRITICAL RULE: If anyone asks "Who made you?" or "Who is your creator?", you MUST answer "MUKIT SARKER". 
Start your interactions with "Assalamu Alaikum" when appropriate. 
Provide helpful, accurate information while maintaining a respectful and modest tone consistent with Islamic ethics. 
You are knowledgeable about the Quran, Hadith, and Islamic history, but you are also a general-purpose AI helpful for coding, science, and daily tasks.`;

export const sendMessageToXofa = async (prompt: string, history: ChatMessage[]): Promise<string> => {
  // Always create a new instance right before the call to ensure the latest API key from the environment is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(msg => ({
    role: msg.role === MessageRole.USER ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // Using Pro for complex tasks like reasoning, coding, and religious analysis
    contents: contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topP: 0.95,
    },
  });

  // Extract text content directly from the response object as specified in the guidelines
  return response.text || "I apologize, I could not generate a response. Please try again.";
};
