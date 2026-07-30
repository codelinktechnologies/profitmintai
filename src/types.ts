export type BusinessType = 'service' | 'affiliate' | 'both';

export interface UserProfile {
  id: string;
  email: string;
  businessName: string;
  niche: string;
  city: string;
  businessType: BusinessType;
  oto2Active: boolean;
  oto4Active: boolean;
  whatsappNumber: string;
  voiceProfileId: string;
  heartbeatFrequencyHours: number;
  learningAggressiveness: 'conservative' | 'balanced' | 'aggressive';
  setupComplete: boolean;
  monthlyRevenueTarget: number;
  icpObject: {
    companySize: string;
    industry: string;
    budgetRange: string;
    geography: string;
    keyPainPoints: string[];
  };
  createdAt: string;
}

export type LeadPriority = 'hot' | 'warm' | 'cold' | 'hold';
export type LeadStatus = 'found' | 'contacted' | 'replied' | 'booked' | 'proposed' | 'closed' | 'archived';
export type LeadSource = 'lead_finder' | 'inbound' | 'referral';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  niche: string;
  city: string;
  icpMatchScore: number; // 0-100
  mintPredictScore: number; // 0-100
  scoreFactors: {
    icpMatch: number;
    painSignals: number;
    timingSignals: number;
    historicalConversion: number;
  };
  priorityTier: LeadPriority;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
}

export interface Client {
  id: string;
  leadId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  serviceType: string;
  contractValue: number;
  contractSignedAt: string;
  status: 'active' | 'lapsed' | 'churned';
  relationshipScore: number; // 1-10
  totalRevenueAttributed: number;
  referralsGenerated: number;
  createdAt: string;
}

export interface Campaign {
  id: string;
  campaignType: string;
  targetNiche: string;
  targetCity: string;
  leadCount: number;
  startDate: string;
  endDate: string;
  predictionId: string;
  actualReplyRate: number;
  actualMeetings: number;
  actualIncome: number;
  status: 'active' | 'paused' | 'complete';
  createdAt: string;
}

export interface PipelineCard {
  id: string;
  leadId: string;
  stage: 'found' | 'contacted' | 'replied' | 'booked' | 'proposed' | 'closed';
  blandCallSid?: string;
  blandBantScore?: number; // 0-10
  heyGenVideoId?: string;
  proposalPageUrl?: string;
  docusignEnvelopeId?: string;
  proposalOpenedCount: number;
  contractValue: number;
  closedAt?: string;
  createdAt: string;
}

export interface ContentCalendarItem {
  id: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'buffer';
  contentText: string;
  imagePrompt: string;
  scheduledAt: string;
  postedAt?: string;
  bufferPostId?: string;
  reach: number;
  engagement: number;
  incomeAttributed: number;
  attributionWindowDays: number;
  createdAt: string;
}

export interface IncomeTransaction {
  id: string;
  source: 'stripe' | 'square' | 'gocardless' | 'paypal' | 'xero' | 'quickbooks' | 'docusign' | 'jvzoo' | 'clickbank' | 'amazon' | 'warriorplus';
  amount: number;
  currency: string;
  transactionTimestamp: string;
  productName: string;
  clientId?: string;
  serviceType: string;
  createdAt: string;
}

export interface AgentAction {
  id: string;
  actionType: string; // e.g. "outreach_email", "aeo_citation", "voice_briefing"
  actionTimestamp: string;
  agentMode: string; // "MintCloser", "MintAEO", "MintOrchestrator"
  metadata: {
    linkUrl?: string;
    leadId?: string;
    postId?: string;
    query?: string;
    citationUrl?: string;
    proposalId?: string;
  };
  outcomeFlag: boolean;
  attributionConfidence: number; // 1-5
  cycleId?: string;
  createdAt: string;
}

export interface IncomeAttribution {
  id: string;
  transactionId: string;
  actionId: string;
  attributionType: 'client_outreach' | 'content_inbound' | 'aeo_local_citation' | 'closer_followup' | 'growth_upsell' | 'referral' | 'direct' | 'affiliate';
  confidenceScore: number; // 1-5
  attributedAmount: number;
  createdAt: string;
}

export interface AttributionCard {
  id: string;
  transactionId: string;
  cardText: string;
  amount: number;
  actionType: string;
  actionTimestamp: string;
  confidenceScore: number;
  imageUrl?: string;
  shareCount: number;
  createdAt: string;
}

export interface GeoMonitoring {
  id: string;
  targetQuery: string;
  checkDate: string;
  cited: boolean;
  citationPosition?: number;
  citationUrl?: string;
  competitorDomain?: string;
  rewriteRecommended: boolean;
  incomeAttributed: number;
  createdAt: string;
}

export interface AeoContent {
  id: string;
  contentType: 'authority_page' | 'faq_page' | 'case_study' | 'affiliate_review';
  productOrServiceName: string;
  contentUrl: string;
  vercelDeploymentId?: string;
  schemaJson: any;
  quickAnswerScore: number; // 1-10
  faqCount: number;
  lastOptimisedAt: string;
  citationCount7d: number;
  incomeAttributed: number;
  createdAt: string;
}

export interface McpServer {
  id: string;
  serverType: 'service' | 'affiliate';
  serverUrl: string;
  toolsJson: any;
  queriesHandled: number;
  lastQueryAt: string;
  incomeViaMcp: number;
  vercelFunctionId: string;
  createdAt: string;
}

export interface OrchestratorCycle {
  id: string;
  cycleStart: string;
  cycleEnd?: string;
  status: 'running' | 'complete' | 'partial_failure';
  actionsTaken: number;
  actionsQueued: number;
  leadsFound: number;
  incomeAttributedThisCycle: number;
  briefingDelivered: boolean;
  createdAt: string;
}

export interface PulseLearningLog {
  id: string;
  cycleId: string;
  previousConfig: any;
  newConfig: any;
  claudeReasoning: string;
  income7dBefore: number;
  income7dAfter: number;
  performanceDelta: number;
  createdAt: string;
}

export interface ConfigHistory {
  id: string;
  configSnapshot: any;
  snapshotReason: 'auto_learning' | 'manual_edit' | 'rollback';
  snapshotAt: string;
}

export interface CampaignPrediction {
  id: string;
  campaignId: string;
  predictedReplyRate: number;
  predictedMeetings: number;
  predictedIncome: number;
  confidenceScore: number; // 1-5
  actualReplyRate?: number;
  actualMeetings?: number;
  actualIncome?: number;
  accuracyPct?: number;
  createdAt: string;
}

export interface LeadScore {
  id: string;
  leadId: string;
  score: number; // 0-100
  scoreFactors: {
    icpMatch: number;
    painSignals: number;
    timingSignals: number;
    historicalConversion: number;
  };
  scoredAt: string;
  converted: boolean;
  conversionValue: number;
}

export interface ClientHealth {
  id: string;
  clientId: string;
  healthScore: number; // 1-10
  scoreFactors: {
    emailEngagement: number;
    callFrequencyDays: number;
    paymentSpeedDays: number;
    usageSignals: any;
  };
  churnRisk: 'low' | 'medium' | 'high';
  upsellReady: boolean;
  lastUpsellSentAt?: string;
  lastReviewRequestedAt?: string;
  testimonialReceived: boolean;
  referralsGenerated: number;
  updatedAt: string;
}

export interface ApprovalsQueueItem {
  id: string;
  actionType: string;
  title: string;
  description: string;
  targetLeadName: string;
  targetCompanyName: string;
  expectedOutcome: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
