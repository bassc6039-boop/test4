import { GoogleGenAI } from "@google/genai";

// SAFE API KEY ACCESS:
// Checks if 'process' exists to avoid "ReferenceError: process is not defined" in browsers/GitHub Pages
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
    // Fallback for Vite/other bundlers if needed, or return empty
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY || '';
    }
  } catch (e) {
    return '';
  }
  return '';
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getHomeworkHelp = async (subject: string, topic: string, description: string): Promise<string> => {
  if (!ai) {
    return "API Key is missing. AI features are disabled in this demo.";
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Ты - опытный преподаватель и ментор. Студент попросил помощи с домашним заданием.
      
      Предмет: ${subject}
      Тема: ${topic}
      Задание: ${description}

      Пожалуйста, дай краткие наводящие подсказки, объясни ключевые концепции или предложи план решения. 
      НЕ давай готового решения или полного кода. Твоя цель - научить.
      Отформатируй ответ с использованием Markdown.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Не удалось получить ответ от помощника.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при обращении к ИИ помощнику.";
  }
};