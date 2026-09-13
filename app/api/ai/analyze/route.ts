import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/services/ai/AIService';
import { marketDataService } from '@/services/marketData/MarketDataService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, concept, topic } = body;

    if (symbol) {
      const quote = await marketDataService.getQuote(symbol);
      if (!quote) {
        return NextResponse.json(
          { error: `Unable to fetch quote data for symbol "${symbol}" to analyze.` },
          { status: 404 }
        );
      }

      const analysis = await aiService.analyzeStockThesis(quote);
      return NextResponse.json({
        type: 'thesis_analysis',
        provider: aiService.providerName,
        analysis,
      });
    }

    if (concept) {
      const explanation = await aiService.explainConcept(concept);
      return NextResponse.json({
        type: 'concept_explanation',
        provider: aiService.providerName,
        concept,
        explanation,
      });
    }

    if (topic) {
      const evidence = await aiService.analyzeEvidence({ topic });
      return NextResponse.json({
        type: 'evidence_analysis',
        provider: aiService.providerName,
        topic,
        evidence,
      });
    }

    return NextResponse.json(
      { error: 'Please provide either symbol, concept, or topic in request body.' },
      { status: 400 }
    );
  } catch (err: unknown) {
    console.error('Error in /api/ai/analyze:', err);
    return NextResponse.json(
      { error: 'Failed to process AI analysis request.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const symbol = searchParams.get('symbol');
  const concept = searchParams.get('concept');

  try {
    if (symbol) {
      const quote = await marketDataService.getQuote(symbol);
      if (!quote) {
        return NextResponse.json(
          { error: `Unable to fetch quote data for symbol "${symbol}" to analyze.` },
          { status: 404 }
        );
      }
      const analysis = await aiService.analyzeStockThesis(quote);
      return NextResponse.json({
        type: 'thesis_analysis',
        provider: aiService.providerName,
        analysis,
      });
    }

    if (concept) {
      const explanation = await aiService.explainConcept(concept);
      return NextResponse.json({
        type: 'concept_explanation',
        provider: aiService.providerName,
        concept,
        explanation,
      });
    }

    return NextResponse.json(
      { error: 'Provide "symbol" or "concept" query parameter.' },
      { status: 400 }
    );
  } catch (err: unknown) {
    console.error('Error in GET /api/ai/analyze:', err);
    return NextResponse.json(
      { error: 'Failed to process AI analysis request.' },
      { status: 500 }
    );
  }
}
