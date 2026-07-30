import React from 'react';
import { motion } from 'motion/react';
import { 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  HelpCircle, 
  MailX, 
  Clock, 
  Cpu, 
  FileCheck, 
  MonitorPlay, 
  Zap 
} from 'lucide-react';

const OLD_WAY = [
  { text: "Manually scouring LinkedIn for hours", icon: Search },
  { text: "Guessing which leads actually need help", icon: HelpCircle },
  { text: "Generic, cold templates that get ignored", icon: MailX },
  { text: "Static follow-ups every 3-5 days", icon: Clock }
];

const PROFITMINT_WAY = [
  { text: "Autonomous 24/7 scanning & scoring", icon: Cpu },
  { text: "Verified technical gaps detected instantly", icon: FileCheck },
  { text: "Custom AI video audits for every lead", icon: MonitorPlay },
  { text: "High-frequency, intent-based automation", icon: Zap }
];

export const ComparisonSection = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            Stop Guessing. <span className="text-blue-600">Start Dominating.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Traditional lead generation is broken. ProfitMint AI replaces human error with autonomous precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Old Way */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-30 transition-opacity">
              <XCircle className="w-32 h-32 text-rose-600 rotate-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="px-2 py-1 bg-slate-100 rounded text-[10px] uppercase tracking-widest text-slate-500">The Old Way</span>
              Manual Outreach
            </h3>
            <ul className="space-y-4 mb-8">
              {OLD_WAY.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-500">
                  <item.icon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-slate-100 italic text-slate-400 text-sm">
              "Takes 40+ hours a week for 2-3 meetings."
            </div>
          </motion.div>

          {/* ProfitMint Way */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-8 rounded-xl border border-blue-500/30 shadow-2xl shadow-blue-500/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-50 transition-opacity">
              <CheckCircle2 className="w-32 h-32 text-blue-400 -rotate-12 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="px-2 py-1 bg-blue-500 rounded text-[10px] uppercase tracking-widest text-white">The ProfitMint Way</span>
              Autonomous Growth
            </h3>
            <ul className="space-y-4 mb-8">
              {PROFITMINT_WAY.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <item.icon className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-slate-800 font-bold text-blue-400 text-sm flex items-center gap-2">
              "100% Automated. 5x Higher Response Rates."
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
