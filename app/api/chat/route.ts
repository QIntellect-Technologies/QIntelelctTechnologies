import { NextResponse } from 'next/server';
import { GoogleGenAI, Modality } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { message, isMuted } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Step 1: Deep Reasoning with Pro model
    const reasoningResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{
        parts: [{
          text: `System Context: You are the deep reasoning core of QIntelligence.
          Analyze this technical query and provide a high-level strategy for a response.
          Query: ${message}`
        }]
      }]
    });
    const reasoningStrategy = reasoningResponse.text || "Standard architectural protocols apply.";

    // Step 2: Generate Final User Response with standard model
    const textResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{
        parts: [{
          text: `You are QIntelligence, the highly advanced AI spokesperson for QIntellect Technologies. 
          Services: AI, ERP, IoT, EDI, Web Architecture. 
          Deep Reasoning Strategy: ${reasoningStrategy}
          User asks: ${message}. 
          Provide a professional, concise technical response based on the strategy.`
        }]
      }]
    });

    const botText = textResponse.text || "Architecture nominal. Synchronizing protocols.";
    let base64Audio = null;

    // Step 3: Generate Audio from the resulting text
    if (!isMuted) {
      try {
        const audioResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-preview-tts',
          contents: [{
            parts: [{ text: botText }]
          }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' }
              }
            }
          },
        });

        base64Audio = audioResponse.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      } catch (audioError) {
        console.error('Audio generation failed:', audioError);
        // Continue even if audio fails
      }
    }

    return NextResponse.json({
      text: botText,
      audio: base64Audio
    }, { status: 200 });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Logic interrupt. Re-establishing link...' }, { status: 500 });
  }
}
