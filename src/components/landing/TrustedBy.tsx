import React from 'react';
import { motion } from 'motion/react';

const BRAND_LOGOS = [
  { name: "Google", domain: "google.com" },
  { name: "Walmart", domain: "walmart.com" },
  { name: "Adidas", domain: "adidas.com" },
  { name: "CNN", domain: "cnn.com" },
  { name: "Philips", domain: "philips.com" },
  { name: "PizzaHut", domain: "pizzahut.com" },
  { name: "Beanstock", domain: "beanstock.io" },
  { name: "Fox", domain: "fox.com" },
  { name: "Nexus", domain: "nexus.io" },
  { name: "CloudScale", domain: "cloudscale.ch" }
];

export const TrustedBy = () => {
  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Empowering High-Growth Teams At
        </p>
      </div>
      
      <div className="relative flex">
        <motion.div 
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
            <div key={i} className="flex items-center gap-4 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
              <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden p-1.5">
                <img 
                  src={`https://logo.clearbit.com/${brand.domain}`} 
                  alt={brand.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic text-slate-400">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
