import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Shield, 
  TrendingUp, 
  Calculator, 
  Target, 
  Phone, 
  MessageSquare, 
  DollarSign, 
  Activity, 
  Check, 
  X, 
  Search, 
  FileText, 
  Star, 
  Clock, 
  BarChart3, 
  Brain, 
  Radio, 
  ArrowUpRight, 
  ChevronDown,
  ChevronRight,
  Menu,
  Volume2,
  VolumeX,
  Award,
  RefreshCw,
  Plus,
  Play,
  Pause,
  Mail,
  CheckCircle,
  ShieldCheck,
  Calendar,
  CheckSquare,
  Settings,
  MapPin
} from 'lucide-react';
import { playClickPop, playHoverTick, playSuccessChime, toggleMute, getMuteState } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { motion } from 'motion/react';
import AgentHeroIllustration from './AgentHeroIllustration';

import { ProfitMintLogo } from './Logo';
import { TrustedBy } from './landing/TrustedBy';
import { ComparisonSection } from './landing/ComparisonSection';
import { FAQSection } from './landing/FAQSection';

interface LandingPageProps {
  onStartDemo: () => void;
  onGoToLogin: () => void;
  onGoToWizard: () => void;
}

export default function LandingPage({ onStartDemo, onGoToLogin, onGoToWizard }: LandingPageProps) {
  const [muted, setMuted] = useState(getMuteState());
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedTickerKey, setExpandedTickerKey] = useState<string | null>(null);
  const [launchEditionText, setLaunchEditionText] = useState('August 2026 Launch Edition');

  // ROI Calculator State
  const [roiDealValue, setRoiDealValue] = useState(2400);
  const [roiLeads, setRoiLeads] = useState(300);
  const [roiConversion, setRoiConversion] = useState(12);

  // ProfitMint AI Sandbox State
  const [sandboxIndustry, setSandboxIndustry] = useState('Dental Clinic');
  const [customIndustryInput, setCustomIndustryInput] = useState('');
  const [sandboxLocation, setSandboxLocation] = useState('Austin, TX');
  const [customBusinessName, setCustomBusinessName] = useState('');
  const [customTargetRetainer, setCustomTargetRetainer] = useState('2800');
  const [showCustomEditor, setShowCustomEditor] = useState(false);
  const [sandboxRunning, setSandboxRunning] = useState(false);
  const [sandboxStep, setSandboxStep] = useState(0);
  const [sandboxResult, setSandboxResult] = useState<any | null>({
    businessName: 'Apex Dental Care',
    decisionMaker: 'Dr. Michael Vance, DDS',
    email: 'm.vance@apexdentalaustin.com',
    phone: '+1 (512) 555-0192',
    techGaps: ['Missing Google Ads Pixel', 'Page Speed: 42/100 (Slow)', 'No AI Chatbot', 'Unclaimed GBP Ranking'],
    proposedDeal: '$2,200/mo Retainer',
    videoScript: "Hi Dr. Vance, I noticed Apex Dental Care is missing a 24/7 online booking bot and has a 3.2s load delay on mobile. We created a custom 60-second video audit showing how to add $14k/mo in high-value implant leads...",
    auditScore: '58/100 (High Growth Opportunity)'
  });
  const [sandboxPlaying, setSandboxPlaying] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const runSandboxSimulation = () => {
    playClickPop();
    setSandboxRunning(true);
    setSandboxStep(1);
    setSandboxResult(null);

    const activeIndustry = sandboxIndustry === 'Custom...' ? (customIndustryInput || 'Custom Business') : sandboxIndustry;
    const activeName = customBusinessName || `${activeIndustry} of ${sandboxLocation.split(',')[0]}`;
    const activePrice = customTargetRetainer ? `$${Number(customTargetRetainer).toLocaleString()}/mo Retainer` : '$2,800/mo Retainer';

    setTimeout(() => {
      setSandboxStep(2);
      playHoverTick();
    }, 900);

    setTimeout(() => {
      setSandboxStep(3);
      playHoverTick();
    }, 1800);

    setTimeout(() => {
      setSandboxStep(4);
      playHoverTick();
    }, 2700);

    setTimeout(() => {
      setSandboxRunning(false);
      setSandboxStep(0);
      playSuccessChime();
      triggerConfetti();
      setSandboxResult({
        businessName: activeName,
        decisionMaker: 'Elena Rodriguez, Managing Director',
        email: `contact@${activeIndustry.toLowerCase().replace(/[^a-z0-9]/g, '')}${sandboxLocation.split(',')[0].toLowerCase().trim()}.com`,
        phone: '+1 (800) 555-0144',
        techGaps: ['Missing Retargeting Pixel', 'Mobile Score: 38/100', 'No Instant Lead Response AI', 'Missing Video Testimonials'],
        proposedDeal: activePrice,
        videoScript: `Hi Sarah! We scanned ${activeName} in ${sandboxLocation} and found 3 critical conversion leaks on your landing page. Watch this 45-second AI video proposal to see how our autonomous system fixes them automatically...`,
        auditScore: '44/100 (Critical Opportunity Flagged)'
      });
    }, 3500);
  };

  const handleMuteToggle = () => {
    const next = toggleMute();
    setMuted(next);
    playClickPop();
  };

  const handleCtaClick = (type: 'demo' | 'wizard') => {
    playClickPop();
    triggerConfetti();
    playSuccessChime();
    if (type === 'demo') {
      onStartDemo();
    } else {
      onGoToWizard();
    }
  };

  // ROI calculation
  const projectedMonthlyRevenue = Math.round(roiDealValue * roiLeads * (roiConversion / 100));

  const tickerRaw = [
    {
      key: 'trace',
      time: '2 mins ago',
      tag: 'MINTTRACE',
      tagBg: 'bg-blue-500/20',
      tagColor: 'text-blue-400',
      text: 'Booked a discovery call with Riverside Dental — +$1,200 attributed',
      eventId: 'MINTTRACE-2291',
      timeRetrieved: '2 mins ago',
      policy: 'CONFIDENCE 5/5',
      reasoning: 'Matched a $1,200 Stripe payment from Riverside Dental to the discovery-call booking sent 3 days earlier. No other agent action touched this contact in the window, so the match carries maximum confidence.',
      metrics: [
        { label: 'Client', value: 'Riverside Dental' },
        { label: 'Action matched', value: 'Discovery call booked' },
        { label: 'Amount attributed', value: '$1,200' }
      ]
    },
    {
      key: 'closer',
      time: '14 mins ago',
      tag: 'AUTOCLOSER',
      tagBg: 'bg-red-500/20',
      tagColor: 'text-red-400',
      text: 'Sent AI video proposal to Coastal Legal ($2,400/mo retainer)',
      eventId: 'AUTOCLOSER-1187',
      timeRetrieved: '14 mins ago',
      policy: 'STAGE 5 / 6',
      reasoning: 'Discovery call transcript scored high intent on retainer pricing. Generated a 90-second HeyGen avatar proposal referencing their caseload volume and sent it ahead of the 24-hour target window.',
      metrics: [
        { label: 'Client', value: 'Coastal Legal' },
        { label: 'Proposal value', value: '$2,400/mo' },
        { label: 'Predicted close', value: '68%' }
      ]
    },
    {
      key: 'reach',
      time: '31 mins ago',
      tag: 'MINTREACH',
      tagBg: 'bg-indigo-500/20',
      tagColor: 'text-indigo-400',
      text: 'Cited in ChatGPT for "dental implants near me"',
      eventId: 'MINTREACH-4402',
      timeRetrieved: '31 mins ago',
      policy: 'AEO MONITOR',
      reasoning: 'Daily Perplexity + ChatGPT sweep of 50 target queries found this business now cited for a top-5 target query, up from unranked last week after authority content deployed to the subdomain.',
      metrics: [
        { label: 'Query', value: '"dental implants near me"' },
        { label: 'Citation rate', value: '31 / 50 queries' },
        { label: 'Trend', value: '+6 this week' }
      ]
    },
    {
      key: 'pilot',
      time: '48 mins ago',
      tag: 'AUTOPILOT',
      tagBg: 'bg-sky-500/20',
      tagColor: 'text-sky-400',
      text: 'Reallocated outreach effort toward highest-converting channel',
      eventId: 'AUTOPILOT-CYCLE-118',
      timeRetrieved: '48 mins ago',
      policy: 'HEARTBEAT 4H',
      reasoning: 'This week WhatsApp voice follow-ups converted 2.3x higher than cold email. Shifted 30% of outreach budget from email sequences to voice follow-up for the next cycle.',
      metrics: [
        { label: 'Cycle', value: '#118' },
        { label: 'Effort shifted', value: '30% → MintVoice' },
        { label: 'Expected lift', value: '+12% booked calls' }
      ]
    },
    {
      key: 'growth',
      time: '1 hr ago',
      tag: 'GROWTHPULSE',
      tagBg: 'bg-blue-500/20',
      tagColor: 'text-blue-400',
      text: 'Flagged retention risk for Apex Consulting — health score 6/10',
      eventId: 'GROWTHPULSE-771',
      timeRetrieved: '1 hr ago',
      policy: 'WEEKLY SCORE',
      reasoning: 'Response time to last two check-ins slowed and no upsell activity in 45 days. Health score dropped from 8/10 to 6/10 — queued a retention check-in before renewal.',
      metrics: [
        { label: 'Client', value: 'Apex Consulting' },
        { label: 'Health score', value: '6 / 10' },
        { label: 'Action queued', value: 'Retention check-in' }
      ]
    }
  ];

  const [tickerItems, setTickerItems] = useState<any[]>(tickerRaw);
  const [liveStreamActive, setLiveStreamActive] = useState(true);
  const [tickerSpeed, setTickerSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [liveEventCount, setLiveEventCount] = useState(2480);



  // Live Stream Event Simulator with variable speed & pause support
  React.useEffect(() => {
    if (!liveStreamActive) return;

    const speedIntervals = {
      slow: 12000,
      normal: 6000,
      fast: 2500
    };

    const intervalMs = speedIntervals[tickerSpeed] || 6000;

    const interval = setInterval(() => {
      const livePool = [
        {
          tag: 'AUTOCLOSER',
          text: 'Generated custom 60s AI Video Proposal for Austin Orthodontics ($3,200/mo)',
          eventId: `AUTOCLOSER-${Math.floor(1000 + Math.random() * 9000)}`,
          policy: 'STAGE 5 / 6',
          reasoning: 'Website audit flagged missing online booking and slow mobile speed. Synthesized a 60-second video audit pointing out 3 conversion gaps.',
          metrics: [
            { label: 'Client', value: 'Austin Orthodontics' },
            { label: 'Proposal value', value: '$3,200/mo' },
            { label: 'Predicted close', value: '74%' }
          ]
        },
        {
          tag: 'MINTTRACE',
          text: 'Matched $2,800 Stripe retainer to Vanguard Injury Law via WhatsApp Voice',
          eventId: `MINTTRACE-${Math.floor(1000 + Math.random() * 9000)}`,
          policy: 'CONFIDENCE 5/5',
          reasoning: 'Matched inbound Stripe customer email directly to the WhatsApp audio pitch sent 48 hours earlier. High attribution confidence.',
          metrics: [
            { label: 'Client', value: 'Vanguard Injury Law' },
            { label: 'Action matched', value: 'WhatsApp Audio Pitch' },
            { label: 'Amount attributed', value: '$2,800' }
          ]
        },
        {
          tag: 'MINTREACH',
          text: 'Scraped 64 verified leads for Miami MedSpas & enriched decision makers',
          eventId: `MINTREACH-${Math.floor(1000 + Math.random() * 9000)}`,
          policy: 'LEAD SCRAPER V2',
          reasoning: 'Filtered prospects with >$500k ARR lacking Meta pixel retargeting. Enriched direct mobile numbers and LinkedIn URLs.',
          metrics: [
            { label: 'Leads Scraped', value: '64 Verified' },
            { label: 'Niche', value: 'MedSpa & Aesthetics' },
            { label: 'Location', value: 'Miami, FL' }
          ]
        },
        {
          tag: 'AUTOPILOT',
          text: 'Optimized outreach queue — shifted +20% effort to LinkedIn Voice Notes',
          eventId: `AUTOPILOT-${Math.floor(1000 + Math.random() * 9000)}`,
          policy: 'LIVE RE-BALANCER',
          reasoning: 'Voice notes on LinkedIn saw 3.1x higher reply rate over standard email sequences. Auto-reallocated daily dispatch budget.',
          metrics: [
            { label: 'Optimized Node', value: 'LinkedIn Voice' },
            { label: 'Reply Lift', value: '+310%' },
            { label: 'Queue Status', value: 'Active' }
          ]
        },
        {
          tag: 'GROWTHPULSE',
          text: 'Cited #1 in ChatGPT search query for "emergency roofing repair Dallas"',
          eventId: `GROWTHPULSE-${Math.floor(1000 + Math.random() * 9000)}`,
          policy: 'AEO RANK TRACKER',
          reasoning: 'Subdomain schema injection successfully indexed on Bing/ChatGPT Knowledge Graph. Ranked top response out of 12 local competitors.',
          metrics: [
            { label: 'Query', value: 'emergency roofing repair' },
            { label: 'Engine', value: 'ChatGPT Search' },
            { label: 'Rank', value: '#1 Spot' }
          ]
        }
      ];

      const newItem = livePool[Math.floor(Math.random() * livePool.length)];
      const itemKey = `live-${Date.now()}`;
      const formattedItem = {
        key: itemKey,
        time: 'Just now',
        tag: newItem.tag,
        tagBg: 'bg-blue-500/20',
        tagColor: 'text-blue-400',
        text: newItem.text,
        eventId: newItem.eventId,
        timeRetrieved: 'Just now',
        policy: newItem.policy,
        reasoning: newItem.reasoning,
        metrics: newItem.metrics,
        isNew: true
      };

      setTickerItems(prev => [formattedItem, ...prev.slice(0, 9)]);
      setLiveEventCount(c => c + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [liveStreamActive, tickerSpeed]);

  const selectedTicker = tickerItems.find(t => t.key === expandedTickerKey) || null;

  const pillars = [
    { tag: 'World First', name: 'Revenue Mint Trace', color: 'text-blue-600', icon: DollarSign, bg: 'bg-blue-50 border-blue-200', desc: 'Income attribution engine — every dollar traced back to the exact AI action that earned it.' },
    { tag: 'World First', name: 'AI Search Mint (AEO)', color: 'text-indigo-600', icon: Search, bg: 'bg-indigo-50 border-indigo-200', desc: 'Gets your business cited when potential clients ask ChatGPT or Perplexity for a recommendation.' },
    { tag: 'World First', name: 'ProfitMint Autopilot', color: 'text-sky-600', icon: Zap, bg: 'bg-sky-50 border-sky-200', desc: 'Runs every 4 hours: analyses what worked, shifts effort to what earns the most.' },
    { tag: 'New Category', name: 'Lead Mint Scorer', color: 'text-amber-600', icon: Target, bg: 'bg-amber-50 border-amber-200', desc: 'Forecasts outcomes before acting and scores every lead by likelihood to close.' },
    { tag: 'WhatsApp First', name: 'WhatsApp Mint Agent', color: 'text-blue-600', icon: Phone, bg: 'bg-blue-50 border-blue-200', desc: 'Speak commands to your AI agent and get instant actions executed, right inside WhatsApp.' },
    { tag: 'Best in Class', name: 'Autonomous Closing Vault', color: 'text-red-600', icon: ShieldCheck, bg: 'bg-red-50 border-red-200', desc: '6-stage pipeline: scoring, outreach, voice pre-qual, booking, video proposal, e-sign.' },
    { tag: 'New Pillar', name: 'LTV Mint Pulse', color: 'text-blue-600', icon: TrendingUp, bg: 'bg-blue-50 border-blue-200', desc: 'Client health scoring, upsell detection, referral automation, and review generation.' },
    { tag: 'Always On', name: 'Mint Approval Queue', color: 'text-sky-600', icon: CheckCircle, bg: 'bg-sky-50 border-sky-200', desc: 'One-tap approve or reject high-value proposals right from your mobile phone.' },
    { tag: 'Plug & Play', name: 'Revenue Integrations', color: 'text-indigo-600', icon: BarChart3, bg: 'bg-indigo-50 border-indigo-200', desc: 'Connects Stripe, Calendar, CRM, and Socials in minutes without developer code.' }
  ];

  const pipelineStages = [
    { name: 'Found', count: 38, pct: 100 },
    { name: 'Contacted', count: 24, pct: 63 },
    { name: 'Replied', count: 11, pct: 29 },
    { name: 'Booked', count: 6, pct: 16 },
    { name: 'Proposal', count: 4, pct: 11 },
    { name: 'Closed', count: 2, pct: 5 }
  ];

  const testimonials = [
    { 
      quote: 'I finally know which AI Mint action actually pays my rent. It is not guesswork anymore.', 
      name: 'Dana R.', 
      role: 'Dental clinic owner', 
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250&h=250',
      color: 'from-blue-600 to-sky-700' 
    },
    { 
      quote: 'The WhatsApp Mint briefing is the first thing I listen to every morning. It tells me exactly what earned overnight.', 
      name: 'Marcus T.', 
      role: 'Business coach', 
      image: '/marcus.jpg',
      color: 'from-blue-600 to-indigo-700' 
    },
    { 
      quote: 'Set it up in nine questions. Four hours later it had already minted two $2,400 retainers.', 
      name: 'Priya K.', 
      role: 'Marketing agency owner', 
      image: '/priya.jpg',
      color: 'from-indigo-600 to-purple-700' 
    }
  ];

  const pricingFeatures = [
    'Full ProfitMint Revenue Dashboard',
    'MintTrace™ Income Attribution',
    'Autonomous Revenue Minting Pipeline',
    'Autonomous Closing Vault (6-Stages)',
    'Daily WhatsApp Mint Briefing',
    'AI Search Mint (AEO) for 5 Services',
    'Compound ProfitMint Learning (4H Cycles)',
    'Zero Monthly Subscription Fees'
  ];

  const faqs = [
    { q: 'Do I need an affiliate account to use this?', a: 'No. ProfitMint AI is built for service business owners selling their own services — dental, coaching, agencies, trades, and more. No affiliate setup required.' },
    { q: 'How long does setup take?', a: 'The guided setup takes under 10 minutes. Your first AI intelligence cycle runs approximately 4 hours after launch.' },
    { q: 'Will I know which actions are actually making money?', a: 'Yes — that is the core of the product. Every payment is matched to the AI action that produced it, with a 1–5 confidence score.' },
    { q: 'Is this a subscription?', a: 'The core plan shown here is a single $47 one-time payment. Optional agency or multi-seat upgrades are offered separately after checkout.' },
    { q: 'What if it does not work for my business?', a: 'ProfitMint AI comes with an ironclad 30-day money-back guarantee — zero risk to launch.' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative overflow-x-hidden selection:bg-blue-500/20 selection:text-slate-900" style={{ zoom: 0.7 }}>
      
      {/* GLOBAL SVG DEFS */}
      <svg className="hidden">
        <defs>
          <pattern id="gen-wire-mesh" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>
      
      <div className="relative z-10">

        {/* ANNOUNCEMENT BAR (Clean Dark Charcoal / Blue Accent) */}
        <div className="bg-slate-900 py-2.5 px-4 border-b border-slate-800 text-slate-200">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium">
            <span className="bg-blue-500/20 border border-blue-400/40 px-2.5 py-0.5 rounded-full font-extrabold text-blue-300 uppercase text-[10px] tracking-wider">
              JVZOO + LAUNCHPAD
            </span>
            <span className="text-slate-300 font-semibold">{launchEditionText}</span>
            <span className="opacity-30 text-slate-500">•</span>
            <span className="text-slate-300">Projected EPS: <strong className="text-blue-400 font-bold">$214</strong> per buyer (Full Funnel)</span>
          </div>
        </div>

        {/* STICKY NAV (Crisp White) */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ProfitMintLogo className="w-9 h-9" />
              <div>
                <div className="font-black text-lg tracking-tight text-slate-900">
                  ProfitMint <span className="text-blue-600">AI</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Autonomous Growth Engine
                </div>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#how" className="hover:text-blue-600 transition-colors">How it works</a>
              <a href="#calculator" className="hover:text-blue-600 transition-colors">ROI Calculator</a>
              <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
            </nav>

            {/* Right Nav Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleMuteToggle}
                className="p-2 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title={muted ? "Unmute sound" : "Mute sound"}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button 
                onClick={() => { playClickPop(); onGoToLogin(); }}
                className="hidden sm:inline-flex text-sm font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 transition-colors cursor-pointer"
              >
                Log in
              </button>

              <button 
                onClick={() => handleCtaClick('wizard')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-xs transition-all hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
              >
                Get Started — $47 <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>

              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-700 hover:text-slate-900"
              >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-3 text-sm">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-1 text-slate-700 font-medium">Features</a>
            <a href="#how" onClick={() => setMobileMenuOpen(false)} className="py-1 text-slate-700 font-medium">How it works</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="py-1 text-slate-700 font-medium">ROI Calculator</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="py-1 text-slate-700 font-medium">Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1 text-slate-700 font-medium">FAQ</a>
            <div className="pt-2 border-t border-slate-200 flex gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); onGoToLogin(); }}
                className="flex-1 py-2 bg-slate-100 rounded-lg text-center text-slate-800 font-semibold"
              >
                Log in
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); handleCtaClick('wizard'); }}
                className="flex-1 py-2 bg-blue-600 text-white font-extrabold rounded-lg text-center"
              >
                Get Started $47
              </button>
            </div>
          </div>
        )}
      </header>

      {/* LIVE AGENT FEED TICKER */}
      <section className="bg-[#070a13] border-b border-[#1b253b] py-3 text-slate-200 shadow-2xl relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Live Indicator Header */}
            <div className="shrink-0 flex items-center gap-3 pr-3 border-r border-[#1e293b]">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${liveStreamActive ? 'bg-emerald-400 opacity-75' : 'bg-slate-500 opacity-50'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${liveStreamActive ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black tracking-wider text-white uppercase whitespace-nowrap flex items-center gap-1.5 font-mono">
                  <Radio className={`w-3.5 h-3.5 ${liveStreamActive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} /> LIVE AGENT FEED
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#1e293b] text-[10px] font-mono text-blue-400 font-bold border border-[#334155]">
                  {liveEventCount.toLocaleString()} Events
                </span>
              </div>
            </div>

            {/* Scrolling ticker marquee */}
            <div className="overflow-hidden flex-1 relative [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] py-1 min-w-[200px]">
              <div 
                className="flex gap-6 whitespace-nowrap min-w-max hover:[animation-play-state:paused] py-0.5"
                style={{
                  animationName: 'tickerMarquee',
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDuration: tickerSpeed === 'slow' ? '110s' : tickerSpeed === 'fast' ? '28s' : '55s',
                  animationPlayState: liveStreamActive ? 'running' : 'paused'
                }}
              >
                {[...tickerItems, ...tickerItems].map((tk, idx) => {
                  const isSelected = expandedTickerKey === tk.key;
                  return (
                    <button 
                      key={idx}
                      onClick={() => { 
                        playHoverTick(); 
                        setExpandedTickerKey(isSelected ? null : tk.key); 
                      }}
                      className={`inline-flex items-center gap-2.5 text-xs transition-all cursor-pointer text-left px-3.5 py-1.5 rounded-lg border font-mono ${
                        isSelected 
                          ? 'bg-blue-950/90 border-[#3b82f6] text-white font-bold shadow-lg shadow-blue-500/20 ring-1 ring-[#3b82f6]' 
                          : 'border-[#1e293b] bg-[#0d1527]/80 text-slate-300 hover:text-white hover:bg-[#16223b] hover:border-[#334155]'
                      }`}
                    >
                      <span className="text-slate-400 text-[11px] font-semibold">{tk.time}</span>
                      <span className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded bg-[#1e3a8a]/50 text-[#93c5fd] border border-[#2563eb]/40">
                        {tk.tag}
                      </span>
                      <span className="text-slate-200 font-medium font-sans text-xs">{tk.text}</span>
                      {tk.isNew && (
                        <span className="text-[9px] font-black text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 uppercase animate-pulse">
                          LIVE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side indicator when unexpanded vs expanded */}
            <div className="flex items-center shrink-0 gap-2 pl-1">
              {!selectedTicker ? (
                <span className="text-[10px] text-slate-400 font-mono font-bold bg-[#0d1527] px-3 py-1 rounded-full border border-[#1e293b] shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span> Click event to inspect
                </span>
              ) : (
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> INSPECTOR ACTIVE
                </span>
              )}
            </div>
          </div>

          {/* Ticker Inspector Drawer/Modal if selected - CONTROLS & BUTTONS REVEALED HERE */}
          {selectedTicker && (
            <div className="mt-3 p-5 bg-[#0b1324] border border-[#1e293b] rounded-2xl space-y-4 text-xs animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl text-slate-100 relative">
              
              {/* TOP CONTROL TOOLBAR (Only shown when expanded) */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#070b16] rounded-xl border border-[#1e293b]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Feed Stream Controls:</span>
                  
                  {/* Pause / Play Toggle Button */}
                  <button
                    onClick={() => {
                      playHoverTick();
                      setLiveStreamActive(!liveStreamActive);
                    }}
                    className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                      liveStreamActive
                        ? 'bg-amber-950/50 border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
                        : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60'
                    }`}
                    title={liveStreamActive ? "Pause ticker feed" : "Play ticker feed"}
                  >
                    {liveStreamActive ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{liveStreamActive ? 'PAUSE TICKER' : 'RESUME TICKER'}</span>
                  </button>

                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-[#0b1324] p-1 rounded-lg border border-[#1e293b]">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase px-1">Speed:</span>
                    {(['slow', 'normal', 'fast'] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() => {
                          playHoverTick();
                          setTickerSpeed(spd);
                        }}
                        className={`px-2.5 py-0.5 text-[10px] font-mono font-extrabold uppercase rounded transition-all cursor-pointer ${
                          tickerSpeed === spd
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        {spd === 'slow' ? 'Slow' : spd === 'normal' ? 'Normal' : 'Fast'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => setExpandedTickerKey(null)}
                  className="text-slate-400 hover:text-white text-xs font-bold bg-[#1e293b] hover:bg-[#334155] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-[#334155]"
                >
                  <span>Close Inspector</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* GRID DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Box 1: Node Info */}
                <div className="bg-[#070b16] p-4 rounded-xl border border-[#1e293b] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black px-2.5 py-1 rounded bg-[#1e3a8a]/60 text-[#93c5fd] border border-[#2563eb]/40 font-mono">
                        {selectedTicker.tag}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 tracking-wider flex items-center gap-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        ACTIVE NODE
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">EVENT ID</div>
                    <div className="font-mono text-white text-sm mb-2.5 font-black">{selectedTicker.eventId}</div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">STATUS / POLICY</div>
                    <div className="font-mono text-[#60a5fa] text-xs font-bold">{selectedTicker.policy}</div>
                  </div>
                </div>

                {/* Box 2: AI Reasoning Audit */}
                <div className="bg-[#070b16] p-4 rounded-xl border border-[#1e293b] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] font-extrabold text-[#93c5fd] tracking-wider uppercase mb-2 flex items-center gap-1.5 font-mono">
                      <Brain className="w-4 h-4 text-[#3b82f6]" /> AI REASONING AUDIT
                    </div>
                    <p className="text-slate-200 italic leading-relaxed text-xs sm:text-sm font-medium">
                      "{selectedTicker.reasoning}"
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] text-slate-400 font-mono">
                    Autonomous Execution Decision • Policy Validated
                  </div>
                </div>

                {/* Box 3: Metrics & Actions */}
                <div className="bg-[#070b16] p-4 rounded-xl border border-[#1e293b] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 font-mono">EVENT METRICS</div>
                    <div className="space-y-2">
                      {selectedTicker.metrics.map((m: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-medium">{m.label}:</span>
                          <span className="font-bold text-white font-mono">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-[#1e293b]">
                    <button
                      onClick={() => { playSuccessChime(); }}
                      className="text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current text-blue-400" />
                      <span>Replay Action</span>
                    </button>
                  </div>
                </div>

              </div>


            </div>
          )}
        </div>
      </section>

      {/* HERO SECTION (Soft Slate Grey Canvas) */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-b border-slate-200/80 text-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-300 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-blue-900">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              World's first income-proven AI growth agent
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] text-left">
              The First Ever 100% Autonomous <span className="text-blue-600">AI Client Acquisition Engine.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-left font-normal">
              ProfitMint AI finds high-value leads, audits target websites for conversion flaws, generates 60-second AI video proposals, and closes clients on 24/7 autopilot — with 100% revenue attribution.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button 
                onClick={() => handleCtaClick('wizard')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-base px-8 py-4 rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                Launch AI Client Acquisition — $47 <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              One-time payment · Live in under 10 minutes · No affiliate account needed
            </p>

            {/* Social Proof */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-slate-800">Agency & Service Owners</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> 1,480+ AI Video Proposals Sent Today
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <DollarSign className="w-4 h-4 text-blue-600" /> $4,280 Closed Today
              </div>
            </div>

            {/* Process Step Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Auto Prospector', 'SEO & Pixel Audit', 'AI Video Proposals', 'WhatsApp Voice Pitch', 'Auto-Closing', '100% Attribution'].map((step, i) => (
                <span key={i} className="bg-white border border-slate-200/80 text-slate-700 text-xs px-2.5 py-1 rounded-md font-semibold shadow-xs">
                  ✓ {step}
                </span>
              ))}
            </div>

          </div>

          {/* Right Hero Visual / Mascot */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <AgentHeroIllustration />
            </div>
          </div>

        </div>



      </section>
      
      {/* BENEFIT GRID (4 Rich Core Benchmark Cards) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3 max-w-4xl mx-auto overflow-hidden">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block">
              CORE CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight pt-1 whitespace-nowrap">
              Engineered for Autonomous Client Acquisition
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* CARD 1: Autonomous Revenue Minting */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg border border-slate-200/80 shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between text-center group"
            >
              {/* TOP PREVIEW GRAPHIC BOX */}
              <div className="bg-slate-200/50 shadow-inner rounded-md p-4 h-[200px] w-full flex flex-col justify-center items-center relative overflow-hidden border border-slate-200/70 mb-5 select-none">
                <div className="w-full flex flex-col justify-center items-center gap-2">
                  {/* Search Header Bar */}
                  <div className="w-full bg-[#e0f2fe]/80 rounded-xl p-2 border border-sky-200/70 flex items-center justify-between gap-1 text-[10px]">
                    <div className="bg-white px-2.5 py-1 rounded-md text-slate-700 font-bold shadow-2xs flex-1 text-left flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-500" />
                      <span>Mint Target</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded-md text-slate-500 font-medium shadow-2xs">Live</div>
                    <div className="bg-white px-2 py-1 rounded-md text-slate-500 font-medium shadow-2xs">Scored</div>
                  </div>
                  {/* Lower Card */}
                  <div className="w-full bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm flex items-center justify-between text-left">
                    <div>
                      <div className="text-[11px] font-black text-slate-900">+150 Revenue Opportunities Found</div>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden border border-slate-200/60">
                        <div className="bg-emerald-500 h-full w-[85%]" />
                      </div>
                    </div>
                    <div className="flex items-center -space-x-2 shrink-0">
                      <img src="/sarah.jpg" alt="Lead" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                      <img src="/marcus.jpg" alt="Lead" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-black border-2 border-white shadow-2xs">$$</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Autonomous Revenue Minting
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[220px] mx-auto">
                  High-intent opportunities minted daily on total autopilot.
                </p>
              </div>
            </motion.div>

            {/* CARD 2: AI Video Revenue Pitches */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg border border-slate-200/80 shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between text-center group"
            >
              {/* TOP PREVIEW GRAPHIC BOX */}
              <div className="bg-slate-200/50 shadow-inner rounded-md p-4 h-[200px] w-full flex flex-col justify-center items-center relative overflow-hidden border border-slate-200/70 mb-5 select-none">
                <div className="w-full flex flex-col justify-center items-center gap-2 relative">
                  {/* Outcome Action Card */}
                  <div className="w-full bg-white rounded-xl p-2.5 border border-orange-200 shadow-sm space-y-1.5 text-left relative pt-3">
                    {/* Glowing Orange Pill Badge */}
                    <div className="absolute -top-3 left-3 bg-[#f97316] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-orange-400">
                      <Mail className="w-2.5 h-2.5 stroke-[2.5]" /> Auto Follow-Up
                    </div>
                    <div className="space-y-1 text-[9px] font-semibold text-slate-700">
                      <div className="flex items-center justify-between bg-slate-50 p-1 rounded border border-slate-100">
                        <span>Mark as qualified</span>
                        <div className="w-5 h-3 bg-emerald-500 rounded-full flex items-center justify-end px-0.5"><div className="w-2 h-2 bg-white rounded-full" /></div>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 p-1 rounded border border-slate-100">
                        <span>Move to booking step</span>
                        <div className="w-5 h-3 bg-emerald-500 rounded-full flex items-center justify-end px-0.5"><div className="w-2 h-2 bg-white rounded-full" /></div>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 p-1 rounded border border-slate-100">
                        <span>Stop sequence if successful</span>
                        <div className="w-5 h-3 bg-slate-300 rounded-full flex items-center justify-start px-0.5"><div className="w-2 h-2 bg-white rounded-full" /></div>
                      </div>
                    </div>
                  </div>
                  {/* Contact Call Bar */}
                  <div className="w-full bg-white rounded-xl p-2 border border-slate-200 shadow-md flex items-center justify-between text-left text-[10px]">
                    <div className="flex items-center gap-2">
                      <img src="/sarah.jpg" alt="Elena" className="w-6 h-6 rounded-full border border-slate-200 object-cover" />
                      <div>
                        <div className="font-extrabold text-slate-900 text-[10px] flex items-center gap-1">Elena Rodriguez <span className="text-blue-600">✓</span></div>
                        <div className="text-[8px] text-emerald-600 font-bold">Completed call 03:01 AM</div>
                      </div>
                    </div>
                    <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600">
                      <Phone className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  AI Video Revenue Pitches
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[220px] mx-auto">
                  AI-synthesized video audits that close clients on command.
                </p>
              </div>
            </motion.div>

            {/* CARD 3: The Revenue Dashboard */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg border border-slate-200/80 shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between text-center group"
            >
              {/* TOP PREVIEW GRAPHIC BOX */}
              <div className="bg-slate-200/50 shadow-inner rounded-md p-4 h-[200px] w-full flex flex-col justify-center items-center relative overflow-hidden border border-slate-200/70 mb-5 select-none">
                <div className="w-full flex flex-col justify-center items-center gap-2">
                  {/* Inbox Card */}
                  <div className="w-full bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm text-left space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-black text-slate-800 border-b border-slate-100 pb-1">
                      <span>Agent Campaign</span>
                      <span className="text-slate-400 font-normal">Overview  <strong className="text-blue-600">Inbox</strong>  Sequences</span>
                    </div>
                    <div className="text-[8px] font-bold text-slate-400 pt-0.5">Filter: Channel</div>
                    <div className="space-y-1 pt-0.5">
                      <div className="text-[9px] text-slate-700 flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1">Sarah Park <span className="text-blue-600">✓</span></span>
                        <span className="text-[8px] text-slate-400 font-mono">03:01 AM</span>
                      </div>
                      <div className="text-[8px] text-slate-500 line-clamp-1 bg-slate-50 p-1 rounded border border-slate-100">
                        Good day Mr. Crest, we are ready to proceed...
                      </div>
                    </div>
                  </div>
                  {/* Pills Bar */}
                  <div className="flex items-center justify-center gap-1.5 w-full">
                    <span className="bg-white border border-slate-200 px-2 py-0.5 rounded-xl text-[9px] font-bold text-slate-700 shadow-2xs flex items-center gap-1"><Phone className="w-2.5 h-2.5 text-blue-600" /> Calls</span>
                    <span className="bg-white border border-slate-200 px-2 py-0.5 rounded-xl text-[9px] font-bold text-slate-700 shadow-2xs flex items-center gap-1"><Mail className="w-2.5 h-2.5 text-emerald-600" /> Emails</span>
                    <span className="bg-white border border-slate-200 px-2 py-0.5 rounded-xl text-[9px] font-bold text-slate-700 shadow-2xs flex items-center gap-1"><MessageSquare className="w-2.5 h-2.5 text-amber-500" /> Chats</span>
                  </div>
                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  The Revenue Dashboard
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[220px] mx-auto">
                  Real-time income tracking with 100% attribution.
                </p>
              </div>
            </motion.div>

            {/* CARD 4: MintTrace™ Proof Engine */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg border border-slate-200/80 shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between text-center group"
            >
              {/* TOP PREVIEW GRAPHIC BOX */}
              <div className="bg-slate-200/50 shadow-inner rounded-md p-4 h-[200px] w-full flex flex-col justify-center items-center relative overflow-hidden border border-slate-200/70 mb-5 select-none">
                <div className="w-full flex flex-col justify-center items-center gap-2 relative">
                  {/* Chat Bubble 1 */}
                  <div className="w-full bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm text-left space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 font-extrabold text-slate-900">
                        <img src="/avatar_1.jpg" alt="Sarah" className="w-5 h-5 rounded-full object-cover shadow-sm" />
                        Sarah Park <span className="text-blue-600">✓</span>
                      </div>
                      <span className="text-[8px] text-slate-400 font-mono">03:01 AM</span>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-lg text-[9px] text-slate-700 font-medium">
                      Yea, i am purchasing the retainer...
                    </div>
                  </div>
                  {/* Chat Skeleton 2 */}
                  <div className="w-full bg-white/90 rounded-xl p-2 border border-slate-200 shadow-2xs text-left flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[8px] font-black">SK</div>
                      <div className="space-y-1">
                        <div className="h-2 bg-slate-200 rounded w-20" />
                        <div className="h-1.5 bg-slate-100 rounded w-14" />
                      </div>
                    </div>
                    <span className="text-blue-600 text-[10px] font-bold">✓</span>
                  </div>

                  {/* Floating 3D Pop Badge */}
                  <div className="absolute -top-1 -right-1 bg-[#22c55e] text-white p-2 rounded-xl shadow-lg font-black text-xs flex items-center justify-center border-2 border-white rotate-6">
                    <DollarSign className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 bg-[#a3e635] text-slate-950 p-1.5 rounded-xl shadow-md font-extrabold text-[10px] flex items-center gap-1 border-2 border-white -rotate-6">
                    <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>3-5x</span>
                  </div>
                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  MintTrace™ Proof Engine
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[220px] mx-auto">
                  Every dollar traced back to the AI action that earned it.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ComparisonSection />

      {/* DETAILED WORKFLOW (The "How" Section) */}

      {/* FEATURES / 7 ENGINES SECTION */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden border-y border-slate-200">
        {/* Radar Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          {/* Mascot behind the wheel */}
          <div className="absolute inset-0 top-[260px] md:top-[20%] flex items-start md:items-center justify-center opacity-75 z-0 scale-100">
            <img src="/mascot.png" alt="Mascot" className="h-auto max-h-[800px] w-auto object-contain" />
          </div>
          
          <div className="absolute inset-0 top-[260px] md:top-0 flex items-start md:items-center justify-center opacity-[0.60] z-10">
            <svg width="1000" height="1000" viewBox="0 0 1000 1000" className="animate-[spin_30s_linear_infinite]">
            <circle cx="500" cy="500" r="150" fill="none" stroke="#605bff" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="500" cy="500" r="250" fill="none" stroke="#605bff" strokeWidth="1" />
            <circle cx="500" cy="500" r="350" fill="none" stroke="#605bff" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="500" cy="500" r="450" fill="none" stroke="#605bff" strokeWidth="2" strokeDasharray="2 10" />
            <line x1="500" y1="0" x2="500" y2="1000" stroke="#605bff" strokeWidth="1" />
            <line x1="0" y1="500" x2="1000" y2="500" stroke="#605bff" strokeWidth="1" />
            <line x1="146" y1="146" x2="854" y2="854" stroke="#605bff" strokeWidth="1" />
            <line x1="146" y1="854" x2="854" y2="146" stroke="#605bff" strokeWidth="1" />
            <circle cx="500" cy="250" r="4" fill="#605bff" />
            <circle cx="500" cy="750" r="4" fill="#605bff" />
            <circle cx="250" cy="500" r="4" fill="#605bff" />
            <circle cx="750" cy="500" r="4" fill="#605bff" />
          </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <span className="text-[10px] sm:text-xs font-bold text-[#605bff] uppercase tracking-widest bg-blue-50/90 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-200/50 shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#605bff] rounded-full" />
              7 ENGINES · ONE SYSTEM
            </span>
          </div>
          
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter italic mb-1">
            <span className="text-slate-900 mr-4">PROFITMINT</span><span className="text-[#605bff]">ENGINES</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto mb-[280px] -mt-1">
            Everything a client-acquisition team does — running while you sleep. Unlock hands-on AI execution and real-world results faster.
          </p>

          <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
            {(showAllFeatures ? pillars : pillars.slice(0, 3)).map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-[#e4fbf4] border border-[#c4eee0] rounded-[24px] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all group relative overflow-hidden"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-400/10 shadow-inner flex items-center justify-center shrink-0 border border-slate-300/30 group-hover:bg-white transition-colors z-10 relative">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-slate-500 group-hover:text-[#605bff] transition-colors" />
                  </div>
                  <div className="flex-1 text-left z-10 relative">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#605bff] transition-colors">{p.name}</h3>
                      <span className="hidden sm:inline-flex text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pr-8">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="bg-[#605bff] hover:bg-[#4d48db] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-[#605bff]/30 transition-all flex items-center gap-2 group"
            >
              {showAllFeatures ? 'SHOW LESS' : 'EXPLORE ALL FEATURES'}
              <ArrowRight className={`w-4 h-4 transition-transform ${showAllFeatures ? '-rotate-90' : 'group-hover:translate-x-1'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12 text-left">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight pt-1">
              Live in under 10 minutes. Working within 4 hours.
            </h2>
          </div>

          {/* 3 BENCHMARK STEP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* STEP 01 */}
            <div className="bg-white rounded-lg border border-slate-200/80 shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden">
              {/* TOP PREVIEW GRAPHIC BOX */}
              <div className="bg-slate-200/50 shadow-inner rounded-md p-4 h-[240px] w-full flex flex-col relative overflow-hidden border border-slate-200/70 mb-5 select-none">
                <div className="flex justify-end w-full shrink-0">
                  <div className="bg-slate-900 text-white font-black text-xs px-2.5 py-1 rounded-xl shadow-md border border-slate-800 z-10">
                    01
                  </div>
                </div>
                <div className="w-full flex-1 flex flex-col justify-center items-center gap-2 relative z-0 mt-2">
                  {/* Onboarding Form Mockup */}
                  <div className="w-full bg-white rounded-xl p-3 border border-slate-200 shadow-sm space-y-2 text-left">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-slate-900 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-600" /> Onboarding Setup
                      </span>
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Question 3 of 9</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-[33%]" />
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-[10px] space-y-1">
                      <div className="font-bold text-slate-700">What is your ideal client niche?</div>
                      <div className="bg-white px-2 py-1 rounded border border-blue-300 text-blue-900 font-bold flex items-center justify-between text-[9px] shadow-2xs">
                        <span>Dental clinics & medical practices</span>
                        <CheckCircle className="w-3 h-3 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  {/* Connected Stripe/Calendar Pill */}
                  <div className="w-full bg-emerald-50 rounded-xl p-2 border border-emerald-200 shadow-xs flex items-center justify-between text-[10px]">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Stripe & Calendar Connected
                    </span>
                    <span className="text-[8px] bg-emerald-600 text-white font-black px-1.5 py-0.5 rounded">Active</span>
                  </div>
                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">01</span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Answer 9 quick questions
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Tell it your business, your ideal client, and connect payments. Zero coding or complex API setup needed.
                </p>
              </div>
            </div>

            {/* STEP 02 */}
            <div className="bg-white rounded-lg border border-slate-200/80 shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden">
              {/* TOP PREVIEW GRAPHIC BOX */}
              <div className="bg-slate-200/50 shadow-inner rounded-md p-4 h-[240px] w-full flex flex-col relative overflow-hidden border border-slate-200/70 mb-5 select-none">
                <div className="flex justify-end w-full shrink-0">
                  <div className="bg-slate-900 text-white font-black text-xs px-2.5 py-1 rounded-xl shadow-md border border-slate-800 z-10">
                    02
                  </div>
                </div>
                <div className="w-full flex-1 flex flex-col justify-center items-center gap-2 relative z-0 mt-2">
                  {/* Automated Execution Pipeline */}
                  <div className="w-full bg-white rounded-xl p-2.5 border border-slate-200 shadow-sm space-y-2 text-left">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 font-extrabold text-slate-900">
                        <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> AI Autopilot Engine
                      </div>
                      <span className="text-[8px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 6/6 Active
                      </span>
                    </div>
                    {/* Pipeline Mini Nodes */}
                    <div className="grid grid-cols-3 gap-1.5 text-[8px] font-extrabold text-center">
                      <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-lg text-blue-800">
                        1. Scrape & Score
                      </div>
                      <div className="bg-indigo-50 border border-indigo-200 p-1.5 rounded-lg text-indigo-800">
                        2. AI Voice & Video
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 p-1.5 rounded-lg text-emerald-800">
                        3. E-Sign & Close
                      </div>
                    </div>
                  </div>
                  {/* Floating Action Card */}
                  <div className="w-full bg-slate-900 text-white rounded-xl p-2 border border-slate-800 shadow-md flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[8px]">AI</div>
                      <span className="font-bold text-[9px]">Video Proposal Sent to Apex Dental</span>
                    </div>
                    <span className="text-[8px] text-emerald-400 font-mono font-bold">$4,800/mo</span>
                  </div>
                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">02</span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    AI runs the full pipeline
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Finds leads, reaches out, pre-qualifies, books calls, sends video proposals, and closes with e-signature.
                </p>
              </div>
            </div>

            {/* STEP 03 */}
            <div className="bg-white rounded-lg border border-slate-200/80 shadow-xl shadow-slate-300/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden">
              {/* TOP PREVIEW GRAPHIC BOX */}
              <div className="bg-slate-200/50 shadow-inner rounded-md p-4 h-[240px] w-full flex flex-col relative overflow-hidden border border-slate-200/70 mb-5 select-none">
                <div className="flex justify-end w-full shrink-0">
                  <div className="bg-slate-900 text-white font-black text-xs px-2.5 py-1 rounded-xl shadow-md border border-slate-800 z-10">
                    03
                  </div>
                </div>
                <div className="w-full flex-1 flex flex-col justify-center items-center relative z-0">
                  
                  <div className="w-full h-full flex flex-col justify-end p-2 sm:p-3 bg-[#efeae2] rounded-xl relative overflow-hidden border border-slate-200 shadow-sm mt-2">
                    {/* Fake chat background */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                    
                    <div className="w-[85%] self-start bg-white rounded-2xl rounded-tl-sm p-2 sm:p-2.5 shadow-sm relative z-10 mb-2 border border-slate-100">
                      <div className="text-[9px] sm:text-[10px] font-black text-emerald-600 mb-1">ProfitMint AI</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-700 leading-snug">
                        Morning! Added $4,800 to pipeline overnight. 2 calls booked.
                      </div>
                      <div className="text-[7px] sm:text-[8px] text-slate-400 text-right mt-1 font-medium">07:59 AM</div>
                    </div>

                    <div className="w-[95%] self-end bg-[#dcf8c6] rounded-2xl rounded-tr-sm p-2 sm:p-2.5 shadow-sm relative z-10 border border-[#cde8b8] mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Play className="w-3 h-3 ml-0.5 fill-current" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-0.5 h-4 sm:h-5">
                            {[30, 50, 40, 80, 60, 100, 40, 70, 30, 90, 50, 60, 30, 80, 40].map((h, idx) => (
                              <div key={idx} className={`flex-1 rounded-full ${idx < 5 ? 'bg-emerald-500' : 'bg-emerald-300'}`} style={{ height: `${h}%` }} />
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[8px] sm:text-[9px] text-emerald-700 font-bold">0:42</span>
                            <div className="flex items-center gap-1">
                              <span className="text-[7px] sm:text-[8px] text-emerald-700 font-medium">08:00 AM</span>
                              <span className="text-blue-500 text-[8px] font-bold tracking-tighter">✓✓</span>
                            </div>
                          </div>
                        </div>
                        <img src="/avatar_1.jpg" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-emerald-100 shadow-sm object-cover" alt="Agent" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">03</span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    You get a voice briefing
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Every morning on WhatsApp: what earned overnight, what is booked, and what needs your approval.
                </p>
              </div>
            </div>
          </div>

          {/* PIPELINE AUTOPILOT STAGE VISUAL */}
          <div className="bg-slate-900 rounded-xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
              <div>
                <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  REAL-TIME PIPELINE ENGINE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-2">
                  The client pipeline on 24/7 autopilot
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/80 text-xs font-bold text-emerald-400 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Automated Metrics
              </div>
            </div>

            {/* STAGE GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 relative z-10">
              {[
                { name: 'Found', count: 38, pct: 100, color: 'from-blue-600 to-sky-500', icon: Search },
                { name: 'Contacted', count: 24, pct: 63, color: 'from-sky-500 to-indigo-500', icon: Mail },
                { name: 'Replied', count: 11, pct: 29, color: 'from-indigo-500 to-purple-500', icon: MessageSquare },
                { name: 'Booked', count: 6, pct: 16, color: 'from-purple-500 to-pink-500', icon: Calendar },
                { name: 'Proposal', count: 4, pct: 11, color: 'from-amber-500 to-orange-500', icon: CheckSquare },
                { name: 'Closed', count: 2, pct: 5, color: 'from-emerald-500 to-teal-400', icon: DollarSign }
              ].map((st, i) => {
                const Icon = st.icon;
                return (
                  <div key={i} className="bg-slate-800/90 hover:bg-slate-800 rounded-lg p-4 border border-slate-700/80 text-center space-y-2.5 transition-all duration-300 group hover:-translate-y-1 hover:border-slate-600 shadow-md">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                      <span>{st.name}</span>
                      <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">{st.count}</div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
                      <div className={`h-full rounded-full bg-gradient-to-r ${st.color}`} style={{ width: `${st.pct}%` }} />
                    </div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{st.pct}% conversion</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-10 text-left">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Calculator className="w-4 h-4" /> INTERACTIVE REVENUE CALCULATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              See what's truly possible for your business
            </h2>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-lg border border-slate-200 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Sliders */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">Average deal / retainer value</span>
                  <span className="text-blue-700 text-sm font-mono">${roiDealValue.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={roiDealValue}
                  onChange={(e) => { playHoverTick(); setRoiDealValue(Number(e.target.value)); }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">New leads per month</span>
                  <span className="text-blue-700 text-sm font-mono">{roiLeads}</span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="1500"
                  step="10"
                  value={roiLeads}
                  onChange={(e) => { playHoverTick(); setRoiLeads(Number(e.target.value)); }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">Conversion rate</span>
                  <span className="text-blue-700 text-sm font-mono">{roiConversion}%</span>
                </div>
                <input 
                  type="range"
                  min="3"
                  max="25"
                  step="1"
                  value={roiConversion}
                  onChange={(e) => { playHoverTick(); setRoiConversion(Number(e.target.value)); }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Result Box (Dark Charcoal Accent) */}
            <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 text-center space-y-3 text-white shadow-xl relative overflow-hidden">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Projected Monthly Revenue</div>
              <div className="text-4xl sm:text-5xl font-black text-blue-400 font-mono">
                ${projectedMonthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-2">
                ProfitMint AI finds the leads, follows up, and closes — automatically, every single month.
              </p>
              <button 
                onClick={() => handleCtaClick('wizard')}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Claim This Pipeline — $47
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-12 text-left">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">EARLY ACCESS OWNERS</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Real service owners. Real attributed revenue.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-md border border-slate-200 space-y-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
                <div className="space-y-3">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  {t.image ? (
                    <img 
                      src={t.image} 
                      alt={t.name}
                      referrerPolicy="no-referrer" 
                      className="w-11 h-11 rounded-full object-cover border-2 border-slate-200/90 shadow-sm shrink-0" 
                    />
                  ) : (
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-white text-sm shadow-xs shrink-0`}>
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      {t.name}
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-1.5 py-0.2 rounded-md border border-emerald-200">Verified</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE & SECURITY SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200 bg-slate-50/80">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-700 uppercase tracking-widest bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
                <Shield className="w-3.5 h-3.5" /> ENTERPRISE SAFETY
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
                Compliance &<br />
                <span className="text-slate-400 font-extrabold">Security</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
                GDPR-friendly capture, TCPA consent, unsubscribe controls, DNC lists, domain verification, number reputation monitoring, and audit logs.
              </p>

              {/* Security Pill Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'GDPR-friendly capture',
                  'TCPA consent',
                  'Unsubscribe controls',
                  'DNC lists',
                  'Domain verification',
                  'Number reputation monitoring',
                  'Audit logs'
                ].map((item, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-700"
                  >
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 stroke-[2.5]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: 4 Enterprise Compliance Badges */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center justify-center">
              
              {/* Badge 1: SOC 2 */}
              <div className="bg-white border border-slate-200/90 rounded-lg p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-2.5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group min-h-[150px]">
                <div className="w-16 h-16 rounded-full border-2 border-slate-800 flex flex-col items-center justify-center p-1 text-slate-900 font-sans relative group-hover:scale-105 transition-transform">
                  <span className="text-[7px] font-bold tracking-widest text-slate-500 uppercase leading-none">AICPA</span>
                  <span className="text-xs font-black tracking-tight text-slate-900 leading-tight">SOC 2</span>
                  <span className="text-[6px] font-extrabold text-slate-400 leading-none">TYPE II</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-slate-900">AICPA SOC 2</div>
                  <div className="text-[10px] text-slate-500 font-medium">Type II Certified</div>
                </div>
              </div>

              {/* Badge 2: ISO 27001 */}
              <div className="bg-white border border-slate-200/90 rounded-lg p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-2.5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group min-h-[150px]">
                <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                  {/* Eye Icon + Box Emblem */}
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] font-extrabold text-slate-400 tracking-wider leading-none">ISO 27001</div>
                    <div className="text-[9px] font-black text-slate-900 leading-tight">CERTIFIED</div>
                    <div className="text-[7px] font-medium text-slate-500 leading-none">by schellman</div>
                  </div>
                </div>
                <div className="space-y-0.5 pt-1">
                  <div className="text-xs font-black text-slate-900">ISO 27001</div>
                  <div className="text-[10px] text-slate-500 font-medium">Information Security</div>
                </div>
              </div>

              {/* Badge 3: GDPR */}
              <div className="bg-white border border-slate-200/90 rounded-lg p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-2.5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group min-h-[150px]">
                <div className="relative w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {/* Circle of 8 Stars */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-14 h-14 text-slate-300 fill-current" viewBox="0 0 100 100">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                        const rad = (angle * Math.PI) / 180;
                        const cx = 50 + 38 * Math.cos(rad);
                        const cy = 50 + 38 * Math.sin(rad);
                        return (
                          <polygon
                            key={idx}
                            points={`${cx},${cy - 3} ${cx + 1},${cy - 1} ${cx + 3},${cy - 1} ${cx + 1.5},${cy + 0.5} ${cx + 2},${cy + 3} ${cx},${cy + 1.5} ${cx - 2},${cy + 3} ${cx - 1.5},${cy + 0.5} ${cx - 3},${cy - 1} ${cx - 1},${cy - 1}`}
                            fill="#64748b"
                          />
                        );
                      })}
                    </svg>
                  </div>
                  <span className="text-xs font-black tracking-wider text-slate-900 relative z-10">GDPR</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-slate-900">GDPR Compliant</div>
                  <div className="text-[10px] text-slate-500 font-medium">EU Privacy Standards</div>
                </div>
              </div>

              {/* Badge 4: HIPAA / Medical Caduceus */}
              <div className="bg-white border border-slate-200/90 rounded-lg p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-2.5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group min-h-[150px]">
                <div className="w-12 h-12 flex items-center justify-center text-slate-800 group-hover:scale-105 transition-transform">
                  {/* Caduceus / Medical Icon SVG */}
                  <svg className="w-10 h-10 text-slate-800 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2a1 1 0 0 0-1 1v1.17c-.52-.11-1.05-.17-1.59-.17-2.43 0-4.41.9-4.41 2 0 .8.1 1.5.8 2.2-1.3.8-2.8 1.8-2.8 3.3 0 1.5 1.5 2.5 2.8 3.3-.7.7-.8 1.4-.8 2.2 0 1.1 1.98 2 4.41 2 .54 0 1.07-.06 1.59-.17V21a1 1 0 1 0 2 0v-1.17c.52.11 1.05.17 1.59.17 2.43 0 4.41-.9 4.41-2 0-.8-.1-1.5-.8-2.2 1.3-.8 2.8-1.8 2.8-3.3 0-1.5-1.5-2.5-2.8-3.3.7-.7.8-1.4.8-2.2 0-1.1-1.98-2-4.41-2-.54 0-1.07.06-1.59.17V3a1 1 0 0 0-1-1zm0 3.5c1.9 0 3 .5 3 1s-1.1 1-3 1-3-.5-3-1 1.1-1 3-1zm0 4.5c1.9 0 3 .5 3 1s-1.1 1-3 1-3-.5-3-1 1.1-1 3-1zm0 4.5c1.9 0 3 .5 3 1s-1.1 1-3 1-3-.5-3-1 1.1-1 3-1z"/>
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-slate-900">HIPAA Ready</div>
                  <div className="text-[10px] text-slate-500 font-medium">Healthcare Data Protection</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-12 text-left">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">TRANSPARENT PRICING</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              One price. No subscription. No affiliate account needed.
            </h2>
          </div>

          <div className="bg-white border-2 border-blue-600 rounded-xl p-8 sm:p-12 shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-blue-100 border border-blue-300 text-blue-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              ONE-TIME PAYMENT
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-black text-slate-900">ProfitMint AI Commercial</div>
              <div className="text-sm text-slate-500">Full autonomous client acquisition suite</div>
              <div className="text-5xl font-black text-slate-900 pt-2 font-mono">
                $47 <span className="text-base font-medium text-slate-500">one-time</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {pricingFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <button 
                onClick={() => handleCtaClick('wizard')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-4 rounded-xl shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                Get ProfitMint AI Now — $47 <ArrowRight className="w-5 h-5" />
              </button>
              <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
                <Shield className="w-4 h-4 text-blue-600" /> Protected by 30-day money-back guarantee
              </div>
            </div>

          </div>
        </div>
      </section>

      <FAQSection />

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Let your AI start earning tonight.
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Set up in 10 minutes. First intelligence cycle runs in 4 hours. Every single dollar proven.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => handleCtaClick('wizard')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black text-lg px-10 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] inline-flex items-center gap-2 cursor-pointer"
            >
              Get ProfitMint AI — $47 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ProfitMintLogo className="w-6 h-6" />
            <span className="font-bold text-white">ProfitMint AI</span>
            <span className="text-slate-400">— Autonomous Growth Engine</span>
          </div>
          <div className="text-slate-400">
            © 2026 Pextella. All rights reserved. · Terms · Privacy · Support
          </div>
        </div>
      </footer>

      </div>
    </div>
  );
}
