import { IMarketDataProvider, MarketQuote, MarketSearchItem } from '@/types';

/**
 * YahooFinanceStubAdapter
 * Default development adapter for Indian equities (NSE/BSE).
 *
 * NOTE: As required by StockMentor AI guidelines:
 * - Data from Yahoo Finance unofficial `.NS`/`.BO` endpoints must be labeled as delayed/unofficial.
 * - In Phase 1, this adapter does NOT fabricate numbers; active live fetching is activated in Phase 2.
 */
export class YahooFinanceStubAdapter implements IMarketDataProvider {
  public readonly providerName = 'Yahoo Finance (Unofficial / Delayed)';

  async searchSymbols(_query: string): Promise<MarketSearchItem[]> {
    // Phase 1 stub: Return empty state. Live search activation scheduled for Phase 2.
    return [];
  }

  async getQuote(_symbol: string): Promise<MarketQuote | null> {
    // Phase 1 stub: Return null or empty state. No fake prices or returns fabricated.
    return null;
  }

  async getHistoricalChart(_symbol: string, _range: string): Promise<import('@/types').HistoricalDataPoint[]> {
    return [];
  }
}

