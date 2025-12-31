import { GoogleGenAI, Type } from "@google/genai";
import { TestProcedure } from "../types";

const generateTestProcedure = async (foodName: string, adulterantName: string): Promise<TestProcedure | null> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. Cannot generate AI test.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a simple, educational scientific test procedure to detect the adulterant "${adulterantName}" in the food item "${foodName}". 
      Target audience: School students. 
      Keep it safe and simple.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            aim: { type: Type.STRING },
            materials: { type: Type.ARRAY, items: { type: Type.STRING } },
            procedure: { type: Type.ARRAY, items: { type: Type.STRING } },
            observation: { type: Type.STRING },
            conclusion: { type: Type.STRING },
            precautions: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["aim", "materials", "procedure", "observation", "conclusion", "precautions"],
        },
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as TestProcedure;
    }
    return null;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export { generateTestProcedure };