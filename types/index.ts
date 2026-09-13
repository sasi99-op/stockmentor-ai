export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  id: string;
  display_name: string | null;
  experience_level: ExperienceLevel;
  created_at: string;
}

export interface MarketQuote {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
  price?: number;
  change?: number;
  changePercent?: number;
  currency: 'INR';
  isDelayed: boolean;
  dataSourceNotice: string;
  lastUpdated?: string;
  // Fundamental & valuation metrics
  marketCap?: number; // in INR
  peRatio?: number;
  pbRatio?: number;
  debtToEquity?: number;
  roe?: number; // percentage
  dividendYield?: number; // percentage
  week52High?: number;
  week52Low?: number;
  dayHigh?: number;
  dayLow?: number;
  volume?: number;
  sector?: string;
  industry?: string;
  summary?: string;
}

export interface MarketSearchItem {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
}

export interface HistoricalDataPoint {
  time: string | number; // 'YYYY-MM-DD' for daily or Unix timestamp in seconds for intraday
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  symbol: string;
  company_name: string;
  exchange: 'NSE' | 'BSE';
  created_at: string;
}

export interface PortfolioHolding {
  id: string;
  user_id: string;
  symbol: string;
  company_name: string;
  exchange: 'NSE' | 'BSE';
  shares: number;
  buy_price: number;
  buy_date: string;
  thesis_notes?: string;
  created_at: string;
}

export interface IMarketDataProvider {
  readonly providerName: string;
  searchSymbols(query: string): Promise<MarketSearchItem[]>;
  getQuote(symbol: string): Promise<MarketQuote | null>;
  getHistoricalChart(symbol: string, range: string): Promise<HistoricalDataPoint[]>;
}

export interface AIAnalysisRequest {
  topic: string;
  contextData?: Record<string, unknown>;
  userExperienceLevel?: ExperienceLevel;
}

export interface AIAnalysisResponse {
  summary: string;
  educationalEvidence: string[];
  disclaimer: string;
}

export interface AIThesisAnalysis {
  symbol: string;
  companyName: string;
  businessSummary: string;
  valuationAssessment: 'fair' | 'growth_premium' | 'undervalued' | 'speculative';
  valuationEvidence: string;
  solvencyStatus: 'conservative' | 'moderate' | 'capital_heavy';
  solvencyEvidence: string;
  thesisQuestions: string[];
  keyRisks: string[];
  disclaimer: string;
}

export interface IAIProvider {
  readonly providerName: string;
  explainConcept(concept: string): Promise<string>;
  analyzeEvidence(request: AIAnalysisRequest): Promise<AIAnalysisResponse>;
  analyzeStockThesis(quote: MarketQuote): Promise<AIThesisAnalysis>;
}
