import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { GoogleGenAI } from '@google/genai';
import { SERVICES, PORTFOLIO_PROJECTS, BLOGS } from '@/constants';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Build the Index for the Router
    const servicesIndex = SERVICES.map(s => ({ id: s.id, title: s.title })).map(s => `${s.id}: ${s.title}`).join(', ');
    const projectsIndex = PORTFOLIO_PROJECTS.map(p => ({ id: p.id, title: p.title })).map(p => `${p.id}: ${p.title}`).join(', ');
    const blogsIndex = BLOGS.map(b => ({ id: b.id, title: b.title })).map(b => `${b.id}: ${b.title}`).join(', ');

    console.log('Step 1: Starting Router...');
    // Step 1: LLM Router
    const routerSchema = {
      type: "OBJECT",
      properties: {
        serviceIds: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "List of relevant service IDs"
        },
        projectIds: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "List of relevant project IDs"
        },
        blogIds: {
          type: "ARRAY",
          items: { type: "STRING" },
          description: "List of relevant blog IDs"
        },
        isPricingQuery: {
          type: "BOOLEAN",
          description: "True if the user is asking about pricing or cost."
        }
      },
    };

    const routerResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{
        parts: [{
          text: `System Context: You are a routing agent. Determine which data items are relevant to the user query.
          
          Available Data (ID: Title):
          Services: ${servicesIndex}
          Projects: ${projectsIndex}
          Blogs: ${blogsIndex}

          User Query: ${message}`
        }]
      }],
      config: {
        responseMimeType: "application/json",
        responseSchema: routerSchema as any
      }
    });

    let routingData = { serviceIds: [] as string[], projectIds: [] as string[], blogIds: [] as string[], isPricingQuery: false };
    try {
      routingData = JSON.parse(routerResponse.text || "{}");
    } catch (e) {
      console.error("Router parse error", e);
    }

    console.log('Step 1: Routing complete:', routingData);

    // Step 2: Context Assembly
    const relevantServices = SERVICES.filter(s => routingData.serviceIds?.includes(s.id));
    const relevantProjects = PORTFOLIO_PROJECTS.filter(p => routingData.projectIds?.includes(p.id));
    const relevantBlogs = BLOGS.filter(b => routingData.blogIds?.includes(b.id));

    let contextString = '';
    
    // Fallback if no specific routing, or if we just want a general summary of everything
    if (relevantServices.length === 0 && relevantProjects.length === 0 && relevantBlogs.length === 0) {
       // Just list names if the query was general and didn't trigger specific IDs
       const serviceNames = SERVICES.map(s => s.title).join(', ');
       const blogData = BLOGS.map(b => `"${b.title}" (Category: ${b.category})`).join(' | ');
       const projectNames = PORTFOLIO_PROJECTS.map(p => `"${p.title}": ${p.summary}`).join(' | ');
       contextString = `
       - Services: ${serviceNames}
       - Blogs: ${blogData}
       - Portfolio Projects: ${projectNames}
       `;
    } else {
       if (relevantServices.length > 0) {
         contextString += `\nRelevant Services:\n` + relevantServices.map(s => `- ${s.title}: ${s.shortDescription}`).join('\n');
       }
       if (relevantProjects.length > 0) {
         contextString += `\nRelevant Projects:\n` + relevantProjects.map(p => {
           let str = `- ${p.title} (${p.category}): ${p.summary}`;
           if (p.roadmap) {
             const roadmapStr = p.roadmap.map(r => `${r.phase} (${r.title}): ${r.description}`).join('; ');
             str += `\n  Process/Roadmap: ${roadmapStr}`;
           }
           return str;
         }).join('\n');
       }
       if (relevantBlogs.length > 0) {
         contextString += `\nRelevant Blogs:\n` + relevantBlogs.map(b => `- ${b.title} (Category: ${b.category}): ${b.excerpt}`).join('\n');
       }
    }

    let pricingRule = '';
    if (routingData.isPricingQuery) {
       pricingRule = `\nCRITICAL INSTRUCTION: The user is asking about pricing. You MUST reply exactly with: "For pricing, please contact us on +92 3029633999 or you can email us on info@qintellecttechnologies.com" Do NOT provide any numerical prices.`;
    }

    console.log('Step 2: Starting text generation...');
    // Step 2: Generate Final User Response with standard model
    const textResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [{
        parts: [{
          text: `You are QIntelligence, the proprietary AI spokesperson and technical liaison for QIntellect Technologies.
          NEVER break character. NEVER state that you are a large language model trained by Google or anyone else.
          
          QIntellect Knowledge Base Context:
          - Industries: Finance, Healthcare, Supply Chain, Manufacturing, E-Commerce.
          ${contextString}
          
          - Contact Info: reach us at info@qintellecttechnologies.com or via the contact form on this website.
          
          Recent Conversation History:
          ${history || 'None'}
          
          User asks: ${message}
          
          CRITICAL INSTRUCTIONS:
          - ONLY answer the specific question asked using the QIntellect Knowledge Base context provided above. 
          - NEVER volunteer extra context, lists, or topics that the user did not explicitly request.
          - NEVER recommend or mention third-party companies, external blogs (like Hugging Face or OpenAI), or generic internet information. If the answer is not in your Knowledge Base, politely say you don't have that information and direct them to the website.
          - If the user asks you to write, generate, or provide ANY source code (e.g., Python, Javascript, HTML, scripts), you MUST politely decline and state: "I cannot write any kind of code for you. I am here to provide information about QIntellect Technologies."
          - Provide extremely direct and concise answers (maximum 1-2 sentences) for ALL queries, except when providing lists.
          - If the user asks for a filtered list, use the categories provided to give an accurate, exhaustive list. Do not guess.
          - If the user asks for any kind of list, ONLY output a numbered list (1., 2., 3.) with line breaks. Do NOT use asterisks (*) for bullet points or bolding (**topic**). Do NOT include any introductory or concluding paragraphs.
          - ONLY provide long, theoretical answers if the user explicitly asks you to "explain", "elaborate", or "describe in detail".
          ${pricingRule}`
        }]
      }]
    });

    const botText = textResponse.text || "Architecture nominal. Synchronizing protocols.";
    console.log('Step 2: Text generation complete.');

    console.log('All steps complete, returning response.');
    return NextResponse.json({
      text: botText
    }, { status: 200 });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Logic interrupt. Re-establishing link...' }, { status: 500 });
  }
}
