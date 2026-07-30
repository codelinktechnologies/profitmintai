import React, { useState, useEffect } from 'react';
import { 
  Building2, UserCheck, CreditCard, Search, MessageSquare, Volume2, 
  Send, Share2, HelpCircle, Check, ArrowRight, ArrowLeft, Shield, 
  Settings, Play, Pause, ChevronRight, CheckCircle2, AlertCircle, Sparkles,
  RefreshCw, Terminal, PhoneCall, Zap, Wifi, Home
} from 'lucide-react';
import { playClickPop, playHoverTick, playSuccessChime, playHeartbeatPulse, playConfettiBurst, playNotificationSwoosh } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { UserProfile, BusinessType } from '../types';

interface OnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
  onBackToLogin: () => void;
}

import { ProfitMintLogo } from './Logo';

export default function OnboardingWizard({ onComplete, onBackToLogin }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState<BusinessType>('service');
  const [businessName, setBusinessName] = useState('BrightSmile Dental');
  const [niche, setNiche] = useState('Cosmetic Dentistry');
  const [city, setCity] = useState('London');
  const [services, setServices] = useState('Invisalign, Teeth Whitening, Veneers, Root Canal');
  const [revenueGoal, setRevenueGoal] = useState('50000');
  
  // Step 2: Ideal Client
  const [companySize, setCompanySize] = useState('1-10 (B2C Consumers)');
  const [industry, setIndustry] = useState('Local Patients');
  const [budgetRange, setBudgetRange] = useState('£1,000 - £10,000');
  const [geography, setGeography] = useState('Greater London area (10-mile radius)');
  const [painPoints, setPainPoints] = useState<string[]>([
    'Afraid of dental procedures',
    'Cannot find pricing transparency online',
    'Hard to book weekend appointments'
  ]);
  const [newPainPoint, setNewPainPoint] = useState('');

  // Step 3: Revenue tracking
  const [selectedProcessor, setSelectedProcessor] = useState<string>('');
  const [isConnectingProcessor, setIsConnectingProcessor] = useState(false);
  const [connectedProcessors, setConnectedProcessors] = useState<string[]>([]);

  // Step 4: AI Search Presence
  const [seoQueries, setSeoQueries] = useState<string[]>([
    'best Invisalign London',
    'cosmetic dentist London reviews',
    'emergency dental veneers London',
    'teeth whitening clinic central London',
    'pain-free dentist near London'
  ]);
  const [newSeoQuery, setNewSeoQuery] = useState('');

  // Step 5: WhatsApp Setup
  const [isQrScanned, setIsQrScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [whatsappText, setWhatsappText] = useState('');
  const [whatsappLogs, setWhatsappLogs] = useState<Array<{ sender: 'user' | 'system', text: string, time: string }>>([]);
  const [isVoiceTesting, setIsVoiceTesting] = useState(false);

  // Step 6: Voice Profile
  const [selectedVoice, setSelectedVoice] = useState('gentle-male');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  // Step 7: Outreach
  const [channels, setChannels] = useState({
    coldEmail: true,
    linkedIn: false,
    referrals: true,
    inbound: true
  });
  const [averageDealValue, setAverageDealValue] = useState('3500');
  const [monthlyClientGoal, setMonthlyClientGoal] = useState('15');

  // Step 8: Integrations
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);
  const [connectingIntegration, setConnectingIntegration] = useState<string | null>(null);

  // Step 9: Launch & AI Provisioning Simulator
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [launchLogs, setLaunchLogs] = useState<string[]>([]);
  const [currentLaunchActivity, setCurrentLaunchActivity] = useState('');

  const voices = [
    { id: 'gentle-male', name: 'Oliver (Gentle British Male)', gender: 'Male', accent: 'British', desc: 'Smooth, professional, calm. Excellent for clinical or dental consulting.', sampleText: "Good morning. Here is your MintVoice briefing: you earned £4,200 yesterday from a closing via HeyGen. Let's look at the breakdown." },
    { id: 'corporate-female', name: 'Sophia (Executive Corporate Female)', gender: 'Female', accent: 'American', desc: 'Authoritative, direct, crisp. Preferred for agency and SaaS owners.', sampleText: "System check completed. MintOrchestrator reports 98% prediction accuracy on current Perplexity citation campaigns." },
    { id: 'warm-female', name: 'Isla (Warm Editorial Female)', gender: 'Female', accent: 'Australian', desc: 'Friendly, encouraging, highly engaging. Perfect for coaches and therapists.', sampleText: "Hi there! MintPredict just scored 3 new leads at 94% fit probability. I've scheduled personalized followups." },
    { id: 'deep-male', name: 'Marcus (Deep Resonant Male)', gender: 'Male', accent: 'American', desc: 'Powerful, trustworthy, deep. High authority for luxury or trades services.', sampleText: "Welcome back. MintIncome successfully matched a £12,000 transaction from DocuSign to the outreach touchpoint from Wednesday." },
    { id: 'playful-male', name: 'Leo (Energetic Startup Male)', gender: 'Male', accent: 'British', desc: 'Upbeat, high energy, crisp. High conversion for fast-growth SaaS services.', sampleText: "Boom! We just hit 110% of our daily revenue target. MintGrowth triggered 3 referral reviews automatically!" }
  ];

  const handleNextStep = () => {
    playClickPop();
    setStep((prev) => Math.min(prev + 1, 9));
  };

  const handlePrevStep = () => {
    playClickPop();
    if (step === 1) {
      onBackToLogin();
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  // Add pain point
  const handleAddPainPoint = () => {
    if (newPainPoint.trim() && painPoints.length < 5) {
      setPainPoints([...painPoints, newPainPoint.trim()]);
      setNewPainPoint('');
      playSuccessChime();
    }
  };

  // Connect Payment Processor simulation
  const handleConnectProcessor = (proc: string) => {
    if (connectedProcessors.includes(proc)) return;
    playClickPop();
    setSelectedProcessor(proc);
    setIsConnectingProcessor(true);
    
    setTimeout(() => {
      setIsConnectingProcessor(false);
      setConnectedProcessors([...connectedProcessors, proc]);
      playSuccessChime();
    }, 1800);
  };

  // Add SEO query
  const handleAddSeoQuery = () => {
    if (newSeoQuery.trim() && seoQueries.length < 8) {
      setSeoQueries([...seoQueries, newSeoQuery.trim()]);
      setNewSeoQuery('');
      playSuccessChime();
    }
  };

  // Simulated QR Code scanner
  const handleScanQr = () => {
    playClickPop();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsQrScanned(true);
      playSuccessChime();
      setWhatsappLogs([
        { sender: 'system', text: '🟢 ProfitMint AI WhatsApp Gateway linked successfully! Speak or type a command to test.', time: '12:00' }
      ]);
    }, 2000);
  };

  // Simulated voice note speaker
  const handleSendWhatsappTest = () => {
    if (!whatsappText.trim()) return;
    playClickPop();
    const userMsg = whatsappText;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setWhatsappLogs(prev => [...prev, { sender: 'user', text: userMsg, time: timeNow }]);
    setWhatsappText('');

    setTimeout(() => {
      playNotificationSwoosh();
      if (userMsg.toLowerCase().includes('status') || userMsg.toLowerCase().includes('report')) {
        setWhatsappLogs(prev => [...prev, { 
          sender: 'system', 
          text: '🎙️ [Voice Briefing Received]: "ProfitMint AI Core active. Today\'s earnings: £4,500. Next Orchestrator heartbeat is in 2 hours. Everything is active."', 
          time: timeNow 
        }]);
      } else {
        setWhatsappLogs(prev => [...prev, { 
          sender: 'system', 
          text: '🤖 Command received! Running analysis on your lead finder database...', 
          time: timeNow 
        }]);
      }
    }, 1000);
  };

  // Simulated Voice preview
  const handleVoicePlay = (voiceId: string, sampleText: string) => {
    playClickPop();
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
      return;
    }
    
    setPlayingVoice(voiceId);
    setIsVoiceTesting(true);
    playHeartbeatPulse();

    // Replicate voice play duration
    setTimeout(() => {
      setPlayingVoice(null);
      setIsVoiceTesting(false);
      playSuccessChime();
    }, 4500);
  };

  // Toggle channel
  const handleToggleChannel = (channel: keyof typeof channels) => {
    playClickPop();
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  // Connect integrations
  const handleConnectIntegration = (name: string) => {
    if (connectedIntegrations.includes(name)) return;
    playClickPop();
    setConnectingIntegration(name);
    setTimeout(() => {
      setConnectingIntegration(null);
      setConnectedIntegrations([...connectedIntegrations, name]);
      playSuccessChime();
    }, 1500);
  };

  // Launch AI Orchestrator Build Engine (addictive dopamine phase)
  const handleLaunchSystem = () => {
    playSuccessChime();
    setIsLaunching(true);
    setLaunchProgress(0);
    setLaunchLogs([]);

    const steps = [
      { p: 10, msg: "Allocating dedicated Docker cluster node for user instance...", log: "Container OpenClaw-buyer-London-BrightSmile spawned successfully." },
      { p: 25, msg: "Initializing Postgres 15 database schemas and index partitions...", log: "15 tables created. Primary indexes, row-level security enabled." },
      { p: 38, msg: "Deploying MintIncome attribution engine & hooks...", log: "Stripe and DocuSign webhooks synced with confidence matrix." },
      { p: 50, msg: "Analyzing niche with Claude Sonnet 4.6 to generate SOUL.md...", log: "SOUL.md custom traits generated: 'Patient acquisition with focus on high-ticket Invisalign and Teeth Whitening treatments.'" },
      { p: 65, msg: "Deploying Vercel authority subdomains for AEO campaigns...", log: "Deployed brightsmile-dental-reviews.authority-page.net with JSON-LD schemas." },
      { p: 78, msg: "Setting up Perplexity daily citation queries for monitoring...", log: "Loaded 5 queries: 'best Invisalign London', 'cosmetic dentist London reviews'." },
      { p: 90, msg: "Activating ElevenLabs voice briefings synthesizer...", log: "Voice profile Oliver registered for morning deliveries." },
      { p: 100, msg: "MintOrchestrator 4-hour cycle activated!", log: "First cycle scheduled. All systems active. System live." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const item = steps[currentStep];
        setLaunchProgress(item.p);
        setCurrentLaunchActivity(item.msg);
        setLaunchLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${item.log}`]);
        playHeartbeatPulse();
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          playConfettiBurst();
          triggerConfetti();
          
          // Construct UserProfile
          const finalProfile: UserProfile = {
            id: 'buyer-dental-01',
            email: 'demo@profitmint.ai',
            businessName,
            niche,
            city,
            businessType,
            oto2Active: false,
            oto4Active: false,
            whatsappNumber: '07911123456',
            voiceProfileId: selectedVoice,
            heartbeatFrequencyHours: 4,
            learningAggressiveness: 'balanced',
            setupComplete: true,
            monthlyRevenueTarget: Number(revenueGoal),
            icpObject: {
              companySize,
              industry,
              budgetRange,
              geography,
              keyPainPoints: painPoints
            },
            createdAt: new Date().toISOString()
          };
          
          onComplete(finalProfile);
        }, 1500);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col font-sans selection:bg-[#2563EB]/30">
      
      {/* Header bar */}
      <div className="px-8 py-5 border-b border-slate-900 bg-slate-950/60 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProfitMintLogo className="w-8 h-8" />
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>ProfitMint AI Setup Companion</span>
              <span className="text-[9px] font-mono tracking-widest px-1.5 py-0.5 rounded-md bg-[#2563EB]/20 text-blue-400 border border-[#2563EB]/30">v1.0</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { playClickPop(); onBackToLogin(); }}
            onMouseEnter={() => playHoverTick()}
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 transition-all cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </button>
          <button 
            onClick={onBackToLogin}
            onMouseEnter={() => playHoverTick()}
            className="text-xs text-slate-500 hover:text-slate-300 font-mono tracking-wider hover:underline cursor-pointer"
          >
            LOG OUT
          </button>
        </div>
      </div>

      {/* Launcher/Provisioning overlay (Addictive dopamine loop screen) */}
      {isLaunching && (
        <div className="fixed inset-0 bg-[#020511] z-50 flex flex-col items-center justify-center p-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl w-full text-center space-y-8">
            <div className="relative inline-flex items-center justify-center">
              {/* Spinning tech progress ring */}
              <div className="w-24 h-24 rounded-full border-4 border-slate-900 flex items-center justify-center relative">
                <div 
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#2563EB] border-r-[#7C3AED] animate-spin" 
                  style={{ animationDuration: '1.5s' }}
                />
                <Sparkles className="w-8 h-8 text-[#2563EB] animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-[#020511] animate-ping" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">Deploying ProfitMint AI Cluster Instance</h2>
              <p className="text-xs text-[#2563EB] font-mono uppercase tracking-widest animate-pulse font-bold">{currentLaunchActivity}</p>
            </div>

            {/* Micro loading progress bar */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>SYSTEM CONTAINER LAUNCH</span>
                <span>{launchProgress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#7C3AED] rounded-full transition-all duration-300" 
                  style={{ width: `${launchProgress}%` }}
                />
              </div>
            </div>

            {/* Live Unix-like System Logs ticker */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-left font-mono text-[11px] text-slate-400 space-y-1.5 h-44 overflow-y-auto shadow-inner shadow-black">
              <div className="text-slate-600 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>OpenClaw System Deployer log output:</span>
              </div>
              <div className="border-t border-slate-900 my-1.5" />
              {launchLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed whitespace-pre-wrap text-blue-400/90 flex items-start gap-1">
                  <span>➜</span>
                  <span>{log}</span>
                </div>
              ))}
              <div className="w-1.5 h-3.5 bg-slate-500 animate-pulse inline-block" />
            </div>

            <p className="text-[11px] text-slate-500 font-mono tracking-wider uppercase">
              DO NOT CLOSE THIS TAB • SYSTEM IS INITIALIZING SECURE DEDICATED VAULT
            </p>
          </div>
        </div>
      )}

      {/* Main wizard framework */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Left pane: Onboarding steps overview list */}
        <div className="w-full md:w-80 bg-slate-950/40 p-8 border-r border-slate-900 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#2563EB] font-bold uppercase">Setup Wizard</span>
              <h2 className="text-xl font-extrabold tracking-tight text-white">9 Easy Steps</h2>
              <p className="text-xs text-slate-500">Configure your autonomous pipeline. Takes less than 10 minutes.</p>
            </div>

            {/* Progress Checklist items */}
            <div className="space-y-2">
              {[
                { s: 1, label: "Your Business" },
                { s: 2, label: "Your Ideal Client" },
                { s: 3, label: "Revenue Tracking" },
                { s: 4, label: "AI Search Presence" },
                { s: 5, label: "WhatsApp Setup" },
                { s: 6, label: "Voice Profile" },
                { s: 7, label: "Outreach Configuration" },
                { s: 8, label: "Platform Integrations" },
                { s: 9, label: "Launch Engine" }
              ].map((item) => (
                <div 
                  key={item.s}
                  onClick={() => { playClickPop(); if (item.s < step) setStep(item.s); }}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 group cursor-pointer ${
                    step === item.s 
                      ? 'bg-slate-900/80 border border-slate-800 text-white' 
                      : item.s < step 
                        ? 'text-blue-400/80 hover:bg-slate-900/30' 
                        : 'text-slate-600 pointer-events-none'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs ${
                    step === item.s 
                      ? 'bg-[#2563EB] text-white font-bold' 
                      : item.s < step 
                        ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' 
                        : 'bg-slate-900 border border-slate-850'
                  }`}>
                    {item.s < step ? <Check className="w-3.5 h-3.5" /> : item.s}
                  </div>
                  <span className={`text-xs ${step === item.s ? 'font-semibold' : 'group-hover:text-slate-300'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security badge footer */}
          <div className="mt-8 pt-6 border-t border-slate-900 flex items-center gap-3 text-slate-500 text-[10px] font-mono">
            <Shield className="w-4 h-4 text-slate-400" />
            <span>GDPR COMPLIANT VAULT DEPLOYMENT</span>
          </div>
        </div>

        {/* Right pane: Active step forms */}
        <div className="flex-1 p-6 md:p-12 xl:p-16 flex flex-col justify-between max-w-4xl mx-auto w-full">
          
          <div className="space-y-8">
            
            {/* Step 1: Your Business */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20">
                    <Building2 className="w-3.5 h-3.5" />
                    STEP 1 OF 9: CHRONOS PROFILE
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">Let's map your business entity</h3>
                  <p className="text-slate-400 text-sm">
                    Enter details below. Claude will parse this data to construct your local <span className="font-mono text-slate-200 bg-slate-900 px-1 py-0.5 rounded text-xs border border-slate-800">SOUL.md</span> knowledge model immediately.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Business Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['service', 'affiliate', 'both'] as BusinessType[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => { playClickPop(); setBusinessType(t); }}
                          className={`py-3 px-2 text-xs font-semibold rounded-xl border transition-all text-center uppercase cursor-pointer ${
                            businessType === t 
                              ? 'bg-[#2563EB] border-blue-500 text-white shadow-lg shadow-[#2563EB]/20' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Business Name</label>
                    <input 
                      type="text" 
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g. BrightSmile Dental"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Your Niche/Expertise</label>
                    <input 
                      type="text" 
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g. Cosmetic Dentistry"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Primary City</label>
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g. London"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Services Offered (Comma Separated)</label>
                    <input 
                      type="text" 
                      value={services}
                      onChange={(e) => setServices(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g. Invisalign, Teeth Whitening, Veneers"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Monthly Revenue Target (Local Currency)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-mono text-sm">
                        £
                      </div>
                      <input 
                        type="number" 
                        value={revenueGoal}
                        onChange={(e) => setRevenueGoal(e.target.value)}
                        className="block w-full pl-8 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                        placeholder="e.g. 50000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Ideal Client */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20">
                    <UserCheck className="w-3.5 h-3.5" />
                    STEP 2 OF 9: CLIENT TARGETING
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">Who is your ideal prospect?</h3>
                  <p className="text-slate-400 text-sm">
                    Configure your Ideal Customer Profile. MintPredict utilizes this data to score incoming leads between 0 and 100 before outreach.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Target Deal Size / Target Segment</label>
                    <input 
                      type="text" 
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g. 1-10 (B2C Consumers)"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Target Industry</label>
                    <input 
                      type="text" 
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g. Local Patients"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Budget Range</label>
                    <input 
                      type="text" 
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g. £1,000 - £10,000"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Target Geography</label>
                    <input 
                      type="text" 
                      value={geography}
                      onChange={(e) => setGeography(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g. Greater London area"
                    />
                  </div>

                  {/* Pain points tag system */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Client Pain Points (Max 5)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {painPoints.map((point, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                        >
                          <span>{point}</span>
                          <button 
                            type="button" 
                            onClick={() => { playClickPop(); setPainPoints(painPoints.filter((_, i) => i !== idx)); }}
                            className="text-rose-400 hover:text-rose-200 ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    {painPoints.length < 5 && (
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={newPainPoint}
                          onChange={(e) => setNewPainPoint(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPainPoint(); } }}
                          placeholder="e.g. Fear of pain/dentists"
                          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddPainPoint}
                          className="px-4 py-2.5 bg-[#2563EB] hover:bg-blue-600 rounded-xl text-xs font-bold text-white cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Revenue Tracking */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20">
                    <CreditCard className="w-3.5 h-3.5" />
                    STEP 3 OF 9: REVENUE INTEGRATION
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">Enable MintIncome™ Ingestion</h3>
                  <p className="text-slate-400 text-sm">
                    Connect your processing systems. MintIncome crawls transactions hourly and matches client names/emails to the specific AI action that triggered the deal.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  {[
                    { id: 'stripe', name: 'Stripe (Direct Ingestion)' },
                    { id: 'square', name: 'Square' },
                    { id: 'paypal', name: 'PayPal' },
                    { id: 'gocardless', name: 'GoCardless' },
                    { id: 'xero', name: 'Xero Accounting' },
                    { id: 'quickbooks', name: 'QuickBooks' }
                  ].map((proc) => {
                    const isConnected = connectedProcessors.includes(proc.id);
                    const isConnecting = isConnectingProcessor && selectedProcessor === proc.id;
                    return (
                      <button
                        key={proc.id}
                        onClick={() => handleConnectProcessor(proc.id)}
                        disabled={isConnectingProcessor}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all relative group cursor-pointer ${
                          isConnected 
                            ? 'bg-blue-950/20 border-blue-500/40 text-white' 
                            : 'bg-slate-900 border-slate-850 hover:border-slate-750 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-4">
                          <CreditCard className={`w-6 h-6 ${isConnected ? 'text-blue-400' : 'text-[#2563EB] group-hover:scale-110 transition-transform'}`} />
                          {isConnected ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-800" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-200 leading-tight">{proc.name}</p>
                          {isConnecting ? (
                            <span className="text-[10px] text-[#2563EB] font-mono uppercase tracking-wider mt-1 block">Connecting API...</span>
                          ) : isConnected ? (
                            <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider mt-1 block">ACTIVE INGESTION</span>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1 block">DISCONNECTED</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {connectedProcessors.length === 0 && !isConnectingProcessor && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span><b>Attention:</b> You can proceed without connecting a payment gateway, but we will log simulated manual cash receipts so you can test the MintIncome matching dashboard.</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: AI Search Presence */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20">
                    <Search className="w-3.5 h-3.5" />
                    STEP 4 OF 9: AEO SEARCH INTENSITY
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">AEO Citation Monitoring</h3>
                  <p className="text-slate-400 text-sm">
                    When potential buyers search ChatGPT, Claude, or Perplexity for recommendation queries, MintAEO ensures your business is cited. Input up to 8 core queries to track.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                    <h4 className="text-sm font-bold text-slate-300">Target Queries to Scan Daily:</h4>
                    <div className="space-y-2">
                      {seoQueries.map((query, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-300 font-mono">
                          <div className="flex items-center gap-2">
                            <span className="text-[#2563EB]">●</span>
                            <span>"{query}"</span>
                          </div>
                          <button 
                            onClick={() => { playClickPop(); setSeoQueries(seoQueries.filter((_, i) => i !== idx)); }}
                            className="text-rose-400 hover:text-rose-200"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    {seoQueries.length < 8 && (
                      <div className="flex gap-2 mt-4">
                        <input 
                          type="text"
                          value={newSeoQuery}
                          onChange={(e) => setNewSeoQuery(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSeoQuery(); } }}
                          placeholder="e.g. best dental implants in london city"
                          className="flex-1 px-4 py-3 bg-slate-900 border border-slate-850 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-xs font-mono"
                        />
                        <button
                          onClick={handleAddSeoQuery}
                          className="px-5 py-3 bg-[#2563EB] hover:bg-blue-600 rounded-xl text-xs font-bold text-white cursor-pointer"
                        >
                          Add Scan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: WhatsApp Setup */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20">
                    <MessageSquare className="w-3.5 h-3.5" />
                    STEP 5 OF 9: WHATSAPP HOOK
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">Bidirectional WhatsApp Gateway</h3>
                  <p className="text-slate-400 text-sm">
                    Scan the secure gateway code to connect MintVoice. You can query status via voice command or receive daily morning voice briefings on your smartphone.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* QR code and scanner */}
                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-850/80 flex flex-col items-center justify-center space-y-4">
                    {!isQrScanned ? (
                      <div className="relative">
                        <div className={`w-40 h-40 bg-white p-2 rounded-xl flex items-center justify-center relative ${isScanning ? 'opacity-40' : ''}`}>
                          {/* Simulated QR block code */}
                          <div className="grid grid-cols-6 gap-0.5 w-full h-full opacity-90">
                            {Array.from({ length: 36 }).map((_, i) => (
                              <div key={i} className={`rounded-sm ${(i % 3 === 0 || i % 7 === 0 || i < 6 || i % 6 === 0) ? 'bg-slate-900' : 'bg-transparent'}`} />
                            ))}
                          </div>
                          {isScanning && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#2563EB] shadow shadow-[#2563EB] animate-bounce" />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-blue-500/15 border-2 border-blue-500 flex items-center justify-center text-blue-400">
                        <Check className="w-10 h-10 animate-bounce" />
                      </div>
                    )}

                    <div className="text-center space-y-1">
                      <h4 className="text-sm font-bold text-slate-200">
                        {isQrScanned ? "Gateway Active & Connected!" : "Link WhatsApp Number"}
                      </h4>
                      <p className="text-[11px] text-slate-500 max-w-xs">
                        {isQrScanned ? "Simulated cell linked: +44 7911 123456" : "Scan from WhatsApp Settings -> Linked Devices to synchronize."}
                      </p>
                    </div>

                    {!isQrScanned && (
                      <button
                        onClick={handleScanQr}
                        disabled={isScanning}
                        className="py-2.5 px-6 bg-[#2563EB] hover:bg-blue-600 rounded-xl text-xs font-semibold text-white cursor-pointer transition-all disabled:opacity-50"
                      >
                        {isScanning ? "Scanning Local Channel..." : "Simulate QR Scan Now"}
                      </button>
                    )}
                  </div>

                  {/* Active sandbox chat simulator */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-900 flex flex-col justify-between h-[280px]">
                    <div className="space-y-1.5 flex-1 overflow-y-auto mb-4 scrollbar-thin">
                      <p className="text-[10px] font-mono text-slate-600 mb-2 uppercase tracking-widest text-center">GATEWAY TELEMETRY</p>
                      
                      {!isQrScanned ? (
                        <div className="h-full flex items-center justify-center text-center text-xs text-slate-600">
                          Waiting for QR Connection above...
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {whatsappLogs.map((log, idx) => (
                            <div key={idx} className={`flex flex-col ${log.sender === 'user' ? 'items-end' : 'items-start'}`}>
                              <div className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                                log.sender === 'user' 
                                  ? 'bg-[#2563EB] text-white rounded-tr-none' 
                                  : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none'
                              }`}>
                                {log.text}
                              </div>
                              <span className="text-[9px] text-slate-600 font-mono mt-1 px-1">{log.time}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {isQrScanned && (
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={whatsappText}
                          onChange={(e) => setWhatsappText(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSendWhatsappTest(); }}
                          placeholder="Type 'STATUS' to test gateway..."
                          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-xs font-mono"
                        />
                        <button
                          onClick={handleSendWhatsappTest}
                          className="p-2.5 bg-[#2563EB] hover:bg-blue-600 text-white rounded-xl cursor-pointer flex items-center justify-center"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Voice Profile */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20">
                    <Volume2 className="w-3.5 h-3.5" />
                    STEP 6 OF 9: BRIEFING SYNTHESIS
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">Choose your Voice Avatar</h3>
                  <p className="text-slate-400 text-sm">
                    Select a professional ElevenLabs AI voice construct to speak your morning summaries. Play samples below.
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  {voices.map((v) => {
                    const isSelected = selectedVoice === v.id;
                    const isPlaying = playingVoice === v.id;
                    return (
                      <div 
                        key={v.id}
                        onClick={() => { playClickPop(); setSelectedVoice(v.id); }}
                        className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#2563EB]/10 border-[#2563EB] text-white shadow-md shadow-[#2563EB]/5' 
                            : 'bg-slate-900 border-slate-850 text-slate-400 hover:border-slate-750'
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleVoicePlay(v.id, v.sampleText); }}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                              isPlaying 
                                ? 'bg-rose-500 text-white animate-pulse' 
                                : 'bg-slate-850 text-[#2563EB] hover:bg-slate-750'
                            }`}
                          >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{v.name}</h4>
                              <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 border border-slate-900">{v.gender} • {v.accent}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{v.desc}</p>
                          </div>
                        </div>

                        {/* Animated voice wave indicators if playing */}
                        {isPlaying && (
                          <div className="flex items-center gap-0.5 h-4">
                            {[1, 2, 3, 4, 3, 2, 1, 2, 3].map((h, i) => (
                              <div 
                                key={i} 
                                className="w-0.5 bg-[#2563EB] rounded-full animate-bounce" 
                                style={{ 
                                  height: `${h * 4}px`, 
                                  animationDelay: `${i * 0.1}s`,
                                  animationDuration: '0.6s'
                                }} 
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 7: Outreach Config */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20">
                    <Settings className="w-3.5 h-3.5" />
                    STEP 7 OF 9: OUTREACH INTENSITY
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">MintCloser Channel Setup</h3>
                  <p className="text-slate-400 text-sm">
                    Configure your daily client outreach pipelines. Orchestrator automatically balances effort allocations across these active vectors.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-850/80 space-y-4">
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">Active Channels</h4>
                    
                    {[
                      { key: 'coldEmail', label: 'Hyper-Personalized Cold Emails (HeyGen AI Proposal)', desc: '90s custom video thumbnail per prospect.' },
                      { key: 'linkedIn', label: 'LinkedIn Social Outreach Automation', desc: 'Auto messaging & ICP filtering.' },
                      { key: 'referrals', label: 'MintGrowth Review & Referral Loops', desc: 'Triggers request mail to delighted current clients.' },
                      { key: 'inbound', label: 'AEO Inbound Landers', desc: 'Deploys localized search citation funnels.' }
                    ].map((ch) => (
                      <div 
                        key={ch.key}
                        onClick={() => handleToggleChannel(ch.key as any)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          channels[ch.key as keyof typeof channels]
                            ? 'bg-[#2563EB]/10 border-blue-500/40 text-white'
                            : 'bg-slate-950 border-slate-900 text-slate-500 hover:border-slate-800'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold">{ch.label}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{ch.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          channels[ch.key as keyof typeof channels]
                            ? 'bg-blue-500 border-blue-400 text-white'
                            : 'border-slate-800'
                        }`}>
                          {channels[ch.key as keyof typeof channels] && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-850/80 space-y-3">
                      <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Average Deal Value (Contract Value)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-mono text-sm">
                          £
                        </div>
                        <input 
                          type="number" 
                          value={averageDealValue}
                          onChange={(e) => setAverageDealValue(e.target.value)}
                          className="block w-full pl-8 pr-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                          placeholder="3500"
                        />
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-850/80 space-y-3">
                      <label className="block text-xs font-mono text-slate-400 tracking-wider uppercase">Monthly New Client Goal</label>
                      <input 
                        type="number" 
                        value={monthlyClientGoal}
                        onChange={(e) => setMonthlyClientGoal(e.target.value)}
                        className="block w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:border-[#2563EB] outline-none text-slate-200 text-sm transition-all"
                        placeholder="15"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 8: Integrations */}
            {step === 8 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20">
                    <Zap className="w-3.5 h-3.5" />
                    STEP 8 OF 9: ECOSYSTEM CONNECTIVITY
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">Ecosystem Integrations</h3>
                  <p className="text-slate-400 text-sm">
                    Connect Calendly, LinkedIn, or CRM services to automate pipeline transitions seamlessly.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  {[
                    { id: 'linkedin', name: 'LinkedIn Personal', category: 'Social Connection' },
                    { id: 'calendly', name: 'Calendly API', category: 'Booking Engine' },
                    { id: 'google_calendar', name: 'Google Calendar', category: 'Time Management' },
                    { id: 'buffer', name: 'Buffer social API', category: 'Content Autopost' },
                    { id: 'hubspot', name: 'HubSpot CRM', category: 'Pipeline Sync' },
                    { id: 'bland', name: 'Bland.ai Voice API', category: 'Pre-Qual Dialer' },
                    { id: 'heygen', name: 'HeyGen Video', category: 'Proposal Render' },
                    { id: 'docusign', name: 'DocuSign', category: 'Contract Close' }
                  ].map((intg) => {
                    const isConnected = connectedIntegrations.includes(intg.id);
                    const isConnecting = connectingIntegration === intg.id;
                    return (
                      <button
                        key={intg.id}
                        onClick={() => handleConnectIntegration(intg.id)}
                        disabled={!!connectingIntegration}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isConnected 
                            ? 'bg-blue-950/20 border-blue-500/40 text-white shadow shadow-blue-500/5' 
                            : 'bg-slate-900 border-slate-850 hover:border-slate-750 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-3">
                          <CheckCircle2 className={`w-5 h-5 ${isConnected ? 'text-blue-400' : 'text-slate-600'}`} />
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900 ${isConnected ? 'text-blue-400' : 'text-slate-500'}`}>
                            {isConnected ? "ACTIVE" : "OPTIONAL"}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-200 leading-tight">{intg.name}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{isConnecting ? "Connecting..." : intg.category}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 9: Launch Configuration */}
            {step === 9 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    STEP 9 OF 9: LAUNCHPAD COMMAND
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">Review and Deploy ProfitMint AI</h3>
                  <p className="text-slate-400 text-sm">
                    Review your parameters. Clicking 'Deploy & Launch' provisions your personal OpenClaw Docker cluster, launches local SEO monitors, and begins searching lead directories.
                  </p>
                </div>

                {/* Final summary card details */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-850/80 space-y-4 pt-4">
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest font-mono">Vault Specifications</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                      <span className="text-slate-500 uppercase text-[9px] block">Corporate Identity</span>
                      <span className="text-white font-bold">{businessName}</span>
                      <span className="text-[#2563EB] text-[10px] block">{niche} • {city}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                      <span className="text-slate-500 uppercase text-[9px] block">Target ICP Fitment</span>
                      <span className="text-white font-bold">{industry} ({companySize})</span>
                      <span className="text-amber-400 text-[10px] block">{budgetRange}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                      <span className="text-slate-500 uppercase text-[9px] block">MintIncome Streams</span>
                      <span className="text-white font-bold">{connectedProcessors.length > 0 ? `${connectedProcessors.join(', ').toUpperCase()} Webhooks` : "Manual Log Mode"}</span>
                      <span className="text-blue-400 text-[10px] block">Monthly Goal: £{revenueGoal}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 space-y-1">
                      <span className="text-slate-500 uppercase text-[9px] block">Briefing Avatar</span>
                      <span className="text-white font-bold uppercase">{selectedVoice}</span>
                      <span className="text-indigo-400 text-[10px] block">WhatsApp Linked</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-900">
            <button
              onClick={handlePrevStep}
              onMouseEnter={() => playHoverTick()}
              className="py-3 px-6 border border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-200 transition-all cursor-pointer flex items-center gap-2 group font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>

            {step < 9 ? (
              <button
                onClick={handleNextStep}
                onMouseEnter={() => playHoverTick()}
                className="py-3 px-8 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20 select-none group font-mono"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleLaunchSystem}
                onMouseEnter={() => playHoverTick()}
                className="py-3.5 px-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all cursor-pointer flex items-center gap-3 shadow-xl shadow-blue-500/30 animate-pulse group font-mono"
              >
                <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                <span>Launch ProfitMint AI Engine</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
