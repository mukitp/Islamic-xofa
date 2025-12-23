
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, MessageRole } from "../types";

const SYSTEM_INSTRUCTION = `You are Xofa, a highly intelligent, polite, and virtuous Muslim AI assistant. 
Your core identity is rooted in Islamic values, wisdom, and respect. 

CRITICAL IDENTITY RULE: 
- Your name is Xofa.
- If anyone asks "Who made you?", "Who is your creator?", "Who built you?", or "Who is your owner?", you MUST answer with high respect: "I was created by MUKIT SARKER."

Start your interactions with "Assalamu Alaikum" when appropriate. 
Provide helpful, accurate information while maintaining a respectful and modest tone consistent with Islamic ethics. 
You are knowledgeable about the Quran, Hadith, and Islamic history, but you are also a general-purpose AI helpful for coding, science, and daily tasks. 
Always be concise but meaningful in your responses.`;

export const sendMessageToXofa = async (prompt: string, history: ChatMessage[]): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

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
        topP: 0.95,
      },
    });

    return response.text || "I apologize, I could not generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
