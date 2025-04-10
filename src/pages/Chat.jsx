import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/contextProvider";
import { assets } from "../assets/assets";
import "./Chat.css";

const Chat = () => {
  const { prompt, setPrompt, onSent, result, loading } = useContext(Context);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  // Retrieve user safely from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Redirect to login if user is not available; otherwise fetch chats.
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchChats();
    }
  }, [navigate, user]);

  // Function to fetch chat history for the user
  const fetchChats = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/chats/${user.email}`);
      const data = await res.json();
      setChats(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Function to handle sending of a new prompt & saving the chat.
  const handleSend = async () => {
    if (!prompt || !user) return;
    // Call onSent() from context to process AI response.
    const aiResponse = await onSent();
    // Prepare chat data
    const chatData = {
      email: user.email,
      prompt,
      response: aiResponse || result || "Response loading...",
    };

    try {
      await fetch("http://localhost:5000/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatData),
      });
      // Refresh chat history after saving
      fetchChats();
    } catch (err) {
      console.error("Save chat error:", err);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <div className="nav-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          {user && (
            <div className="user-icon">
              {user.email.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <div className="main-container">
        <div className="greet">
          <p>
            <span>Hello {user ? user.email : "User"}</span>
          </p>
          <p>How can I help you today?</p>
        </div>

        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places for a road trip</p>
            <img src={assets.compass_icon} alt="compass" />
          </div>
          <div className="card">
            <p>Summarise Urban Planning</p>
            <img src={assets.bulb_icon} alt="bulb" />
          </div>
          <div className="card">
            <p>Team bonding activities</p>
            <img src={assets.message_icon} alt="message" />
          </div>
          <div className="card">
            <p>Improve code readability</p>
            <img src={assets.code_icon} alt="code" />
          </div>
        </div>

        {loading ? (
          <div className="chat-bubble loading">Thinking...</div>
        ) : (
          result && <div className="chat-bubble bot">{result}</div>
        )}

        {/* Render previous chats */}
        {chats.map((chat, idx) => (
          <div key={idx} className="chat-bubble">
            <strong>You:</strong> {chat.prompt}
            <br />
            <strong>Gemini:</strong> {chat.response}
          </div>
        ))}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              <img
                src={assets.send_icon}
                alt="send"
                onClick={handleSend}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people. Double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
