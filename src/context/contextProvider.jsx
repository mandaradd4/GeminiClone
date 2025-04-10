// src/context/ContextProvider.jsx

import React, { createContext, useState } from "react";
import run from "../config/gemini";

// Create a new context
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to send user prompt and get result from Gemini
  const onSent = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const response = await run(prompt);
      setResult(response);
      setPrompt(""); // ✅ Clear input box after sending
    } catch (error) {
      console.error("Gemini API error:", error);
      setResult("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  // Value to be shared across components
  const contextValue = {
    prompt,
    setPrompt,
    result,
    onSent,
    loading,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
