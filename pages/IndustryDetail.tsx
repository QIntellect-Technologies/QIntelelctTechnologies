import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Zap,
  BrainCircuit,
  CheckCircle2,
  Target,
  Clock,
  Users,
  TrendingUp,
  Star,
  ArrowUpRight,
  Phone,
  Mail,
  Globe,
  Award,
  Heart,
  Lightbulb,
  Rocket,
  Building2,
  Hotel,
  Stethoscope,
  Megaphone,
  Banknote,
  Factory,
  Truck,
  GraduationCap,
  Package,
  Laptop
} from 'lucide-react';
import { INDUSTRIES } from '../constants';
import useSEO from '../hooks/useSEO';

// ========== INDUSTRY IMAGES ==========
const industryImages: Record<string, { overview: string; features: string[]; cta: string }> = {
  'customer-care-hospitality': {
    overview: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1559599524-6eb65cddca95?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2836&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2825&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop'
  },
  'healthcare': {
    overview: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2831&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=2940&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2787&auto=format&fit=crop'
  },
  'marketing': {
    overview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2815&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2874&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2870&auto=format&fit=crop'
  },
  'finance-banking': {
    overview: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2811&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2888&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2811&auto=format&fit=crop'
  },
  'manufacturing-retail': {
    overview: 'https://images.unsplash.com/photo-1565034946487-077d23d7f4f1?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1586937835440-1734887cda7e?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2870&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2870&auto=format&fit=crop'
  },
  'logistics': {
    overview: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2125&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1601393477200-66ce2be36744?q=80&w=2940&auto=format&fit=crop'
  },
  'education': {
    overview: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2922&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2871&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2940&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2940&auto=format&fit=crop'
  },
  'supply-chain': {
    overview: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2870&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2940&auto=format&fit=crop'
  },
  'technology': {
    overview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2832&auto=format&fit=crop',
    features: [
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2870&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1400&auto=format&fit=crop'
    ],
    cta: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop'
  }
};

// ========== ICON MAPPING ==========
const iconMap = {
  'Hotel': Hotel,
  'Stethoscope': Stethoscope,
  'Megaphone': Megaphone,
  'Banknote': Banknote,
  'Factory': Factory,
  'Truck': Truck,
  'GraduationCap': GraduationCap,
  'Package': Package,
  'Laptop': Laptop
};

// ========== FLOATING ELEMENTS ==========
const FloatingElements: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        style={{
          left: `${10 + i * 15}%`,
          top: `${20 + i * 10}%`,
        }}
      />
    ))}
  </div>
);

// ========== MAIN COMPONENT ==========
const IndustryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [industry, setIndustry] = useState<typeof INDUSTRIES[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: industry ? `${industry.title} | QIntellect Technologies` : 'Industry Solutions | QIntellect Technologies',
    description: industry ? industry.shortDescription : 'QIntellect Technologies delivers AI, ERP, and enterprise solutions across all major industries worldwide.',
    keywords: industry ? `${industry.title}, ${industry.technologies?.join(', ') || ''}, QIntellect Technologies, enterprise solutions` : 'industry solutions, AI, ERP, enterprise software',
    canonical: industry ? `https://www.qintellecttechnologies.com/industries/${industry.id}` : 'https://www.qintellecttechnologies.com/industries',
    structuredData: industry ? {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${industry.title} Solutions`,
      description: industry.shortDescription,
      url: `https://www.qintellecttechnologies.com/industries/${industry.id}`,
    } : undefined,
  });

  useEffect(() => {
    if (id) {
      const foundIndustry = INDUSTRIES.find(i => i.id === id);
      setIndustry(foundIndustry || null);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Industry Not Found</h1>
          <p className="text-slate-600 mb-8">The industry you're looking for doesn't exist.</p>
          <Link to="/industries" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[industry.icon as keyof typeof iconMap];
  const images = industryImages[industry.id] || industryImages['technology'];

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={images.overview}
            alt={industry.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90" />
        </div>

        <FloatingElements />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8"
          >
            {IconComponent && <IconComponent className="w-12 h-12 text-white" />}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="inline-block px-4 py-2 bg-blue-500/30 text-blue-200 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
              Industry Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-5xl md:text-7xl font-bold font-heading mb-6"
          >
            {industry.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12"
          >
            {industry.shortDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/contact"
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-3"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-3"
            >
              View Our Services
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <p className="text-sm mb-2">Discover Solutions</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== OVERVIEW SECTION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
                Industry Overview
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-8">
                How QIntellect Transforms <span className="text-blue-600">{industry.title}</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {industry.longDescription}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {industry.features.slice(0, 4).map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={images.features[0]}
                  alt={`${industry.title} solutions`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <p className="font-bold text-lg">500+</p>
                      <p className="text-sm text-slate-200">Projects Delivered</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-20" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-50 rounded-full opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CHALLENGES SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-red-100 text-red-600 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
                Industry Challenges
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
                Problems We <span className="text-blue-600">Solve</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Every industry faces unique challenges. Here's how we address the most pressing issues in {industry.title.toLowerCase()}.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industry.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold text-lg">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-slate-700 text-lg leading-relaxed">{challenge}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS SECTION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-green-100 text-green-600 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
                Our Solutions
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
                Smart Solutions for <span className="text-blue-600">{industry.title}</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Tailored technology solutions designed specifically for the unique needs of your industry.
              </p>
            </motion.div>
          </div>

          <div className="space-y-20">
            {industry.solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative">
                    <img
                      src={images.features[index] || images.features[0]}
                      alt={solution.title}
                      className="w-full h-80 object-cover rounded-3xl shadow-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-3xl" />
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">{index + 1}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">{solution.title}</h3>
                  </div>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {solution.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Learn More
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
                Key Benefits
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
                Why Choose QIntellect for <span className="text-blue-600">{industry.title}</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Discover the measurable benefits and competitive advantages our solutions deliver.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industry.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-slate-50 hover:bg-blue-50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit}</h3>
                <p className="text-slate-600">Measurable improvement in your {industry.title.toLowerCase()} operations</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR SERVICES SECTION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
                Relevant Services
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
                Perfect Services for <span className="text-blue-600">{industry.title}</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our specialized services designed to address the unique challenges in your industry.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.services.map((serviceName, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <BrainCircuit className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {serviceName}
                </h3>
                <p className="text-slate-600 mb-6">
                  Tailored {serviceName.toLowerCase()} solutions designed specifically for {industry.title.toLowerCase()} businesses.
                </p>
                <Link
                  to={`/services/${serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace('&', '')}`}
                  className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  Learn More
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGIES SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-bold uppercase tracking-wider rounded-full mb-6">
                Technologies We Use
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
                Cutting-Edge <span className="text-blue-600">Technology Stack</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We leverage the latest technologies to deliver robust, scalable solutions for {industry.title.toLowerCase()}.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {industry.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl px-6 py-4 transition-all duration-300 hover:shadow-lg"
              >
                <span className="text-slate-700 font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src={images.cta}
                alt="Get started"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-8 py-20 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                viewport={{ once: true }}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8"
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                Ready to Transform Your <span className="text-blue-400">{industry.title}</span> Business?
              </h2>

              <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12">
                Let's discuss how QIntellect Technologies can help you overcome challenges and achieve your goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 justify-center"
                >
                  Start Your Project
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="tel:+1234567890"
                  className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 justify-center"
                >
                  <Phone className="w-6 h-6" />
                  Call Us Today
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-slate-300 mb-4">Trusted by 500+ companies worldwide</p>
                <div className="flex items-center justify-center space-x-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Award Winning</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default IndustryDetail;