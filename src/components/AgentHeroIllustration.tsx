import React from 'react';
import { motion } from 'motion/react';
import { Star, Zap, ShieldCheck } from 'lucide-react';
import { ProfitMintLogo } from './Logo';

export default function AgentHeroIllustration() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto flex items-center justify-center select-none group py-4">
      
      {/* Subtle Soft Glow behind the Card */}
      <motion.div 
        animate={{ 
          scale: [1.1, 1.2, 1.1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 bg-gradient-to-tr from-blue-500/15 via-sky-400/10 to-indigo-500/10 blur-3xl rounded-full pointer-events-none" 
      />

      {/* Clean White Showcase Stage Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full bg-white rounded-3xl border-2 border-slate-200/90 p-4 sm:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12),0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(59,130,246,0.2)]"
      >
        
        {/* Inner Plain White Backdrop */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-white p-2 flex justify-center items-center">
          
          {/* Character Image on Plain White */}
          <motion.img 
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            src="https://lh3.googleusercontent.com/d/1jHazzaUaVWx8J8wKd5v1H8gRZA46m0Fb"
            referrerPolicy="no-referrer"
            alt="ProfitMint AI Character" 
            className="w-full h-auto max-h-[480px] object-contain rounded-xl drop-shadow-[0_12px_20px_rgba(0,0,0,0.08)]"
          />

          {/* Stage Bottom Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md border border-blue-400/60 px-4 py-1.5 rounded-full text-[11px] font-black text-blue-300 shadow-xl flex items-center gap-2 whitespace-nowrap z-10"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>AUTONOMOUS SALES AGENT</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Interactive Badges around the stage */}
      {/* Top Left: Active Status */}
      <motion.div 
        animate={{ 
          y: [0, -5, 0],
          x: [0, 2, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.2
        }}
        className="absolute -top-2 -left-3 bg-slate-900/95 backdrop-blur-md border border-blue-500/50 p-3 rounded-xl shadow-2xl flex items-center gap-3 z-20 transition-transform duration-300 hover:scale-105"
      >
        <ProfitMintLogo className="w-8 h-8" />
        <div className="text-left">
          <div className="text-[9px] font-black text-blue-400 tracking-widest uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span> AI AGENT ACTIVE
          </div>
          <div className="text-xs font-bold text-white">Hunting Leads 24/7</div>
        </div>
      </motion.div>

      {/* Bottom Right: Revenue Deal Badge */}
      <motion.div 
        animate={{ 
          y: [0, 5, 0],
          x: [0, -2, 0]
        }}
        transition={{ 
          duration: 4.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-2 -right-3 bg-slate-900/95 backdrop-blur-md border border-amber-500/50 p-3 rounded-xl shadow-2xl flex items-center gap-3 z-20 transition-transform duration-300 hover:scale-105"
      >
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        </div>
        <div className="text-left">
          <div className="text-[9px] font-black text-amber-400 tracking-widest uppercase">DEAL CLOSED</div>
          <div className="text-xs font-bold text-white">+$2,400 Retainer</div>
        </div>
      </motion.div>

      {/* Right Side: Speed badge */}
      <motion.div 
        animate={{ 
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 -right-6 -translate-y-1/2 bg-slate-900/95 backdrop-blur-md border border-sky-500/40 p-2.5 rounded-xl shadow-xl hidden sm:flex items-center gap-2 z-20"
      >
        <Zap className="w-4 h-4 text-sky-400 fill-sky-400/20" />
        <span className="text-xs font-bold text-sky-200">Instant Outreach</span>
      </motion.div>

    </div>
  );
}
