import { GoogleGenAI } from "@google/genai";
import type { OptimizationOptions } from '../types';

// Use the provided API key directly
const apiKey = 'AIzaSyATePM6jEkbgLA6QskEWHjsZ1-NjsBrKOo';

const ai = new GoogleGenAI({ apiKey });

export const optimizePrompt = async (
  originalPrompt: string,
  options: OptimizationOptions
): Promise<string> => {
  const metaPrompt = `
    You are an expert prompt engineer. Your task is to rewrite and optimize the following user-provided prompt to make it more effective for a large language model.

    Analyze the original prompt and then refine it based on these specific goals:
    - Target Audience: "${options.audience}"
    - Primary Goal: "${options.goal}"

    Based on these goals, improve the prompt for clarity, specificity, context, and structure. The resulting prompt should be ready to be used directly with an AI model.

    Provide ONLY the rewritten prompt as your response. Do not include any additional explanation, preamble, or markdown formatting like backticks.

    Original Prompt:
    ---
    ${originalPrompt}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: metaPrompt,
        config: {
          temperature: 0.7,
          topP: 0.95,
        }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Could not connect to the Gemini API.");
  }
};
