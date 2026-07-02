import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { GoogleGenAI, Modality } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { message, isMuted } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    console.log('Step 1: Starting deep reasoning...');
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
    console.log('Step 1: Reasoning complete. Strategy:', reasoningStrategy.substring(0, 50) + '...');

    console.log('Step 2: Starting text generation...');
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
    console.log('Step 2: Text generation complete.');

    // Step 3: Generate Audio from the resulting text
    if (!isMuted) {
      console.log('Step 3: Starting audio generation...');
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
        console.log('Step 3: Audio generation complete.');
      } catch (audioError) {
        console.error('Audio generation failed:', audioError);
        // Continue even if audio fails
      }
    }

    console.log('All steps complete, returning response.');
    return NextResponse.json({
      text: botText,
      audio: base64Audio
    }, { status: 200 });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Logic interrupt. Re-establishing link...' }, { status: 500 });
  }
}
