import { NextRequest, NextResponse } from 'next/server';

/**
 * This is your API route that handles incoming chat messages
 * and interacts with the Gemini AI model.
 *
 * It's set up as a Next.js API route using the App Router.
 *
 * You will need to replace the `API_KEY` placeholder with the
 * actual API key you provided.
 */

// Define the API key (replace with your actual API key)
// In a real application, you should store this in environment variables
// (e.g., process.env.GEMINI_API_KEY) and not expose it directly in code.
const API_KEY = "AIzaSyA5IUoirZz08n4WitV20pPAFPP__Xmhc10"; // Your provided API Key

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json(); // Get the user's message from the request body

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Prepare the chat history for the Gemini API call
    // For a simple single turn, we just send the user's message
    const chatHistory = [{ role: "user", parts: [{ text: message }] }];

    // Prepare the payload for the Gemini API
    const payload = {
      contents: chatHistory,
    };

    // Construct the Gemini API URL
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    // Make the request to the Gemini API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Log the full error response from the Gemini API for debugging
      const errorData = await response.json();
      console.error('Gemini API error response:', errorData);
      throw new Error(`Gemini API responded with status ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();

    // Extract the AI's response text
    let aiResponseText = "No response from AI.";
    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      aiResponseText = result.candidates[0].content.parts[0].text;
    } else {
      console.warn('Unexpected Gemini API response structure:', result);
      aiResponseText = "Could not parse AI response. Please try again.";
    }

    // Return the AI's response
    return NextResponse.json({ response: aiResponseText }, { status: 200 });
  } 

 const handler = async (req: NextRequest) => {
    console.error('Error in API route:', error);
    // Return a generic error message to the client
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
