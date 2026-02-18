
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Shield,
  Zap,
  BrainCircuit,
  Radio,
  RefreshCw,
  Code,
  Settings,
  MessageSquare,
  UserCheck,
  Target,
  Layers,
  Award,
  Clock,
  Users,
  TrendingUp,
  Bot,
  User,
  Sparkles,
  Play,
  ArrowUpRight,
  Phone,
  Mail,
  Globe,
  Database,
  Cpu,
  BarChart3,
  LineChart,
  Workflow,
  Cog,
  Server,
  Cloud,
  Lock,
  FileText,
  Building2,
  Heart,
  Star,
  Headphones,
  Mic,
  Volume2,
  CheckCheck,
  ShoppingCart,
  Factory,
  Truck,
  Wifi,
  Activity,
  PieChart,
  Lightbulb,
  Rocket,
  CircleDollarSign,
  HeartHandshake,
  Presentation,
  GraduationCap,
  Stethoscope,
  Banknote
} from 'lucide-react';
import { SERVICES } from '../constants';

// ========== SERVICE IMAGES (Features, Process, etc.) ==========
const serviceImages: Record<string, { overview: string; features: string[]; cta: string }> = {
  'artificial-intelligence': {
    overview: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop'
  },
  'customized-chatbots': {
    overview: 'https://images.unsplash.com/photo-1587614387466-0a72e53ae2d4?q=80&w=2870&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2870&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2870&auto=format&fit=crop'
  },
  'ai-customer-representative': {
    overview: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2870&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2787&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2870&auto=format&fit=crop'
  },
  'dynamics-365': {
    overview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2815&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2811&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2815&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2874&auto=format&fit=crop'
  },
  'web-development': {
    overview: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2869&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2874&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2872&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2870&auto=format&fit=crop'
  },
  'erp-solutions': {
    overview: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2870&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2870&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2870&auto=format&fit=crop'
  },
  'edi-solutions': {
    overview: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2934&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2872&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2870&auto=format&fit=crop'
  },
  'iot-solutions': {
    overview: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2870&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2870&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1565034946487-077d23d7f4f1?q=80&w=2870&auto=format&fit=crop'
  }
};

// ========== DETAILED SERVICE CONTENT ==========
const serviceContent: Record<string, {
  tagline: string;
  headline: string;
  subheadline: string;
  heroDescription: string;
  overview: {
    title: string;
    paragraphs: string[];
  };
  benefits: { icon: any; title: string; desc: string; detail: string }[];
  stats: { value: string; label: string }[];
  howItWorks: { step: string; title: string; desc: string; detail: string }[];
  features: { title: string; desc: string; icon: any }[];
  useCases: { title: string; desc: string; icon: any; industry: string }[];
  faqs: { question: string; answer: string }[];
  chatConversation?: { from: 'user' | 'bot'; text: string; delay: number }[];
}> = {
  'artificial-intelligence': {
    tagline: 'Intelligent Automation',
    headline: 'AI Solutions That Transform Business',
    subheadline: 'Turn Data Into Smart Decisions',
    heroDescription: 'We build custom AI systems that learn from your data, automate complex tasks, and help you make better decisions faster than ever before.',
    overview: {
      title: 'What is Artificial Intelligence?',
      paragraphs: [
        'Artificial Intelligence (AI) is technology that enables computers to think and learn like humans. At QIntellect Technologies, we build AI systems that understand your business data, find hidden patterns, and make predictions to help you succeed.',
        'Our AI solutions are not just about fancy technology. They are practical tools that solve real business problems. Whether you need to predict customer behavior, automate repetitive tasks, or find insights in massive datasets, our AI does the heavy lifting so your team can focus on what matters most.',
        'We have helped companies across healthcare, finance, retail, and manufacturing use AI to cut costs, improve efficiency, and discover new opportunities. Our team of AI experts works closely with you to understand your unique challenges and build solutions that deliver measurable results.'
      ]
    },
    benefits: [
      { icon: TrendingUp, title: 'Better Decisions', desc: 'AI analyzes data 24/7', detail: 'Our AI systems process millions of data points in seconds, identifying trends and patterns that humans might miss. This means you always have the latest insights to make informed decisions.' },
      { icon: Clock, title: 'Save Time', desc: 'Automate complex tasks', detail: 'Tasks that used to take your team hours now happen automatically. From data entry to report generation, AI handles the routine work so your people can focus on creative and strategic work.' },
      { icon: Shield, title: 'Reduce Risk', desc: 'Predict problems early', detail: 'AI monitors your operations continuously and alerts you to potential issues before they become costly problems. Predictive maintenance, fraud detection, and quality control become proactive, not reactive.' },
      { icon: Target, title: 'Increase Revenue', desc: 'Find new opportunities', detail: 'Our AI discovers hidden opportunities in your data — new customer segments, pricing optimizations, and cross-selling opportunities that can significantly boost your bottom line.' }
    ],
    stats: [
      { value: '60%', label: 'Faster Processing' },
      { value: '40%', label: 'Cost Reduction' },
      { value: '99.2%', label: 'Accuracy Rate' },
      { value: '24/7', label: 'Always Working' }
    ],
    howItWorks: [
      { step: '01', title: 'Discovery & Analysis', desc: 'We study your business', detail: 'Our AI experts meet with your team to understand your goals, challenges, and data sources. We analyze your existing systems and identify the best opportunities for AI to create value.' },
      { step: '02', title: 'Solution Design', desc: 'We create your AI blueprint', detail: 'Based on our analysis, we design a custom AI solution tailored to your specific needs. This includes selecting the right algorithms, planning data pipelines, and defining success metrics.' },
      { step: '03', title: 'Build & Train', desc: 'We develop and teach the AI', detail: 'Our engineers build your AI system using cutting-edge technology. We train the models with your historical data and fine-tune them until they achieve the accuracy levels your business requires.' },
      { step: '04', title: 'Deploy & Support', desc: 'We launch and maintain', detail: 'We deploy your AI solution into your production environment with minimal disruption. Our team provides ongoing monitoring, updates, and support to ensure your AI keeps delivering results.' }
    ],
    features: [
      { title: 'Machine Learning Models', desc: 'Custom algorithms that learn and improve from your data over time', icon: BrainCircuit },
      { title: 'Predictive Analytics', desc: 'Forecast future trends, sales, and customer behavior with high accuracy', icon: LineChart },
      { title: 'Natural Language Processing', desc: 'AI that understands and processes human language for documents and communication', icon: MessageSquare },
      { title: 'Computer Vision', desc: 'Visual recognition systems for quality control, security, and automation', icon: Target },
      { title: 'Data Pipeline Automation', desc: 'Automated data collection, cleaning, and processing workflows', icon: Workflow },
      { title: 'Real-Time Insights Dashboard', desc: 'Live dashboards showing AI predictions and business metrics', icon: BarChart3 }
    ],
    useCases: [
      { title: 'Sales Forecasting', desc: 'Predict monthly and quarterly sales with 95% accuracy to optimize inventory and staffing', icon: TrendingUp, industry: 'Retail' },
      { title: 'Fraud Detection', desc: 'Identify suspicious transactions in real-time, reducing fraud losses by up to 70%', icon: Shield, industry: 'Finance' },
      { title: 'Predictive Maintenance', desc: 'Know when equipment will fail before it happens, reducing downtime by 45%', icon: Cog, industry: 'Manufacturing' },
      { title: 'Customer Churn Prediction', desc: 'Identify at-risk customers and take action to retain them before they leave', icon: Users, industry: 'Telecom' },
      { title: 'Document Processing', desc: 'Automatically extract and classify information from invoices, contracts, and forms', icon: FileText, industry: 'Legal' },
      { title: 'Medical Diagnosis Support', desc: 'AI-assisted analysis of medical images and patient data for faster, more accurate diagnoses', icon: Stethoscope, industry: 'Healthcare' }
    ],
    faqs: [
      { question: 'How long does it take to build a custom AI solution?', answer: 'Most AI projects take 3-6 months from start to deployment. Simple solutions like chatbots can be ready in 4-8 weeks, while complex machine learning systems may take longer.' },
      { question: 'Do we need a lot of data to use AI?', answer: 'The amount of data needed depends on the complexity of the problem. We can often start with the data you already have and help you build better data collection over time.' },
      { question: 'Will AI replace our employees?', answer: 'AI is designed to augment your team, not replace them. It handles repetitive tasks so your people can focus on creative, strategic work that requires human judgment.' },
      { question: 'How do you ensure AI decisions are fair and unbiased?', answer: 'We follow strict ethical AI practices, including bias testing, transparency in how decisions are made, and regular audits to ensure fairness across all user groups.' }
    ]
  },
  'customized-chatbots': {
    tagline: 'Always Available',
    headline: 'Chatbots That Actually Help',
    subheadline: 'Talk to Customers 24/7',
    heroDescription: 'Our AI chatbots understand context, remember conversations, and solve problems just like your best employee — available every hour of every day.',
    overview: {
      title: 'What Are Customized Chatbots?',
      paragraphs: [
        'A chatbot is an AI-powered assistant that talks with your customers through text or voice. But not all chatbots are the same. QIntellect chatbots are smart — they understand what customers mean, even when they do not use exact words. They learn from every conversation and get better over time.',
        'Our chatbots do more than answer simple questions. They can process orders, schedule appointments, provide personalized recommendations, and even handle complex customer service issues. They integrate with your CRM, inventory system, and other tools to provide accurate, real-time information.',
        'The best part? Your chatbot sounds like your brand. We train it on your tone of voice, your products, and your customer service policies. Customers feel like they are talking to a knowledgeable member of your team, not a robot reading scripts.'
      ]
    },
    benefits: [
      { icon: Clock, title: '24/7 Availability', desc: 'Never miss a customer', detail: 'Your chatbot works around the clock, weekends and holidays included. Customers get instant help at 2 AM or during peak hours when your human team is overwhelmed.' },
      { icon: Zap, title: 'Instant Responses', desc: 'Under 2 second replies', detail: 'No more waiting on hold or in queue. Your chatbot responds instantly to every customer, handling multiple conversations simultaneously without breaking a sweat.' },
      { icon: Users, title: 'Unlimited Capacity', desc: 'Handle thousands at once', detail: 'During sales events or product launches, your chatbot scales automatically. It can handle 10 or 10,000 conversations at the same time with consistent quality.' },
      { icon: CircleDollarSign, title: 'Cut Support Costs', desc: 'Reduce by up to 60%', detail: 'Chatbots handle up to 80% of routine inquiries, freeing your human agents to handle complex issues that require a personal touch. The result: happier customers, lower costs.' }
    ],
    stats: [
      { value: '90%', label: 'Questions Answered' },
      { value: '<2s', label: 'Response Time' },
      { value: '60%', label: 'Cost Savings' },
      { value: '24/7', label: 'Availability' }
    ],
    howItWorks: [
      { step: '01', title: 'Understanding Your Brand', desc: 'We learn your voice', detail: 'We study your brand guidelines, customer service scripts, and past conversations. This helps us build a chatbot that sounds authentically like your company.' },
      { step: '02', title: 'Building the Brain', desc: 'We train the AI', detail: 'Our team creates custom AI models trained on your products, services, and common customer questions. We test extensively to ensure high accuracy.' },
      { step: '03', title: 'Connecting Your Systems', desc: 'We integrate everything', detail: 'We connect your chatbot to your CRM, order system, knowledge base, and other tools. This gives it access to real-time data to provide accurate answers.' },
      { step: '04', title: 'Launch & Improve', desc: 'We keep it learning', detail: 'After launch, we monitor performance and continuously improve the chatbot based on real conversations. It gets smarter every day.' }
    ],
    features: [
      { title: 'Natural Conversations', desc: 'Understands context, handles follow-up questions, and remembers previous messages', icon: MessageSquare },
      { title: 'Multi-Platform Support', desc: 'Deploy on your website, mobile app, WhatsApp, Facebook Messenger, and more', icon: Globe },
      { title: 'Smart Handoff', desc: 'Seamlessly transfers to human agents when needed, with full conversation history', icon: HeartHandshake },
      { title: 'Multi-Language Support', desc: 'Communicate with customers in their preferred language — we support 50+ languages', icon: Globe },
      { title: 'Analytics Dashboard', desc: 'Track performance, popular questions, and customer satisfaction in real-time', icon: BarChart3 },
      { title: 'Easy Updates', desc: 'Update your chatbot knowledge base without any coding through our simple admin panel', icon: Settings }
    ],
    useCases: [
      { title: 'Customer Support', desc: 'Handle order status, returns, FAQs, and troubleshooting without human intervention', icon: Headphones, industry: 'E-commerce' },
      { title: 'Lead Qualification', desc: 'Engage website visitors, answer questions, and qualify leads before routing to sales', icon: Target, industry: 'B2B Sales' },
      { title: 'Appointment Booking', desc: 'Let customers schedule, reschedule, or cancel appointments through natural conversation', icon: Clock, industry: 'Healthcare' },
      { title: 'Product Recommendations', desc: 'Guide customers to the right products based on their needs and preferences', icon: ShoppingCart, industry: 'Retail' },
      { title: 'Employee Help Desk', desc: 'Answer HR questions, IT support, and policy inquiries for your internal team', icon: Building2, industry: 'Enterprise' },
      { title: 'Order Processing', desc: 'Take orders, upsell related products, and process payments through chat', icon: ShoppingCart, industry: 'F&B' }
    ],
    faqs: [
      { question: 'Can the chatbot handle complex questions?', answer: 'Yes! Our chatbots are trained on your specific business knowledge. They can handle multi-step queries, and when something is truly beyond scope, they smoothly hand off to a human agent.' },
      { question: 'What happens if the chatbot cannot answer?', answer: 'The chatbot gracefully acknowledges its limitation and offers to connect the customer with a human agent. It provides the agent with the full conversation context.' },
      { question: 'How do you train the chatbot on our products?', answer: 'We import your product catalog, FAQs, support tickets, and any documentation you have. We can also learn from recorded conversations and customer feedback.' },
      { question: 'Can we update the chatbot ourselves?', answer: 'Absolutely! Our admin panel lets you add new responses, update product information, and modify the chatbot behavior without any technical skills.' }
    ],
    chatConversation: [
      { from: 'user', text: 'Hi, I need help with my order', delay: 0 },
      { from: 'bot', text: 'Hello! 👋 Welcome to QIntellect support. I\'m here to help you with your order. Could you please provide your order number?', delay: 1800 },
      { from: 'user', text: 'It\'s Order #QI-78542', delay: 3500 },
      { from: 'bot', text: 'Thank you! Let me look that up for you... ✨', delay: 5000 },
      { from: 'bot', text: 'Found it! Your order #QI-78542 contains: 1x Premium Software License ($299) and 1x Priority Support Plan ($99). Status: Shipped yesterday via FedEx.', delay: 7000 },
      { from: 'user', text: 'Great! When will it arrive?', delay: 9000 },
      { from: 'bot', text: 'Your package is currently in transit. Tracking: FX784521369. Expected delivery: February 19, 2026 by 5:00 PM. Would you like me to send real-time tracking updates to your phone?', delay: 11500 },
      { from: 'user', text: 'Yes please! Also, can I upgrade to express shipping?', delay: 14000 },
      { from: 'bot', text: 'I\'ve enabled SMS tracking updates for you! 📱 About express shipping — since your package is already in transit, I can check with FedEx if an upgrade is possible. One moment...', delay: 16500 },
      { from: 'bot', text: 'Good news! FedEx confirms we can upgrade to Express for an additional $15. This would guarantee delivery by tomorrow, February 18th. Would you like to proceed?', delay: 19000 },
      { from: 'user', text: 'Yes, that would be perfect!', delay: 21000 },
      { from: 'bot', text: 'Done! ✅ Your shipping has been upgraded to Express. New delivery date: February 18, 2026. The $15 fee has been added to your account. Is there anything else I can help you with today?', delay: 23500 },
      { from: 'user', text: 'No, that\'s all. Thanks!', delay: 25500 },
      { from: 'bot', text: 'You\'re welcome! 😊 Thank you for choosing QIntellect. Have a wonderful day! If you need anything else, I\'m always here 24/7.', delay: 27500 }
    ]
  },
  'ai-customer-representative': {
    tagline: 'Human-Like Service',
    headline: 'AI Agents That Sound Human',
    subheadline: 'Virtual Representatives Your Customers Will Love',
    heroDescription: 'Our AI customer representatives handle phone calls, emails, and chats with real understanding and empathy — not robotic scripts.',
    overview: {
      title: 'What is an AI Customer Representative?',
      paragraphs: [
        'An AI Customer Representative is a virtual agent powered by advanced artificial intelligence that can handle customer interactions just like your best human employee. It understands natural speech, detects emotions, and responds with appropriate empathy and solutions.',
        'Unlike simple chatbots, our AI representatives can handle voice calls with natural-sounding speech. They can process refunds, update accounts, schedule appointments, and resolve complex issues — all while maintaining a warm, professional tone that matches your brand.',
        'These AI agents work alongside your human team, handling routine inquiries so your staff can focus on cases that truly need the human touch. The result is faster response times, lower costs, and happier customers who get help whenever they need it.'
      ]
    },
    benefits: [
      { icon: Mic, title: 'Voice & Text', desc: 'Handles calls and chat', detail: 'Your AI representative speaks naturally on phone calls and writes thoughtfully in text conversations. Customers often cannot tell they are talking to AI until you tell them.' },
      { icon: Globe, title: 'Multilingual', desc: 'Speaks 40+ languages', detail: 'Serve customers in their native language without hiring multilingual staff. The AI switches languages seamlessly mid-conversation when needed.' },
      { icon: Heart, title: 'Emotional Intelligence', desc: 'Understands feelings', detail: 'The AI detects frustration, confusion, or urgency in customer voice and text, adjusting its responses to show appropriate empathy and escalate when necessary.' },
      { icon: Zap, title: 'Instant Action', desc: 'No hold time ever', detail: 'While talking to the customer, the AI simultaneously looks up information, processes transactions, and updates records. Problems get solved in a single conversation.' }
    ],
    stats: [
      { value: '85%', label: 'Issues Resolved' },
      { value: '40+', label: 'Languages' },
      { value: '4.8/5', label: 'Customer Rating' },
      { value: '70%', label: 'Cost Reduction' }
    ],
    howItWorks: [
      { step: '01', title: 'Process Mapping', desc: 'We learn your workflows', detail: 'We document every type of customer issue you handle, the information needed to resolve them, and the steps your best agents take to achieve great outcomes.' },
      { step: '02', title: 'Personality Design', desc: 'We create your AI avatar', detail: 'We design your AI representative persona — name, voice, personality traits, and communication style that perfectly represents your brand values.' },
      { step: '03', title: 'System Integration', desc: 'We connect your tools', detail: 'We integrate with your CRM, ticketing system, payment processor, and other tools so the AI can take real action on behalf of customers.' },
      { step: '04', title: 'Training & Refinement', desc: 'We perfect the experience', detail: 'We train the AI on thousands of real conversations and continuously refine its responses based on customer feedback and satisfaction scores.' }
    ],
    features: [
      { title: 'Natural Voice Synthesis', desc: 'Lifelike voice that sounds warm and professional, with natural pauses and intonation', icon: Volume2 },
      { title: 'Sentiment Analysis', desc: 'Detects customer emotions in real-time and adjusts responses accordingly', icon: Heart },
      { title: 'Real-Time Transcription', desc: 'Every call is transcribed and analyzed for quality assurance and training', icon: FileText },
      { title: 'Smart Escalation', desc: 'Automatically transfers to human agents for complex issues with full context', icon: HeartHandshake },
      { title: 'Omnichannel Support', desc: 'Same AI personality across phone, email, chat, and social media channels', icon: Layers },
      { title: 'Performance Analytics', desc: 'Detailed reports on resolution rates, satisfaction scores, and improvement opportunities', icon: BarChart3 }
    ],
    useCases: [
      { title: 'Inbound Call Center', desc: 'Handle high volumes of customer calls with zero wait time and consistent quality', icon: Phone, industry: 'Telecom' },
      { title: 'Appointment Scheduling', desc: 'Book, confirm, and reschedule appointments through natural voice conversations', icon: Clock, industry: 'Healthcare' },
      { title: 'Technical Support', desc: 'Walk customers through troubleshooting steps and resolve common technical issues', icon: Headphones, industry: 'Tech' },
      { title: 'Billing & Payments', desc: 'Explain invoices, process payments, and set up payment plans over the phone', icon: Banknote, industry: 'Utilities' },
      { title: 'Insurance Claims', desc: 'Collect claim information, explain coverage, and initiate claims processing', icon: Shield, industry: 'Insurance' },
      { title: 'Travel Booking', desc: 'Help customers search, book, and modify travel reservations conversationally', icon: Globe, industry: 'Travel' }
    ],
    faqs: [
      { question: 'Will customers know they are talking to AI?', answer: 'We recommend transparency — most customers appreciate knowing. However, our AI is so natural that in blind tests, customers often cannot tell the difference until told.' },
      { question: 'Can the AI handle angry customers?', answer: 'Yes. The AI is trained in de-escalation techniques and responds to frustration with empathy. For highly escalated situations, it seamlessly transfers to human supervisors.' },
      { question: 'How does it integrate with our phone system?', answer: 'We support all major phone systems and can integrate via SIP, APIs, or cloud connectors. Setup typically takes 2-3 weeks.' },
      { question: 'What about data security and privacy?', answer: 'All conversations are encrypted, stored securely, and we comply with GDPR, HIPAA, and other relevant regulations. You maintain full ownership of your data.' }
    ],
    chatConversation: [
      { from: 'user', text: 'Hi, I need to change my flight booking', delay: 0 },
      { from: 'bot', text: 'Hello! 👋 I\'d be happy to help you with your flight change. Let me pull up your booking details...', delay: 1800 },
      { from: 'bot', text: 'I can see you have a booking: Flight QI-2847 to New York (JFK) on March 5th, 2026 at 2:30 PM. What changes would you like to make?', delay: 4000 },
      { from: 'user', text: 'I need to fly on March 8th instead, preferably morning', delay: 6000 },
      { from: 'bot', text: 'Let me check available morning flights for March 8th... ✈️', delay: 8000 },
      { from: 'bot', text: 'Great news! I found 4 morning options for March 8th:\n\n• 6:00 AM - Economy Plus ($50 fee)\n• 8:30 AM - Economy ($50 fee)\n• 10:15 AM - Economy (No fee!)\n• 11:45 AM - Business ($75 upgrade)\n\nWhich one works best for you?', delay: 10500 },
      { from: 'user', text: 'The 10:15 one with no fee sounds perfect', delay: 12500 },
      { from: 'bot', text: 'Excellent choice! I\'m processing your change now...', delay: 14500 },
      { from: 'bot', text: '✅ Done! Your flight has been successfully changed:\n\n📍 New Flight: QI-2891\n📅 Date: March 8th, 2026\n⏰ Time: 10:15 AM\n🎫 Seat: 14A (Window)\n💰 Change Fee: $0\n\nConfirmation: QI-NY8815', delay: 17000 },
      { from: 'user', text: 'Can I also add extra legroom?', delay: 19500 },
      { from: 'bot', text: 'Of course! Extra legroom seats are available for $35. Row 6 has window (6A) and aisle (6C) available. Would you like me to upgrade you?', delay: 21500 },
      { from: 'user', text: 'Yes, 6A please!', delay: 23500 },
      { from: 'bot', text: '✅ Perfect! You\'re now in seat 6A with extra legroom. The $35 has been charged to your card ending in 4521. I\'ve sent your updated itinerary and boarding pass to your email. Anything else?', delay: 26000 },
      { from: 'user', text: 'That\'s everything, thank you!', delay: 28000 },
      { from: 'bot', text: 'You\'re welcome! 😊 Have a wonderful flight to New York! Don\'t forget to check in online 24 hours before departure. Safe travels! ✈️', delay: 30000 }
    ]
  },
  'dynamics-365': {
    tagline: 'Microsoft Power',
    headline: 'Dynamics 365 Done Right',
    subheadline: 'Run Your Entire Business From One Platform',
    heroDescription: 'We implement and customize Microsoft Dynamics 365 to unite your sales, finance, operations, and customer service in one powerful, integrated system.',
    overview: {
      title: 'What is Microsoft Dynamics 365?',
      paragraphs: [
        'Microsoft Dynamics 365 is a suite of business applications that brings together CRM and ERP capabilities in one platform. It helps you manage sales, customer service, field service, finance, supply chain, and more — all connected and working together.',
        'At QIntellect Technologies, we are certified Microsoft partners with over 15 years of Dynamics experience. We do not just install the software — we customize it to match exactly how your business works, migrate your data safely, and train your team to use it effectively.',
        'Whether you are starting fresh or upgrading from an older system, we make the transition smooth. Our clients typically see improved productivity, better customer insights, and significant cost savings within the first year of implementation.'
      ]
    },
    benefits: [
      { icon: Layers, title: 'All-in-One Platform', desc: 'Everything connected', detail: 'Sales sees what service knows. Finance sees what operations does. Everyone works from the same real-time data, eliminating silos and duplicate work.' },
      { icon: BarChart3, title: 'Real-Time Insights', desc: 'Live business data', detail: 'Built-in analytics and AI give you instant visibility into your business performance. Dashboards update in real-time so you always know where you stand.' },
      { icon: Cloud, title: 'Cloud Powered', desc: 'Work from anywhere', detail: 'Access your business from any device, anywhere. Microsoft Azure ensures 99.9% uptime, automatic updates, and enterprise-grade security.' },
      { icon: Lock, title: 'Enterprise Security', desc: 'Microsoft-grade protection', detail: 'Your data is protected by the same security infrastructure that guards Microsoft\'s own business. Compliance with GDPR, SOC2, and industry-specific regulations.' }
    ],
    stats: [
      { value: '30%', label: 'More Productive' },
      { value: '25%', label: 'Revenue Growth' },
      { value: '40%', label: 'Faster Reports' },
      { value: '99.9%', label: 'Uptime' }
    ],
    howItWorks: [
      { step: '01', title: 'Business Assessment', desc: 'We understand your needs', detail: 'Our consultants analyze your current processes, pain points, and goals. We map your requirements to Dynamics 365 capabilities and identify customization needs.' },
      { step: '02', title: 'Solution Architecture', desc: 'We design your system', detail: 'We design your Dynamics environment including modules, workflows, integrations, and custom developments. You approve the design before we build.' },
      { step: '03', title: 'Implementation', desc: 'We build and migrate', detail: 'Our team configures Dynamics 365, develops customizations, migrates your data, and integrates with your other systems. Thorough testing at every stage.' },
      { step: '04', title: 'Go-Live & Support', desc: 'We launch and train', detail: 'We train your users, go live with full support, and provide ongoing maintenance and optimization to ensure long-term success.' }
    ],
    features: [
      { title: 'Sales Management', desc: 'Track leads, opportunities, and forecasts with AI-powered insights and automation', icon: TrendingUp },
      { title: 'Customer Service', desc: 'Omnichannel support with case management, knowledge base, and customer portals', icon: Headphones },
      { title: 'Finance & Operations', desc: 'Complete financial management including AP, AR, GL, and budgeting', icon: Banknote },
      { title: 'Supply Chain', desc: 'Inventory, warehousing, procurement, and manufacturing management', icon: Truck },
      { title: 'Field Service', desc: 'Schedule, dispatch, and track field technicians with mobile apps', icon: Users },
      { title: 'Power Platform Integration', desc: 'Extend with Power BI, Power Apps, and Power Automate for custom solutions', icon: Sparkles }
    ],
    useCases: [
      { title: 'Sales Pipeline Management', desc: 'Track every lead from first contact to closed deal with full visibility', icon: TrendingUp, industry: 'B2B Sales' },
      { title: 'Financial Consolidation', desc: 'Combine financials from multiple entities with automated reporting', icon: PieChart, industry: 'Finance' },
      { title: 'Manufacturing Operations', desc: 'Plan production, manage shop floor, and track quality in real-time', icon: Factory, industry: 'Manufacturing' },
      { title: 'Field Service Optimization', desc: 'Dispatch the right technician with the right parts to the right job', icon: Truck, industry: 'Utilities' },
      { title: 'Retail Operations', desc: 'Manage inventory, POS, and customer loyalty across all channels', icon: ShoppingCart, industry: 'Retail' },
      { title: 'Project Management', desc: 'Plan, execute, and bill projects with resource management and time tracking', icon: Target, industry: 'Professional Services' }
    ],
    faqs: [
      { question: 'How long does Dynamics 365 implementation take?', answer: 'Typical implementations take 3-9 months depending on scope. A focused sales CRM can be live in 8-12 weeks; a full ERP implementation may take 6-12 months.' },
      { question: 'Can you migrate data from our current system?', answer: 'Yes, we have migrated data from hundreds of different systems including Salesforce, SAP, Oracle, QuickBooks, and custom databases. We ensure data accuracy and integrity.' },
      { question: 'Do you provide training?', answer: 'Absolutely. We provide role-based training for all users, create custom documentation, and offer train-the-trainer programs for ongoing self-sufficiency.' },
      { question: 'What about ongoing support?', answer: 'We offer flexible support plans including help desk, proactive monitoring, system updates, and continuous improvement services.' }
    ]
  },
  'web-development': {
    tagline: 'Modern Digital',
    headline: 'Websites That Actually Work',
    subheadline: 'Fast, Beautiful, Built to Convert',
    heroDescription: 'We design and build websites and web applications that your customers will love, your team can easily manage, and that turn visitors into customers.',
    overview: {
      title: 'Our Web Development Approach',
      paragraphs: [
        'In today\'s digital world, your website is often the first impression customers have of your business. At QIntellect Technologies, we build websites that not only look stunning but also perform exceptionally — loading in under a second, working perfectly on every device, and guiding visitors toward becoming customers.',
        'We specialize in custom web development using modern technologies like React, Next.js, and Node.js. Whether you need a corporate website, an e-commerce platform, a customer portal, or a complex web application, we build it to your exact specifications with clean, maintainable code.',
        'But we do not just build and leave. We design with SEO best practices, integrate with your business tools, provide training on content management, and offer ongoing support to ensure your web presence keeps delivering results for years to come.'
      ]
    },
    benefits: [
      { icon: Zap, title: 'Lightning Fast', desc: 'Load in under 1 second', detail: 'Slow websites lose customers. We optimize every aspect — from code to images to hosting — to ensure your site loads instantly and keeps visitors engaged.' },
      { icon: Globe, title: 'Works Everywhere', desc: 'All devices, all browsers', detail: 'Your site looks and works perfectly whether visitors use the latest iPhone, an old Android tablet, or a desktop computer. We test extensively on all platforms.' },
      { icon: Target, title: 'Built to Convert', desc: 'Turn visitors into customers', detail: 'Every design decision is made with conversion in mind. Clear calls-to-action, trust signals, and user-friendly forms guide visitors toward taking action.' },
      { icon: Shield, title: 'Secure & Reliable', desc: 'Protected and always up', detail: 'We implement enterprise-grade security, SSL certificates, and reliable hosting. Your site stays safe from threats and available when customers need it.' }
    ],
    stats: [
      { value: '0.8s', label: 'Avg Load Time' },
      { value: '300%', label: 'More Leads' },
      { value: '99.9%', label: 'Uptime' },
      { value: '100%', label: 'Responsive' }
    ],
    howItWorks: [
      { step: '01', title: 'Discovery', desc: 'We understand your goals', detail: 'We learn about your business, target audience, competitors, and objectives. We define the site structure, features, and success metrics together.' },
      { step: '02', title: 'Design', desc: 'We create your visual identity', detail: 'Our designers create beautiful mockups that reflect your brand. You see exactly how your site will look before any code is written.' },
      { step: '03', title: 'Development', desc: 'We build with modern tech', detail: 'Our developers bring the designs to life using cutting-edge technologies. We code with performance, accessibility, and SEO in mind from day one.' },
      { step: '04', title: 'Launch & Grow', desc: 'We deploy and optimize', detail: 'We launch your site, set up analytics, and provide training. Post-launch, we continuously optimize based on real user data.' }
    ],
    features: [
      { title: 'Custom Design', desc: 'Unique designs that reflect your brand — no templates, no cookie-cutter solutions', icon: Sparkles },
      { title: 'Content Management', desc: 'Easy-to-use CMS that lets your team update content without developers', icon: Settings },
      { title: 'E-commerce Solutions', desc: 'Full online stores with payment processing, inventory, and order management', icon: ShoppingCart },
      { title: 'SEO Optimization', desc: 'Built-in best practices for search engines to help customers find you', icon: Target },
      { title: 'Analytics Integration', desc: 'Track visitor behavior, conversions, and ROI with detailed dashboards', icon: BarChart3 },
      { title: 'Third-Party Integrations', desc: 'Connect with your CRM, email marketing, payment systems, and more', icon: Layers }
    ],
    useCases: [
      { title: 'Corporate Websites', desc: 'Professional sites that showcase your company and attract clients', icon: Building2, industry: 'Professional Services' },
      { title: 'E-commerce Stores', desc: 'Online shops with smooth checkout and inventory management', icon: ShoppingCart, industry: 'Retail' },
      { title: 'Customer Portals', desc: 'Secure portals for customers to manage accounts and access services', icon: Users, industry: 'SaaS' },
      { title: 'Web Applications', desc: 'Complex applications for internal tools, dashboards, and workflows', icon: Cpu, industry: 'Enterprise' },
      { title: 'Landing Pages', desc: 'High-converting pages for marketing campaigns and lead generation', icon: Target, industry: 'Marketing' },
      { title: 'Educational Platforms', desc: 'Online learning systems with courses, quizzes, and certifications', icon: GraduationCap, industry: 'Education' }
    ],
    faqs: [
      { question: 'How long does it take to build a website?', answer: 'A typical corporate website takes 6-10 weeks. Complex web applications or e-commerce sites may take 3-6 months. We provide detailed timelines during planning.' },
      { question: 'Can we update the content ourselves?', answer: 'Yes! We build all sites with user-friendly CMS so your team can easily update text, images, and add new pages without technical skills.' },
      { question: 'Will our site work on mobile devices?', answer: 'Absolutely. All our sites are fully responsive from the start — they look and work great on phones, tablets, and desktops.' },
      { question: 'Do you provide hosting?', answer: 'We can recommend and set up hosting optimized for your needs, or work with your existing hosting provider. We also offer managed hosting packages.' }
    ]
  },
  'erp-solutions': {
    tagline: 'Business Control',
    headline: 'ERP That Makes Sense',
    subheadline: 'Organize Your Entire Business in One System',
    heroDescription: 'We implement ERP solutions that connect your inventory, sales, finance, HR, and operations into one simple, powerful system.',
    overview: {
      title: 'What is an ERP System?',
      paragraphs: [
        'Enterprise Resource Planning (ERP) is software that integrates all your business processes into a single system. Instead of using separate tools for inventory, accounting, HR, and sales — all disconnected and requiring manual data entry — an ERP brings everything together in one place.',
        'At QIntellect Technologies, we specialize in implementing ERP systems that fit your business perfectly. We work with leading platforms like Microsoft Dynamics, SAP, and Oracle, customizing them to match your specific workflows and industry requirements.',
        'The result is a business that runs more smoothly, with better visibility, less waste, and faster decision-making. Our ERP clients typically see significant improvements in efficiency, accuracy, and profitability within the first year.'
      ]
    },
    benefits: [
      { icon: Layers, title: 'Everything Connected', desc: 'All systems talk to each other', detail: 'No more copying data between systems or wondering if your reports are accurate. All departments work from the same real-time data, eliminating silos and errors.' },
      { icon: Clock, title: 'Real-Time Visibility', desc: 'Always know what is happening', detail: 'Dashboards show your business status in real-time. Inventory levels, sales performance, cash flow, production status — all at your fingertips.' },
      { icon: Target, title: 'Better Decisions', desc: 'Data-driven insights', detail: 'With accurate, timely data, you can spot trends, identify problems early, and make confident decisions based on facts, not guesses.' },
      { icon: TrendingUp, title: 'Scalable Growth', desc: 'System grows with you', detail: 'Our ERP solutions are designed to scale. Whether you add new products, locations, or countries, your system handles the growth without missing a beat.' }
    ],
    stats: [
      { value: '35%', label: 'Less Waste' },
      { value: '50%', label: 'Faster Orders' },
      { value: '20%', label: 'Cost Savings' },
      { value: '100%', label: 'Data Visibility' }
    ],
    howItWorks: [
      { step: '01', title: 'Business Analysis', desc: 'We map your processes', detail: 'Our consultants document every business process, data flow, and requirement. We understand how your business actually works today and how it needs to work tomorrow.' },
      { step: '02', title: 'System Design', desc: 'We plan your ERP', detail: 'We select the right ERP platform and modules, design workflows, plan integrations, and create a detailed implementation roadmap.' },
      { step: '03', title: 'Implementation', desc: 'We build and migrate', detail: 'Our team configures the ERP, develops customizations, migrates your data, and integrates with external systems. We test thoroughly before go-live.' },
      { step: '04', title: 'Go-Live & Support', desc: 'We launch and train', detail: 'We train all users, go live with hands-on support, and provide ongoing maintenance and optimization to ensure long-term success.' }
    ],
    features: [
      { title: 'Inventory Management', desc: 'Track stock levels, movements, and valuations across all locations in real-time', icon: Database },
      { title: 'Financial Management', desc: 'Complete accounting including GL, AP, AR, fixed assets, and multi-currency', icon: Banknote },
      { title: 'Production Planning', desc: 'Plan and schedule manufacturing with bills of materials and routing', icon: Factory },
      { title: 'Procurement', desc: 'Manage vendors, purchase orders, and automate replenishment', icon: ShoppingCart },
      { title: 'HR & Payroll', desc: 'Employee records, attendance, benefits, and payroll processing', icon: Users },
      { title: 'Business Intelligence', desc: 'Reports and dashboards that give actionable insights', icon: BarChart3 }
    ],
    useCases: [
      { title: 'Manufacturing Operations', desc: 'Plan production, manage inventory, and control quality from raw materials to finished goods', icon: Factory, industry: 'Manufacturing' },
      { title: 'Distribution Management', desc: 'Optimize warehousing, order fulfillment, and logistics across multiple locations', icon: Truck, industry: 'Distribution' },
      { title: 'Retail Chain Management', desc: 'Manage inventory, POS, and financials across all stores and channels', icon: ShoppingCart, industry: 'Retail' },
      { title: 'Project-Based Business', desc: 'Track project costs, resource allocation, and billing for professional services', icon: Target, industry: 'Professional Services' },
      { title: 'Food & Beverage', desc: 'Manage recipes, lot tracking, expiry dates, and compliance requirements', icon: Activity, industry: 'F&B' },
      { title: 'Healthcare Administration', desc: 'Manage supplies, billing, and compliance for healthcare organizations', icon: Stethoscope, industry: 'Healthcare' }
    ],
    faqs: [
      { question: 'How long does ERP implementation take?', answer: 'Implementation typically takes 6-18 months depending on scope and complexity. A phased approach often works best, starting with core modules and expanding over time.' },
      { question: 'How disruptive is the transition?', answer: 'We minimize disruption through careful planning, parallel running, and phased rollouts. Most businesses continue normal operations throughout the transition.' },
      { question: 'Can you integrate with our existing systems?', answer: 'Yes. We regularly integrate ERPs with CRM, e-commerce, EDI, specialized industry software, and custom applications using APIs and middleware.' },
      { question: 'What if our processes are unique?', answer: 'We customize the ERP to match your business, not the other way around. Our developers can build custom modules and workflows for any unique requirements.' }
    ]
  },
  'edi-solutions': {
    tagline: 'Seamless Exchange',
    headline: 'EDI Without The Headaches',
    subheadline: 'Connect With Partners Automatically',
    heroDescription: 'We set up Electronic Data Interchange systems that let you exchange orders, invoices, and shipping data with any trading partner — automatically and accurately.',
    overview: {
      title: 'What is EDI?',
      paragraphs: [
        'Electronic Data Interchange (EDI) is the automated exchange of business documents between companies using standardized electronic formats. Instead of emailing purchase orders, manually entering invoices, or faxing shipping notices, EDI sends this information computer-to-computer, instantly and accurately.',
        'At QIntellect Technologies, we have helped hundreds of companies implement EDI solutions. Whether you need to connect with a single major retailer that requires EDI compliance, or manage complex B2B relationships with dozens of partners, we design solutions that fit your needs.',
        'Our EDI implementations integrate directly with your ERP, accounting, or warehouse management system. Documents flow automatically — purchase orders create sales orders, invoices post to receivables, shipments trigger ASNs. The result is faster processing, fewer errors, and happier trading partners.'
      ]
    },
    benefits: [
      { icon: RefreshCw, title: 'Fully Automated', desc: 'Documents flow automatically', detail: 'Orders come in, invoices go out, shipping notices transmit — all without anyone touching a keyboard. Your systems talk directly to your partners\' systems.' },
      { icon: Shield, title: 'Error Elimination', desc: 'No more data entry mistakes', detail: 'Manual data entry is error-prone. EDI transmits data electronically with validation at every step, virtually eliminating costly errors and chargebacks.' },
      { icon: Clock, title: 'Real-Time Speed', desc: 'Documents in seconds', detail: 'What used to take days by mail or hours by email now happens in seconds. Orders arrive instantly, invoices transmit immediately, and everyone has current information.' },
      { icon: Globe, title: 'Universal Compatibility', desc: 'Works with any partner', detail: 'We support all EDI standards (ANSI X12, EDIFACT, etc.) and communication methods (AS2, SFTP, VAN). Connect with any trading partner regardless of their technology.' }
    ],
    stats: [
      { value: '99.9%', label: 'Accuracy Rate' },
      { value: '80%', label: 'Time Saved' },
      { value: '500+', label: 'Partners Connected' },
      { value: '$0', label: 'Manual Entry' }
    ],
    howItWorks: [
      { step: '01', title: 'Partner Analysis', desc: 'We map your relationships', detail: 'We identify all your trading partners, document their EDI requirements, and understand the volume and types of documents you exchange.' },
      { step: '02', title: 'System Setup', desc: 'We configure EDI', detail: 'We set up your EDI platform, create document maps and translations, and configure communication channels with each partner.' },
      { step: '03', title: 'Integration', desc: 'We connect your systems', detail: 'We integrate EDI with your ERP, WMS, or accounting system so documents flow automatically without manual intervention.' },
      { step: '04', title: 'Testing & Go-Live', desc: 'We validate and launch', detail: 'We thoroughly test with each partner, resolve any issues, and go live with monitoring to ensure smooth, ongoing operations.' }
    ],
    features: [
      { title: 'All Document Types', desc: 'Purchase orders, invoices, ASNs, inventory, payments, and 100+ other documents', icon: FileText },
      { title: 'ERP Integration', desc: 'Seamless connection with SAP, Oracle, Microsoft, and other business systems', icon: Layers },
      { title: 'VAN Connectivity', desc: 'Connect through any Value Added Network or direct connections to partners', icon: Globe },
      { title: 'Real-Time Monitoring', desc: 'Track every document, get alerts on issues, and maintain full audit trails', icon: Activity },
      { title: 'Flexible Mapping', desc: 'Transform data between any format — EDI, XML, JSON, flat file, or database', icon: Workflow },
      { title: 'Compliance Management', desc: 'Stay compliant with retailer requirements and avoid costly chargebacks', icon: Shield }
    ],
    useCases: [
      { title: 'Retail Supplier Compliance', desc: 'Meet EDI requirements of major retailers like Walmart, Amazon, and Target', icon: ShoppingCart, industry: 'Consumer Goods' },
      { title: 'B2B Order Processing', desc: 'Automate order-to-invoice cycle with business customers', icon: FileText, industry: 'Manufacturing' },
      { title: 'Supply Chain Visibility', desc: 'Track inventory and shipments across your entire supply chain in real-time', icon: Truck, industry: 'Logistics' },
      { title: 'Healthcare Claims', desc: 'Exchange patient data, claims, and remittances with insurance providers', icon: Stethoscope, industry: 'Healthcare' },
      { title: '3PL Integration', desc: 'Connect with third-party logistics providers for warehouse and shipping', icon: Building2, industry: '3PL' },
      { title: 'Automotive Supply Chain', desc: 'Meet strict EDI requirements of automotive OEMs and Tier 1 suppliers', icon: Cog, industry: 'Automotive' }
    ],
    faqs: [
      { question: 'What if our partners use different EDI standards?', answer: 'Our EDI platform supports all major standards and can translate between them. We handle the complexity so you can work with any partner seamlessly.' },
      { question: 'Do we need a VAN?', answer: 'It depends on your partners\' requirements. Some prefer VAN connections, others accept direct AS2. We help you choose the most cost-effective approach.' },
      { question: 'How long until we\'re EDI compliant?', answer: 'Basic setup takes 4-8 weeks. Adding new partners afterward typically takes 1-2 weeks per partner depending on complexity and their testing requirements.' },
      { question: 'What happens if there\'s an EDI error?', answer: 'Our monitoring catches errors immediately. We get alerts, diagnose the issue, and resolve most problems within hours. You get visibility into all document status.' }
    ]
  },
  'iot-solutions': {
    tagline: 'Connected Devices',
    headline: 'IoT That Actually Delivers',
    subheadline: 'Make Your Machines Smart',
    heroDescription: 'We connect your equipment, sensors, and devices to the internet to give you real-time visibility, predictive insights, and automated control.',
    overview: {
      title: 'What is IoT?',
      paragraphs: [
        'The Internet of Things (IoT) means connecting physical devices to the internet so they can collect data, communicate, and be controlled remotely. At QIntellect Technologies, we help businesses turn "dumb" equipment into smart, connected assets that provide unprecedented visibility and control.',
        'Our IoT solutions range from simple monitoring — knowing the temperature in your warehouse or the location of your trucks — to sophisticated systems that predict equipment failures, automate processes, and optimize energy usage. We handle everything from sensor selection to cloud platform to visualization.',
        'The businesses we work with use IoT to reduce downtime, cut costs, improve safety, and create new services. Manufacturing plants predict equipment failures before they happen. Buildings automatically adjust climate for comfort and efficiency. Fleets track every vehicle and shipment in real-time.'
      ]
    },
    benefits: [
      { icon: Radio, title: 'Complete Visibility', desc: 'See everything in real-time', detail: 'Know the status of every machine, vehicle, and asset in your operation instantly. No more guessing, no more manual checks, no more surprises.' },
      { icon: BarChart3, title: 'Predictive Insights', desc: 'Know problems before they happen', detail: 'AI analyzes data from your sensors to predict equipment failures, quality issues, and maintenance needs before they cause disruptions.' },
      { icon: Zap, title: 'Automated Control', desc: 'Systems respond instantly', detail: 'Set rules and thresholds that trigger automatic actions. Valves adjust, alerts fire, processes start — all without human intervention.' },
      { icon: CircleDollarSign, title: 'Cost Reduction', desc: 'Save energy, reduce waste', detail: 'IoT typically reduces energy costs by 20-30%, extends equipment life through predictive maintenance, and cuts waste through better monitoring.' }
    ],
    stats: [
      { value: '50%', label: 'Less Downtime' },
      { value: '10K+', label: 'Devices Managed' },
      { value: '30%', label: 'Energy Saved' },
      { value: '24/7', label: 'Monitoring' }
    ],
    howItWorks: [
      { step: '01', title: 'Assessment', desc: 'We analyze your operation', detail: 'We survey your facilities, identify what needs monitoring, and define the business outcomes you want to achieve with IoT.' },
      { step: '02', title: 'Design', desc: 'We architect the solution', detail: 'We select appropriate sensors, connectivity options, and cloud platform. We design dashboards and alerts that deliver actionable insights.' },
      { step: '03', title: 'Deployment', desc: 'We install and connect', detail: 'Our technicians install sensors and gateways, configure connectivity, and ensure reliable data flow to your IoT platform.' },
      { step: '04', title: 'Optimize', desc: 'We analyze and improve', detail: 'We train your team, set up monitoring, and continuously analyze data to find new opportunities for optimization and automation.' }
    ],
    features: [
      { title: 'Sensor Networks', desc: 'Temperature, pressure, vibration, location, and hundreds of other sensor types', icon: Wifi },
      { title: 'Real-Time Dashboards', desc: 'Live visualization of all your connected devices and their data', icon: BarChart3 },
      { title: 'Predictive Analytics', desc: 'AI models that forecast failures, quality issues, and maintenance needs', icon: BrainCircuit },
      { title: 'Automated Alerts', desc: 'Instant notifications when conditions exceed thresholds', icon: Activity },
      { title: 'Remote Control', desc: 'Securely control devices and systems from anywhere in the world', icon: Settings },
      { title: 'Historical Analysis', desc: 'Trend analysis and reporting on all collected data', icon: LineChart }
    ],
    useCases: [
      { title: 'Predictive Maintenance', desc: 'Monitor equipment health and predict failures before they cause downtime', icon: Cog, industry: 'Manufacturing' },
      { title: 'Smart Buildings', desc: 'Automated HVAC, lighting, and security for comfort and efficiency', icon: Building2, industry: 'Real Estate' },
      { title: 'Fleet Tracking', desc: 'Real-time location, driver behavior, and vehicle health monitoring', icon: Truck, industry: 'Logistics' },
      { title: 'Cold Chain Monitoring', desc: 'Continuous temperature monitoring for pharmaceuticals and food', icon: Activity, industry: 'Healthcare/F&B' },
      { title: 'Energy Management', desc: 'Monitor and optimize energy consumption across facilities', icon: Zap, industry: 'Utilities' },
      { title: 'Smart Agriculture', desc: 'Soil monitoring, irrigation control, and crop health analytics', icon: Lightbulb, industry: 'Agriculture' }
    ],
    faqs: [
      { question: 'What kind of devices can be connected?', answer: 'Almost anything — machines, vehicles, HVAC, lighting, doors, tanks, bins, and more. If it has power and there\'s a sensor for what you want to measure, we can connect it.' },
      { question: 'How secure is IoT?', answer: 'Security is built in from the start. We use encrypted connections, secure device authentication, and cloud platforms with enterprise-grade security.' },
      { question: 'What about existing equipment?', answer: 'We specialize in retrofitting existing equipment with sensors. You do not need to replace your machines to make them smart.' },
      { question: 'How much data will we have to manage?', answer: 'Our IoT platforms automatically collect, store, and process data. You see actionable insights on dashboards without managing raw data.' }
    ]
  }
};

// ========== ANIMATED CHAT CONVERSATION COMPONENT ==========
const AnimatedChatDemo: React.FC<{ conversation: { from: 'user' | 'bot'; text: string; delay: number }[] }> = ({ conversation }) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, isTyping]);

  useEffect(() => {
    if (visibleMessages >= conversation.length) {
      // Reset after all messages shown
      const resetTimer = setTimeout(() => {
        setVisibleMessages(0);
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      }, 6000);
      return () => clearTimeout(resetTimer);
    }

    const currentMessage = conversation[visibleMessages];
    const delay = visibleMessages === 0 ? 1000 : currentMessage.delay - (conversation[visibleMessages - 1]?.delay || 0);

    if (currentMessage.from === 'bot') {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => prev + 1);
      }, delay);
      return () => clearTimeout(typingTimer);
    } else {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [visibleMessages, conversation]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-w-lg mx-auto"
    >
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-lg">QIntellect AI Assistant</h4>
          <p className="text-blue-100 text-sm">Online • Helping customers 24/7</p>
        </div>
      </div>

      {/* Messages with Scrollbar */}
      <div
        ref={containerRef}
        className="h-[450px] overflow-y-auto p-5 bg-gradient-to-b from-slate-50 to-white scroll-smooth"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}
      >
        <div className="space-y-4">
          <AnimatePresence>
            {conversation.slice(0, visibleMessages).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-3 max-w-[85%] ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.from === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-slate-100 to-slate-200'
                    }`}>
                    {msg.from === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-blue-600" />}
                  </div>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`px-5 py-4 rounded-2xl ${msg.from === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white text-slate-700 rounded-bl-md shadow-lg border border-slate-100'
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-md shadow-lg border border-slate-100">
                <div className="flex gap-1.5">
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2.5 h-2.5 bg-blue-400 rounded-full" />
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="w-2.5 h-2.5 bg-blue-400 rounded-full" />
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-2.5 h-2.5 bg-blue-400 rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
          <CheckCheck className="w-4 h-4 text-blue-500" />
          <span>Live conversation demo</span>
        </div>
      </div>
    </motion.div>
  );
};

// ========== AI VOICE DEMO COMPONENT ==========
const AIVoiceDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentText, setCurrentText] = useState(0);
  const voiceTexts = [
    "Hello! How can I assist you today?",
    "I've found your reservation for March 8th.",
    "Your flight has been successfully changed.",
    "Is there anything else I can help with?"
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % voiceTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 text-white max-w-lg mx-auto relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
            <Headphones className="w-12 h-12 text-white" />
          </div>
          <h4 className="text-2xl font-bold mb-2">AI Voice Assistant</h4>
          <p className="text-slate-400">Human-like voice interactions</p>
        </div>

        {/* Voice Visualization */}
        <div className="flex justify-center items-end gap-1 h-24 mb-8">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: isPlaying ? [15, Math.random() * 70 + 15, 15] : 15,
                backgroundColor: isPlaying ? ['#60a5fa', '#3b82f6', '#60a5fa'] : '#475569'
              }}
              transition={{
                duration: 0.4,
                repeat: isPlaying ? Infinity : 0,
                delay: i * 0.04,
                ease: "easeInOut"
              }}
              className="w-1.5 rounded-full"
              style={{ height: 15 }}
            />
          ))}
        </div>

        {/* Current Speech Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-8"
          >
            <p className="text-lg text-blue-100 italic">"{voiceTexts[currentText]}"</p>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isPlaying ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30' : 'bg-slate-700 shadow-slate-700/30'
              }`}
          >
            {isPlaying ? <Volume2 className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          {isPlaying ? 'Simulating AI voice conversation...' : 'Click to restart demo'}
        </p>
      </div>
    </motion.div>
  );
};

// ========== MAIN COMPONENT ==========
const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 bg-white">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Service Not Found</h2>
          <Link to="/services" className="text-blue-600 hover:underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  const images = serviceImages[service.id] || serviceImages['artificial-intelligence'];
  const content = serviceContent[service.id] || serviceContent['artificial-intelligence'];

  const getIcon = (iconName: string, size: string = "w-8 h-8") => {
    const iconMap: Record<string, any> = {
      'BrainCircuit': BrainCircuit,
      'MessageSquare': MessageSquare,
      'UserCheck': UserCheck,
      'Settings': Settings,
      'Code': Code,
      'RefreshCw': RefreshCw,
      'Database': Database,
      'Radio': Radio
    };
    const IconComponent = iconMap[iconName] || Settings;
    return <IconComponent className={size} />;
  };

  return (
    <div className="bg-white min-h-screen font-light selection:bg-blue-100 selection:text-blue-700">

      {/* ===== HERO SECTION (Same as Services Page) ===== */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{ backgroundImage: 'url("/images/cover-image.jpg")', backgroundSize: '100% auto', backgroundPosition: 'center center' }}
        >
          {/* Gradient Black Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-800/85" />

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 mb-8"
          >
            <Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-500" />
            <Link to="/services" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Services</Link>
            <ChevronRight className="w-4 h-4 text-slate-500" />
            <span className="text-blue-400 text-sm font-medium">{service.title}</span>
          </motion.nav>

          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-3 px-5 py-2.5 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full mb-8"
          >
            <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-white/95 text-sm font-medium uppercase tracking-wider">{content.tagline}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading"
          >
            {content.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mb-6 font-light"
          >
            {content.subheadline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-light"
          >
            {content.heroDescription}
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            {content.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/contact"
              className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
            >
              Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/portfolios"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
            >
              View Our Work <ArrowUpRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===== DETAILED OVERVIEW SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={images.overview} alt={service.title} className="w-full h-[500px] object-cover" />
              </div>
              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-5xl font-bold">15+</div>
                <div className="text-blue-100 text-sm">Years of Excellence</div>
              </motion.div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                Understanding {service.title}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading">
                {content.overview.title}
              </h2>
              <div className="space-y-5">
                {content.overview.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-lg text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Technologies */}
              <div className="pt-6">
                <p className="text-sm text-slate-500 mb-3 font-medium uppercase tracking-wider">Technologies We Use</p>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== KEY BENEFITS SECTION ===== */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Why Choose {service.title}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
              Key <span className="text-blue-600">Benefits</span> For Your Business
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto">
              Real results that make a measurable difference to your bottom line
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-100"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <benefit.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-blue-600 font-medium mb-3">{benefit.desc}</p>
                    <p className="text-slate-500 leading-relaxed">{benefit.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE DEMO (For Chatbot & AI Rep Only) ===== */}
      {(service.id === 'customized-chatbots' || service.id === 'ai-customer-representative') && content.chatConversation && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                  See It In Action
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading">
                  Watch How It <span className="text-blue-600">Works</span>
                </h2>
                <p className="text-xl text-slate-500 leading-relaxed">
                  This is a real conversation example showing how our {service.id === 'customized-chatbots' ? 'chatbot' : 'AI voice assistant'} handles customer requests naturally and efficiently.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-slate-700">Understands context and intent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-slate-700">Accesses real-time business data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-slate-700">Takes action on behalf of customers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-slate-700">Seamlessly escalates when needed</span>
                  </div>
                </div>
              </motion.div>

              {/* Right - Demo */}
              <div>
                {service.id === 'customized-chatbots' ? (
                  <AnimatedChatDemo conversation={content.chatConversation} />
                ) : (
                  <AIVoiceDemo />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              What You Get
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
              Complete <span className="text-blue-600">Feature</span> Set
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto">
              Everything you need for a successful {service.title.toLowerCase()} implementation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-slate-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMAGE GALLERY SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading">
              What We <span className="text-blue-600">Deliver</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Large Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl h-[500px]"
            >
              <img src={images.features[0]} alt="Feature" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Right - Two Stacked Images */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-2xl h-[240px]"
              >
                <img src={images.features[1]} alt="Feature" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-2xl h-[240px]"
              >
                <img src={images.features[2]} alt="Feature" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>
          </div>

          {/* Feature List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {service.features.slice(0, 4).map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-slate-700 font-medium text-sm">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS / PROCESS SECTION ===== */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              How We Make It <span className="text-blue-400">Happen</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A proven methodology that ensures your {service.title.toLowerCase()} project succeeds
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group-hover:border-blue-500/50 transition-all h-full">
                  <div className="text-6xl font-bold text-blue-500/20 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-blue-400 text-sm font-medium mb-4">{step.desc}</p>
                  <p className="text-slate-400 leading-relaxed">{step.detail}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-blue-500/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Real Applications
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
              How Businesses <span className="text-blue-600">Use It</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto">
              Real-world applications of {service.title.toLowerCase()} across different industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.useCases.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-slate-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <useCase.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                    {useCase.industry}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                <p className="text-slate-500 leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                Industries We Serve
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading">
                Built For <span className="text-blue-600">Your Industry</span>
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed">
                Our {service.title.toLowerCase()} solutions are customized for the unique needs of your industry, with deep expertise across multiple sectors.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {service.industries.map((industry, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-white text-slate-700 rounded-full font-medium shadow-md hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-slate-100"
                  >
                    {industry}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-3 border-white flex items-center justify-center text-white font-bold text-sm">
                      {i * 50}+
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">200+ Happy Clients</div>
                  <div className="text-sm text-slate-500">Across all industries</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={images.cta} alt="Industries" className="w-full h-[500px] object-cover" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900">4.9/5</div>
                    <div className="text-sm text-slate-500">Client Satisfaction</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Common Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
              Frequently <span className="text-blue-600">Asked</span> Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {content.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronRight className={`w-6 h-6 text-blue-600 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Rocket className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white font-heading mb-6"
            >
              Ready to Transform Your Business?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Let's discuss how {service.title.toLowerCase()} can solve your challenges and create new opportunities for your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <Link
                to="/contact"
                className="group px-10 py-5 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl flex items-center gap-2"
              >
                Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="px-10 py-5 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2"
              >
                Explore All Services
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20"
            >
              <div className="flex items-center gap-2 text-blue-100">
                <Award className="w-5 h-5" />
                <span className="text-sm">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Users className="w-5 h-5" />
                <span className="text-sm">200+ Clients</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Star className="w-5 h-5" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Shield className="w-5 h-5" />
                <span className="text-sm">100% Satisfaction</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;
