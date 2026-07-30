import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Shield, Sparkles, ArrowRight, CheckCircle2, Volume2, VolumeX, Eye, EyeOff, Laptop, Home, ArrowLeft } from 'lucide-react';
import { playClickPop, playHoverTick, playSuccessChime, toggleMute, getMuteState } from '../utils/audio';

interface LoginScreenProps {
  onLoginSuccess: (demo: boolean) => void;
  onBackToHome?: () => void;
}

import { ProfitMintLogo } from './Logo';

export default function LoginScreen({ onLoginSuccess, onBackToHome }: LoginScreenProps) {
  const [email, setEmail] = useState('demo@profitmint.ai');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentHeroFeature, setCurrentHeroFeature] = useState(0);
  const [muted, setMuted] = useState(getMuteState());

  const heroFeatures = [
    {
      title: "MintIncome™ Engine",
      desc: "Every single dollar or pound traced directly to the exact autonomous AI action that earned it.",
      badge: "World First",
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10"
    },
    {
      title: "MintAEO Optimization",
      desc: "Gets your local service business cited when potential clients ask ChatGPT or Perplexity for recommendations.",
      badge: "World First",
      color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10"
    },
    {
      title: "MintVoice WhatsApp",
      desc: "Speak voice commands directly to your AI and receive structured morning voice briefings automatically.",
      badge: "JVZoo First",
      color: "border-amber-500/30 text-amber-400 bg-amber-500/10"
    },
    {
      title: "MintCloser Pipeline",
      desc: "Scores leads, initiates outreach, qualifies via Bland.ai calls, and deploys HeyGen video proposals.",
      badge: "Best in Class",
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroFeature((prev) => (prev + 1) % heroFeatures.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent, isDemo: boolean = false) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    playClickPop();

    setTimeout(() => {
      setIsSubmitting(false);
      playSuccessChime();
      onLoginSuccess(isDemo);
    }, 1200);
  };

  const handleMuteToggle = () => {
    const next = toggleMute();
    setMuted(next);
    playClickPop();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-white relative overflow-hidden"
    >
      {/* Background radial glow on left side only */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-tr from-blue-500/10 via-sky-500/5 to-transparent blur-[150px] pointer-events-none" />

      {/* Top Floating Control Bar - Split matching layout */}
      <div className="relative z-50 w-full flex flex-col lg:flex-row border-b border-slate-200">
        {/* Left header portion - White */}
        <div className="w-full lg:w-[52%] px-6 py-4 flex items-center justify-between bg-white lg:border-r border-slate-200">
          <button 
            onClick={() => { playClickPop(); onBackToHome?.(); }}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            title="Return to Landing Page"
          >
            <ProfitMintLogo className="w-9 h-9" />
            <div>
              <div className="font-black text-base tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                ProfitMint <span className="text-blue-600">AI</span>
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Autonomous Growth Engine
              </div>
            </div>
          </button>

          {/* Mobile-only right action buttons */}
          <div className="flex lg:hidden items-center gap-2">
            {onBackToHome && (
              <button
                onClick={() => { playClickPop(); onBackToHome(); }}
                className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold"
              >
                <Home className="w-4 h-4 text-blue-600" />
              </button>
            )}
            <button
              onClick={handleMuteToggle}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono"
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
            </button>
          </div>
        </div>

        {/* Right header portion - Black/Dark */}
        <div className="hidden lg:flex flex-1 px-6 py-4 items-center justify-end gap-3 bg-slate-950 border-b border-slate-800">
          {onBackToHome && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { playClickPop(); onBackToHome(); }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Return to Homepage</span>
            </motion.button>
          )}

          <button
            onClick={handleMuteToggle}
            onMouseEnter={() => playHoverTick()}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all text-slate-300 z-50 flex items-center gap-2 cursor-pointer text-xs font-mono font-bold"
            title={muted ? "Unmute Sound FX" : "Mute Sound FX"}
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
            <span className="tracking-wider">{muted ? 'MUTED' : 'AUDIO ON'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative z-10">
        {/* Left split: Hero presentation (WHITE SIDE - Character Image Blends Perfectly) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden lg:flex flex-col justify-between w-[52%] p-12 xl:p-16 border-r border-slate-200 bg-white relative overflow-hidden text-slate-900"
        >
          {/* Subtle Decorative Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

          {/* Subheader Badge */}
          <div className="space-y-6 max-w-xl my-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold border border-blue-200 text-blue-700 bg-blue-50 gap-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                SaaS Launch Edition v1.0
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl xl:text-5xl font-black tracking-tight text-slate-900 leading-tight"
            >
              The World's Only <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">Attributable</span> AI Growth Agent.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-base xl:text-lg leading-relaxed font-normal"
            >
              Stop running AI tasks blindly. ProfitMint AI works autonomously every 4 hours to locate leads, run local optimization, deliver video proposals, and attribute every single dollar directly to its source.
            </motion.p>

            {/* Featured Visual Showcase Image - White Background Blends Completely */}
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.45 }}
              className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50/80 shadow-lg group p-3 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[360px] pb-12"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1wCbg4kR1_IXZkN9ZbV4spRWhcAq5NaGJ" 
                alt="ProfitMint AI System" 
                className="w-full h-auto max-h-[380px] object-contain object-top rounded-xl group-hover:scale-[1.01] transition-transform duration-500 mix-blend-multiply"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://drive.google.com/uc?export=view&id=1wCbg4kR1_IXZkN9ZbV4spRWhcAq5NaGJ";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-100/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-800 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 z-10 shadow-md">
                <span className="flex items-center gap-1.5 font-bold text-blue-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  SYSTEM PREVIEW
                </span>
                <span className="text-slate-500 font-medium">100% Autonomous Acquisition</span>
              </div>
            </motion.div>

            {/* Active Carousel Component */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 backdrop-blur-xl relative overflow-hidden shadow-xs min-h-[170px]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-widest uppercase border ${heroFeatures[currentHeroFeature].color}`}>
                  {heroFeatures[currentHeroFeature].badge}
                </span>
                <div className="flex gap-1.5">
                  {heroFeatures.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { playClickPop(); setCurrentHeroFeature(idx); }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentHeroFeature === idx ? 'bg-blue-600 w-5' : 'bg-slate-300 hover:bg-slate-400 w-1.5'}`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    {heroFeatures[currentHeroFeature].title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {heroFeatures[currentHeroFeature].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Footer Metrics */}
          <div className="flex items-center justify-between text-slate-500 text-xs border-t border-slate-200 pt-6 mt-8 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>MintOrchestrator online: <b className="text-slate-800">312 Agents active</b></span>
            </div>
            <div className="font-mono tracking-wider text-slate-400 font-medium">SECURED WITH AES-256</div>
          </div>
        </motion.div>

        {/* Right split: Login form & Demo shortcuts (BLACK / DARK SIDE) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10 bg-slate-950 text-white relative z-10"
        >
          <div className="max-w-md w-full mx-auto space-y-7">
            
            {/* Quick Back-to-Home Ribbon */}
            {onBackToHome && (
              <motion.button
                whileHover={{ x: -3 }}
                onClick={() => { playClickPop(); onBackToHome(); }}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to ProfitMint AI Landing Page</span>
              </motion.button>
            )}

            <div>
              <h2 className="text-3xl font-black tracking-tight text-white mb-2">Welcome back</h2>
              <p className="text-slate-400 text-sm font-medium">
                Enter your credentials to access your autonomous acquisition dashboard.
              </p>
            </div>

            {/* Mobile-only Preview Image Banner - Clean White Container for Multiply Blending */}
            <div className="lg:hidden rounded-2xl overflow-hidden border border-slate-800 bg-white p-3 relative shadow-md flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/d/1wCbg4kR1_IXZkN9ZbV4spRWhcAq5NaGJ" 
                alt="ProfitMint AI Preview" 
                className="w-full h-auto max-h-[280px] object-contain object-top rounded-lg mix-blend-multiply"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://drive.google.com/uc?export=view&id=1wCbg4kR1_IXZkN9ZbV4spRWhcAq5NaGJ";
                }}
              />
            </div>

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-5">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  {error}
                </motion.div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 tracking-wider uppercase font-bold">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => playHoverTick()}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:bg-slate-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-white text-sm font-medium transition-all placeholder:text-slate-500"
                    placeholder="name@business.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-mono text-slate-300 tracking-wider uppercase font-bold">Password</label>
                  <a href="#" onClick={(e) => { e.preventDefault(); playClickPop(); }} className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => playHoverTick()}
                    className="block w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:bg-slate-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-white text-sm font-medium transition-all placeholder:text-slate-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => { playClickPop(); setShowPassword(!showPassword); }}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  defaultChecked
                  onFocus={() => playHoverTick()}
                  className="h-4 w-4 bg-slate-900 border-slate-800 rounded text-blue-500 focus:ring-blue-500/50 outline-none transition-all cursor-pointer accent-blue-600"
                />
                <label htmlFor="remember_me" className="ml-2 block text-xs font-medium text-slate-400 cursor-pointer select-none">
                  Remember this device for 30 days
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => playHoverTick()}
                className="relative group block w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl text-sm transition-all duration-300 cursor-pointer text-center select-none shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Sign In Securely</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </motion.button>
            </form>

            {/* Live Demo shortcuts */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-[11px] uppercase font-mono tracking-wider">
                <span className="bg-slate-950 px-3 text-slate-400 font-bold">Accelerated Demo Access</span>
              </div>
            </div>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.01, x: 2 }}
                whileTap={{ scale: 0.99 }}
                onClick={(e) => handleSubmit(e, true)}
                onMouseEnter={() => playHoverTick()}
                className="w-full py-3.5 px-4 bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between text-left transition-all duration-200 group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/30 transition-all">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">1-Click Live Demo</h4>
                    <p className="text-[11px] text-slate-400">Explore pre-populated active system with £24,350 revenue</p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/50 transition-all shadow-2xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01, x: 2 }}
                whileTap={{ scale: 0.99 }}
                onClick={(e) => handleSubmit(e, false)}
                onMouseEnter={() => playHoverTick()}
                className="w-full py-3.5 px-4 bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between text-left transition-all duration-200 group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/30 transition-all">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">Run Onboarding Wizard</h4>
                    <p className="text-[11px] text-slate-400">Test the 9-Screen setup sequence from scratch</p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/50 transition-all shadow-2xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="pt-2 flex items-center justify-center gap-6 text-slate-500 text-[11px] font-mono tracking-wider">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>PCI-DSS COMPLIANT</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>SSL SECURED</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
