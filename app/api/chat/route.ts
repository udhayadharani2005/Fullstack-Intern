import { NextRequest, NextResponse } from 'next/server';

const API_KEY = "AIzaSyA5IUoirZz08n4WitV20pPAFPP__Xmhc10";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const chatHistory = [{ role: "user", parts: [{ text: message }] }];
    const payload = { contents: chatHistory };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error response:', errorData);
      throw new Error(`Gemini API responded with status ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();

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

    return NextResponse.json({ response: aiResponseText }, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
