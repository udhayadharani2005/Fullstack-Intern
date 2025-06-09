"use client"; // This directive marks the component as a Client Component in Next.js

import React, { useState, useEffect } from 'react';
import ChatBox from 'components/ChatBox'; // Adjusted path: assuming ChatBox is in src/app/components/
import { v4 as uuidv4 } from 'uuid'; // For generating unique message IDs. Install: npm install uuid @types/uuid

// Define the shape of a message (same as in ChatBox.tsx)
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

/**
 * Home Page Component (page.tsx)
 *
 * This is the main page component that orchestrates the AI chatbot.
 * It manages the chat history, handles sending messages to the API
 * route, and updates the UI with responses.
 */
const HomePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // State to store all chat messages
  const [isSending, setIsSending] = useState(false); // State to indicate if a message is being sent
  const [mounted, setMounted] = useState(false); // State to track if the component has mounted on the client

  // useEffect to set mounted state to true after the component has mounted on the client.
  // This helps in preventing hydration mismatches by ensuring client-specific rendering
  // (like elements potentially modified by browser extensions) happens only on the client.
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Function to send a message to the AI.
   * This will first add the user's message to the chat, then call
   * the backend API route, and finally add the AI's response.
   * @param text The text message from the user.
   */
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return; // Don't send empty messages

    setIsSending(true); // Set sending state to true

    // Add user message to the chat history immediately
    const newUserMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    try {
      // Make a POST request to your API route
      const response = await fetch('/api/chat', { // Your API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }), // Send the user's message
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponseText = data.response; // Assuming your API returns { response: "AI text" }

      // Add AI's response to the chat history
      const newAiMessage: Message = {
        id: uuidv4(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally, add an error message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: uuidv4(),
          text: 'Oops! Something went wrong. Please try again.',
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsSending(false); // Reset sending state
    }
  };

  return (
    <div className="home-container">
      <h1 className="page-title">AI Chatbot</h1>
      <div className="chatbox-wrapper">
        {/* Render ChatBox only after the component has mounted on the client */}
        {mounted ? (
          <ChatBox
            messages={messages}
            onSendMessage={handleSendMessage}
            isSending={isSending}
          />
        ) : (
          <div className="loading-message">
            Loading chat...
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;