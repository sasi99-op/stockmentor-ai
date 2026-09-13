import { AIAnalysisRequest, AIAnalysisResponse, AIThesisAnalysis, IAIProvider, MarketQuote } from '@/types';

/**
 * GeminiGroqStubProvider
 * Default development provider stub for AI reasoning.
 *
 * CORE PHILOSOPHY:
 * StockMentor AI educates and assists Indian retail investors with objective evidence.
 * It NEVER gives buy/sell advice, price targets, or return predictions.
 */
export class GeminiGroqStubProvider implements IAIProvider {
  public readonly providerName = 'Gemini / Groq Free Tier (Dev)';

  async explainConcept(concept: string): Promise<string> {
    return `StockMentor AI educational concept explainer for "${concept}" will be active in AI Phase.`;
  }

  async analyzeEvidence(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    return {
      summary: `Evidence overview for topic: ${request.topic}.`,
      educationalEvidence: [
        'StockMentor AI evaluates balance sheets, profitability, and debt ratios objectively.',
        'Investors formulate independent conclusions based on audited filings.',
      ],
      disclaimer:
        'StockMentor AI is strictly educational and analytical. We do not provide investment recommendations or financial advice.',
    };
  }

  async analyzeStockThesis(quote: MarketQuote): Promise<AIThesisAnalysis> {
    return {
      symbol: quote.symbol,
      companyName: quote.name,
      businessSummary: quote.summary || 'Summary unavailable.',
      valuationAssessment: 'fair',
      valuationEvidence: 'Development stub evaluation.',
      solvencyStatus: 'conservative',
      solvencyEvidence: 'Development stub solvency analysis.',
      thesisQuestions: [
        'Is Free Cash Flow consistently positive?',
        'Does the firm maintain pricing power?',
      ],
      keyRisks: ['General macroeconomic slowdown.'],
      disclaimer:
        'StockMentor AI is strictly educational and analytical. We do not provide investment recommendations or financial advice.',
    };
  }
}

