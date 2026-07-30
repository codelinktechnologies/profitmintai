import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: "How does the AI Video Audit actually work?",
    a: "Our AI scans the prospect's website for technical gaps (speed, SEO, pixels). It then renders a personalized 60-second video with a human-like avatar that walks through those exact gaps, creating immediate trust and authority."
  },
  {
    q: "Do I need any technical skills to set this up?",
    a: "None. ProfitMint is designed for business owners and non-technical founders. You connect your LinkedIn or Email, set your offer, and the agent begins hunting leads autonomously."
  },
  {
    q: "Can I customize the outreach script?",
    a: "Absolutely. While our base prompts are battle-tested, you have full control over the 'DNA' of your agent, including tone of voice, unique selling points, and specific call-to-actions."
  },
  {
    q: "How many leads can it handle per day?",
    a: "The standard agent processes up to 100 deep-dives per day. This involves full technical audits and personalized outreach, ensuring quality remains high without triggering platform limits."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-500 mt-4 font-medium">Everything you need to know about scaling with ProfitMint AI.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className={`border rounded-lg transition-all duration-300 ${openIndex === i ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100 bg-white'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className={`font-bold transition-colors ${openIndex === i ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
                  {faq.q}
                </span>
                {openIndex === i ? (
                  <Minus className="w-5 h-5 text-blue-500" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
