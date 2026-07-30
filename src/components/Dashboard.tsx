import React, { useState, useEffect } from 'react';
import { 
  Home, DollarSign, BarChart3, GitFork, ShieldCheck, Cpu, MessageSquare, 
  Settings, Users, TrendingUp, Calendar, FileText, CheckCircle, Zap, 
  Volume2, VolumeX, AlertTriangle, ArrowUpRight, Check, X, Search, RefreshCw, 
  HelpCircle, Sparkles, UserPlus, Play, Pause, ChevronRight, Share2, Award, 
  PhoneCall, Star, Download, Eye, Layers, Trash2, Mail
} from 'lucide-react';
import { 
  playClickPop, playHoverTick, playSuccessChime, playHeartbeatPulse, 
  playConfettiBurst, playNotificationSwoosh, toggleMute, getMuteState 
} from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { 
  UserProfile, Lead, Client, PipelineCard, IncomeTransaction, AgentAction,
  AttributionCard, GeoMonitoring, AeoContent, ApprovalsQueueItem, PulseLearningLog
} from '../types';

import { ProfitMintLogo } from './Logo';

interface DashboardProps {
  profile: UserProfile;
  onLogout: () => void;
}

export default function Dashboard({ profile, onLogout }: DashboardProps) {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'home' | 'feed' | 'analytics' | 'pipeline' | 'aeo' | 'predict' | 'growth' | 'intelligence' | 'approvals' | 'calendar' | 'proposals' | 'integrations' | 'voice' | 'affiliate' | 'agency' | 'settings'>('home');
  const [muted, setMuted] = useState(getMuteState());

  // Upgrades state (Addictive upsell mechanics)
  const [oto2Active, setOto2Active] = useState(profile.oto2Active);
  const [oto4Active, setOto4Active] = useState(profile.oto4Active);

  // Stats and state
  const [revenueToday, setRevenueToday] = useState(4850);
  const [totalRevenue, setTotalRevenue] = useState(24350);
  const [bookedCalls, setBookedCalls] = useState(12);
  const [totalLeads, setTotalLeads] = useState(312);
  const [heartbeatTimeLeft, setHeartbeatTimeLeft] = useState(14390); // countdown in seconds
  const [isPulseRunning, setIsPulseRunning] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; type: 'success' | 'info' | 'warning' }>>([]);

  // GitHub connection state
  const [githubConnected, setGithubConnected] = useState(true);
  const [githubRepo, setGithubRepo] = useState('raphgm/pmint');
  const [githubToken, setGithubToken] = useState('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');
  const [githubConnecting, setGithubConnecting] = useState(false);
  const [showGithubGuide, setShowGithubGuide] = useState(false);

  // Mock databases
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'lead-1',
      companyName: 'Wimpole Street Dental',
      contactName: 'Dr. Michael Vance',
      email: 'michael.vance@wimpoledental.co.uk',
      phone: '+44 20 7946 0192',
      linkedinUrl: 'https://linkedin.com/in/michael-vance-dental',
      niche: 'Dental Clinic',
      city: 'London',
      icpMatchScore: 94,
      mintPredictScore: 92,
      scoreFactors: { icpMatch: 95, painSignals: 90, timingSignals: 88, historicalConversion: 94 },
      priorityTier: 'hot',
      status: 'booked',
      source: 'lead_finder',
      createdAt: '2026-07-18T10:30:00Z'
    },
    {
      id: 'lead-2',
      companyName: 'Harley Medical Group',
      contactName: 'Sarah Jenkins',
      email: 'sjenkins@harleymedical.com',
      phone: '+44 20 7946 0852',
      linkedinUrl: 'https://linkedin.com/in/sarah-jenkins-hmg',
      niche: 'Cosmetic Surgery',
      city: 'London',
      icpMatchScore: 89,
      mintPredictScore: 85,
      scoreFactors: { icpMatch: 90, painSignals: 82, timingSignals: 85, historicalConversion: 83 },
      priorityTier: 'hot',
      status: 'proposed',
      source: 'lead_finder',
      createdAt: '2026-07-19T14:15:00Z'
    },
    {
      id: 'lead-3',
      companyName: 'Chelsea Aesthetic Clinic',
      contactName: 'James Sterling',
      email: 'j.sterling@chelseaaesthetics.co.uk',
      phone: '+44 20 7946 0441',
      linkedinUrl: 'https://linkedin.com/in/james-aesthetic-chelsea',
      niche: 'Medical Spa',
      city: 'London',
      icpMatchScore: 82,
      mintPredictScore: 78,
      scoreFactors: { icpMatch: 85, painSignals: 75, timingSignals: 80, historicalConversion: 72 },
      priorityTier: 'warm',
      status: 'contacted',
      source: 'inbound',
      createdAt: '2026-07-20T08:00:00Z'
    }
  ]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: 'client-1',
      leadId: 'lead-1',
      companyName: 'Wimpole Street Dental',
      contactName: 'Dr. Michael Vance',
      email: 'michael.vance@wimpoledental.co.uk',
      phone: '+44 20 7946 0192',
      serviceType: 'Invisalign Funnel Optimization',
      contractValue: 4500,
      contractSignedAt: '2026-07-19T17:40:00Z',
      status: 'active',
      relationshipScore: 9,
      totalRevenueAttributed: 4500,
      referralsGenerated: 2,
      createdAt: '2026-07-19T17:40:00Z'
    },
    {
      id: 'client-2',
      leadId: 'lead-0-old',
      companyName: 'Mayfair Laser Clinic',
      contactName: 'Chloe Bennett',
      email: 'bennett@mayfairlaser.com',
      phone: '+44 20 7946 0991',
      serviceType: 'Cosmetic Lead Finder System',
      contractValue: 12000,
      contractSignedAt: '2026-07-15T11:00:00Z',
      status: 'active',
      relationshipScore: 8,
      totalRevenueAttributed: 12000,
      referralsGenerated: 1,
      createdAt: '2026-07-15T11:00:00Z'
    }
  ]);

  const [attributionCards, setAttributionCards] = useState<AttributionCard[]>([
    {
      id: 'attr-1',
      transactionId: 'tx-1',
      cardText: "MintCloser closed Dr. Michael Vance on the Invisalign custom campaign -> earned £4,500 contract value.",
      amount: 4500,
      actionType: "heygen_proposal_docusign",
      actionTimestamp: "2026-07-19T17:40:00Z",
      confidenceScore: 5,
      shareCount: 4,
      createdAt: "2026-07-19T17:42:00Z"
    },
    {
      id: 'attr-2',
      transactionId: 'tx-2',
      cardText: "MintAEO local citations drove Chloe Bennett to book high-ticket laser consult -> earned £12,000 package.",
      amount: 12000,
      actionType: "perplexity_local_citation",
      actionTimestamp: "2026-07-15T11:00:00Z",
      confidenceScore: 4,
      shareCount: 11,
      createdAt: "2026-07-15T11:05:00Z"
    }
  ]);

  const [approvalsQueue, setApprovalsQueue] = useState<ApprovalsQueueItem[]>([
    {
      id: 'ap-1',
      actionType: 'outreach_sequence',
      title: 'Initialize 7-touch outreach to Sarah Jenkins',
      description: 'Will trigger custom tailored email sequences. AI predicts 85% opening likelihood.',
      targetLeadName: 'Sarah Jenkins',
      targetCompanyName: 'Harley Medical Group',
      expectedOutcome: 'Calendar Booking on Invisalign Consults',
      priority: 'high',
      status: 'pending',
      createdAt: '2026-07-20T11:30:00Z'
    },
    {
      id: 'ap-2',
      actionType: 'aeo_optimisation',
      title: 'Deploy optimized authority answers on "pain-free dentist London"',
      description: 'Reoptimizes blog structure via Vercel deploy to improve Perplexity citation chances.',
      targetLeadName: 'AI Shopping Agents',
      targetCompanyName: 'Google Maps Searchers',
      expectedOutcome: 'Top 3 Citation for Invisalign Niche',
      priority: 'medium',
      status: 'pending',
      createdAt: '2026-07-20T13:45:00Z'
    }
  ]);

  const [aeoMonitoring, setAeoMonitoring] = useState<GeoMonitoring[]>([
    { id: 'geo-1', targetQuery: 'best Invisalign London', checkDate: '2026-07-20', cited: true, citationPosition: 2, citationUrl: 'https://authority-reviews.net/brightsmile', rewriteRecommended: false, incomeAttributed: 4500, createdAt: '2026-07-20T00:00:00Z' },
    { id: 'geo-2', targetQuery: 'cosmetic dentist London reviews', checkDate: '2026-07-20', cited: true, citationPosition: 1, citationUrl: 'https://authority-reviews.net/brightsmile-co-uk', rewriteRecommended: false, incomeAttributed: 12000, createdAt: '2026-07-20T00:00:00Z' },
    { id: 'geo-3', targetQuery: 'emergency dental veneers London', checkDate: '2026-07-20', cited: false, rewriteRecommended: true, incomeAttributed: 0, createdAt: '2026-07-20T00:00:00Z' },
    { id: 'geo-4', targetQuery: 'teeth whitening clinic central London', checkDate: '2026-07-20', cited: true, citationPosition: 3, citationUrl: 'https://teethwhitening-hq.net', rewriteRecommended: false, incomeAttributed: 3500, createdAt: '2026-07-20T00:00:00Z' },
    { id: 'geo-5', targetQuery: 'pain-free dentist near London', checkDate: '2026-07-20', cited: false, rewriteRecommended: true, incomeAttributed: 0, createdAt: '2026-07-20T00:00:00Z' }
  ]);

  const [pulseLog, setPulseLog] = useState<PulseLearningLog[]>([
    {
      id: 'pulse-1',
      cycleId: 'cy-91',
      previousConfig: { coldEmailWeight: 0.4, inboundWeight: 0.3, aeoWeight: 0.3 },
      newConfig: { coldEmailWeight: 0.55, inboundWeight: 0.2, aeoWeight: 0.25 },
      claudeReasoning: "Based on real-time transaction ingestion, Wimpole Street Dental contract (£4,500) was linked directly to HeyGen video proposal outreach sequences. I have adjusted effort priorities: increasing Cold Emailing resources by +15% and de-prioritizing generic LinkedIn message chains.",
      income7dBefore: 12000,
      income7dAfter: 16500,
      performanceDelta: 37.5,
      createdAt: '2026-07-19T20:00:00Z'
    }
  ]);

  // Voice player sample state
  const [playingVoice, setPlayingVoice] = useState(false);
  const [activeVoice, setActiveVoice] = useState(profile.voiceProfileId || 'gentle-male');

  // Trigger real-time gamified events simulating an active system (dopamine hit loop)
  useEffect(() => {
    const eventTimer = setInterval(() => {
      // Pick a random event to inject
      const events = [
        () => {
          // Event: Lead found
          const newId = `lead-${Date.now()}`;
          const newL: Lead = {
            id: newId,
            companyName: 'Notting Hill Dental Care',
            contactName: 'Dr. Rebecca Croft',
            email: 'info@nottinghilldental.co.uk',
            phone: '+44 20 7946 0777',
            linkedinUrl: 'https://linkedin.com/in/rebecca-croft-dental',
            niche: 'Dental Clinic',
            city: 'London',
            icpMatchScore: 92,
            mintPredictScore: 91,
            scoreFactors: { icpMatch: 93, painSignals: 88, timingSignals: 90, historicalConversion: 92 },
            priorityTier: 'hot',
            status: 'found',
            source: 'lead_finder',
            createdAt: new Date().toISOString()
          };
          setLeads(prev => [newL, ...prev]);
          setTotalLeads(p => p + 1);
          triggerNotification("Lead Finder located fresh high-scoring lead: Dr. Rebecca Croft (92% ICP match!)", 'info');
        },
        () => {
          // Event: Outreach email replied
          setLeads(prev => prev.map(l => l.id === 'lead-3' ? { ...l, status: 'replied' } : l));
          triggerNotification("Sarah Jenkins (Harley Medical) replied warmly to HeyGen Proposal: 'Let's meet tomorrow.'", 'success');
        },
        () => {
          // Event: Income transaction processed (Attribution card created)
          const newAmount = 3500;
          setRevenueToday(prev => prev + newAmount);
          setTotalRevenue(prev => prev + newAmount);
          
          const newTxId = `tx-${Date.now()}`;
          const newCard: AttributionCard = {
            id: `attr-${Date.now()}`,
            transactionId: newTxId,
            cardText: `Stripe matched £3,500 payment from Chelsea Aesthetics to MintAEO local citation query 'teeth whitening clinic central London'.`,
            amount: newAmount,
            actionType: 'perplexity_local_citation',
            actionTimestamp: new Date().toISOString(),
            confidenceScore: 4,
            shareCount: 0,
            createdAt: new Date().toISOString()
          };
          setAttributionCards(prev => [newCard, ...prev]);
          
          triggerNotification(`MintIncome matched £3,500 transaction automatically with 4/5 Confidence Score!`, 'success');
          triggerConfetti();
        }
      ];

      // 10% chance every interval to inject a delight event
      if (Math.random() < 0.2) {
        const randEvent = events[Math.floor(Math.random() * events.length)];
        randEvent();
      }
    }, 18000);

    return () => clearInterval(eventTimer);
  }, []);

  // Heartbeat countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setHeartbeatTimeLeft((prev) => {
        if (prev <= 1) {
          triggerHeartbeatPulseManual();
          return 14400; // Reset to 4 hours
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerNotification = (text: string, type: 'success' | 'info' | 'warning' = 'info') => {
    if (type === 'success') {
      playSuccessChime();
    } else {
      playNotificationSwoosh();
    }
    const id = `${Date.now()}`;
    setNotifications(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 6000);
  };

  const handleMuteToggle = () => {
    const next = toggleMute();
    setMuted(next);
    playClickPop();
  };

  // Immediate orchestrator sweep simulation
  const triggerHeartbeatPulseManual = () => {
    if (isPulseRunning) return;
    playHeartbeatPulse();
    setIsPulseRunning(true);
    triggerNotification("MintOrchestrator heartbeat initiated. Scanning 50 leads and checking citations...", 'info');

    setTimeout(() => {
      setIsPulseRunning(false);
      playSuccessChime();
      triggerNotification("Orchestrator sweep complete. Claude analyzed data and adjusted lead scoring logs.", 'success');
      
      // Inject learning log
      const newL: PulseLearningLog = {
        id: `pulse-${Date.now()}`,
        cycleId: `cy-${Math.floor(Math.random() * 100)}`,
        previousConfig: { coldEmailWeight: 0.55, inboundWeight: 0.2, aeoWeight: 0.25 },
        newConfig: { coldEmailWeight: 0.6, inboundWeight: 0.15, aeoWeight: 0.25 },
        claudeReasoning: `Heartbeat checked. Dr Rebecca Croft is scored as urgent priority lead. I have increased Cold Email touchpoints. Direct phone pre-qualification queued.`,
        income7dBefore: 16500,
        income7dAfter: 19500,
        performanceDelta: 18.1,
        createdAt: new Date().toISOString()
      };
      setPulseLog(prev => [newL, ...prev]);
    }, 3000);
  };

  // Approvals Actions
  const handleApproveAction = (id: string) => {
    playSuccessChime();
    triggerConfetti();
    setApprovalsQueue(prev => prev.filter(item => item.id !== id));
    triggerNotification("Agent action authorized successfully. Execution logged in real-time.", 'success');
  };

  const handleRejectAction = (id: string) => {
    playClickPop();
    setApprovalsQueue(prev => prev.filter(item => item.id !== id));
    triggerNotification("Agent action rejected. Orchestrator recalibrating priorities.", 'warning');
  };

  // Simulated Voice caller trigger
  const triggerVoiceBriefingDemo = () => {
    playHeartbeatPulse();
    setPlayingVoice(true);
    triggerNotification("MintVoice generating real-time briefing. Anesthetizing soundwaves active...", 'success');
    setTimeout(() => {
      setPlayingVoice(false);
      playSuccessChime();
    }, 5000);
  };

  // Pipeline moving card simulation
  const advanceLeadPipeline = (leadId: string, nextStage: any) => {
    playSuccessChime();
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: nextStage } : l));
    triggerNotification(`Lead status updated to ${nextStage.toUpperCase()}!`, 'success');
    if (nextStage === 'closed') {
      triggerConfetti();
      // Add transaction
      setTotalRevenue(p => p + 4500);
      setRevenueToday(p => p + 4500);
    }
  };

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-800 flex font-sans select-none selection:bg-[#2563EB]/30">
      
      {/* Sound notifications tray overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className={`p-4 rounded-xl border shadow-xl flex items-start gap-3 pointer-events-auto animate-bounce ${
              n.type === 'success' 
                ? 'bg-blue-50 border-blue-200 text-blue-800' 
                : n.type === 'warning' 
                  ? 'bg-rose-50 border-rose-200 text-rose-800' 
                  : 'bg-blue-50 border-blue-200 text-[#2563EB]'
            }`}
          >
            <Zap className={`w-5 h-5 flex-shrink-0 mt-0.5 ${n.type === 'success' ? 'text-blue-500' : 'text-[#2563EB]'}`} />
            <div className="text-xs font-medium leading-relaxed">{n.text}</div>
          </div>
        ))}
      </div>

      {/* Main layout: left sidebar, right pane */}
      <div className="w-64 bg-slate-950 text-slate-400 flex flex-col justify-between border-r border-slate-900 shrink-0">
        <div className="flex flex-col">
          {/* Logo Brand Header */}
          <button 
            onClick={() => { playClickPop(); onLogout(); }}
            className="p-6 border-b border-slate-900/60 flex items-center gap-3 text-left w-full hover:bg-slate-900/30 transition-colors cursor-pointer group"
            title="Return to Landing Page"
          >
            <ProfitMintLogo className="w-8 h-8" />
            <div>
              <h1 className="text-sm font-black text-white leading-none group-hover:text-blue-400 transition-colors">ProfitBoard™</h1>
              <span className="text-[9px] font-mono tracking-widest text-[#2563EB] uppercase">Acquisition Hub</span>
            </div>
          </button>

          {/* User Profile Overview */}
          <div className="p-4 bg-slate-900/30 border-b border-slate-900/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-white font-bold uppercase font-mono">
              {profile.businessName.substring(0, 2)}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{profile.businessName}</p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider truncate">{profile.niche}</p>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'home', label: 'Dashboard', icon: Home },
              { id: 'feed', label: 'Attribution Feed', icon: DollarSign, badge: attributionCards.length },
              { id: 'analytics', label: 'Income Analytics', icon: BarChart3 },
              { id: 'pipeline', label: '6-Stage CRM Pipeline', icon: GitFork },
              { id: 'approvals', label: 'Approvals Queue', icon: CheckCircle, badge: approvalsQueue.length },
              { id: 'predict', label: 'MintPredict Scores', icon: Users },
              { id: 'aeo', label: 'MintAEO Local', icon: Search },
              { id: 'growth', label: 'MintGrowth Health', icon: TrendingUp },
              { id: 'calendar', label: 'Content Calendar', icon: Calendar },
              { id: 'proposals', label: 'Proposal Center', icon: FileText },
              { id: 'intelligence', label: 'AI Intelligence Feed', icon: Cpu },
              { id: 'integrations', label: 'Processor Integrations', icon: Zap },
              { id: 'voice', label: 'MintVoice Settings', icon: Volume2 },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { playClickPop(); setActiveTab(item.id as any); }}
                  onMouseEnter={() => playHoverTick()}
                  className={`w-full p-2.5 rounded-xl flex items-center justify-between text-xs transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#2563EB] text-white font-bold shadow shadow-[#2563EB]/30' 
                      : 'hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 && (
                    <span className={`px-1.5 py-0.5 text-[9px] font-mono rounded-md font-bold ${isActive ? 'bg-white text-slate-950' : 'bg-slate-900 text-blue-400'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* OTO Upgrades Gating Panel (Dopamine Trigger SaaS Mechanics) */}
          <div className="px-4 py-2 border-t border-slate-900">
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest px-2.5 mb-2">Upgraded Engines</p>
            
            <button
              onClick={() => { playSuccessChime(); triggerConfetti(); setOto2Active(!oto2Active); }}
              className={`w-full p-2 rounded-xl text-left text-xs mb-1.5 flex items-center justify-between transition-all border cursor-pointer ${
                oto2Active 
                  ? 'bg-blue-950/20 border-blue-900/30 text-blue-400 font-semibold' 
                  : 'bg-slate-900/40 border-slate-850 text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5" />
                <span>OTO 2: Affiliate Booster</span>
              </span>
              <span className="text-[8px] font-mono font-bold px-1 py-0.5 rounded bg-slate-950">
                {oto2Active ? "ENABLED" : "ACTIVATE"}
              </span>
            </button>

            <button
              onClick={() => { playSuccessChime(); triggerConfetti(); setOto4Active(!oto4Active); }}
              className={`w-full p-2 rounded-xl text-left text-xs flex items-center justify-between transition-all border cursor-pointer ${
                oto4Active 
                  ? 'bg-indigo-950/20 border-indigo-900/30 text-indigo-400 font-semibold' 
                  : 'bg-slate-900/40 border-slate-850 text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>OTO 4: Multi-Client Agency</span>
              </span>
              <span className="text-[8px] font-mono font-bold px-1 py-0.5 rounded bg-slate-950">
                {oto4Active ? "ENABLED" : "ACTIVATE"}
              </span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/40 flex items-center justify-between">
          <button
            onClick={handleMuteToggle}
            className="p-1.5 rounded bg-slate-900 text-slate-500 hover:text-slate-200 cursor-pointer"
            title={muted ? "Unmute Sound" : "Mute Sound"}
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-blue-500 animate-pulse" />}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              onMouseEnter={() => playHoverTick()}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-bold px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 transition-all cursor-pointer"
            >
              Return Home
            </button>
            <button
              onClick={onLogout}
              onMouseEnter={() => playHoverTick()}
              className="text-xs text-slate-600 hover:text-slate-400 font-mono tracking-wider font-bold cursor-pointer"
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col min-w-0">
        
        {/* Dynamic header row: shows ticking statistics */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between shrink-0 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="text-lg font-black text-slate-900 tracking-tight capitalize">{activeTab} Monitor</h2>
            </div>
            <p className="text-xs text-slate-500">Autonomous revenue and acquisition engine stats are fully synchronous.</p>
          </div>

          {/* Quick heartbeat ticker widget */}
          <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between gap-6">
            <div>
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Orchestrator Heartbeat Cycle</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full bg-blue-500 ${isPulseRunning ? 'animate-ping' : ''}`} />
                <span className="text-xs font-mono font-bold text-slate-800">
                  {isPulseRunning ? "ORCHESTRATING..." : `Pulse in: ${formatTime(heartbeatTimeLeft)}`}
                </span>
              </div>
            </div>
            <button
              onClick={triggerHeartbeatPulseManual}
              disabled={isPulseRunning}
              className="py-1.5 px-3 bg-[#2563EB] hover:bg-blue-600 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${isPulseRunning ? 'animate-spin' : ''}`} />
              <span>PULSE NOW</span>
            </button>
          </div>
        </header>

        {/* Tab Router Contents */}
        <main className="p-8 flex-1 min-w-0">
          
          {/* TAB: Home / dashboard */}
          {activeTab === 'home' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Top Hero stats bento grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Revenue Today Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between h-40 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Attributed Today</span>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">£{revenueToday.toLocaleString()}</h3>
                    <p className="text-[10px] text-blue-600 font-mono uppercase mt-1">▲ 100% matched with proof</p>
                  </div>
                </div>

                {/* Total Attributed Contract Revenue */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between h-40 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Total Attributed</span>
                    <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">£{totalRevenue.toLocaleString()}</h3>
                    <p className="text-[10px] text-[#2563EB] font-mono uppercase mt-1">Goal: £{profile.monthlyRevenueTarget.toLocaleString()}</p>
                  </div>
                </div>

                {/* Booked Discovery Calls */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between h-40 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl" />
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Booked Consults</span>
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">{bookedCalls}</h3>
                    <p className="text-[10px] text-indigo-600 font-mono uppercase mt-1">100% pre-qualified</p>
                  </div>
                </div>

                {/* Total Leads Found */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between h-40 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Active ICP Leads</span>
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">{totalLeads}</h3>
                    <p className="text-[10px] text-amber-600 font-mono uppercase mt-1">Scored by MintPredict</p>
                  </div>
                </div>

              </div>

              {/* Sub-panels layout: dynamic ticker and high-impact columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Center primary: Live Scrolling Attribution Proof cards */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">Live Ingested Attribution Cards</h4>
                    <button 
                      onClick={() => { playClickPop(); setActiveTab('feed'); }}
                      className="text-xs text-[#2563EB] hover:underline flex items-center gap-1 font-mono uppercase tracking-wider font-bold"
                    >
                      <span>VIEW FEED</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {attributionCards.map((card) => (
                      <div 
                        key={card.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#2563EB] to-[#7C3AED]" />
                        <div className="flex justify-between items-start">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2.5">
                              <span className="px-2.5 py-0.5 rounded-md text-[9px] font-mono tracking-wider font-bold uppercase bg-blue-500/10 border border-blue-500/20 text-blue-700">
                                INCOME CONFIRMED
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {new Date(card.actionTimestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-slate-800 text-sm font-semibold pr-4 leading-relaxed">{card.cardText}</p>
                          </div>
                          
                          {/* Financial Badge */}
                          <div className="text-right shrink-0">
                            <span className="text-lg font-bold text-slate-950 font-mono">£{card.amount.toLocaleString()}</span>
                            <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-blue-600 font-mono">
                              <Star className="w-3 h-3 fill-blue-500 text-blue-500" />
                              <span>{card.confidenceScore}/5 CONFIDENCE</span>
                            </div>
                          </div>
                        </div>

                        {/* Social proof share widget */}
                        <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
                          <span className="flex items-center gap-1.5 text-[10px]">
                            <Cpu className="w-3.5 h-3.5 text-slate-400" />
                            <span>Action type: <b>{card.actionType.toUpperCase()}</b></span>
                          </span>
                          <button
                            onClick={() => { playSuccessChime(); triggerConfetti(); }}
                            className="p-1 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 text-[10px] text-slate-600 transition-all cursor-pointer font-bold"
                          >
                            <Share2 className="w-3 h-3 text-blue-500" />
                            <span>SHARE CARD PROOF</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side: Fast Approvals Queue */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono">Approvals Queue</h4>
                    <span className="text-[10px] font-mono bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                      {approvalsQueue.length} PENDING
                    </span>
                  </div>

                  <div className="space-y-4">
                    {approvalsQueue.length === 0 ? (
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center py-12 text-slate-400 text-xs">
                        <CheckCircle className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-bounce" />
                        <p>All agent operations fully authorized!</p>
                      </div>
                    ) : (
                      approvalsQueue.map((item) => (
                        <div 
                          key={item.id}
                          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-[#2563EB]/30 transition-all space-y-4"
                        >
                          <div className="flex items-start justify-between">
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 text-amber-700">
                              {item.actionType.toUpperCase()}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h5 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h5>
                            <p className="text-[11px] text-slate-500 leading-relaxed">{item.description}</p>
                          </div>

                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] font-mono text-slate-600 space-y-1">
                            <p><b>Target Entity:</b> {item.targetCompanyName}</p>
                            <p><b>Expected Value:</b> {item.expectedOutcome}</p>
                          </div>

                          {/* Approve/Reject micro-actions */}
                          <div className="grid grid-cols-2 gap-3.5 pt-1">
                            <button
                              onClick={() => handleRejectAction(item.id)}
                              className="py-2 px-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-500 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5 text-rose-500" />
                              <span>Decline</span>
                            </button>
                            <button
                              onClick={() => handleApproveAction(item.id)}
                              className="py-2 px-3 bg-[#2563EB] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Authorize</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: Attribution Feed */}
          {activeTab === 'feed' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">MintIncome™ Ledger</h3>
                  <p className="text-xs text-slate-500 mt-1">Historical database mapping verified transaction receipts to autonomous outreach and citation touchpoints.</p>
                </div>
                <button
                  onClick={() => { playSuccessChime(); triggerConfetti(); }}
                  className="py-2 px-4 bg-[#2563EB] hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow shadow-[#2563EB]/10"
                >
                  <Download className="w-4 h-4" />
                  <span>EXPORT SYSTEM AUDIT</span>
                </button>
              </div>

              <div className="space-y-5">
                {attributionCards.map((card) => (
                  <div key={card.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#2563EB] to-[#7C3AED]" />
                    
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="space-y-2 max-w-xl">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-md text-[9px] font-mono tracking-wider font-bold bg-blue-500/10 border border-blue-500/20 text-blue-700">
                            VERIFIED PROOF MATCH
                          </span>
                          <span className="text-xs font-mono text-slate-400">Matched at: {new Date(card.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-800 text-sm font-semibold leading-relaxed pr-6">{card.cardText}</p>
                      </div>

                      <div className="shrink-0 text-left md:text-right">
                        <p className="text-3xl font-black text-slate-900 font-mono leading-none">£{card.amount.toLocaleString()}</p>
                        <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-2">
                          {card.confidenceScore === 5 ? "★ 5/5 CAUSAL MATCH" : "★ 4/5 CITATION REF MATCH"}
                        </span>
                      </div>
                    </div>

                    {/* Metadata breakdown list */}
                    <div className="border-t border-slate-100 mt-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-500">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Transaction Source</span>
                        <span className="text-slate-800 font-bold block mt-0.5">STRIPE HOOK</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Agent Engine</span>
                        <span className="text-[#2563EB] font-bold block mt-0.5">{card.actionType.toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Audit Signature</span>
                        <span className="text-slate-700 block mt-0.5">aes_256_sha312_verified</span>
                      </div>
                      <div className="flex justify-end items-center">
                        <button
                          onClick={() => { playSuccessChime(); triggerNotification("Screenshot card generated! Ready for download.", "success"); }}
                          className="py-1.5 px-3 border border-slate-200 hover:border-slate-300 rounded-lg text-[10px] font-bold text-slate-600 bg-slate-50 flex items-center gap-1.5"
                        >
                          <Share2 className="w-3.5 h-3.5 text-blue-500" />
                          <span>GENERATE ASSET</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Income Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">Revenue Trends & Source Analysis</h3>
                <p className="text-xs text-slate-500 mt-1">Real-time statistics displaying matched contract payouts by attribution channel.</p>
              </div>

              {/* Top Row: Best Day and metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">BEST PERFORMANCE DAY</p>
                  <h4 className="text-xl font-extrabold text-slate-900 mt-1 font-mono">Wednesday</h4>
                  <p className="text-xs text-blue-600 font-mono mt-0.5">£16,500 total closures</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">REFUND ALERT RATE</p>
                  <h4 className="text-xl font-extrabold text-blue-600 mt-1 font-mono">0.00%</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Matched attribution eliminates fear</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">AEO ROI MULTIPLIER</p>
                  <h4 className="text-xl font-extrabold text-indigo-600 mt-1 font-mono">4.1x</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Google vs ChatGPT citations</p>
                </div>
              </div>

              {/* Custom SVG Bar Chart (Extremely premium, no Recharts rendering issues) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">Attributed Revenue by Niche Channel</h4>
                  <span className="text-[10px] font-mono text-slate-400">LAST 7 DAYS</span>
                </div>

                <div className="h-64 flex items-end justify-between px-6 pt-4">
                  {[
                    { day: 'Mon', val: 3200, color: 'bg-[#2563EB]' },
                    { day: 'Tue', val: 4500, color: 'bg-[#7C3AED]' },
                    { day: 'Wed', val: 12000, color: 'bg-blue-500' },
                    { day: 'Thu', val: 1500, color: 'bg-amber-500' },
                    { day: 'Fri', val: 8900, color: 'bg-indigo-500' },
                    { day: 'Sat', val: 0, color: 'bg-slate-300' },
                    { day: 'Sun', val: 3500, color: 'bg-[#2563EB]' }
                  ].map((item, idx) => {
                    const maxVal = 12000;
                    const heightPct = maxVal > 0 ? (item.val / maxVal) * 90 : 0;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end">
                        {/* Hover Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 bg-slate-950 text-white font-mono text-[10px] py-1 px-2.5 rounded-lg transition-all shadow-xl absolute transform -translate-y-20 pointer-events-none z-10 font-bold">
                          £{item.val.toLocaleString()}
                        </div>
                        {/* Interactive Bar */}
                        <div 
                          className={`w-10 rounded-t-lg transition-all duration-500 hover:brightness-110 cursor-pointer ${item.color}`}
                          style={{ height: `${heightPct}%` }}
                        />
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{item.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CRM Pipeline */}
          {activeTab === 'pipeline' && (
            <div className="space-y-8 animate-fade-in min-w-[900px]">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">6-Stage AI Client Pipeline</h3>
                  <p className="text-xs text-slate-500 mt-1">Drag, click or tap pipelines. Leads qualified via Bland.ai calls advance automatically.</p>
                </div>
              </div>

              {/* Kanban layout columns */}
              <div className="grid grid-cols-6 gap-4 items-start">
                {[
                  { id: 'found', label: 'Found Leads', color: 'border-slate-300 bg-slate-100' },
                  { id: 'contacted', label: 'Contacted', color: 'border-blue-200 bg-blue-50/50' },
                  { id: 'replied', label: 'Replied', color: 'border-amber-200 bg-amber-50/50' },
                  { id: 'booked', label: 'Booked Call', color: 'border-indigo-200 bg-indigo-50/50' },
                  { id: 'proposed', label: 'Proposal Sent', color: 'border-purple-200 bg-purple-50/50' },
                  { id: 'closed', label: 'Closed Deal', color: 'border-blue-300 bg-blue-50/50' }
                ].map((col) => {
                  const colLeads = leads.filter(l => l.status === col.id);
                  return (
                    <div key={col.id} className="rounded-xl border border-slate-200 bg-white p-3 space-y-3 shrink-0">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-extrabold text-slate-800 tracking-tight leading-none">{col.label}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full font-bold">
                          {colLeads.length}
                        </span>
                      </div>

                      <div className="space-y-3.5 min-h-[350px]">
                        {colLeads.map((l) => (
                          <div 
                            key={l.id}
                            className="p-3 bg-white border border-slate-150 rounded-xl shadow-sm hover:shadow-md transition-all space-y-3 relative group"
                          >
                            <div>
                              <p className="text-xs font-bold text-slate-900 leading-tight">{l.companyName}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{l.contactName}</p>
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded-lg">
                              <span>ICP FIT: <b>{l.icpMatchScore}%</b></span>
                              <span>PREDICT: <b>{l.mintPredictScore}%</b></span>
                            </div>

                            {/* Conversion Actions inside card */}
                            <div className="border-t border-slate-100 pt-2 flex items-center justify-between">
                              {col.id !== 'closed' ? (
                                <button
                                  onClick={() => {
                                    const stages: Array<'found'|'contacted'|'replied'|'booked'|'proposed'|'closed'> = ['found', 'contacted', 'replied', 'booked', 'proposed', 'closed'];
                                    const nextIdx = stages.indexOf(col.id as any) + 1;
                                    advanceLeadPipeline(l.id, stages[nextIdx]);
                                  }}
                                  className="w-full py-1.5 bg-slate-50 hover:bg-[#2563EB] hover:text-white border border-slate-200 hover:border-[#2563EB] rounded-lg text-[9px] font-bold text-slate-600 transition-all flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <span>ADVANCE STAGE</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              ) : (
                                <span className="text-[9px] font-mono font-bold text-blue-600 flex items-center gap-1 w-full justify-center">
                                  <CheckCircle className="w-3 h-3 text-blue-500" />
                                  <span>CONTRACT ATTR</span>
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: Approvals Queue */}
          {activeTab === 'approvals' && (
            <div className="space-y-8 animate-fade-in max-w-3xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">Approvals Queue</h3>
                <p className="text-xs text-slate-500 mt-1">Review Tier 2+ actions queued by autonomous agents awaiting final verification before dispatching.</p>
              </div>

              <div className="space-y-4">
                {approvalsQueue.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center text-slate-400">
                    <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
                    <h4 className="text-base font-bold text-slate-800">Clear queue!</h4>
                    <p className="text-xs text-slate-500 mt-1">MintOrchestrator has no pending authorizations.</p>
                  </div>
                ) : (
                  approvalsQueue.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 relative">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-0.5 rounded-md text-[9px] font-mono tracking-wider font-bold bg-amber-500/10 border border-amber-500/20 text-amber-700">
                              PENDING SIGN-OFF
                            </span>
                            <span className="text-xs font-mono text-slate-400">Received {new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.description}</p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="px-2 py-1 bg-red-50 text-rose-700 text-[10px] font-mono rounded-md font-bold uppercase tracking-wider border border-rose-100">
                            {item.priority} PRIORITY
                          </span>
                        </div>
                      </div>

                      {/* Technical specifications logs */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-5 grid grid-cols-2 gap-4 text-xs font-mono text-slate-600">
                        <div>
                          <p className="text-slate-400 uppercase text-[9px]">Target entity</p>
                          <p className="text-slate-800 font-bold mt-1">{item.targetCompanyName}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 uppercase text-[9px]">Expected pipeline outcome</p>
                          <p className="text-[#2563EB] font-bold mt-1">{item.expectedOutcome}</p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex justify-end gap-3.5 mt-6 border-t border-slate-100 pt-4">
                        <button
                          onClick={() => handleRejectAction(item.id)}
                          className="py-2.5 px-5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-500 rounded-xl transition-all cursor-pointer"
                        >
                          Reject Action
                        </button>
                        <button
                          onClick={() => handleApproveAction(item.id)}
                          className="py-2.5 px-6 bg-[#2563EB] hover:bg-blue-600 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md shadow-[#2563EB]/10 flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4 text-white" />
                          <span>Deploy Action Immediately</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: MintPredict Scores */}
          {activeTab === 'predict' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">MintPredict™ Campaign intelligence</h3>
                  <p className="text-xs text-slate-500 mt-1">Lead scores calibrated daily against your ICP models. AI forecasts likelihood of bookings.</p>
                </div>
                <button
                  onClick={() => {
                    playSuccessChime();
                    triggerNotification("Initiating cold lead finding directory check...", "info");
                  }}
                  className="py-2 px-4 bg-[#2563EB] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow shadow-[#2563EB]/10"
                >
                  SCAN DIRECTORIES
                </button>
              </div>

              {/* Predictive Campaign Forecast panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">Current Campaign Forecast</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">Predicted Reply Rate</span>
                      <span className="text-xl font-bold text-slate-800 font-mono">31.2%</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">Predicted Value</span>
                      <span className="text-xl font-bold text-indigo-600 font-mono">£24,500</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Forecast Accuracy Multiplier</span>
                      <span className="font-mono font-bold text-slate-800">96.8%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '96.8%' }} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">Top Predicted Opportunity</h4>
                    <h5 className="text-base font-black text-slate-900 mt-2">Dr. Michael Vance (Wimpole Dental)</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">High pain signals concerning booking weekend patients. Tailored Invisalign scripts prepared automatically.</p>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-mono text-[#2563EB]">
                    <span>FIT ESTIMATE: <b>94%</b></span>
                    <span>ATTRIBUTABLE VALUE: <b>£4,500</b></span>
                  </div>
                </div>
              </div>

              {/* Leads scores lists */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-white uppercase font-mono text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Lead Entity</th>
                      <th className="p-4">ICP Match Score</th>
                      <th className="p-4">Predict Conversion Rate</th>
                      <th className="p-4">Priority Status</th>
                      <th className="p-4">Audit Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50">
                        <td className="p-4">
                          <p className="font-bold text-slate-900">{l.companyName}</p>
                          <span className="text-[10px] text-slate-500">{l.contactName}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-blue-600 font-bold">{l.icpMatchScore}%</span>
                        </td>
                        <td className="p-4">
                          <span className="text-indigo-600 font-bold">{l.mintPredictScore}%</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                            l.priorityTier === 'hot' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {l.priorityTier.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => { playClickPop(); triggerNotification(`Scored parameters for ${l.companyName} compiled.`, 'info'); }}
                            className="p-1 px-3 border border-slate-200 hover:bg-slate-100 rounded text-[10px]"
                          >
                            Scoring logs
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: MintAEO Local */}
          {activeTab === 'aeo' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">MintAEO™ citation monitoring</h3>
                <p className="text-xs text-slate-500 mt-1">Ensures potential clients querying ChatGPT or Perplexity receive recommendation citations for your localized business.</p>
              </div>

              {/* Top stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">ACTIVE MONITOR QUERIES</p>
                  <h4 className="text-2xl font-black text-slate-900 mt-1 font-mono">5 Queries</h4>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">VERIFIED CITATION RATE</p>
                  <h4 className="text-2xl font-black text-blue-600 mt-1 font-mono">60.0%</h4>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">MCP SERVER REQUESTS</p>
                  <h4 className="text-2xl font-black text-indigo-600 mt-1 font-mono">1,420</h4>
                </div>
              </div>

              {/* Queries ledger */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">ChatGPT / Perplexity Search Citation Logs</h4>
                  <span className="text-[10px] font-mono text-slate-400">LAST CHECKED TODAY</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {aeoMonitoring.map((query) => (
                    <div key={query.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900 font-mono">"{query.targetQuery}"</p>
                        {query.cited ? (
                          <a href={query.citationUrl} target="_blank" className="text-[10px] text-slate-400 hover:underline block truncate max-w-sm">
                            Cited URL: {query.citationUrl}
                          </a>
                        ) : (
                          <span className="text-[10px] text-rose-500 font-bold block">🚨 NOT CITED • REWRITE RECOMMENDED</span>
                        )}
                      </div>

                      <div className="flex items-center gap-6 shrink-0 text-xs font-mono">
                        <div>
                          <p className="text-slate-400 text-[9px] uppercase">Citation Rank</p>
                          <p className="text-slate-800 font-bold mt-0.5">{query.cited ? `#${query.citationPosition}` : "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[9px] uppercase">Ingestion Match</p>
                          <p className="text-blue-600 font-bold mt-0.5">£{query.incomeAttributed.toLocaleString()}</p>
                        </div>
                        <div>
                          {query.rewriteRecommended ? (
                            <button
                              onClick={() => { playSuccessChime(); triggerNotification("Deploying automated article optimization to Vercel subdomains...", "success"); }}
                              className="py-1 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded font-bold text-[10px] cursor-pointer"
                            >
                              Auto Optimize
                            </button>
                          ) : (
                            <span className="text-blue-600 font-bold">🔵 Verified</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MintGrowth Health */}
          {activeTab === 'growth' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">MintGrowth™ Client Intelligence</h3>
                <p className="text-xs text-slate-500 mt-1">Tracks active client health scores. Churn risk triggers review campaigns or upsell outreach automatically.</p>
              </div>

              {/* Health scored ledger */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-white font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Active Client</th>
                      <th className="p-4">Relationship Score</th>
                      <th className="p-4">Churn Risk</th>
                      <th className="p-4">Total Value Ingested</th>
                      <th className="p-4">MintGrowth Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {clients.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="p-4">
                          <p className="font-bold text-slate-900">{c.companyName}</p>
                          <span className="text-[10px] text-slate-500">{c.contactName}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-blue-600 font-extrabold">{c.relationshipScore}/10</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700">LOW</span>
                        </td>
                        <td className="p-4 font-bold text-slate-900">£{c.contractValue.toLocaleString()}</td>
                        <td className="p-4">
                          <button
                            onClick={() => { playSuccessChime(); triggerNotification(`Sent review request mail to ${c.contactName}!`, "success"); }}
                            className="py-1.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[10px] cursor-pointer text-slate-600 font-bold"
                          >
                            Google Review Trigger
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: Content Calendar */}
          {activeTab === 'calendar' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">Social Content Calendar</h3>
                <p className="text-xs text-slate-500 mt-1">Scheduled postings calibrated by Orchestrator to maximize inbound localized dentistry queries.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">This Week's Postings</h4>
                
                <div className="space-y-4">
                  {[
                    { day: 'Monday (Posted)', platform: 'LinkedIn', txt: 'Why Londoners are opting for pricing transparency in Invisalign consults.', engagement: '412 views • 24 clicks' },
                    { day: 'Wednesday (Pending)', platform: 'LinkedIn', txt: 'The pain-free veneers revolution. Real-time patient audit.', engagement: 'Scheduled: 10:00 AM' },
                    { day: 'Friday (Pending)', platform: 'Buffer Twitter', txt: 'Local dentistry case studies. Tracing direct ROI outcomes.', engagement: 'Scheduled: 02:00 PM' }
                  ].map((p, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-150 flex justify-between items-center gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">{p.day} • {p.platform}</span>
                        <p className="text-xs font-semibold text-slate-800 pr-6">"{p.txt}"</p>
                      </div>
                      <span className="text-xs font-mono text-slate-500 shrink-0 font-bold uppercase">{p.engagement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Proposal Center */}
          {activeTab === 'proposals' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">Personalized HeyGen Proposal Hub</h3>
                <p className="text-xs text-slate-500 mt-1">Tailored 90-second AI avatar custom scripts deployed directly to high-priority ICP leads.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-white font-mono uppercase text-[10px]">
                    <tr>
                      <th>Prospect</th>
                      <th>Video Views</th>
                      <th>DocuSign status</th>
                      <th>Closure Probability</th>
                      <th>Audit Landing Page</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {[
                      { name: 'Sarah Jenkins (Harley Medical)', views: '3 views', status: 'SENT', rate: '85%' },
                      { name: 'Dr. Michael Vance (Wimpole Dental)', views: '11 views', status: 'SIGNED', rate: '100%' }
                    ].map((p, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">{p.name}</td>
                        <td className="p-4 text-[#2563EB] font-bold">{p.views}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${p.status === 'SIGNED' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 font-bold">{p.rate}</td>
                        <td className="p-4">
                          <button
                            onClick={() => { playClickPop(); triggerNotification("Opening proposal mock landing page...", "info"); }}
                            className="py-1 px-3 border border-slate-200 hover:bg-slate-100 rounded text-[10px]"
                          >
                            Explore Page
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: AI Intelligence Feed */}
          {activeTab === 'intelligence' && (
            <div className="space-y-8 animate-fade-in max-w-3xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">MintOrchestrator Learning Log</h3>
                <p className="text-xs text-slate-500 mt-1">Autonomous micro-decision ledger. Traces structural configuration parameters adjusted by Claude every 4 hours.</p>
              </div>

              <div className="space-y-5">
                {pulseLog.map((log) => (
                  <div key={log.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#7C3AED]" />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="px-2.5 py-0.5 rounded text-[9px] font-mono tracking-wider font-bold bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-indigo-700">
                          COMPOUND LEARNING PULSE ({log.cycleId.toUpperCase()})
                        </span>
                        <span className="text-xs font-mono text-slate-400">{new Date(log.createdAt).toLocaleString()}</span>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 font-mono text-xs text-slate-700 leading-relaxed">
                        <p className="font-bold text-slate-400 mb-1">🤖 CLAUDE REASONING PROCESS:</p>
                        <p>{log.claudeReasoning}</p>
                      </div>

                      {/* Technical config adjustments */}
                      <div className="grid grid-cols-3 gap-4 text-xs font-mono text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-150">
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase">Previous Weights</span>
                          <span className="text-slate-800 font-bold block mt-0.5">Email 40% | Inbound 30%</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase">Next Adjusted Weights</span>
                          <span className="text-blue-600 font-bold block mt-0.5">Email 55% | Inbound 20%</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase">Revenue Performance delta</span>
                          <span className="text-blue-600 font-bold block mt-0.5">▲ {log.performanceDelta}% delta</span>
                        </div>
                      </div>

                      {/* Rollback trigger button */}
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => { playClickPop(); triggerNotification("Reverted Orchestrator parameters. Old config backup loaded.", "warning"); }}
                          className="py-1.5 px-4 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-[10px] font-bold text-slate-600 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>ROLLBACK CLOUD CONFIGURATION</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Processor Integrations */}
          {activeTab === 'integrations' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">Ecosystem integrations</h3>
                <p className="text-xs text-slate-500 mt-1">Connect or disable calendar, social, code repository, billing, and document automation processors instantly.</p>
              </div>

              {/* Featured GitHub Connection & OAuth Troubleshooter Box */}
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold">
                      <GitFork className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-white font-mono">GitHub Integration & Repository Sync</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${githubConnected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                          {githubConnected ? 'CONNECTED' : 'ACTION REQUIRED'}
                        </span>
                        {githubToken && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-blue-400" />
                            <span>PAT ACTIVE</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Automated code exports, PR generation, and GitHub OAuth repository sync.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        playClickPop();
                        setShowGithubGuide(!showGithubGuide);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                      <span>{showGithubGuide ? 'Hide Guide' : 'Setup Guide'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setGithubConnecting(true);
                        playClickPop();
                        setTimeout(() => {
                          setGithubConnecting(false);
                          setGithubConnected(!githubConnected);
                          playSuccessChime();
                          triggerNotification(
                            !githubConnected ? 'GitHub connected successfully!' : 'GitHub disconnected.',
                            !githubConnected ? 'success' : 'info'
                          );
                        }, 1000);
                      }}
                      disabled={githubConnecting}
                      className={`px-4 py-1.5 rounded-lg text-xs font-mono font-extrabold transition-all border cursor-pointer flex items-center gap-2 ${
                        githubConnected
                          ? 'bg-blue-600/20 border-blue-500/30 text-blue-300 hover:bg-rose-600/20 hover:border-rose-500/30 hover:text-rose-300'
                          : 'bg-blue-600 hover:bg-blue-500 border-blue-500 text-white'
                      }`}
                    >
                      {githubConnecting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Testing...</span>
                        </>
                      ) : (
                        <span>{githubConnected ? 'RECONNECT / DISCONNECT' : 'AUTHORIZE GITHUB'}</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Connection Quick Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Target Repository</label>
                    <input
                      type="text"
                      value={githubRepo}
                      onChange={(e) => setGithubRepo(e.target.value)}
                      placeholder="owner/repository-name"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Personal Access Token (PAT) / OAuth Key</label>
                    <input
                      type="password"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (Optional for PAT)"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* GitHub Troubleshooting Guide Box */}
                {showGithubGuide && (
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 animate-fade-in text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-blue-400 font-bold font-mono">
                      <ShieldCheck className="w-4 h-4" />
                      <span>GitHub Authorization & Redirect Configuration</span>
                    </div>

                    <p className="leading-relaxed text-slate-300">
                      If GitHub refuses to connect, it is usually due to cross-origin iframe constraints or mismatched OAuth callback URIs in your GitHub Developer Application settings.
                    </p>

                    <div className="space-y-2 bg-slate-900 p-4 rounded-lg border border-slate-800 font-mono text-[11px]">
                      <div className="text-slate-400 font-bold uppercase mb-1">Required OAuth Callback URIs:</div>
                      <div className="flex items-center justify-between text-blue-300 bg-slate-950 p-2 rounded border border-slate-800">
                        <span>Development Callback:</span>
                        <code className="text-emerald-400">https://ais-dev-oudlmnu5m4yvfitsk3hvju-27012295385.europe-west1.run.app/auth/callback</code>
                      </div>
                      <div className="flex items-center justify-between text-blue-300 bg-slate-950 p-2 rounded border border-slate-800">
                        <span>Deployed Callback:</span>
                        <code className="text-emerald-400">https://ais-pre-oudlmnu5m4yvfitsk3hvju-27012295385.europe-west1.run.app/auth/callback</code>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                        <span className="font-bold text-amber-400">Method 1: Install AI Studio GitHub App</span>
                        <p className="text-slate-400">Install the Google AI Studio GitHub App on your GitHub account at <a href="https://github.com/apps/google-ai-studio" target="_blank" rel="noreferrer" className="text-blue-400 underline font-bold">github.com/apps/google-ai-studio</a> and grant repository access.</p>
                      </div>
                      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                        <span className="font-bold text-blue-400">Method 2: Personal Access Token</span>
                        <p className="text-slate-400">Generate a classic or fine-grained token at <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="text-blue-400 underline">github.com/settings/tokens</a> with `repo` scope and paste above.</p>
                      </div>
                    </div>

                    {/* AI Studio GitHub App Specific Resolution Alert */}
                    <div className="bg-rose-950/40 border border-rose-800/80 p-3.5 rounded-lg space-y-2 text-[11px]">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5 font-mono">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>Fixing "Failed to load file differences / Repository not found":</span>
                      </div>
                      <ol className="list-decimal list-inside text-slate-300 space-y-1 pl-1">
                        <li>Visit <a href="https://github.com/settings/installations" target="_blank" rel="noreferrer" className="text-blue-400 underline font-bold">GitHub Settings &gt; Applications</a>.</li>
                        <li>Click <strong>Google AI Studio</strong> and verify that your target repository is listed under <strong>Repository access</strong> ("All repositories" or selected repo).</li>
                        <li>Ensure the target repository exists in your GitHub account (create an empty repository on GitHub first if pushing for the first time).</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { id: 'github', name: 'GitHub Repositories', connected: githubConnected },
                  { id: 'stripe', name: 'Stripe Billings', connected: true },
                  { id: 'linkedin', name: 'LinkedIn personal', connected: true },
                  { id: 'calendly', name: 'Calendly booking API', connected: true },
                  { id: 'google_calendar', name: 'Google Calendar API', connected: true },
                  { id: 'bland', name: 'Bland.ai voice pre-qual', connected: true },
                  { id: 'heygen', name: 'HeyGen Video', connected: true },
                  { id: 'docusign', name: 'DocuSign API', connected: true },
                  { id: 'hubspot', name: 'HubSpot CRM', connected: false },
                  { id: 'buffer', name: 'Buffer social API', connected: false }
                ].map((intg, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-950 font-mono">{intg.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{intg.connected ? "🔵 Fully Authorized" : "🔴 Disconnected"}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (intg.id === 'github') {
                          setGithubConnected(!githubConnected);
                        }
                        playSuccessChime();
                        triggerNotification(`${intg.name} status updated!`, 'success');
                      }}
                      className={`p-1 px-3 rounded-lg text-[9px] font-mono font-bold cursor-pointer transition-all border ${
                        intg.connected 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
                      }`}
                    >
                      {intg.connected ? "DISABLE" : "AUTHORIZE"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MintVoice Settings */}
          {activeTab === 'voice' && (
            <div className="space-y-8 animate-fade-in max-w-3xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">MintVoice Settings</h3>
                <p className="text-xs text-slate-500 mt-1">Configure morning briefings schedules, smartphone destinations, and active vocal profiles.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-500 uppercase font-bold tracking-wider">Morning Delivery Hour</label>
                    <select className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#2563EB] outline-none text-slate-700 font-mono text-xs">
                      <option>07:00 AM (Recommended)</option>
                      <option>08:00 AM</option>
                      <option>09:00 AM</option>
                      <option>06:00 AM</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-500 uppercase font-bold tracking-wider">Language Preference</label>
                    <select className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#2563EB] outline-none text-slate-700 font-mono text-xs">
                      <option>English (UK)</option>
                      <option>English (US)</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Test Morning voice note delivery</h5>
                    <p className="text-[11px] text-slate-500">Triggers an instant simulated briefing delivery directly inside this dashboard.</p>
                  </div>

                  <button
                    onClick={triggerVoiceBriefingDemo}
                    disabled={playingVoice}
                    className="py-3 px-6 bg-[#2563EB] hover:bg-blue-600 text-white rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Volume2 className="w-4 h-4 text-white" />
                    <span>{playingVoice ? "GENERATING SOUND..." : "TEST INBOUND BRIEFING"}</span>
                  </button>
                </div>

                {/* Simulated Waveform if voice briefing active */}
                {playingVoice && (
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900 text-center space-y-4 animate-fade-in">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest animate-pulse">STREAMING ENVELOPE BRIEFING AUDIO SAMPLE</p>
                    <div className="flex items-center justify-center gap-1.5 h-12">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const randH = Math.floor(Math.random() * 32) + 8;
                        return (
                          <div 
                            key={i} 
                            className="w-1.5 bg-[#2563EB] rounded-full animate-pulse" 
                            style={{ 
                              height: `${randH}px`,
                              animationDelay: `${i * 0.05}s`,
                              animationDuration: '0.4s'
                            }} 
                          />
                        );
                      })}
                    </div>
                    <p className="text-xs font-mono text-slate-400">"Oliver: Hi there. Today we attribute £3,500 from Chelsea Aesthetics to custom Perplexity local citation..."</p>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB: Affiliate OTO Booster */}
          {activeTab === 'affiliate' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">OTO 2: ProfitAffiliate™ Booster Panel</h3>
                <p className="text-xs text-slate-500 mt-1">Shown only to OTO 2 buyers. Ingest and trace affiliate commissions from JVZoo, ClickBank, Amazon, and WarriorPlus.</p>
              </div>

              {!oto2Active ? (
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-900 text-center space-y-5 py-16">
                  <Award className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
                  <div className="space-y-1">
                    <h4 className="text-lg font-extrabold text-white">Unlock OTO 2 (ProfitAffiliate Booster)</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">Boost your commissions by tracking exact sources across affiliate networks. Integrate reviews logs and automated social promotions.</p>
                  </div>
                  <button
                    onClick={() => { playSuccessChime(); triggerConfetti(); setOto2Active(true); }}
                    className="py-3 px-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl text-xs font-black uppercase text-white cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    Simulate OTO 2 Upgrade Unlock
                  </button>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h4 className="text-sm font-bold text-slate-950">Active Affiliate Commissions matched</h4>
                    <span className="text-xs font-mono text-blue-600 font-bold">🔵 PROFITAFFILIATE RUNNING</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-150">
                      <p className="text-slate-500 uppercase text-[9px]">JVZoo conversions matched</p>
                      <p className="text-lg font-bold text-slate-800 mt-1">£4,350 total matches</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-150">
                      <p className="text-slate-500 uppercase text-[9px]">WarriorPlus Ingest matches</p>
                      <p className="text-lg font-bold text-slate-800 mt-1">£3,110 total matches</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: Agency upgrade */}
          {activeTab === 'agency' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">OTO 4: Multi-Client Agency Hub</h3>
                <p className="text-xs text-slate-500 mt-1">Administer multiple client corporate profiles, customize white-labeled reports, and provision nested OpenClaw containers.</p>
              </div>

              {!oto4Active ? (
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-900 text-center space-y-5 py-16">
                  <Layers className="w-12 h-12 text-indigo-400 mx-auto animate-bounce" />
                  <div className="space-y-1">
                    <h4 className="text-lg font-extrabold text-white">Activate OTO 4 (ProfitAgency Multi-Client Upgrade)</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">Deliver autonomous client acquisition as an elite white-labeled service. Manage up to 50 active clients and print customized PDF growth portfolios.</p>
                  </div>
                  <button
                    onClick={() => { playSuccessChime(); triggerConfetti(); setOto4Active(true); }}
                    className="py-3 px-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl text-xs font-black uppercase text-white cursor-pointer shadow-lg shadow-indigo-500/10"
                  >
                    Simulate OTO 4 Agency Unlock
                  </button>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h4 className="text-sm font-bold text-slate-950">Nested Client accounts</h4>
                    <span className="text-xs font-mono text-indigo-600 font-bold">🔵 PROFITAGENCY CORE DEPLOYED</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Mayfair Laser Aesthetics Profile</p>
                        <p className="text-[10px] font-mono text-slate-500">Active containers check: 🔵 ONLINE</p>
                      </div>
                      <span className="text-xs font-mono font-bold">£12,000 matched contract</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
