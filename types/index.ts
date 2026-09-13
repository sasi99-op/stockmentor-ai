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
}

export interface MarketSearchItem {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
}

export interface IMarketDataProvider {
  readonly providerName: string;
  searchSymbols(query: string): Promise<MarketSearchItem[]>;
  getQuote(symbol: string): Promise<MarketQuote | null>;
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

export interface IAIProvider {
  readonly providerName: string;
  explainConcept(concept: string): Promise<string>;
  analyzeEvidence(request: AIAnalysisRequest): Promise<AIAnalysisResponse>;
}
