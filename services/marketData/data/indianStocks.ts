export interface IndianStockMetadata {
  symbol: string; // e.g. 'RELIANCE.NS'
  cleanSymbol: string; // 'RELIANCE'
  name: string;
  exchange: 'NSE' | 'BSE';
  sector: string;
  industry: string;
  summary: string;
}

export const INDIAN_STOCKS: IndianStockMetadata[] = [
  {
    symbol: 'RELIANCE.NS',
    cleanSymbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    exchange: 'NSE',
    sector: 'Energy & Conglomerate',
    industry: 'Oil, Retail & Telecom',
    summary:
      'Reliance Industries Limited is an Indian multinational conglomerate headquartered in Mumbai. Its businesses include energy, petrochemicals, natural gas, retail, telecommunications (Jio), and media.',
  },
  {
    symbol: 'TCS.NS',
    cleanSymbol: 'TCS',
    name: 'Tata Consultancy Services Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    summary:
      'Tata Consultancy Services is an Indian multinational information technology services and consulting company. It is a flagship subsidiary of the Tata Group operating in 150+ locations across 46 countries.',
  },
  {
    symbol: 'HDFCBANK.NS',
    cleanSymbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Private Banking',
    summary:
      'HDFC Bank Limited is India’s largest private sector bank by assets and market capitalization. It offers wholesale, retail banking, treasury, and digital payment solutions.',
  },
  {
    symbol: 'INFY.NS',
    cleanSymbol: 'INFY',
    name: 'Infosys Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    summary:
      'Infosys Limited is an Indian multinational technology company that provides business consulting, information technology, and outsourcing services.',
  },
  {
    symbol: 'ICICIBANK.NS',
    cleanSymbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Private Banking',
    summary:
      'ICICI Bank Limited is a premier Indian multinational bank and financial services company headquartered in Mumbai offering diversified retail and corporate banking services.',
  },
  {
    symbol: 'HINDUNILVR.NS',
    cleanSymbol: 'HINDUNILVR',
    name: 'Hindustan Unilever Ltd',
    exchange: 'NSE',
    sector: 'Consumer Defensive',
    industry: 'FMCG / Personal Care',
    summary:
      'Hindustan Unilever Limited (HUL) is India’s largest fast-moving consumer goods company with brands across beauty, personal care, home care, and food & refreshments.',
  },
  {
    symbol: 'ITC.NS',
    cleanSymbol: 'ITC',
    name: 'ITC Ltd',
    exchange: 'NSE',
    sector: 'Consumer Defensive',
    industry: 'Conglomerate & FMCG',
    summary:
      'ITC Limited is an Indian conglomerate with presence across FMCG, hotels, paperboards & packaging, agri-business, and information technology.',
  },
  {
    symbol: 'BHARTIARTL.NS',
    cleanSymbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd',
    exchange: 'NSE',
    sector: 'Communication Services',
    industry: 'Telecom Services',
    summary:
      'Bharti Airtel Limited is a leading global telecommunications company with operations in 18 countries across South Asia and Africa.',
  },
  {
    symbol: 'SBIN.NS',
    cleanSymbol: 'SBIN',
    name: 'State Bank of India',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Public Banking',
    summary:
      'State Bank of India is a statutory public sector banking and financial services body headquartered in Mumbai. It is India’s largest public bank with over 22,000 branches.',
  },
  {
    symbol: 'TATAMOTORS.NS',
    cleanSymbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    exchange: 'NSE',
    sector: 'Consumer Cyclical',
    industry: 'Automotive & EVs',
    summary:
      'Tata Motors Limited is a leading global automobile manufacturer of cars, utility vehicles, pick-ups, trucks, and buses. It owns the Jaguar Land Rover (JLR) brand.',
  },
  {
    symbol: 'LT.NS',
    cleanSymbol: 'LT',
    name: 'Larsen & Toubro Ltd',
    exchange: 'NSE',
    sector: 'Industrials',
    industry: 'Engineering & Construction',
    summary:
      'Larsen & Toubro is an Indian multinational engaged in EPC projects, hi-tech manufacturing, defense, and infrastructure development.',
  },
  {
    symbol: 'KOTAKBANK.NS',
    cleanSymbol: 'KOTAKBANK',
    name: 'Kotak Mahindra Bank Ltd',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Private Banking',
    summary:
      'Kotak Mahindra Bank offers complete financial solutions ranging from commercial banking to stock broking, mutual funds, and life insurance.',
  },
  {
    symbol: 'AXISBANK.NS',
    cleanSymbol: 'AXISBANK',
    name: 'Axis Bank Ltd',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Private Banking',
    summary:
      'Axis Bank is the third largest private sector bank in India offering services across retail, SME, and corporate banking segments.',
  },
  {
    symbol: 'ASIANPAINT.NS',
    cleanSymbol: 'ASIANPAINT',
    name: 'Asian Paints Ltd',
    exchange: 'NSE',
    sector: 'Basic Materials',
    industry: 'Paints & Coatings',
    summary:
      'Asian Paints is India’s leading paint company with operations in 15 countries. It manufactures a wide range of paints for decorative and industrial use.',
  },
  {
    symbol: 'MARUTI.NS',
    cleanSymbol: 'MARUTI',
    name: 'Maruti Suzuki India Ltd',
    exchange: 'NSE',
    sector: 'Consumer Cyclical',
    industry: 'Automotive',
    summary:
      'Maruti Suzuki India Limited is the leading passenger car manufacturer in India, a subsidiary of Suzuki Motor Corporation.',
  },
  {
    symbol: 'SUNPHARMA.NS',
    cleanSymbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical Industries Ltd',
    exchange: 'NSE',
    sector: 'Healthcare',
    industry: 'Specialty Pharma',
    summary:
      'Sun Pharma is the world’s fourth largest specialty generic pharmaceutical company and India’s top pharmaceutical manufacturer.',
  },
  {
    symbol: 'TITAN.NS',
    cleanSymbol: 'TITAN',
    name: 'Titan Company Ltd',
    exchange: 'NSE',
    sector: 'Consumer Cyclical',
    industry: 'Jewelry & Watches',
    summary:
      'Titan Company Limited is part of the Tata Group and a leader in jewelry (Tanishq), watches (Titan, Fastrack), and eyewear.',
  },
  {
    symbol: 'BAJFINANCE.NS',
    cleanSymbol: 'BAJFINANCE',
    name: 'Bajaj Finance Ltd',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Consumer NBFC',
    summary:
      'Bajaj Finance Limited is one of India’s largest non-banking financial companies (NBFC) specializing in consumer lending and wealth management.',
  },
  {
    symbol: 'WIPRO.NS',
    cleanSymbol: 'WIPRO',
    name: 'Wipro Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    summary:
      'Wipro Limited is an Indian multinational provider of information technology, consulting, and business process services.',
  },
  {
    symbol: 'NTPC.NS',
    cleanSymbol: 'NTPC',
    name: 'NTPC Ltd',
    exchange: 'NSE',
    sector: 'Utilities',
    industry: 'Power Generation',
    summary:
      'NTPC Limited is India’s largest power utility, producing thermal, hydro, solar, and wind energy across India.',
  },
];
