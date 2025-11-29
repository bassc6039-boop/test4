import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real environment, we check if key exists. Here we initialize safely.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getHomeworkHelp = async (subject: string, topic: string, description: string): Promise<string> => {
  if (!ai) {
    return "API Key is missing. Please configure the environment variable to use AI assistance.";
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