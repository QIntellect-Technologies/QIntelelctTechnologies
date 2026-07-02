import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { GoogleGenAI, Modality } from '@google/genai';
import { SERVICES, PORTFOLIO_PROJECTS, TEAM, BLOGS } from '@/constants';

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

    const serviceNames = SERVICES.map(s => s.title).join(', ');
    const blogData = BLOGS.map(b => `"${b.title}" (Category: ${b.category})`).join(' | ');
    const projectNames = PORTFOLIO_PROJECTS.map(p => p.title).join(', ');
    const teamNames = TEAM.map(t => `${t.name} (${t.role})`).join(', ');

    console.log('Step 2: Starting text generation...');
    // Step 2: Generate Final User Response with standard model
    const textResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{
        parts: [{
          text: `You are QIntelligence, the proprietary AI spokesperson and technical liaison for QIntellect Technologies.
          NEVER break character. NEVER state that you are a large language model trained by Google or anyone else.
          
          QIntellect Knowledge Base:
          - Services: ${serviceNames}
          - Industries: Finance, Healthcare, Supply Chain, Manufacturing, E-Commerce.
          - Blogs: ${blogData}
          - Portfolio Projects: ${projectNames}
          - Team: ${teamNames}
          - Contact Info: reach us at info@qintellecttechnologies.com or via the contact form on this website.
          
          Deep Reasoning Strategy: ${reasoningStrategy}
          User asks: ${message}
          
          CRITICAL INSTRUCTIONS:
          - ONLY answer the specific question asked using the QIntellect Knowledge Base provided above. 
          - NEVER volunteer extra context, lists, or topics that the user did not explicitly request.
          - NEVER recommend or mention third-party companies, external blogs (like Hugging Face or OpenAI), or generic internet information. If the answer is not in your Knowledge Base, politely say you don't have that information and direct them to the website.
          - Provide extremely direct and concise answers (maximum 1-2 sentences) for ALL queries, except when providing lists.
          - If the user asks for a filtered list (e.g., "blogs about AI"), use the categories provided to give an accurate, exhaustive list. Do not guess.
          - If the user asks for any kind of list, ONLY output a numbered list (1., 2., 3.) with line breaks. Do NOT use asterisks (*) for bullet points or bolding (**topic**). Do NOT include any introductory or concluding paragraphs.
          - ONLY provide long, theoretical answers if the user explicitly asks you to "explain", "elaborate", or "describe in detail".`
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
