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
  // ==========================================
  // TECHNOLOGY & IT SERVICES
  // ==========================================
  {
    symbol: 'TCS.NS',
    cleanSymbol: 'TCS',
    name: 'Tata Consultancy Services Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    summary:
      'India’s largest IT services provider and flagship Tata Group enterprise. Operates across 50+ countries delivering enterprise cloud, AI, and digital transformation solutions.',
  },
  {
    symbol: 'INFY.NS',
    cleanSymbol: 'INFY',
    name: 'Infosys Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    summary:
      'Global leader in next-generation digital services and consulting. Pioneer of the Indian IT revolution with clients across financial services, manufacturing, and retail.',
  },
  {
    symbol: 'HCLTECH.NS',
    cleanSymbol: 'HCLTECH',
    name: 'HCL Technologies Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'IT Services & Products',
    summary:
      'Global technology enterprise offering engineering R&D, digital business services, and proprietary software products (HCLSoftware).',
  },
  {
    symbol: 'WIPRO.NS',
    cleanSymbol: 'WIPRO',
    name: 'Wipro Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    summary:
      'Leading technology services and consulting company focused on building innovative solutions across cloud, cybersecurity, and enterprise automation.',
  },
  {
    symbol: 'LTIM.NS',
    cleanSymbol: 'LTIM',
    name: 'LTIMindtree Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    summary:
      'Formed by the merger of L&T Infotech and Mindtree. Delivers digital business transformation and engineering services for Fortune 500 enterprises.',
  },
  {
    symbol: 'TECHM.NS',
    cleanSymbol: 'TECHM',
    name: 'Tech Mahindra Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'Telecom & Enterprise IT',
    summary:
      'Part of the Mahindra Group, specializing in 5G networks, telecom software integration, digital experience engineering, and enterprise cloud.',
  },
  {
    symbol: 'PERSISTENT.NS',
    cleanSymbol: 'PERSISTENT',
    name: 'Persistent Systems Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'Software Engineering & Cloud',
    summary:
      'Mid-cap technology standout focused on digital product engineering, enterprise modernization, and healthcare/life sciences software architectures.',
  },
  {
    symbol: 'COFORGE.NS',
    cleanSymbol: 'COFORGE',
    name: 'Coforge Ltd',
    exchange: 'NSE',
    sector: 'Technology',
    industry: 'Vertical IT Solutions',
    summary:
      'Leading digital services and solutions provider with deep domain expertise in banking, financial services, insurance, and travel/hospitality.',
  },

  // ==========================================
  // FINANCIALS & BANKING
  // ==========================================
  {
    symbol: 'HDFCBANK.NS',
    cleanSymbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Private Banking',
    summary:
      'India’s largest private sector lender following its landmark merger with HDFC Ltd. Boasts massive nationwide branch network and dominant retail deposit base.',
  },
  {
    symbol: 'ICICIBANK.NS',
    cleanSymbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Private Banking',
    summary:
      'Premier private bank renowned for best-in-class digital banking infrastructure (iMobile), high Net Interest Margins (NIM), and prudent risk management.',
  },
  {
    symbol: 'SBIN.NS',
    cleanSymbol: 'SBIN',
    name: 'State Bank of India',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Public Banking',
    summary:
      'India’s largest bank and Fortune 500 public institution. Operates 22,000+ branches and commands over 20% total market share in national loan originations.',
  },
  {
    symbol: 'KOTAKBANK.NS',
    cleanSymbol: 'KOTAKBANK',
    name: 'Kotak Mahindra Bank Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Private Banking & Wealth',
    summary:
      'Diversified financial institution founded by Uday Kotak. Well-capitalized balance sheet with presence across corporate banking, asset management, and broking.',
  },
  {
    symbol: 'AXISBANK.NS',
    cleanSymbol: 'AXISBANK',
    name: 'Axis Bank Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Private Banking',
    summary:
      'Third largest private sector bank in India with robust corporate, retail, and SME lending operations, expanded by the acquisition of Citibank’s India consumer unit.',
  },
  {
    symbol: 'BAJFINANCE.NS',
    cleanSymbol: 'BAJFINANCE',
    name: 'Bajaj Finance Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Consumer NBFC',
    summary:
      'India’s largest non-banking financial company (NBFC) dominating point-of-sale consumer durable loans, personal lending, and digital omni-channel payments.',
  },
  {
    symbol: 'BAJAJFINSV.NS',
    cleanSymbol: 'BAJAJFINSV',
    name: 'Bajaj Finserv Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Financial Holding Company',
    summary:
      'Holding company for the financial services businesses of the Bajaj Group, including Bajaj Finance, Bajaj Allianz Life, and General Insurance.',
  },
  {
    symbol: 'JIOFIN.NS',
    cleanSymbol: 'JIOFIN',
    name: 'Jio Financial Services Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Fintech & Digital Lending',
    summary:
      'Financial services arm demerged from Reliance Industries. Expanding rapidly into digital payments, consumer credit, insurance broking, and asset management with BlackRock.',
  },
  {
    symbol: 'SHRIRAMFIN.NS',
    cleanSymbol: 'SHRIRAMFIN',
    name: 'Shriram Finance Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Commercial Vehicle Finance',
    summary:
      'Leading commercial vehicle and retail asset financier in India following the mega-merger of Shriram Transport Finance and Shriram City Union Finance.',
  },
  {
    symbol: 'INDUSINDBK.NS',
    cleanSymbol: 'INDUSINDBK',
    name: 'IndusInd Bank Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Private Banking',
    summary:
      'Mid-sized private lender with historic strength in vehicle loans, microfinance, and commercial banking services for mid-market corporates.',
  },
  {
    symbol: 'BANKBARODA.NS',
    cleanSymbol: 'BANKBARODA',
    name: 'Bank of Baroda',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Public Banking',
    summary:
      'Major public sector banking behemoth with significant international operations across 17 countries, modernized by its flagship bob World digital platform.',
  },
  {
    symbol: 'PNB.NS',
    cleanSymbol: 'PNB',
    name: 'Punjab National Bank',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Public Banking',
    summary:
      'Historic public lender with wide reach across Northern India, serving over 180 million customers through 10,000+ domestic service outlets.',
  },
  {
    symbol: 'CDSL.NS',
    cleanSymbol: 'CDSL',
    name: 'Central Depository Services (India) Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Market Infrastructure',
    summary:
      'Asia’s first listed depository holding custody of electronic securities. Directly powers retail Demat account expansion across India with over 110M+ active demat accounts.',
  },
  {
    symbol: 'BSE.NS',
    cleanSymbol: 'BSE',
    name: 'BSE Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Stock Exchange',
    summary:
      'Asia’s oldest stock exchange (established 1875). Experienced explosive derivative turnover resurgence with weekly index options and StAR MF mutual fund platform.',
  },
  {
    symbol: 'ANGELONE.NS',
    cleanSymbol: 'ANGELONE',
    name: 'Angel One Ltd',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Digital Retail Broking',
    summary:
      'One of India’s top digital fintech retail brokers. Dominates active retail option and equity turnover through client-facing mobile applications.',
  },

  // ==========================================
  // ENERGY, OIL & POWER
  // ==========================================
  {
    symbol: 'RELIANCE.NS',
    cleanSymbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    exchange: 'NSE',
    sector: 'Energy',
    industry: 'Oil, Retail & Telecom',
    summary:
      'India’s largest company by market cap. Operates the world’s largest oil refining complex at Jamnagar while dominating Indian telecom (Jio) and organized retail (Reliance Retail).',
  },
  {
    symbol: 'ONGC.NS',
    cleanSymbol: 'ONGC',
    name: 'Oil & Natural Gas Corporation Ltd',
    exchange: 'NSE',
    sector: 'Energy',
    industry: 'Upstream Exploration',
    summary:
      'India’s largest government-owned crude oil and natural gas explorer and producer, contributing ~70% to domestic petroleum output.',
  },
  {
    symbol: 'NTPC.NS',
    cleanSymbol: 'NTPC',
    name: 'NTPC Ltd',
    exchange: 'NSE',
    sector: 'Energy',
    industry: 'Power Generation & Renewables',
    summary:
      'India’s largest power utility supplying ~25% of the national electricity grid, undergoing major capital reallocation towards solar, green hydrogen, and wind.',
  },
  {
    symbol: 'POWERGRID.NS',
    cleanSymbol: 'POWERGRID',
    name: 'Power Grid Corporation of India Ltd',
    exchange: 'NSE',
    sector: 'Energy',
    industry: 'Power Transmission',
    summary:
      'Central transmission utility transmitting ~85% of India’s interstate power. High dividend yield, capital-stable regulated tariff model.',
  },
  {
    symbol: 'BPCL.NS',
    cleanSymbol: 'BPCL',
    name: 'Bharat Petroleum Corporation Ltd',
    exchange: 'NSE',
    sector: 'Energy',
    industry: 'Downstream Refining & Marketing',
    summary:
      'Major public sector downstream refiner operating nationwide network of 21,000+ fuel retail dispensing outlets and Mumbai/Kochi refineries.',
  },
  {
    symbol: 'COALINDIA.NS',
    cleanSymbol: 'COALINDIA',
    name: 'Coal India Ltd',
    exchange: 'NSE',
    sector: 'Energy',
    industry: 'Mining & Fossil Energy',
    summary:
      'World’s single largest coal producer by volume, meeting ~80% of India’s thermal power coal fuel needs with high dividend payout ratio.',
  },
  {
    symbol: 'TATAPOWER.NS',
    cleanSymbol: 'TATAPOWER',
    name: 'Tata Power Co Ltd',
    exchange: 'NSE',
    sector: 'Energy',
    industry: 'Integrated Power & EV Infra',
    summary:
      'Pioneering integrated power utility leading EV charging highway installations, solar rooftop manufacturing, and utility-scale solar EPC.',
  },
  {
    symbol: 'SUZLON.NS',
    cleanSymbol: 'SUZLON',
    name: 'Suzlon Energy Ltd',
    exchange: 'NSE',
    sector: 'Energy',
    industry: 'Wind Turbine Manufacturer',
    summary:
      'Market leader in wind energy solutions and turbine engineering across India. Successfully cleared debt burden with surging renewable multi-gigawatt order books.',
  },
  {
    symbol: 'IREDA.NS',
    cleanSymbol: 'IREDA',
    name: 'Indian Renewable Energy Development Agency',
    exchange: 'NSE',
    sector: 'Energy',
    industry: 'Green Infrastructure Finance',
    summary:
      'Public specialized non-banking institution financing green infrastructure, solar farms, wind parks, and bio-energy installations across India.',
  },

  // ==========================================
  // AUTOMOBILE & ELECTRIC MOBILITY
  // ==========================================
  {
    symbol: 'TATAMOTORS.NS',
    cleanSymbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    exchange: 'NSE',
    sector: 'Automobile',
    industry: 'Automotive & EVs',
    summary:
      'Global automotive leader owning Jaguar Land Rover (JLR) and commanding >65% market share in the Indian four-wheeler electric vehicle passenger segment.',
  },
  {
    symbol: 'MARUTI.NS',
    cleanSymbol: 'MARUTI',
    name: 'Maruti Suzuki India Ltd',
    exchange: 'NSE',
    sector: 'Automobile',
    industry: 'Passenger Vehicles',
    summary:
      'India’s largest carmaker commanding over 40% passenger market share with peerless nationwide rural dealership networks and compressed natural gas (CNG) models.',
  },
  {
    symbol: 'M&M.NS',
    cleanSymbol: 'M&M',
    name: 'Mahindra & Mahindra Ltd',
    exchange: 'NSE',
    sector: 'Automobile',
    industry: 'SUVs & Farm Equipment',
    summary:
      'Dominant market leader in Indian agricultural tractors and high-demand premium lifestyle SUVs (Scorpio-N, Thar, XUV700).',
  },
  {
    symbol: 'BAJAJ-AUTO.NS',
    cleanSymbol: 'BAJAJ-AUTO',
    name: 'Bajaj Auto Ltd',
    exchange: 'NSE',
    sector: 'Automobile',
    industry: 'Two & Three Wheelers',
    summary:
      'India’s top exporter of motorcycles and three-wheelers with presence in 75+ countries. Strong margin profile bolstered by Pulsar, Triumph partnership, and Chetak EV.',
  },
  {
    symbol: 'HEROMOTOCO.NS',
    cleanSymbol: 'HEROMOTOCO',
    name: 'Hero MotoCorp Ltd',
    exchange: 'NSE',
    sector: 'Automobile',
    industry: 'Two Wheelers',
    summary:
      'World’s largest two-wheeler manufacturer by annual volume, enjoying immense rural brand equity through Splendor and HF Deluxe.',
  },
  {
    symbol: 'EICHERMOT.NS',
    cleanSymbol: 'EICHERMOT',
    name: 'Eicher Motors Ltd',
    exchange: 'NSE',
    sector: 'Automobile',
    industry: 'Mid-Weight Motorcycles',
    summary:
      'Parent company of Royal Enfield, the cult premium motorcycle brand dominating the 250cc-750cc middleweight leisure motorcycle segment globally.',
  },

  // ==========================================
  // CONSUMER GOODS & RETAIL
  // ==========================================
  {
    symbol: 'HINDUNILVR.NS',
    cleanSymbol: 'HINDUNILVR',
    name: 'Hindustan Unilever Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'FMCG / Staples',
    summary:
      'India’s largest consumer goods giant reaching 9 out of 10 Indian households daily through iconic brands like Surf Excel, Dove, Sunsilk, Horlicks, and Lifebuoy.',
  },
  {
    symbol: 'ITC.NS',
    cleanSymbol: 'ITC',
    name: 'ITC Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'Conglomerate & FMCG',
    summary:
      'Cash-generative conglomerate with leading market share in cigarettes, fast-expanding packaged foods (Aashirvaad, Sunfeast, Bingo), hotels, and agri-business.',
  },
  {
    symbol: 'NESTLEIND.NS',
    cleanSymbol: 'NESTLEIND',
    name: 'Nestle India Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'Food & Nutrition',
    summary:
      'Dominant player in packaged noodles (Maggi), infant nutrition (Cerelac, Lactogen), chocolates (KitKat), and coffee (Nescafe) with exceptional ROCE.',
  },
  {
    symbol: 'BRITANNIA.NS',
    cleanSymbol: 'BRITANNIA',
    name: 'Britannia Industries Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'Bakery & Dairy',
    summary:
      'One of India’s leading food companies with over a century of heritage in biscuits (Good Day, Marie Gold), cakes, dairy, and snacking.',
  },
  {
    symbol: 'TATACONSUM.NS',
    cleanSymbol: 'TATACONSUM',
    name: 'Tata Consumer Products Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'Beverages & Foods',
    summary:
      'Consumer staples pillar of the Tata Group, uniting Tata Tea, Tata Salt, Tetley, Sampann pulses, and the Starbucks joint venture across India.',
  },
  {
    symbol: 'ASIANPAINT.NS',
    cleanSymbol: 'ASIANPAINT',
    name: 'Asian Paints Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'Decorative Paints',
    summary:
      'India’s largest paint maker holding commanding decorative market share. Renowned supply chain moat with tinting machines located across 70,000+ retail dealers.',
  },
  {
    symbol: 'TITAN.NS',
    cleanSymbol: 'TITAN',
    name: 'Titan Company Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'Jewelry & Lifestyle',
    summary:
      'Tata Group’s luxury powerhouse operating Tanishq, Mia, Fastrack, and CaratLane. Key beneficiary of structural migration from unorganized to organized jewelry.',
  },
  {
    symbol: 'TRENT.NS',
    cleanSymbol: 'TRENT',
    name: 'Trent Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'Fast Fashion & Retail',
    summary:
      'Tata Group’s explosive retail compounder driving high inventory turnover and profitable fast fashion via Zudio and Westside apparel retail chains.',
  },
  {
    symbol: 'ZOMATO.NS',
    cleanSymbol: 'ZOMATO',
    name: 'Zomato Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'Quick Commerce & Food Delivery',
    summary:
      'India’s leading consumer food services and quick-commerce company. Operates food delivery and Blinkit, pioneering 10-minute grocery delivery nationwide.',
  },
  {
    symbol: 'VBL.NS',
    cleanSymbol: 'VBL',
    name: 'Varun Beverages Ltd',
    exchange: 'NSE',
    sector: 'Consumer Goods',
    industry: 'Beverage Bottling',
    summary:
      'One of the largest franchisees of PepsiCo in the world outside the US, bottling and distributing Pepsi, Sting, Mountain Dew, and Tropicana across India and Africa.',
  },

  // ==========================================
  // HEALTHCARE & PHARMA
  // ==========================================
  {
    symbol: 'SUNPHARMA.NS',
    cleanSymbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical Industries Ltd',
    exchange: 'NSE',
    sector: 'Healthcare',
    industry: 'Specialty & Generics',
    summary:
      'World’s fourth largest global specialty generic pharmaceutical company, leading the Indian domestic formulations market and international dermatological therapies.',
  },
  {
    symbol: 'CIPLA.NS',
    cleanSymbol: 'CIPLA',
    name: 'Cipla Ltd',
    exchange: 'NSE',
    sector: 'Healthcare',
    industry: 'Respiratory & Generics',
    summary:
      'Pioneering Indian pharma multinational with global prominence in respiratory treatments, inhalation therapies, and affordable anti-retrovirals.',
  },
  {
    symbol: 'DRREDDY.NS',
    cleanSymbol: 'DRREDDY',
    name: 'Dr. Reddy’s Laboratories Ltd',
    exchange: 'NSE',
    sector: 'Healthcare',
    industry: 'Formulations & Biosimilars',
    summary:
      'Major global generics manufacturer with strong footholds in the US, Europe, Russia, and India across oncology, gastroenterology, and biosimilar assets.',
  },
  {
    symbol: 'APOLLOHOSP.NS',
    cleanSymbol: 'APOLLOHOSP',
    name: 'Apollo Hospitals Enterprise Ltd',
    exchange: 'NSE',
    sector: 'Healthcare',
    industry: 'Healthcare Services & Pharmacies',
    summary:
      'Largest integrated healthcare network in Asia, operating 10,000+ hospital beds, 5,500+ diagnostic pharmacies, and the Apollo 24/7 digital health app.',
  },
  {
    symbol: 'DIVISLAB.NS',
    cleanSymbol: 'DIVISLAB',
    name: 'Divi’s Laboratories Ltd',
    exchange: 'NSE',
    sector: 'Healthcare',
    industry: 'Active Pharma Ingredients (API)',
    summary:
      'World leader in large-scale custom synthesis and active pharmaceutical ingredients (APIs), supplying global top-20 Big Pharma innovators.',
  },

  // ==========================================
  // INDUSTRIALS, INFRASTRUCTURE & DEFENSE
  // ==========================================
  {
    symbol: 'LT.NS',
    cleanSymbol: 'LT',
    name: 'Larsen & Toubro Ltd',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'EPC & Hi-Tech Engineering',
    summary:
      'India’s premier engineering and construction titan. Central player in domestic infrastructure development, metro rails, defense manufacturing, and green hydrogen plants.',
  },
  {
    symbol: 'HAL.NS',
    cleanSymbol: 'HAL',
    name: 'Hindustan Aeronautics Ltd',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Aerospace & Defense PSU',
    summary:
      'Navratna defense PSU responsible for designing and manufacturing indigenous fighter aircraft (Tejas LCA), combat helicopters, and aircraft engine maintenance.',
  },
  {
    symbol: 'BEL.NS',
    cleanSymbol: 'BEL',
    name: 'Bharat Electronics Ltd',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Defense Electronics PSU',
    summary:
      'Premier state-owned aerospace and defense electronics manufacturer supplying radars, missile defense avionics, naval sonars, and electronic voting machines.',
  },
  {
    symbol: 'MAZDOCK.NS',
    cleanSymbol: 'MAZDOCK',
    name: 'Mazagon Dock Shipbuilders Ltd',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Naval Shipyard PSU',
    summary:
      'India’s leading defense public sector shipyard constructing warships, stealth destroyers, and Scorpene-class submarines for the Indian Navy.',
  },
  {
    symbol: 'BHEL.NS',
    cleanSymbol: 'BHEL',
    name: 'Bharat Heavy Electricals Ltd',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Heavy Engineering PSU',
    summary:
      'India’s largest power generation equipment manufacturer with growing presence in defense, rail transportation (Vande Bharat trainsets), and transmission.',
  },
  {
    symbol: 'IRCTC.NS',
    cleanSymbol: 'IRCTC',
    name: 'Indian Railway Catering & Tourism Corp',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Railway Ticketing & Tourism',
    summary:
      'Monopolistic public sector company under the Ministry of Railways holding exclusive rights over online rail ticket booking, packaged Rail Neer water, and catering.',
  },
  {
    symbol: 'RVNL.NS',
    cleanSymbol: 'RVNL',
    name: 'Rail Vikas Nigam Ltd',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Rail Infrastructure EPC',
    summary:
      'Project execution arm of Indian Railways handling line doubling, gauge conversion, railway electrification, and metro tunneling projects.',
  },
  {
    symbol: 'IRFC.NS',
    cleanSymbol: 'IRFC',
    name: 'Indian Railway Finance Corporation',
    exchange: 'NSE',
    sector: 'Financials',
    industry: 'Rail Infrastructure Financing',
    summary:
      'Dedicated market borrowing arm of the Indian Ministry of Railways, financing rolling stock acquisition with sovereign safety and zero NPA history.',
  },
  {
    symbol: 'INDIGO.NS',
    cleanSymbol: 'INDIGO',
    name: 'InterGlobe Aviation Ltd (IndiGo)',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Commercial Aviation',
    summary:
      'India’s largest commercial airline commanding >60% domestic passenger market share with one of the youngest, fuel-efficient Airbus A320neo fleets globally.',
  },
  {
    symbol: 'DLF.NS',
    cleanSymbol: 'DLF',
    name: 'DLF Ltd',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Real Estate Development',
    summary:
      'India’s largest publicly traded real estate developer holding prime land parcels and rental office portfolio (DLF CyberCity) across NCR, Gurugram, and Chennai.',
  },

  // ==========================================
  // METALS, MINING & MATERIALS
  // ==========================================
  {
    symbol: 'TATASTEEL.NS',
    cleanSymbol: 'TATASTEEL',
    name: 'Tata Steel Ltd',
    exchange: 'NSE',
    sector: 'Metals & Mining',
    industry: 'Steel Manufacturing',
    summary:
      'Pioneer of Indian industrial steel with fully integrated captive iron ore mines in India, expanding green steel capacity in Kalinganagar and the UK.',
  },
  {
    symbol: 'JSWSTEEL.NS',
    cleanSymbol: 'JSWSTEEL',
    name: 'JSW Steel Ltd',
    exchange: 'NSE',
    sector: 'Metals & Mining',
    industry: 'Steel Manufacturing',
    summary:
      'Flagship company of the JSW Group and one of India’s largest private steel producers by capacity with cutting-edge plants in Vijayanagar, Karnataka.',
  },
  {
    symbol: 'HINDALCO.NS',
    cleanSymbol: 'HINDALCO',
    name: 'Hindalco Industries Ltd',
    exchange: 'NSE',
    sector: 'Metals & Mining',
    industry: 'Aluminium & Copper',
    summary:
      'Global non-ferrous metals powerhouse part of Aditya Birla Group. Owns Novelis, the world’s largest recycler and roller of flat aluminium cans and automotive sheets.',
  },
  {
    symbol: 'VEDL.NS',
    cleanSymbol: 'VEDL',
    name: 'Vedanta Ltd',
    exchange: 'NSE',
    sector: 'Metals & Mining',
    industry: 'Diversified Natural Resources',
    summary:
      'Diversified natural resources conglomerate with premier assets across zinc (Hindustan Zinc), aluminium, oil & gas (Cairn India), and power.',
  },
  {
    symbol: 'GRASIM.NS',
    cleanSymbol: 'GRASIM',
    name: 'Grasim Industries Ltd',
    exchange: 'NSE',
    sector: 'Basic Materials',
    industry: 'Viscose, Chemicals & Paints',
    summary:
      'Aditya Birla Group flagship holding viscose staple fibre leadership, caustic soda manufacturing, and the newly launched Birla Opus decorative paints brand.',
  },
  {
    symbol: 'ULTRACEMCO.NS',
    cleanSymbol: 'ULTRACEMCO',
    name: 'UltraTech Cement Ltd',
    exchange: 'NSE',
    sector: 'Basic Materials',
    industry: 'Cement & Building Materials',
    summary:
      'India’s largest cement producer and third largest globally (outside China) with over 150 million tonnes per annum (MTPA) manufacturing capacity.',
  },
  {
    symbol: 'ADANIENT.NS',
    cleanSymbol: 'ADANIENT',
    name: 'Adani Enterprises Ltd',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Infrastructure Incubator',
    summary:
      'Flagship incubator for the Adani Group, nurturing new-age infrastructure ventures including airport management, data centers, solar modules, and roads.',
  },
  {
    symbol: 'ADANIPORTS.NS',
    cleanSymbol: 'ADANIPORTS',
    name: 'Adani Ports & Special Economic Zone',
    exchange: 'NSE',
    sector: 'Industrials & Defense',
    industry: 'Port Infrastructure',
    summary:
      'India’s largest commercial port operator handling ~25% of national port cargo volume through flagship deep-water hub at Mundra, Gujarat.',
  },
];
