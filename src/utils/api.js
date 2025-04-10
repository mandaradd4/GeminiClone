const API_BASE = "http://localhost:5000/api/chats"; // Update if deployed

export const saveChat = async (userId, prompt, response) => {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, prompt, response }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error saving chat:", err);
  }
};

export const getChats = async (userId) => {
  try {
    const res = await fetch(`${API_BASE}/${userId}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching chats:", err);
    return [];
  }
};
