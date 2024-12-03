import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]); 
  const [inputMessage, setInputMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, sender: "user" },
    ]);
    setInputMessage("");
  
    try {
      console.log("Sending to /api/chat:", { userInput: inputMessage });
  
      const response = await fetch("http://127.0.0.1:5001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: inputMessage }),
      });
  
      console.log("Response Status Code:", response.status);
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error("Error Response Text:", errorText);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Error: Unable to fetch response. (${response.status})`, sender: "bot" },
        ]);
        return;
      }
  
      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: Unable to connect to server.", sender: "bot" },
      ]);
    }
  };
  
  
  return (
    <div>
      <div className="floating-image" onClick={toggleChatbot}>
        <img src="/images/bot.png" alt="Chat Icon" />
      </div>
      {isChatbotOpen && (
        <div className="chatbot-container">
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0">Chatbot</h5>
            <button
              className="btn btn-dark btn-sm badge"
              onClick={toggleChatbot}
            >
              Close
            </button>
          </div>
          <div className="chatbot-body">
            <div className="message-box">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.sender === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              {isLoading && <div className="bot-message">Loading...</div>}
            </div>
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
