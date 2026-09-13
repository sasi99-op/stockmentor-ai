import { IMarketDataProvider, MarketQuote, MarketSearchItem } from '@/types';
import { YahooFinanceAdapter } from './adapters/YahooFinanceAdapter';

/**
 * MarketDataService
 * Central broker for all equity and market data queries.
 *
 * ARCHITECTURAL RULE:
 * UI components and pages must NEVER import a third-party market data library directly.
 * All requests must flow through this service, which delegates to the active IMarketDataProvider.
 * This guarantees seamless switching from free adapters to licensed data feeds in the future.
 */
class MarketDataService implements IMarketDataProvider {
  private adapter: IMarketDataProvider;

  constructor(adapter?: IMarketDataProvider) {
    this.adapter = adapter ?? new YahooFinanceAdapter();
  }

  public setAdapter(newAdapter: IMarketDataProvider): void {
    this.adapter = newAdapter;
  }

  public get providerName(): string {
    return this.adapter.providerName;
  }

  public async searchSymbols(query: string): Promise<MarketSearchItem[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }
    return this.adapter.searchSymbols(query.trim());
  }

  public async getQuote(symbol: string): Promise<MarketQuote | null> {
    if (!symbol || symbol.trim().length === 0) {
      return null;
    }
    return this.adapter.getQuote(symbol.trim());
  }
}

// Export singleton instance for app-wide use
export const marketDataService = new MarketDataService();
export { MarketDataService };
