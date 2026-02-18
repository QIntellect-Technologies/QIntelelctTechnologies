
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
  Send,
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
  PieChart,
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
  Volume2
} from 'lucide-react';
import { SERVICES } from '../constants';

// Service-specific images
const serviceImages: Record<string, { hero: string; features: string[]; process: string }> = {
  'artificial-intelligence': {
    hero: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop'
    ],
    process: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  'customized-chatbots': {
    hero: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=2012&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
    ],
    process: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
  },
  'ai-customer-representative': {
    hero: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070&auto=format&fit=crop'
    ],
    process: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop'
  },
  'dynamics-365': {
    hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop'
    ],
    process: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2074&auto=format&fit=crop'
  },
  'web-development': {
    hero: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop'
    ],
    process: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
  },
  'erp-solutions': {
    hero: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop'
    ],
    process: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
  },
  'edi-solutions': {
    hero: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop'
    ],
    process: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2074&auto=format&fit=crop'
  },
  'iot-solutions': {
    hero: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'
    ],
    process: 'https://images.unsplash.com/photo-1565034946487-077d23d7f4f1?q=80&w=2070&auto=format&fit=crop'
  }
};

// Service-specific content with simple but powerful words
const serviceContent: Record<string, {
  tagline: string;
  headline: string;
  subheadline: string;
  description: string;
  benefits: { icon: any; title: string; desc: string }[];
  stats: { value: string; label: string }[];
  process: { step: string; title: string; desc: string }[];
  useCases: { title: string; desc: string; icon: any }[];
}> = {
  'artificial-intelligence': {
    tagline: 'Smart Technology',
    headline: 'AI That Works For You',
    subheadline: 'Turn your data into smart decisions',
    description: 'We build AI solutions that understand your business. Our systems learn from your data and help you make better choices, faster. No complex setup — just results.',
    benefits: [
      { icon: TrendingUp, title: 'Better Decisions', desc: 'AI analyzes data 24/7 so you never miss an insight' },
      { icon: Clock, title: 'Save Time', desc: 'Automate tasks that used to take hours' },
      { icon: Shield, title: 'Stay Ahead', desc: 'Predict problems before they happen' },
      { icon: Target, title: 'Boost Results', desc: 'Increase efficiency by up to 60%' }
    ],
    stats: [
      { value: '60%', label: 'Faster Processing' },
      { value: '40%', label: 'Cost Reduction' },
      { value: '99%', label: 'Accuracy Rate' },
      { value: '24/7', label: 'Always Working' }
    ],
    process: [
      { step: '01', title: 'Understand Your Needs', desc: 'We study your business and find where AI can help most' },
      { step: '02', title: 'Build Your Solution', desc: 'Our team creates AI that fits your exact needs' },
      { step: '03', title: 'Train & Test', desc: 'We teach the AI with your data and test it well' },
      { step: '04', title: 'Launch & Support', desc: 'Go live with full support from our team' }
    ],
    useCases: [
      { title: 'Predict Sales', desc: 'Know what customers want before they ask', icon: BarChart3 },
      { title: 'Spot Problems', desc: 'Find issues in products or processes early', icon: Target },
      { title: 'Auto Reports', desc: 'Get smart reports without manual work', icon: FileText }
    ]
  },
  'customized-chatbots': {
    tagline: 'Always Available',
    headline: 'Chatbots That Understand',
    subheadline: 'Talk to your customers 24/7',
    description: 'Our chatbots are not just simple reply bots. They understand context, remember conversations, and help customers just like a real person would — but available all day, every day.',
    benefits: [
      { icon: Clock, title: '24/7 Support', desc: 'Never miss a customer question, day or night' },
      { icon: Zap, title: 'Instant Answers', desc: 'Respond to customers in under 2 seconds' },
      { icon: Users, title: 'Handle Thousands', desc: 'Talk to unlimited customers at once' },
      { icon: Heart, title: 'Happy Customers', desc: 'Increase satisfaction with quick help' }
    ],
    stats: [
      { value: '90%', label: 'Questions Answered' },
      { value: '2s', label: 'Response Time' },
      { value: '50%', label: 'Cost Savings' },
      { value: '24/7', label: 'Availability' }
    ],
    process: [
      { step: '01', title: 'Know Your Voice', desc: 'We learn how your brand talks to customers' },
      { step: '02', title: 'Build Smart Bot', desc: 'Create a chatbot that knows your business' },
      { step: '03', title: 'Connect Systems', desc: 'Link to your CRM, orders, and data' },
      { step: '04', title: 'Launch & Learn', desc: 'Go live and keep getting smarter' }
    ],
    useCases: [
      { title: 'Customer Support', desc: 'Answer common questions instantly', icon: Headphones },
      { title: 'Lead Capture', desc: 'Qualify leads while you sleep', icon: Target },
      { title: 'Order Status', desc: 'Let customers check orders anytime', icon: FileText }
    ]
  },
  'ai-customer-representative': {
    tagline: 'Human-Like Service',
    headline: 'AI That Sounds Human',
    subheadline: 'Virtual agents that customers love',
    description: 'Our AI representatives can talk, listen, and solve problems just like your best employee. They handle calls, emails, and chats with real understanding — not robotic scripts.',
    benefits: [
      { icon: Mic, title: 'Voice & Text', desc: 'Talk or chat — your AI handles both' },
      { icon: Globe, title: 'Any Language', desc: 'Speak to customers in their language' },
      { icon: Heart, title: 'Real Empathy', desc: 'Understand emotions and respond right' },
      { icon: Zap, title: 'Instant Action', desc: 'Process refunds, bookings, and more' }
    ],
    stats: [
      { value: '85%', label: 'Issues Resolved' },
      { value: '10+', label: 'Languages' },
      { value: '4.8', label: 'Customer Rating' },
      { value: '70%', label: 'Cost Reduction' }
    ],
    process: [
      { step: '01', title: 'Map Your Process', desc: 'We learn your customer service rules' },
      { step: '02', title: 'Create Your Agent', desc: 'Build an AI with your brand personality' },
      { step: '03', title: 'Give It Power', desc: 'Connect to your systems for real actions' },
      { step: '04', title: 'Monitor & Improve', desc: 'Watch performance and make it better' }
    ],
    useCases: [
      { title: 'Phone Support', desc: 'Answer calls like a real person', icon: Phone },
      { title: 'Email Help', desc: 'Write thoughtful email responses', icon: Mail },
      { title: 'Live Chat', desc: 'Chat with customers in real-time', icon: MessageSquare }
    ]
  },
  'dynamics-365': {
    tagline: 'Microsoft Power',
    headline: 'Dynamics 365 Done Right',
    subheadline: 'Run your business from one place',
    description: 'Dynamics 365 brings together sales, finance, operations, and customer service in one powerful system. We set it up, customize it, and make sure it works perfectly for your business.',
    benefits: [
      { icon: Layers, title: 'All-in-One', desc: 'Sales, finance, and operations together' },
      { icon: BarChart3, title: 'Live Insights', desc: 'See your business data in real-time' },
      { icon: Cloud, title: 'Cloud Power', desc: 'Access from anywhere, always updated' },
      { icon: Lock, title: 'Enterprise Safe', desc: 'Microsoft-level security built in' }
    ],
    stats: [
      { value: '30%', label: 'More Productivity' },
      { value: '25%', label: 'Revenue Growth' },
      { value: '40%', label: 'Faster Reports' },
      { value: '99.9%', label: 'Uptime' }
    ],
    process: [
      { step: '01', title: 'Audit Your Flow', desc: 'We study your current business processes' },
      { step: '02', title: 'Design Solution', desc: 'Plan the perfect Dynamics setup for you' },
      { step: '03', title: 'Build & Migrate', desc: 'Set up systems and move your data safely' },
      { step: '04', title: 'Train & Support', desc: 'Teach your team and provide ongoing help' }
    ],
    useCases: [
      { title: 'Sales Tracking', desc: 'Manage leads to close faster', icon: TrendingUp },
      { title: 'Finance Control', desc: 'Automate invoices and reports', icon: BarChart3 },
      { title: 'Field Service', desc: 'Schedule and track work orders', icon: Users }
    ]
  },
  'web-development': {
    tagline: 'Modern Websites',
    headline: 'Websites That Work',
    subheadline: 'Fast, beautiful, and built to convert',
    description: 'We build websites and web apps that your customers will love and your team will find easy to manage. Modern technology, clean design, and results that matter.',
    benefits: [
      { icon: Zap, title: 'Super Fast', desc: 'Pages load in under 1 second' },
      { icon: Globe, title: 'Works Everywhere', desc: 'Perfect on phone, tablet, or desktop' },
      { icon: Target, title: 'Built to Convert', desc: 'Design that turns visitors into customers' },
      { icon: Shield, title: 'Secure & Strong', desc: 'Protected against online threats' }
    ],
    stats: [
      { value: '0.8s', label: 'Load Time' },
      { value: '300%', label: 'More Leads' },
      { value: '99.9%', label: 'Uptime' },
      { value: '100%', label: 'Responsive' }
    ],
    process: [
      { step: '01', title: 'Discover', desc: 'Understand your goals and users' },
      { step: '02', title: 'Design', desc: 'Create beautiful mockups you will love' },
      { step: '03', title: 'Develop', desc: 'Build with modern, fast technology' },
      { step: '04', title: 'Deploy', desc: 'Launch and keep it running perfectly' }
    ],
    useCases: [
      { title: 'Business Sites', desc: 'Professional sites that impress', icon: Building2 },
      { title: 'Web Apps', desc: 'Custom tools for your team', icon: Code },
      { title: 'E-Commerce', desc: 'Online stores that sell', icon: TrendingUp }
    ]
  },
  'erp-solutions': {
    tagline: 'Business Control',
    headline: 'ERP That Makes Sense',
    subheadline: 'Organize your entire business',
    description: 'Your business has many moving parts. Our ERP solutions bring them all together — inventory, sales, HR, finance — in one simple system that is easy to use and powerful.',
    benefits: [
      { icon: Layers, title: 'Everything Connected', desc: 'All departments share one system' },
      { icon: Clock, title: 'Real-Time Data', desc: 'Always know what is happening now' },
      { icon: Target, title: 'Better Planning', desc: 'Make decisions with clear data' },
      { icon: TrendingUp, title: 'Grow Easily', desc: 'System grows with your business' }
    ],
    stats: [
      { value: '35%', label: 'Less Waste' },
      { value: '50%', label: 'Faster Orders' },
      { value: '20%', label: 'Cost Savings' },
      { value: '100%', label: 'Data Visibility' }
    ],
    process: [
      { step: '01', title: 'Business Analysis', desc: 'Map all your processes and needs' },
      { step: '02', title: 'System Design', desc: 'Plan modules and workflows' },
      { step: '03', title: 'Implementation', desc: 'Build, integrate, and test' },
      { step: '04', title: 'Go Live', desc: 'Launch with training and support' }
    ],
    useCases: [
      { title: 'Inventory', desc: 'Track stock across locations', icon: Database },
      { title: 'Production', desc: 'Plan and monitor manufacturing', icon: Cog },
      { title: 'HR & Payroll', desc: 'Manage your team easily', icon: Users }
    ]
  },
  'edi-solutions': {
    tagline: 'Seamless Exchange',
    headline: 'EDI Without The Pain',
    subheadline: 'Connect with partners easily',
    description: 'Trading with other businesses should be simple. Our EDI solutions let you exchange orders, invoices, and data with any partner — automatically and without errors.',
    benefits: [
      { icon: RefreshCw, title: 'Auto Exchange', desc: 'Send and receive data automatically' },
      { icon: Shield, title: 'Zero Errors', desc: 'No more manual data entry mistakes' },
      { icon: Clock, title: 'Real-Time', desc: 'Documents transfer in seconds' },
      { icon: Globe, title: 'Any Format', desc: 'Support all EDI standards' }
    ],
    stats: [
      { value: '99%', label: 'Accuracy' },
      { value: '80%', label: 'Time Saved' },
      { value: '500+', label: 'Partners Connected' },
      { value: '0', label: 'Manual Entry' }
    ],
    process: [
      { step: '01', title: 'Map Partners', desc: 'Identify who you need to connect with' },
      { step: '02', title: 'Setup Systems', desc: 'Configure EDI translators and maps' },
      { step: '03', title: 'Test Thoroughly', desc: 'Validate every connection works' },
      { step: '04', title: 'Go Live', desc: 'Start exchanging data automatically' }
    ],
    useCases: [
      { title: 'Orders', desc: 'Receive purchase orders instantly', icon: FileText },
      { title: 'Invoicing', desc: 'Send invoices automatically', icon: BarChart3 },
      { title: 'Shipping', desc: 'Share tracking in real-time', icon: Globe }
    ]
  },
  'iot-solutions': {
    tagline: 'Connected Devices',
    headline: 'IoT That Delivers',
    subheadline: 'Make your devices smart',
    description: 'Connect your machines, sensors, and devices to the internet. Get real-time data, control systems remotely, and spot problems before they happen.',
    benefits: [
      { icon: Radio, title: 'Always Connected', desc: 'Monitor devices from anywhere' },
      { icon: BarChart3, title: 'Live Data', desc: 'See what is happening right now' },
      { icon: Target, title: 'Predict Issues', desc: 'Know when things need fixing' },
      { icon: Zap, title: 'Auto Actions', desc: 'Systems respond without you' }
    ],
    stats: [
      { value: '50%', label: 'Less Downtime' },
      { value: '10K+', label: 'Devices Managed' },
      { value: '30%', label: 'Energy Saved' },
      { value: '24/7', label: 'Monitoring' }
    ],
    process: [
      { step: '01', title: 'Assess Devices', desc: 'See what can be connected' },
      { step: '02', title: 'Design Network', desc: 'Plan how devices will talk' },
      { step: '03', title: 'Deploy & Connect', desc: 'Install sensors and gateways' },
      { step: '04', title: 'Monitor & Scale', desc: 'Watch data and add more devices' }
    ],
    useCases: [
      { title: 'Factory Floor', desc: 'Monitor machines in real-time', icon: Cog },
      { title: 'Smart Building', desc: 'Control lights, HVAC, security', icon: Building2 },
      { title: 'Fleet Tracking', desc: 'Know where vehicles are', icon: Globe }
    ]
  }
};

// Interactive Chatbot Demo Component
const ChatbotDemo: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 I\'m QBot, your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botResponses: Record<string, string> = {
    'pricing': 'Our chatbot solutions start from $2,999/month. This includes setup, training, and ongoing support. Would you like to schedule a demo?',
    'demo': 'I\'d love to show you what I can do! Click the "Get Started" button below, and our team will set up a personalized demo for you.',
    'features': 'I can answer customer questions 24/7, connect to your CRM, process orders, qualify leads, and much more. What specific feature interests you?',
    'support': 'We offer 24/7 support for all our chatbot clients. You\'ll have a dedicated account manager and access to our support team anytime.',
    'hello': 'Hello! Great to meet you! 😊 Feel free to ask me anything about our chatbot services.',
    'hi': 'Hi there! 👋 I\'m here to help. What would you like to know about our chatbot solutions?',
    'default': 'That\'s a great question! Our team can give you detailed information about that. Would you like me to connect you with a specialist?'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = botResponses.default;
      for (const [key, value] of Object.entries(botResponses)) {
        if (userMessage.includes(key)) {
          response = value;
          break;
        }
      }
      setMessages(prev => [...prev, { from: 'bot', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  const quickReplies = ['Pricing', 'Features', 'Demo', 'Support'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-w-md mx-auto"
    >
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold">QBot Assistant</h4>
          <p className="text-blue-100 text-sm">Online • Ready to help</p>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
            <Phone className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 bg-slate-50 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end gap-2 max-w-[80%] ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.from === 'user' ? 'bg-blue-600' : 'bg-slate-200'
              }`}>
                {msg.from === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-slate-600" />}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${
                msg.from === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-md' 
                  : 'bg-white text-slate-700 rounded-bl-md shadow-sm border border-slate-100'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <Bot className="w-4 h-4 text-slate-600" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-100">
              <div className="flex gap-1">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-slate-400 rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-slate-400 rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
        {quickReplies.map((reply, i) => (
          <button
            key={i}
            onClick={() => { setInput(reply); }}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors whitespace-nowrap"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSend}
            className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// AI Voice Demo Component
const AIVoiceDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Headphones className="w-10 h-10 text-blue-400" />
        </div>
        <h4 className="text-xl font-bold mb-2">AI Voice Assistant</h4>
        <p className="text-slate-400 text-sm">Experience human-like conversations</p>
      </div>

      {/* Voice Visualization */}
      <div className="flex justify-center items-end gap-1 h-20 mb-8">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: isPlaying ? [20, Math.random() * 60 + 20, 20] : 20,
              backgroundColor: isPlaying ? ['#3b82f6', '#60a5fa', '#3b82f6'] : '#475569'
            }}
            transition={{ 
              duration: 0.3, 
              repeat: isPlaying ? Infinity : 0,
              delay: i * 0.05 
            }}
            className="w-1 rounded-full"
            style={{ height: 20 }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isPlaying ? <Volume2 className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
      </div>

      <p className="text-center text-slate-400 text-sm mt-6">
        {isPlaying ? '"Hello! How can I assist you today?"' : 'Click to hear AI voice sample'}
      </p>
    </motion.div>
  );
};

// Main Component
const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

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
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <img src={images.hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white to-white" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 mb-12"
          >
            <Link to="/" className="text-slate-400 hover:text-blue-600 transition-colors text-sm">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <Link to="/services" className="text-slate-400 hover:text-blue-600 transition-colors text-sm">Services</Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-blue-600 text-sm font-medium">{service.title}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full"
              >
                {getIcon(service.icon, "w-4 h-4")}
                {content.tagline}
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-slate-900 font-heading leading-tight"
              >
                {content.headline}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-500 leading-relaxed"
              >
                {content.description}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {service.technologies.map(tech => (
                  <span key={tech} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link 
                  to="/contact" 
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/portfolios" 
                  className="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center gap-2"
                >
                  View Projects <ArrowUpRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            {/* Right - Stats Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                <div className="grid grid-cols-2 gap-6">
                  {content.stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-center p-6 bg-slate-50 rounded-2xl"
                    >
                      <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                <span className="font-bold text-sm">Trusted by 200+ Clients</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Why Choose This
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
              Key <span className="text-blue-600">Benefits</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Real results for your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                  <benefit.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-500">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE DEMO (For Chatbot & AI Rep) ===== */}
      {(service.id === 'customized-chatbots' || service.id === 'ai-customer-representative') && (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                Live Demo
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
                Try It <span className="text-blue-600">Yourself</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                Experience the power of our {service.id === 'customized-chatbots' ? 'chatbot' : 'AI voice assistant'}
              </p>
            </motion.div>

            <div className="max-w-lg mx-auto">
              {service.id === 'customized-chatbots' ? <ChatbotDemo /> : <AIVoiceDemo />}
            </div>
          </div>
        </section>
      )}

      {/* ===== FEATURES IMAGE SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xl h-48">
                  <img src={images.features[0]} alt="Feature" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl h-64">
                  <img src={images.features[1]} alt="Feature" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-xl h-64">
                  <img src={images.features[2]} alt="Feature" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl h-48 bg-blue-600 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="text-4xl font-bold mb-2">15+</div>
                    <div className="text-blue-100 text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                What We Deliver
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading">
                Complete <span className="text-blue-600">{service.title.split(' ')[0]}</span> Solution
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed">
                {service.longDescription}
              </p>

              <div className="space-y-4">
                {service.features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg text-slate-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section className="py-24 bg-slate-50">
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
              How You Can <span className="text-blue-600">Use It</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.useCases.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-blue-100 transition-colors" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <useCase.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                  <p className="text-slate-500">{useCase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-8">
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
              4 Simple <span className="text-blue-400">Steps</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From idea to launch, we make it easy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 transition-all h-full">
                  <div className="text-5xl font-bold text-blue-500/20 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
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

      {/* ===== INDUSTRIES SERVED ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                Industries We Serve
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading">
                Built For <span className="text-blue-600">Your Industry</span>
              </h2>
              <p className="text-xl text-slate-500">
                Our {service.title.toLowerCase()} works across many sectors
              </p>

              <div className="flex flex-wrap gap-3">
                {service.industries.map((industry, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="px-6 py-3 bg-slate-100 text-slate-700 rounded-full font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {industry}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={images.process} alt="Industries" className="w-full h-80 object-cover" />
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                    <div className="text-sm text-slate-500">Client Rating</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
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
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white font-heading mb-6"
            >
              Ready to Get Started?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
            >
              Let's talk about how {service.title.toLowerCase()} can help your business grow
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link 
                to="/contact" 
                className="px-10 py-5 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl flex items-center gap-2"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/services" 
                className="px-10 py-5 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2"
              >
                Explore All Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;
