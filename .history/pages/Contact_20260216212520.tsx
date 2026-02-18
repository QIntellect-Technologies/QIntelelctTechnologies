
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold"
          >
            CONTACT OUR TEAM
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 font-heading leading-tight"
          >
            Let's Build the <span className="text-blue-600">Exceptional</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Ready to scale your enterprise operations? Our technical architects are waiting to consult on your next big leap.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                <p className="text-slate-500 text-sm">General: info@qintellect.com</p>
                <p className="text-slate-500 text-sm">Sales: solutions@qintellect.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-6">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                <p className="text-slate-500 text-sm">International: +1 (800) QINT-TEC</p>
                <p className="text-slate-500 text-sm">Support: +1 (800) QINT-SUPP</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Response Time</h3>
                <p className="text-slate-500 text-sm">Enterprise Inquiry: &lt; 2 Hours</p>
                <p className="text-slate-500 text-sm">General Inquiry: &lt; 12 Hours</p>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl text-white">
              <h3 className="text-lg font-bold mb-6 font-heading">Global Headquarters</h3>
              <div className="flex items-start space-x-4 mb-6">
                <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <p className="text-slate-400 text-sm">1200 Innovation Way, Suite 500<br />Silicon Valley, CA 94025, USA</p>
              </div>
              <div className="aspect-video w-full rounded-2xl bg-slate-800 flex items-center justify-center overflow-hidden">
                <span className="text-slate-600 text-xs">Interactive Map Loading...</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-blue-200/50 border border-slate-100"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-8 font-heading">Send a Secure Inquiry</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Work Email</label>
                    <input type="email" placeholder="john@enterprise.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name</label>
                    <input type="text" placeholder="Global Tech Inc" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Industry Service</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                      <option>Artificial Intelligence</option>
                      <option>Dynamics 365</option>
                      <option>IoT Ecosystems</option>
                      <option>ERP Solutions</option>
                      <option>EDI Systems</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Scope</label>
                  <textarea rows={5} placeholder="Tell us about your technical challenges and business goals..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-base hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center group">
                  Send Secure Request
                  <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
