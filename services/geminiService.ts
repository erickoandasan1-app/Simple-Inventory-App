import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might show a more user-friendly error
  // For this context, we assume the key is set in the environment.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateDescription = async (name: string, category: string): Promise<string> => {
  // Fix: Corrected typo from API_key to API_KEY.
  if (!API_KEY) {
    return "API key is not configured. Please set the API_KEY environment variable.";
  }
  
  if (!name.trim() || !category.trim()) {
    return "";
  }
  
  const prompt = `Write a brief, one-sentence professional description for an inventory item. Item Name: "${name}", Category: "${category}".`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "Failed to generate description. Please try again.";
  }
};