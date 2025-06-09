"use client"; // This directive marks the component as a Client Component in Next.js

import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Bot, User2 } from 'lucide-react'; // Make sure to install: npm install lucide-react

// Define the shape of a message
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

// Define props for the ChatBox component
interface ChatBoxProps {
  messages: Message[]; // Array of messages to display
  onSendMessage: (text: string) => void; // Function to call when a message is sent
  isSending: boolean; // Indicates if a message is currently being sent
}

/**
 * ChatBox Component
 *
 * This component displays the chat messages and provides an input field
 * for the user to send new messages. It's designed to be a presentational
 * component, taking messages as props and notifying the parent when a
 * new message needs to be sent.
 */
const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage, isSending }) => {
  const [inputValue, setInputValue] = useState(''); // State for the input field value
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to scroll to the latest message

  // Effect to scroll to the bottom of the chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a message
  const handleSend = () => {
    if (inputValue.trim() && !isSending) { // Ensure input is not empty and not already sending
      onSendMessage(inputValue); // Call the parent's sendMessage function
      setInputValue(''); // Clear the input field
    }
  };

  // Handle key presses in the input field (e.g., Enter key to send)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {/* Chat messages display area */}
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${
              message.sender === 'user' ? 'user-message-wrapper' : 'ai-message-wrapper'
            }`}
          >
            <div className={`message-bubble ${message.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
              {message.sender === 'ai' && (
                <Bot className="message-icon ai-icon" />
              )}
              <p className="message-text">{message.text}</p>
              {message.sender === 'user' && (
                <User2 className="message-icon user-icon" />
              )}
            </div>
          </div>
        ))}
        {/* Loading indicator when AI is typing */}
        {isSending && (
          <div className="message-wrapper ai-message-wrapper">
            <div className="message-bubble ai-bubble loading-indicator">
              <Bot className="message-icon ai-icon" />
              <p className="message-text">AI is thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Dummy div to scroll to */}
      </div>

      {/* Message input area */}
      <div className="input-area-wrapper">
        <div className="input-area">
          <input
            type="text"
            className="message-input"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending} // Disable input while sending
          />
          <button
            onClick={handleSend}
            disabled={isSending || !inputValue.trim()} // Disable send button if sending or input is empty
            className="send-button"
          >
            <SendHorizonal className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;