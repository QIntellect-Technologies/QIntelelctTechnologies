"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText } from 'lucide-react';
import { serviceContent } from './ServiceDetailClient';

const FaqClient: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  
  // Extract all FAQs from all services
  const allFaqs: { category: string; question: string; answer: string }[] = [];
  
  Object.entries(serviceContent).forEach(([key, service]) => {
    // Format category name
    const category = service.headline || key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    if (service.faqs && service.faqs.length > 0) {
      service.faqs.forEach(faq => {
        allFaqs.push({
          category,
          question: faq.question,
          answer: faq.answer
        });
      });
    }
  });

  // Group FAQs by category
  const groupedFaqs = allFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof allFaqs>);

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold"
          >
            <FileText className="w-4 h-4" />
            <span>KNOWLEDGE BASE</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-medium text-slate-900 font-heading leading-tight"
          >
            Technical <span className="text-blue-600">Documentation</span> & FAQs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Find answers to common questions about our enterprise solutions, implementations, and technologies.
          </motion.p>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedFaqs).map(([category, faqs], categoryIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * categoryIndex }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="bg-slate-900 px-6 py-4">
                <h2 className="text-xl font-bold text-white font-heading">{category}</h2>
              </div>
              
              <div className="divide-y divide-slate-100">
                {faqs.map((faq, index) => {
                  const id = `${category}-${index}`;
                  const isOpen = openIndex === id;
                  
                  return (
                    <div key={index} className="px-6">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : id)}
                        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                      >
                        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
                          {faq.question}
                        </span>
                        <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50'}`}>
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 text-slate-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqClient;
