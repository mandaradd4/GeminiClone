// src/config/gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCU9osMeyo9X5U2F5qtr9iFsksRHhShdQY"; // 🔐 Use secure method for prod

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export default async function run(prompt) {
  try {
    const chatSession = model.startChat({ generationConfig, history: [] });
    const result = await chatSession.sendMessage(prompt);
    const textResponse = await result.response.text(); // ✅ await here
    return textResponse;
  } catch (error) {
    console.error("Gemini error:", error);
    return "Error fetching response.";
  }
}
