
'use client';

import { useState } from 'react';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setResponse('');
    setIsLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });

    if (!res.body) {
      setIsLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setResponse(prev => prev + decoder.decode(value));
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">💬 Chat with AI</h2>
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        disabled={isLoading}
      >
        {isLoading ? 'Thinking...' : 'Send'}
      </button>
      <div className="mt-4 whitespace-pre-wrap border-t pt-2">
        <strong>AI:</strong> {response}
      </div>
    </div>
  );
}
