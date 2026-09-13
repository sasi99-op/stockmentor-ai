import {
  AIAnalysisRequest,
  AIAnalysisResponse,
  AIThesisAnalysis,
  IAIProvider,
  MarketQuote,
} from '@/types';
import { GeminiProvider } from './providers/GeminiProvider';

/**
 * AIService
 * Central broker for all AI explanations and evidence-based analysis.
 *
 * ARCHITECTURAL RULE:
 * UI components and pages must NEVER import third-party AI SDKs (Google Generative AI,
 * OpenAI, Groq, Anthropic, etc.) directly.
 * All requests must flow through this service, which delegates to the active IAIProvider.
 */
class AIService implements IAIProvider {
  private provider: IAIProvider;

  constructor(provider?: IAIProvider) {
    this.provider = provider ?? new GeminiProvider();
  }

  public setProvider(newProvider: IAIProvider): void {
    this.provider = newProvider;
  }

  public get providerName(): string {
    return this.provider.providerName;
  }

  public async explainConcept(concept: string): Promise<string> {
    if (!concept || concept.trim().length === 0) {
      return '';
    }
    return this.provider.explainConcept(concept.trim());
  }

  public async analyzeEvidence(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    return this.provider.analyzeEvidence(request);
  }

  public async analyzeStockThesis(quote: MarketQuote): Promise<AIThesisAnalysis> {
    return this.provider.analyzeStockThesis(quote);
  }
}

// Export singleton instance for app-wide use
export const aiService = new AIService();
export { AIService };

