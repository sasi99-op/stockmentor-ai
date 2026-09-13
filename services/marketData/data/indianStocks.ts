export interface IndianStockMetadata {
  symbol: string; // e.g. 'RELIANCE.NS'
  cleanSymbol: string; // 'RELIANCE'
  name: string;
  exchange: 'NSE' | 'BSE';
  sector: string;
  industry: string;
  summary: string;
  category?: 'NIFTY50' | 'NEXT50' | 'MIDCAP' | 'SMALLCAP';
  aliases?: string[];
}

export const INDIAN_STOCKS: IndianStockMetadata[] = [
  {
    "symbol": "TCS.NS",
    "cleanSymbol": "TCS",
    "name": "Tata Consultancy Services Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "IT Services & Consulting",
    "category": "NIFTY50",
    "aliases": [
      "TATA CONSULTANCY",
      "TCS"
    ],
    "summary": "India’s largest IT services provider and flagship Tata Group enterprise. Operates across 50+ countries delivering enterprise cloud, AI, and digital transformation solutions."
  },
  {
    "symbol": "INFY.NS",
    "cleanSymbol": "INFY",
    "name": "Infosys Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "IT Services & Consulting",
    "category": "NIFTY50",
    "aliases": [
      "INFOSYS",
      "INFY"
    ],
    "summary": "Global leader in next-generation digital services and consulting. Pioneer of the Indian IT revolution with clients across financial services, manufacturing, and retail."
  },
  {
    "symbol": "HCLTECH.NS",
    "cleanSymbol": "HCLTECH",
    "name": "HCL Technologies Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "IT Services & Products",
    "category": "NIFTY50",
    "aliases": [
      "HCL",
      "HCL TECH"
    ],
    "summary": "Global technology enterprise offering engineering R&D, digital business services, and proprietary software products (HCLSoftware)."
  },
  {
    "symbol": "WIPRO.NS",
    "cleanSymbol": "WIPRO",
    "name": "Wipro Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "IT Services & Consulting",
    "category": "NIFTY50",
    "aliases": [
      "WIPRO"
    ],
    "summary": "Leading technology services and consulting company focused on building innovative solutions across cloud, cybersecurity, and enterprise automation."
  },
  {
    "symbol": "LTIM.NS",
    "cleanSymbol": "LTIM",
    "name": "LTIMindtree Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "IT Services & Consulting",
    "category": "NIFTY50",
    "aliases": [
      "L&T INFOTECH",
      "MINDTREE",
      "LTIMINDTREE"
    ],
    "summary": "Formed by the merger of L&T Infotech and Mindtree. Delivers digital business transformation and engineering services for Fortune 500 enterprises."
  },
  {
    "symbol": "TECHM.NS",
    "cleanSymbol": "TECHM",
    "name": "Tech Mahindra Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Telecom & Enterprise IT",
    "category": "NIFTY50",
    "aliases": [
      "TECH MAHINDRA"
    ],
    "summary": "Part of the Mahindra Group, specializing in 5G networks, telecom software integration, digital experience engineering, and enterprise cloud."
  },
  {
    "symbol": "PERSISTENT.NS",
    "cleanSymbol": "PERSISTENT",
    "name": "Persistent Systems Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Software Engineering & Cloud",
    "category": "MIDCAP",
    "aliases": [
      "PERSISTENT"
    ],
    "summary": "Mid-cap technology standout focused on digital product engineering, enterprise modernization, and healthcare/life sciences software architectures."
  },
  {
    "symbol": "COFORGE.NS",
    "cleanSymbol": "COFORGE",
    "name": "Coforge Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Vertical IT Solutions",
    "category": "MIDCAP",
    "aliases": [
      "COFORGE",
      "NIIT TECHNOLOGIES"
    ],
    "summary": "Leading digital services and solutions provider with deep domain expertise in banking, financial services, insurance, and travel/hospitality."
  },
  {
    "symbol": "MPHASIS.NS",
    "cleanSymbol": "MPHASIS",
    "name": "Mphasis Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Cloud & Cognitive Services",
    "category": "MIDCAP",
    "aliases": [
      "MPHASIS"
    ],
    "summary": "Information technology solutions provider specializing in cloud migration, cognitive services, and core banking architecture modernization."
  },
  {
    "symbol": "KPITTECH.NS",
    "cleanSymbol": "KPITTECH",
    "name": "KPIT Technologies Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Automotive Software & Mobility",
    "category": "MIDCAP",
    "aliases": [
      "KPIT",
      "KPIT TECH"
    ],
    "summary": "Global pure-play software integration partner for automotive OEMs, leading autonomous driving, electric powertrain, and connected vehicle software."
  },
  {
    "symbol": "TATAELXSI.NS",
    "cleanSymbol": "TATAELXSI",
    "name": "Tata Elxsi Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Design & Engineering R&D",
    "category": "MIDCAP",
    "aliases": [
      "TATA ELXSI"
    ],
    "summary": "Tata group design and technology powerhouse delivering design-led engineering for automotive, broadcast, healthcare, and smart consumer devices."
  },
  {
    "symbol": "OFSS.NS",
    "cleanSymbol": "OFSS",
    "name": "Oracle Financial Services Software Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Banking Software & Platforms",
    "category": "MIDCAP",
    "aliases": [
      "ORACLE FINANCIAL",
      "FLEXCUBE"
    ],
    "summary": "Subsidiary of Oracle Corporation providing world-leading core banking, risk, compliance, and wealth management software suites (Oracle FLEXCUBE)."
  },
  {
    "symbol": "CYIENT.NS",
    "cleanSymbol": "CYIENT",
    "name": "Cyient Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Engineering R&D & Geospatial",
    "category": "MIDCAP",
    "aliases": [
      "CYIENT",
      "INFOTECH ENTERPRISES"
    ],
    "summary": "Global engineering and technology solutions company serving aerospace, defense, rail, communications, and healthcare verticals."
  },
  {
    "symbol": "DIXON.NS",
    "cleanSymbol": "DIXON",
    "name": "Dixon Technologies (India) Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Electronics Manufacturing Services (EMS)",
    "category": "MIDCAP",
    "aliases": [
      "DIXON TECH",
      "DIXON"
    ],
    "summary": "India’s premier electronic manufacturing services (EMS) champion producing smartphones, LED TVs, home appliances, and telecom equipment under the PLI scheme."
  },
  {
    "symbol": "KAYNES.NS",
    "cleanSymbol": "KAYNES",
    "name": "Kaynes Technology India Ltd",
    "exchange": "NSE",
    "sector": "Technology",
    "industry": "Integrated Electronics & Semiconductors",
    "category": "SMALLCAP",
    "aliases": [
      "KAYNES"
    ],
    "summary": "Leading IoT and electronics system design manufacturing (ESDM) company with deep footprints in aerospace, defense, railways, and upcoming semiconductor OSAT facilities."
  },
  {
    "symbol": "HDFCBANK.NS",
    "cleanSymbol": "HDFCBANK",
    "name": "HDFC Bank Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Private Banking",
    "category": "NIFTY50",
    "aliases": [
      "HDFC",
      "HDFC BANK"
    ],
    "summary": "India’s largest private sector lender following its landmark merger with HDFC Ltd. Boasts massive nationwide branch network and dominant retail deposit base."
  },
  {
    "symbol": "ICICIBANK.NS",
    "cleanSymbol": "ICICIBANK",
    "name": "ICICI Bank Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Private Banking",
    "category": "NIFTY50",
    "aliases": [
      "ICICI",
      "ICICI BANK"
    ],
    "summary": "Premier private bank renowned for best-in-class digital banking infrastructure (iMobile), high Net Interest Margins (NIM), and prudent risk management."
  },
  {
    "symbol": "SBIN.NS",
    "cleanSymbol": "SBIN",
    "name": "State Bank of India",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Public Banking",
    "category": "NIFTY50",
    "aliases": [
      "SBI",
      "STATE BANK OF INDIA"
    ],
    "summary": "India’s largest bank and Fortune 500 public institution. Operates 22,000+ branches and commands over 20% total market share in national loan originations."
  },
  {
    "symbol": "KOTAKBANK.NS",
    "cleanSymbol": "KOTAKBANK",
    "name": "Kotak Mahindra Bank Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Private Banking & Wealth",
    "category": "NIFTY50",
    "aliases": [
      "KOTAK",
      "KOTAK MAHINDRA BANK"
    ],
    "summary": "Diversified financial institution founded by Uday Kotak. Well-capitalized balance sheet with presence across corporate banking, asset management, and broking."
  },
  {
    "symbol": "AXISBANK.NS",
    "cleanSymbol": "AXISBANK",
    "name": "Axis Bank Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Private Banking",
    "category": "NIFTY50",
    "aliases": [
      "AXIS",
      "AXIS BANK"
    ],
    "summary": "Third largest private sector bank in India with robust corporate, retail, and SME lending operations, expanded by the acquisition of Citibank’s India consumer unit."
  },
  {
    "symbol": "BAJFINANCE.NS",
    "cleanSymbol": "BAJFINANCE",
    "name": "Bajaj Finance Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Consumer NBFC",
    "category": "NIFTY50",
    "aliases": [
      "BAJAJ FINANCE"
    ],
    "summary": "India’s largest non-banking financial company (NBFC) dominating point-of-sale consumer durable loans, personal lending, and digital omni-channel payments."
  },
  {
    "symbol": "BAJAJFINSV.NS",
    "cleanSymbol": "BAJAJFINSV",
    "name": "Bajaj Finserv Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Financial Holding Company",
    "category": "NIFTY50",
    "aliases": [
      "BAJAJ FINSERV"
    ],
    "summary": "Holding company for the financial services businesses of the Bajaj Group, including Bajaj Finance, Bajaj Allianz Life, and General Insurance."
  },
  {
    "symbol": "INDUSINDBK.NS",
    "cleanSymbol": "INDUSINDBK",
    "name": "IndusInd Bank Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Private Banking",
    "category": "NIFTY50",
    "aliases": [
      "INDUSIND",
      "INDUSIND BANK"
    ],
    "summary": "Mid-sized private lender with historic strength in vehicle loans, microfinance, and commercial banking services for mid-market corporates."
  },
  {
    "symbol": "SHRIRAMFIN.NS",
    "cleanSymbol": "SHRIRAMFIN",
    "name": "Shriram Finance Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Commercial Vehicle Finance",
    "category": "NIFTY50",
    "aliases": [
      "SHRIRAM FINANCE",
      "SHRIRAM TRANSPORT"
    ],
    "summary": "Leading commercial vehicle and retail asset financier in India following the mega-merger of Shriram Transport Finance and Shriram City Union Finance."
  },
  {
    "symbol": "BANKBARODA.NS",
    "cleanSymbol": "BANKBARODA",
    "name": "Bank of Baroda",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Public Banking",
    "category": "NEXT50",
    "aliases": [
      "BOB",
      "BANK OF BARODA"
    ],
    "summary": "Major public sector banking behemoth with significant international operations across 17 countries, modernized by its flagship bob World digital platform."
  },
  {
    "symbol": "PNB.NS",
    "cleanSymbol": "PNB",
    "name": "Punjab National Bank",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Public Banking",
    "category": "NEXT50",
    "aliases": [
      "PNB",
      "PUNJAB NATIONAL BANK"
    ],
    "summary": "Historic public lender with wide reach across Northern India, serving over 180 million customers through 10,000+ domestic service outlets."
  },
  {
    "symbol": "CANBK.NS",
    "cleanSymbol": "CANBK",
    "name": "Canara Bank",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Public Banking",
    "category": "NEXT50",
    "aliases": [
      "CANARA BANK",
      "CANARA"
    ],
    "summary": "Leading public sector bank with strong retail franchise in South India, high CASA ratio, and robust credit growth in infrastructure and housing."
  },
  {
    "symbol": "IDFCFIRSTB.NS",
    "cleanSymbol": "IDFCFIRSTB",
    "name": "IDFC FIRST Bank Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Private Banking",
    "category": "MIDCAP",
    "aliases": [
      "IDFC FIRST",
      "IDFC BANK"
    ],
    "summary": "Fast-growing private sector retail bank led by V. Vaidyanathan, noted for consumer-centric savings account features, FASTag leadership, and expanding deposit base."
  },
  {
    "symbol": "FEDERALBNK.NS",
    "cleanSymbol": "FEDERALBNK",
    "name": "The Federal Bank Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Private Banking",
    "category": "MIDCAP",
    "aliases": [
      "FEDERAL BANK"
    ],
    "summary": "Kerala-headquartered private bank with dominant inward NRI remittance market share and thriving fintech neo-banking partnerships."
  },
  {
    "symbol": "JIOFIN.NS",
    "cleanSymbol": "JIOFIN",
    "name": "Jio Financial Services Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Fintech & Digital Lending",
    "category": "NEXT50",
    "aliases": [
      "JIO FINANCIAL",
      "JIOFIN"
    ],
    "summary": "Financial services arm demerged from Reliance Industries. Expanding rapidly into digital payments, consumer credit, insurance broking, and asset management with BlackRock."
  },
  {
    "symbol": "CHOLAFIN.NS",
    "cleanSymbol": "CHOLAFIN",
    "name": "Cholamandalam Investment and Finance Co Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Asset Finance NBFC",
    "category": "NEXT50",
    "aliases": [
      "CHOLA",
      "CHOLAMANDALAM"
    ],
    "summary": "Flagship financial services arm of Murugappa Group, specializing in commercial vehicle loans, home equity financing, and SME business loans."
  },
  {
    "symbol": "MUTHOOTFIN.NS",
    "cleanSymbol": "MUTHOOTFIN",
    "name": "Muthoot Finance Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Gold Loans NBFC",
    "category": "NEXT50",
    "aliases": [
      "MUTHOOT FINANCE",
      "MUTHOOT"
    ],
    "summary": "India’s largest gold financing company holding massive gold jewelry collateral under custody across over 5,000 pan-India branches."
  },
  {
    "symbol": "SBILIFE.NS",
    "cleanSymbol": "SBILIFE",
    "name": "SBI Life Insurance Company Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Life Insurance",
    "category": "NIFTY50",
    "aliases": [
      "SBI LIFE"
    ],
    "summary": "Joint venture between State Bank of India and BNP Paribas Cardif, commanding top market share among private life insurers through bancassurance."
  },
  {
    "symbol": "HDFCLIFE.NS",
    "cleanSymbol": "HDFCLIFE",
    "name": "HDFC Life Insurance Company Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Life Insurance",
    "category": "NIFTY50",
    "aliases": [
      "HDFC LIFE"
    ],
    "summary": "Leading long-term life insurance solutions provider offering innovative term protection, annuity plans, and unit-linked savings products."
  },
  {
    "symbol": "ICICIPRULI.NS",
    "cleanSymbol": "ICICIPRULI",
    "name": "ICICI Prudential Life Insurance Co Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Life Insurance",
    "category": "NEXT50",
    "aliases": [
      "ICICI PRU LIFE"
    ],
    "summary": "Major private life insurer backed by ICICI Bank and Prudential plc, pioneering ULIPs and pension annuity products across India."
  },
  {
    "symbol": "ICICIGI.NS",
    "cleanSymbol": "ICICIGI",
    "name": "ICICI Lombard General Insurance Co Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "General Insurance",
    "category": "NEXT50",
    "aliases": [
      "ICICI LOMBARD"
    ],
    "summary": "India’s leading private non-life insurer offering motor, health, travel, and commercial property risk coverage with digital claim settlements."
  },
  {
    "symbol": "CDSL.NS",
    "cleanSymbol": "CDSL",
    "name": "Central Depository Services (India) Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Market Infrastructure",
    "category": "MIDCAP",
    "aliases": [
      "CDSL",
      "CENTRAL DEPOSITORY"
    ],
    "summary": "Asia’s first listed depository holding custody of electronic securities. Directly powers retail Demat account expansion across India with over 110M+ active demat accounts."
  },
  {
    "symbol": "BSE.NS",
    "cleanSymbol": "BSE",
    "name": "BSE Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Stock Exchange",
    "category": "MIDCAP",
    "aliases": [
      "BSE",
      "BOMBAY STOCK EXCHANGE"
    ],
    "summary": "Asia’s oldest stock exchange (established 1875). Experienced explosive derivative turnover resurgence with weekly index options and StAR MF mutual fund platform."
  },
  {
    "symbol": "ANGELONE.NS",
    "cleanSymbol": "ANGELONE",
    "name": "Angel One Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Digital Retail Broking",
    "category": "MIDCAP",
    "aliases": [
      "ANGEL ONE",
      "ANGEL BROKING"
    ],
    "summary": "One of India’s top digital fintech retail brokers. Dominates active retail option and equity turnover through client-facing mobile applications."
  },
  {
    "symbol": "MCX.NS",
    "cleanSymbol": "MCX",
    "name": "Multi Commodity Exchange of India Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Commodities Exchange",
    "category": "MIDCAP",
    "aliases": [
      "MCX"
    ],
    "summary": "Monopolistic Indian commodity futures exchange holding >95% market share in bullion, crude oil, natural gas, and base metals trading."
  },
  {
    "symbol": "POONAWALLA.NS",
    "cleanSymbol": "POONAWALLA",
    "name": "Poonawalla Fincorp Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Digital NBFC",
    "category": "MIDCAP",
    "aliases": [
      "POONAWALLA"
    ],
    "summary": "Cyrus Poonawalla Group-backed non-banking financial firm focusing on tech-enabled consumer lending, pre-owned cars, and SME loans."
  },
  {
    "symbol": "RELIANCE.NS",
    "cleanSymbol": "RELIANCE",
    "name": "Reliance Industries Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Oil, Retail & Telecom",
    "category": "NIFTY50",
    "aliases": [
      "RIL",
      "RELIANCE"
    ],
    "summary": "India’s largest company by market cap. Operates the world’s largest oil refining complex at Jamnagar while dominating Indian telecom (Jio) and organized retail (Reliance Retail)."
  },
  {
    "symbol": "ONGC.NS",
    "cleanSymbol": "ONGC",
    "name": "Oil & Natural Gas Corporation Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Upstream Exploration",
    "category": "NIFTY50",
    "aliases": [
      "ONGC"
    ],
    "summary": "India’s largest government-owned crude oil and natural gas explorer and producer, contributing ~70% to domestic petroleum output."
  },
  {
    "symbol": "NTPC.NS",
    "cleanSymbol": "NTPC",
    "name": "NTPC Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Power Generation & Renewables",
    "category": "NIFTY50",
    "aliases": [
      "NTPC"
    ],
    "summary": "India’s largest power utility supplying ~25% of the national electricity grid, undergoing major capital reallocation towards solar, green hydrogen, and wind."
  },
  {
    "symbol": "POWERGRID.NS",
    "cleanSymbol": "POWERGRID",
    "name": "Power Grid Corporation of India Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Power Transmission",
    "category": "NIFTY50",
    "aliases": [
      "POWER GRID",
      "POWERGRID"
    ],
    "summary": "Central transmission utility transmitting ~85% of India’s interstate power. High dividend yield, capital-stable regulated tariff model."
  },
  {
    "symbol": "BPCL.NS",
    "cleanSymbol": "BPCL",
    "name": "Bharat Petroleum Corporation Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Downstream Refining & Marketing",
    "category": "NIFTY50",
    "aliases": [
      "BPCL",
      "BHARAT PETROLEUM"
    ],
    "summary": "Major public sector downstream refiner operating nationwide network of 21,000+ fuel retail dispensing outlets and Mumbai/Kochi refineries."
  },
  {
    "symbol": "COALINDIA.NS",
    "cleanSymbol": "COALINDIA",
    "name": "Coal India Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Mining & Fossil Energy",
    "category": "NIFTY50",
    "aliases": [
      "COAL INDIA"
    ],
    "summary": "World’s single largest coal producer by volume, meeting ~80% of India’s thermal power coal fuel needs with high dividend payout ratio."
  },
  {
    "symbol": "IOC.NS",
    "cleanSymbol": "IOC",
    "name": "Indian Oil Corporation Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Refining & Pipelines",
    "category": "NEXT50",
    "aliases": [
      "IOC",
      "INDIAN OIL"
    ],
    "summary": "State-owned oil corporation operating India’s largest refinery network, cross-country pipeline grid, and Indane LPG gas distribution."
  },
  {
    "symbol": "GAIL.NS",
    "cleanSymbol": "GAIL",
    "name": "GAIL (India) Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Natural Gas Transmission",
    "category": "NEXT50",
    "aliases": [
      "GAIL"
    ],
    "summary": "India’s pioneer natural gas transmission and marketing company, operating over 15,000 km of natural gas trunk pipelines and petrochemical complexes."
  },
  {
    "symbol": "TATAPOWER.NS",
    "cleanSymbol": "TATAPOWER",
    "name": "Tata Power Co Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Integrated Power & EV Infra",
    "category": "NEXT50",
    "aliases": [
      "TATA POWER"
    ],
    "summary": "Pioneering integrated power utility leading EV charging highway installations, solar rooftop manufacturing, and utility-scale solar EPC."
  },
  {
    "symbol": "ADANIGREEN.NS",
    "cleanSymbol": "ADANIGREEN",
    "name": "Adani Green Energy Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Solar & Wind Generation",
    "category": "NEXT50",
    "aliases": [
      "ADANI GREEN"
    ],
    "summary": "One of the world’s largest renewable power developers building the mega 30,000 MW hybrid solar-wind energy park at Khavda, Gujarat."
  },
  {
    "symbol": "ADANIPOWER.NS",
    "cleanSymbol": "ADANIPOWER",
    "name": "Adani Power Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Thermal Power Utility",
    "category": "NEXT50",
    "aliases": [
      "ADANI POWER"
    ],
    "summary": "Largest private thermal power producer in India with over 15,000 MW operational base-load generation capacity across key economic corridors."
  },
  {
    "symbol": "SUZLON.NS",
    "cleanSymbol": "SUZLON",
    "name": "Suzlon Energy Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Wind Turbine Manufacturer",
    "category": "MIDCAP",
    "aliases": [
      "SUZLON"
    ],
    "summary": "Market leader in wind energy solutions and turbine engineering across India. Successfully cleared debt burden with surging renewable multi-gigawatt order books."
  },
  {
    "symbol": "IREDA.NS",
    "cleanSymbol": "IREDA",
    "name": "Indian Renewable Energy Development Agency",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Green Infrastructure Finance",
    "category": "MIDCAP",
    "aliases": [
      "IREDA"
    ],
    "summary": "Public specialized non-banking institution financing green infrastructure, solar farms, wind parks, and bio-energy installations across India."
  },
  {
    "symbol": "NHPC.NS",
    "cleanSymbol": "NHPC",
    "name": "NHPC Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Hydroelectric Power Generation",
    "category": "MIDCAP",
    "aliases": [
      "NHPC"
    ],
    "summary": "Government of India’s flagship hydroelectric power utility with deep engineering capabilities in Himalayan run-of-the-river and pumped storage projects."
  },
  {
    "symbol": "SJVN.NS",
    "cleanSymbol": "SJVN",
    "name": "SJVN Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Hydro & Solar Power",
    "category": "MIDCAP",
    "aliases": [
      "SJVN"
    ],
    "summary": "Joint venture of Govt of India and Govt of Himachal Pradesh operating major hydro projects like Nathpa Jhakri alongside expanding solar portfolios."
  },
  {
    "symbol": "TORNTPOWER.NS",
    "cleanSymbol": "TORNTPOWER",
    "name": "Torrent Power Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Power Distribution & Generation",
    "category": "MIDCAP",
    "aliases": [
      "TORRENT POWER"
    ],
    "summary": "Integrated private utility company managing power distribution in Ahmedabad, Gandhinagar, Surat, and Agra with industry-lowest AT&C losses."
  },
  {
    "symbol": "OIL.NS",
    "cleanSymbol": "OIL",
    "name": "Oil India Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "Upstream Oil & Gas",
    "category": "MIDCAP",
    "aliases": [
      "OIL INDIA"
    ],
    "summary": "Maharatna upstream PSU engaged in the exploration and production of crude oil and natural gas in Northeast India and overseas blocks."
  },
  {
    "symbol": "PETRONET.NS",
    "cleanSymbol": "PETRONET",
    "name": "Petronet LNG Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "LNG Regasification Terminals",
    "category": "MIDCAP",
    "aliases": [
      "PETRONET LNG",
      "PETRONET"
    ],
    "summary": "Pioneer in liquified natural gas (LNG) imports, operating Dahej terminal, the largest LNG regasification terminal in the world."
  },
  {
    "symbol": "IGL.NS",
    "cleanSymbol": "IGL",
    "name": "Indraprastha Gas Ltd",
    "exchange": "NSE",
    "sector": "Energy",
    "industry": "City Gas Distribution",
    "category": "MIDCAP",
    "aliases": [
      "IGL",
      "INDRAPRASTHA GAS"
    ],
    "summary": "City gas distribution monopoly supplying CNG for automobiles and piped natural gas (PNG) to households across the Delhi NCR region."
  },
  {
    "symbol": "TMPV.NS",
    "cleanSymbol": "TMPV",
    "name": "Tata Motors Passenger Vehicles Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Passenger Vehicles & EV",
    "category": "NIFTY50",
    "aliases": [
      "TATAMOTORS",
      "TATA MOTORS",
      "TATAPV",
      "JLR"
    ],
    "summary": "Formed from Tata Motors demerger. Houses the flagship Indian electric vehicle division (Nexon EV, Punch EV, Curvv) and Jaguar Land Rover (JLR)."
  },
  {
    "symbol": "TMCV.NS",
    "cleanSymbol": "TMCV",
    "name": "Tata Motors Commercial Vehicles Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Commercial Trucks & Buses",
    "category": "NIFTY50",
    "aliases": [
      "TATAMOTORS",
      "TATA MOTORS",
      "TATACV",
      "TATA TRUCKS"
    ],
    "summary": "India’s undisputed commercial vehicle titan controlling medium and heavy commercial trucks, light commercial vehicles, and electric public transit buses."
  },
  {
    "symbol": "MARUTI.NS",
    "cleanSymbol": "MARUTI",
    "name": "Maruti Suzuki India Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Passenger Vehicles",
    "category": "NIFTY50",
    "aliases": [
      "MARUTI",
      "MARUTI SUZUKI"
    ],
    "summary": "India’s largest carmaker commanding over 40% passenger market share with peerless nationwide rural dealership networks and compressed natural gas (CNG) models."
  },
  {
    "symbol": "M&M.NS",
    "cleanSymbol": "M&M",
    "name": "Mahindra & Mahindra Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "SUVs & Farm Equipment",
    "category": "NIFTY50",
    "aliases": [
      "M&M",
      "MAHINDRA"
    ],
    "summary": "Dominant market leader in Indian agricultural tractors and high-demand premium lifestyle SUVs (Scorpio-N, Thar, XUV700)."
  },
  {
    "symbol": "BAJAJ-AUTO.NS",
    "cleanSymbol": "BAJAJ-AUTO",
    "name": "Bajaj Auto Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Two & Three Wheelers",
    "category": "NIFTY50",
    "aliases": [
      "BAJAJ AUTO"
    ],
    "summary": "India’s top exporter of motorcycles and three-wheelers with presence in 75+ countries. Strong margin profile bolstered by Pulsar, Triumph partnership, and Chetak EV."
  },
  {
    "symbol": "HEROMOTOCO.NS",
    "cleanSymbol": "HEROMOTOCO",
    "name": "Hero MotoCorp Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Two Wheelers",
    "category": "NIFTY50",
    "aliases": [
      "HERO MOTOCORP",
      "HERO HONDA"
    ],
    "summary": "World’s largest two-wheeler manufacturer by annual volume, enjoying immense rural brand equity through Splendor and HF Deluxe."
  },
  {
    "symbol": "EICHERMOT.NS",
    "cleanSymbol": "EICHERMOT",
    "name": "Eicher Motors Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Mid-Weight Motorcycles",
    "category": "NIFTY50",
    "aliases": [
      "ROYAL ENFIELD",
      "EICHER"
    ],
    "summary": "Parent company of Royal Enfield, the cult premium motorcycle brand dominating the 250cc-750cc middleweight leisure motorcycle segment globally."
  },
  {
    "symbol": "TVSMOTOR.NS",
    "cleanSymbol": "TVSMOTOR",
    "name": "TVS Motor Company Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Two & Three Wheelers",
    "category": "NEXT50",
    "aliases": [
      "TVS",
      "TVS MOTOR"
    ],
    "summary": "Leading manufacturer of sporty motorcycles (Apache), scooters (Jupiter, iQube EV), and international partner for BMW Motorrad."
  },
  {
    "symbol": "ASHOKLEY.NS",
    "cleanSymbol": "ASHOKLEY",
    "name": "Ashok Leyland Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Commercial Trucks & Buses",
    "category": "MIDCAP",
    "aliases": [
      "ASHOK LEYLAND",
      "HINDUJA"
    ],
    "summary": "Flagship company of the Hinduja Group and India’s second largest commercial vehicle maker with leading market share in passenger buses."
  },
  {
    "symbol": "BHARATFORG.NS",
    "cleanSymbol": "BHARATFORG",
    "name": "Bharat Forge Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Forging & Defense Hardware",
    "category": "NEXT50",
    "aliases": [
      "BHARAT FORGE",
      "KALYANI"
    ],
    "summary": "Kalyani Group’s global technology-driven forging conglomerate supplying aerospace components, automotive chassis, and advanced artillery guns (ATAGS)."
  },
  {
    "symbol": "MOTHERSON.NS",
    "cleanSymbol": "MOTHERSON",
    "name": "Samvardhana Motherson International Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Automotive Components",
    "category": "NEXT50",
    "aliases": [
      "MOTHERSON SUMI",
      "MOTHERSON"
    ],
    "summary": "Global tier-1 automotive supplier manufacturing wiring harnesses, vision systems, cockpits, and precision lighting for international automakers."
  },
  {
    "symbol": "BOSCHLTD.NS",
    "cleanSymbol": "BOSCHLTD",
    "name": "Bosch Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Mobility Solutions & Electronics",
    "category": "NEXT50",
    "aliases": [
      "BOSCH"
    ],
    "summary": "Indian arm of Robert Bosch GmbH, delivering high-precision powertrain systems, automotive electronics, and connected mobility software."
  },
  {
    "symbol": "MRF.NS",
    "cleanSymbol": "MRF",
    "name": "MRF Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Tyre Manufacturing",
    "category": "NEXT50",
    "aliases": [
      "MRF",
      "MRF TYRES"
    ],
    "summary": "India’s largest tyre manufacturer by revenue, with dominant brand leadership across two-wheeler, commercial vehicle, and passenger car radials."
  },
  {
    "symbol": "BALKRISIND.NS",
    "cleanSymbol": "BALKRISIND",
    "name": "Balkrishna Industries Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Off-Highway Tyres",
    "category": "MIDCAP",
    "aliases": [
      "BKT TYRES",
      "BALKRISHNA"
    ],
    "summary": "Global export powerhouse (BKT) specializing in off-highway tyres (OHT) for agricultural, earthmoving, and mining equipment worldwide."
  },
  {
    "symbol": "EXIDEIND.NS",
    "cleanSymbol": "EXIDEIND",
    "name": "Exide Industries Ltd",
    "exchange": "NSE",
    "sector": "Automobile",
    "industry": "Lead-Acid & Lithium Batteries",
    "category": "MIDCAP",
    "aliases": [
      "EXIDE"
    ],
    "summary": "India’s veteran storage battery leader, establishing India’s first gigawatt-scale lithium-ion cell manufacturing plant for electric vehicles in Karnataka."
  },
  {
    "symbol": "HINDUNILVR.NS",
    "cleanSymbol": "HINDUNILVR",
    "name": "Hindustan Unilever Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "FMCG / Staples",
    "category": "NIFTY50",
    "aliases": [
      "HUL",
      "HINDUSTAN UNILEVER"
    ],
    "summary": "India’s largest consumer goods giant reaching 9 out of 10 Indian households daily through iconic brands like Surf Excel, Dove, Sunsilk, Horlicks, and Lifebuoy."
  },
  {
    "symbol": "ITC.NS",
    "cleanSymbol": "ITC",
    "name": "ITC Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Conglomerate & FMCG",
    "category": "NIFTY50",
    "aliases": [
      "ITC"
    ],
    "summary": "Cash-generative conglomerate with leading market share in cigarettes, fast-expanding packaged foods (Aashirvaad, Sunfeast, Bingo), hotels, and agri-business."
  },
  {
    "symbol": "NESTLEIND.NS",
    "cleanSymbol": "NESTLEIND",
    "name": "Nestle India Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Food & Nutrition",
    "category": "NIFTY50",
    "aliases": [
      "NESTLE",
      "MAGGI"
    ],
    "summary": "Dominant player in packaged noodles (Maggi), infant nutrition (Cerelac, Lactogen), chocolates (KitKat), and coffee (Nescafe) with exceptional ROCE."
  },
  {
    "symbol": "BRITANNIA.NS",
    "cleanSymbol": "BRITANNIA",
    "name": "Britannia Industries Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Bakery & Dairy",
    "category": "NIFTY50",
    "aliases": [
      "BRITANNIA"
    ],
    "summary": "One of India’s leading food companies with over a century of heritage in biscuits (Good Day, Marie Gold), cakes, dairy, and snacking."
  },
  {
    "symbol": "TATACONSUM.NS",
    "cleanSymbol": "TATACONSUM",
    "name": "Tata Consumer Products Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Beverages & Foods",
    "category": "NIFTY50",
    "aliases": [
      "TATA CONSUMER",
      "TATA TEA",
      "TATA SALT"
    ],
    "summary": "Consumer staples pillar of the Tata Group, uniting Tata Tea, Tata Salt, Tetley, Sampann pulses, and the Starbucks joint venture across India."
  },
  {
    "symbol": "ASIANPAINT.NS",
    "cleanSymbol": "ASIANPAINT",
    "name": "Asian Paints Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Decorative Paints",
    "category": "NIFTY50",
    "aliases": [
      "ASIAN PAINTS"
    ],
    "summary": "India’s largest paint maker holding commanding decorative market share. Renowned supply chain moat with tinting machines located across 70,000+ retail dealers."
  },
  {
    "symbol": "TITAN.NS",
    "cleanSymbol": "TITAN",
    "name": "Titan Company Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Jewelry & Lifestyle",
    "category": "NIFTY50",
    "aliases": [
      "TITAN",
      "TANISHQ"
    ],
    "summary": "Tata Group’s luxury powerhouse operating Tanishq, Mia, Fastrack, and CaratLane. Key beneficiary of structural migration from unorganized to organized jewelry."
  },
  {
    "symbol": "TRENT.NS",
    "cleanSymbol": "TRENT",
    "name": "Trent Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Fast Fashion & Retail",
    "category": "NIFTY50",
    "aliases": [
      "TRENT",
      "ZUDIO",
      "WESTSIDE"
    ],
    "summary": "Tata Group’s explosive retail compounder driving high inventory turnover and profitable fast fashion via Zudio and Westside apparel retail chains."
  },
  {
    "symbol": "ETERNAL.NS",
    "cleanSymbol": "ETERNAL",
    "name": "Eternal Ltd (formerly Zomato)",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Quick Commerce & Food Delivery",
    "category": "NEXT50",
    "aliases": [
      "ZOMATO",
      "BLINKIT",
      "HYPERPURE",
      "ETERNAL"
    ],
    "summary": "Parent company of Zomato, Blinkit, Feeding India, and Hyperpure. Dominates online food delivery and pioneer of nationwide 10-minute quick commerce."
  },
  {
    "symbol": "DMART.NS",
    "cleanSymbol": "DMART",
    "name": "Avenue Supermarts Ltd (DMart)",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Discount Hypermarkets",
    "category": "NEXT50",
    "aliases": [
      "DMART",
      "AVENUE SUPERMARTS",
      "RADHAKISHAN DAMANI"
    ],
    "summary": "Founded by Radhakishan Damani. Operates the ultra-profitable DMart supermarket chain on an ownership-store, EDLP (Everyday Low Price) business model."
  },
  {
    "symbol": "VBL.NS",
    "cleanSymbol": "VBL",
    "name": "Varun Beverages Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Beverage Bottling",
    "category": "NEXT50",
    "aliases": [
      "VARUN BEVERAGES",
      "PEPSI BOTTLER"
    ],
    "summary": "One of the largest franchisees of PepsiCo in the world outside the US, bottling and distributing Pepsi, Sting, Mountain Dew, and Tropicana across India and Africa."
  },
  {
    "symbol": "DABUR.NS",
    "cleanSymbol": "DABUR",
    "name": "Dabur India Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Ayurvedic & Personal Care",
    "category": "NEXT50",
    "aliases": [
      "DABUR",
      "CHYAWANPRASH"
    ],
    "summary": "India’s most trusted Ayurvedic natural healthcare and consumer goods brand, leading honey, hair oils, oral care, and Real fruit juices."
  },
  {
    "symbol": "MARICO.NS",
    "cleanSymbol": "MARICO",
    "name": "Marico Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Beauty & Wellness",
    "category": "NEXT50",
    "aliases": [
      "MARICO",
      "PARACHUTE",
      "SAFFOLA"
    ],
    "summary": "Consumer staples leader holding commanding shares in branded coconut hair oils (Parachute) and premium edible healthy cooking oils (Saffola)."
  },
  {
    "symbol": "GODREJCP.NS",
    "cleanSymbol": "GODREJCP",
    "name": "Godrej Consumer Products Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Home Care & Personal Wash",
    "category": "NEXT50",
    "aliases": [
      "GODREJ CONSUMER",
      "GOOD KNIGHT"
    ],
    "summary": "Global emerging markets consumer goods company dominating household insecticides (Good Knight, HIT), hair color, and air fresheners."
  },
  {
    "symbol": "BERGEPAINT.NS",
    "cleanSymbol": "BERGEPAINT",
    "name": "Berger Paints India Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Decorative Paints",
    "category": "NEXT50",
    "aliases": [
      "BERGER PAINTS"
    ],
    "summary": "India’s second largest decorative and protective coating company with rapid market share expansion in Tier 2/3 cities and waterproofing."
  },
  {
    "symbol": "COLPAL.NS",
    "cleanSymbol": "COLPAL",
    "name": "Colgate-Palmolive (India) Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Oral Care & Dental",
    "category": "NEXT50",
    "aliases": [
      "COLGATE",
      "PALMOLIVE"
    ],
    "summary": "India’s undisputed oral care leader for over 8 decades, commanding ~50% market share in toothpastes and toothbrushes."
  },
  {
    "symbol": "PAGEIND.NS",
    "cleanSymbol": "PAGEIND",
    "name": "Page Industries Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Apparel & Innerwear",
    "category": "MIDCAP",
    "aliases": [
      "JOCKEY",
      "SPEEDO",
      "PAGE INDUSTRIES"
    ],
    "summary": "Exclusive licensee of JOCKEY International Inc. in India, Sri Lanka, Bangladesh, and UAE. Unmatched brand equity in premium innerwear and athleisure."
  },
  {
    "symbol": "NYKAA.NS",
    "cleanSymbol": "NYKAA",
    "name": "FSN E-Commerce Ventures Ltd (Nykaa)",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Beauty, Personal Care & Fashion",
    "category": "MIDCAP",
    "aliases": [
      "NYKAA",
      "FSN"
    ],
    "summary": "India’s premier omnichannel lifestyle platform commanding the online beauty and personal care (BPC) market alongside growing fashion commerce."
  },
  {
    "symbol": "POLICYBZR.NS",
    "cleanSymbol": "POLICYBZR",
    "name": "PB Fintech Ltd (PolicyBazaar)",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Digital Insurance & Credit",
    "category": "MIDCAP",
    "aliases": [
      "POLICYBAZAAR",
      "PAISABAZAAR",
      "PB FINTECH"
    ],
    "summary": "India’s largest online platform for insurance and lending products, empowering consumers to research and buy term life, health, and motor coverage."
  },
  {
    "symbol": "PAYTM.NS",
    "cleanSymbol": "PAYTM",
    "name": "One97 Communications Ltd (Paytm)",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Digital Payments & Soundbox",
    "category": "MIDCAP",
    "aliases": [
      "PAYTM",
      "ONE97"
    ],
    "summary": "Pioneer of India’s mobile QR payments and merchant audio soundboxes, providing payment gateway services, UPI merchant acquiring, and loan distribution."
  },
  {
    "symbol": "DEVYANI.NS",
    "cleanSymbol": "DEVYANI",
    "name": "Devyani International Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Quick Service Restaurants",
    "category": "MIDCAP",
    "aliases": [
      "KFC",
      "PIZZA HUT",
      "DEVYANI"
    ],
    "summary": "Largest franchisee of Yum Brands in India, operating fast-growing store chains for KFC, Pizza Hut, and Costa Coffee."
  },
  {
    "symbol": "JUBLFOOD.NS",
    "cleanSymbol": "JUBLFOOD",
    "name": "Jubilant FoodWorks Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Quick Service Restaurants",
    "category": "MIDCAP",
    "aliases": [
      "DOMINOS",
      "JUBILANT",
      "POPEYES"
    ],
    "summary": "India’s largest foodservice company holding master franchise rights for Domino’s Pizza, Dunkin’, and Popeyes across India and nearby regions."
  },
  {
    "symbol": "KALYANKJIL.NS",
    "cleanSymbol": "KALYANKJIL",
    "name": "Kalyan Jewellers India Ltd",
    "exchange": "NSE",
    "sector": "Consumer Goods",
    "industry": "Jewelry Retail Chain",
    "category": "MIDCAP",
    "aliases": [
      "KALYAN JEWELLERS",
      "CANDERE"
    ],
    "summary": "Leading pan-India and Middle East retail jewelry chain driving rapid franchise FOCO asset-light showroom rollouts."
  },
  {
    "symbol": "SUNPHARMA.NS",
    "cleanSymbol": "SUNPHARMA",
    "name": "Sun Pharmaceutical Industries Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Specialty & Generics",
    "category": "NIFTY50",
    "aliases": [
      "SUN PHARMA"
    ],
    "summary": "World’s fourth largest global specialty generic pharmaceutical company, leading the Indian domestic formulations market and international dermatological therapies."
  },
  {
    "symbol": "CIPLA.NS",
    "cleanSymbol": "CIPLA",
    "name": "Cipla Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Respiratory & Generics",
    "category": "NIFTY50",
    "aliases": [
      "CIPLA"
    ],
    "summary": "Pioneering Indian pharma multinational with global prominence in respiratory treatments, inhalation therapies, and affordable anti-retrovirals."
  },
  {
    "symbol": "DRREDDY.NS",
    "cleanSymbol": "DRREDDY",
    "name": "Dr. Reddy’s Laboratories Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Formulations & Biosimilars",
    "category": "NIFTY50",
    "aliases": [
      "DR REDDY"
    ],
    "summary": "Major global generics manufacturer with strong footholds in the US, Europe, Russia, and India across oncology, gastroenterology, and biosimilar assets."
  },
  {
    "symbol": "APOLLOHOSP.NS",
    "cleanSymbol": "APOLLOHOSP",
    "name": "Apollo Hospitals Enterprise Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Healthcare Services & Pharmacies",
    "category": "NIFTY50",
    "aliases": [
      "APOLLO HOSPITALS",
      "APOLLO 24/7"
    ],
    "summary": "Largest integrated healthcare network in Asia, operating 10,000+ hospital beds, 5,500+ diagnostic pharmacies, and the Apollo 24/7 digital health app."
  },
  {
    "symbol": "DIVISLAB.NS",
    "cleanSymbol": "DIVISLAB",
    "name": "Divi’s Laboratories Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Active Pharma Ingredients (API)",
    "category": "NIFTY50",
    "aliases": [
      "DIVIS LAB"
    ],
    "summary": "World leader in large-scale custom synthesis and active pharmaceutical ingredients (APIs), supplying global top-20 Big Pharma innovators."
  },
  {
    "symbol": "MANKIND.NS",
    "cleanSymbol": "MANKIND",
    "name": "Mankind Pharma Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Domestic Formulations & OTC",
    "category": "NEXT50",
    "aliases": [
      "MANKIND PHARMA",
      "MANFORCE",
      "PREGA NEWS"
    ],
    "summary": "India’s 4th largest pharmaceutical company by domestic sales volume, dominating rural/semi-urban prescriber networks and iconic consumer OTC brands."
  },
  {
    "symbol": "TORNTPHARM.NS",
    "cleanSymbol": "TORNTPHARM",
    "name": "Torrent Pharmaceuticals Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Cardiovascular & CNS Therapies",
    "category": "NEXT50",
    "aliases": [
      "TORRENT PHARMA"
    ],
    "summary": "Specialty-focused formulations manufacturer with top ranks in cardiovascular, central nervous system, gastrointestinal, and women’s healthcare therapies."
  },
  {
    "symbol": "LUPIN.NS",
    "cleanSymbol": "LUPIN",
    "name": "Lupin Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Respiratory & US Generics",
    "category": "NEXT50",
    "aliases": [
      "LUPIN"
    ],
    "summary": "Global pharmaceutical giant holding leadership in cardiovascular, anti-tuberculosis, and inhalation therapies across US and Indian markets."
  },
  {
    "symbol": "ZYDUSLIFE.NS",
    "cleanSymbol": "ZYDUSLIFE",
    "name": "Zydus Lifesciences Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Generics & Vaccines",
    "category": "NEXT50",
    "aliases": [
      "ZYDUS",
      "CADILA"
    ],
    "summary": "Innovator in healthcare therapeutics, biosimilars, and novel chemical entities including Saroglitazar for liver disease."
  },
  {
    "symbol": "ALKEM.NS",
    "cleanSymbol": "ALKEM",
    "name": "Alkem Laboratories Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Anti-Infectives & Formulations",
    "category": "MIDCAP",
    "aliases": [
      "ALKEM LABS"
    ],
    "summary": "Pioneering anti-infective manufacturer with dominant market presence in acute therapy brands (Clavam, Taxim-O) across Indian clinics."
  },
  {
    "symbol": "AUROPHARMA.NS",
    "cleanSymbol": "AUROPHARMA",
    "name": "Aurobindo Pharma Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Oral Solids & Injectables",
    "category": "NEXT50",
    "aliases": [
      "AUROBINDO PHARMA"
    ],
    "summary": "India’s largest exporter of generic pharmaceutical finished dosages to the United States, operating vertically integrated API manufacturing units."
  },
  {
    "symbol": "MAXHEALTH.NS",
    "cleanSymbol": "MAXHEALTH",
    "name": "Max Healthcare Institute Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Super-Specialty Hospitals",
    "category": "NEXT50",
    "aliases": [
      "MAX HOSPITAL",
      "MAX HEALTHCARE"
    ],
    "summary": "Premium hospital network in North India known for high ARPOB (average revenue per occupied bed), quaternary clinical excellence, and organ transplants."
  },
  {
    "symbol": "FORTIS.NS",
    "cleanSymbol": "FORTIS",
    "name": "Fortis Healthcare Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Integrated Healthcare Provider",
    "category": "MIDCAP",
    "aliases": [
      "FORTIS",
      "SRL DIAGNOSTICS"
    ],
    "summary": "Leading integrated healthcare services provider backed by IHH Healthcare, operating hospital beds and diagnostic network across India."
  },
  {
    "symbol": "BIOCON.NS",
    "cleanSymbol": "BIOCON",
    "name": "Biocon Ltd",
    "exchange": "NSE",
    "sector": "Healthcare",
    "industry": "Biotechnology & Biosimilars",
    "category": "MIDCAP",
    "aliases": [
      "BIOCON",
      "KIRAN MAZUMDAR"
    ],
    "summary": "Global biopharmaceutical champion founded by Kiran Mazumdar-Shaw, developing affordable biosimilar insulins and monoclonal antibodies."
  },
  {
    "symbol": "LT.NS",
    "cleanSymbol": "LT",
    "name": "Larsen & Toubro Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "EPC & Hi-Tech Engineering",
    "category": "NIFTY50",
    "aliases": [
      "L&T",
      "LARSEN & TOUBRO"
    ],
    "summary": "India’s premier engineering and construction titan. Central player in domestic infrastructure development, metro rails, defense manufacturing, and green hydrogen plants."
  },
  {
    "symbol": "HAL.NS",
    "cleanSymbol": "HAL",
    "name": "Hindustan Aeronautics Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Aerospace & Defense PSU",
    "category": "NEXT50",
    "aliases": [
      "HAL",
      "TEJAS"
    ],
    "summary": "Navratna defense PSU responsible for designing and manufacturing indigenous fighter aircraft (Tejas LCA), combat helicopters, and aircraft engine maintenance."
  },
  {
    "symbol": "BEL.NS",
    "cleanSymbol": "BEL",
    "name": "Bharat Electronics Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Defense Electronics PSU",
    "category": "NIFTY50",
    "aliases": [
      "BEL",
      "BHARAT ELECTRONICS"
    ],
    "summary": "Premier state-owned aerospace and defense electronics manufacturer supplying radars, missile defense avionics, naval sonars, and electronic voting machines."
  },
  {
    "symbol": "MAZDOCK.NS",
    "cleanSymbol": "MAZDOCK",
    "name": "Mazagon Dock Shipbuilders Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Naval Shipyard PSU",
    "category": "MIDCAP",
    "aliases": [
      "MAZAGON DOCK",
      "MAZDOCK"
    ],
    "summary": "India’s leading defense public sector shipyard constructing warships, stealth destroyers, and Scorpene-class submarines for the Indian Navy."
  },
  {
    "symbol": "COCHINSHIP.NS",
    "cleanSymbol": "COCHINSHIP",
    "name": "Cochin Shipyard Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Shipbuilding & Marine Engineering",
    "category": "MIDCAP",
    "aliases": [
      "COCHIN SHIPYARD",
      "IAC VIKRANT"
    ],
    "summary": "Premier commercial and defense shipyard that built INS Vikrant, India’s first indigenous aircraft carrier, alongside electric catamarans and ship repairs."
  },
  {
    "symbol": "BDL.NS",
    "cleanSymbol": "BDL",
    "name": "Bharat Dynamics Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Guided Missiles & Defense Systems",
    "category": "MIDCAP",
    "aliases": [
      "BHARAT DYNAMICS",
      "AKASH MISSILE"
    ],
    "summary": "Sole manufacturing agency for guided missile systems in India, producing Akash surface-to-air missiles, anti-tank guided missiles, and torpedoes."
  },
  {
    "symbol": "BHEL.NS",
    "cleanSymbol": "BHEL",
    "name": "Bharat Heavy Electricals Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Heavy Engineering PSU",
    "category": "NEXT50",
    "aliases": [
      "BHEL"
    ],
    "summary": "India’s largest power generation equipment manufacturer with growing presence in defense, rail transportation (Vande Bharat trainsets), and transmission."
  },
  {
    "symbol": "RVNL.NS",
    "cleanSymbol": "RVNL",
    "name": "Rail Vikas Nigam Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Rail Infrastructure EPC",
    "category": "MIDCAP",
    "aliases": [
      "RVNL",
      "RAIL VIKAS"
    ],
    "summary": "Project execution arm of Indian Railways handling line doubling, gauge conversion, railway electrification, and metro tunneling projects."
  },
  {
    "symbol": "IRFC.NS",
    "cleanSymbol": "IRFC",
    "name": "Indian Railway Finance Corporation",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Rail Infrastructure Financing",
    "category": "NEXT50",
    "aliases": [
      "IRFC"
    ],
    "summary": "Dedicated market borrowing arm of the Indian Ministry of Railways, financing rolling stock acquisition with sovereign safety and zero NPA history."
  },
  {
    "symbol": "IRCTC.NS",
    "cleanSymbol": "IRCTC",
    "name": "Indian Railway Catering & Tourism Corp",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Railway Ticketing & Tourism",
    "category": "NEXT50",
    "aliases": [
      "IRCTC"
    ],
    "summary": "Monopolistic public sector company under the Ministry of Railways holding exclusive rights over online rail ticket booking, packaged Rail Neer water, and catering."
  },
  {
    "symbol": "RAILTEL.NS",
    "cleanSymbol": "RAILTEL",
    "name": "RailTel Corporation of India Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Telecom & Railway Infrastructure",
    "category": "SMALLCAP",
    "aliases": [
      "RAILTEL"
    ],
    "summary": "Mini-ratna PSU managing exclusive optical fiber cable networks along railway tracks, supplying station Wi-Fi, hospital management systems, and data centers."
  },
  {
    "symbol": "SIEMENS.NS",
    "cleanSymbol": "SIEMENS",
    "name": "Siemens Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Industrial Automation & Energy",
    "category": "NEXT50",
    "aliases": [
      "SIEMENS"
    ],
    "summary": "Pacesetter in smart infrastructure, digital enterprise automation, rail locomotives, and high-voltage electrical grid technology in India."
  },
  {
    "symbol": "ABB.NS",
    "cleanSymbol": "ABB",
    "name": "ABB India Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Robotics, Electrification & Motors",
    "category": "NEXT50",
    "aliases": [
      "ABB"
    ],
    "summary": "Pioneering technology leader in electrification products, industrial robots, motion drives, and factory digitalization."
  },
  {
    "symbol": "CUMMINSIND.NS",
    "cleanSymbol": "CUMMINSIND",
    "name": "Cummins India Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Diesel Engines & Gen-Sets",
    "category": "NEXT50",
    "aliases": [
      "CUMMINS"
    ],
    "summary": "Leading manufacturer of industrial diesel and natural gas engines, heavy power generators for data centers, and clean energy backup systems."
  },
  {
    "symbol": "CGPOWER.NS",
    "cleanSymbol": "CGPOWER",
    "name": "CG Power and Industrial Solutions Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Motors, Transformers & Chips",
    "category": "NEXT50",
    "aliases": [
      "CG POWER",
      "MURUGAPPA CG"
    ],
    "summary": "Turnaround powerhouse under Murugappa Group, manufacturing industrial motors, high-voltage transformers, railway propulsion, and semiconductor assembly."
  },
  {
    "symbol": "POLYCAB.NS",
    "cleanSymbol": "POLYCAB",
    "name": "Polycab India Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Wires, Cables & FMEG",
    "category": "NEXT50",
    "aliases": [
      "POLYCAB"
    ],
    "summary": "India’s largest manufacturer of electrical wires and cables with ~24% organized market share, rapidly expanding into consumer fast-moving electrical goods (FMEG)."
  },
  {
    "symbol": "HAVELLS.NS",
    "cleanSymbol": "HAVELLS",
    "name": "Havells India Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Consumer Electricals & Lloyd ACs",
    "category": "NEXT50",
    "aliases": [
      "HAVELLS",
      "LLOYD"
    ],
    "summary": "Consumer electricals stalwart owning Havells, Crabtree, and Lloyd. Leading player in air conditioners, fans, switches, and home lighting."
  },
  {
    "symbol": "INDIGO.NS",
    "cleanSymbol": "INDIGO",
    "name": "InterGlobe Aviation Ltd (IndiGo)",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Commercial Aviation",
    "category": "NEXT50",
    "aliases": [
      "INDIGO",
      "INTERGLOBE"
    ],
    "summary": "India’s largest commercial airline commanding >60% domestic passenger market share with one of the youngest, fuel-efficient Airbus A320neo fleets globally."
  },
  {
    "symbol": "ADANIENT.NS",
    "cleanSymbol": "ADANIENT",
    "name": "Adani Enterprises Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Infrastructure Incubator",
    "category": "NIFTY50",
    "aliases": [
      "ADANI ENTERPRISES"
    ],
    "summary": "Flagship incubator for the Adani Group, nurturing new-age infrastructure ventures including airport management, data centers, solar modules, and roads."
  },
  {
    "symbol": "ADANIPORTS.NS",
    "cleanSymbol": "ADANIPORTS",
    "name": "Adani Ports & Special Economic Zone",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Port Infrastructure",
    "category": "NIFTY50",
    "aliases": [
      "ADANI PORTS",
      "APSEZ"
    ],
    "summary": "India’s largest commercial port operator handling ~25% of national port cargo volume through flagship deep-water hub at Mundra, Gujarat."
  },
  {
    "symbol": "GMRINFRA.NS",
    "cleanSymbol": "GMRINFRA",
    "name": "GMR Airports Infrastructure Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Airport Management",
    "category": "MIDCAP",
    "aliases": [
      "GMR",
      "DELHI AIRPORT"
    ],
    "summary": "Leading private airport developer and operator managing Delhi Indira Gandhi International Airport, Hyderabad Rajiv Gandhi Airport, and international hubs."
  },
  {
    "symbol": "NBCC.NS",
    "cleanSymbol": "NBCC",
    "name": "NBCC (India) Ltd",
    "exchange": "NSE",
    "sector": "Industrials & Defense",
    "industry": "Project Management Consultancy PSU",
    "category": "MIDCAP",
    "aliases": [
      "NBCC"
    ],
    "summary": "Navratna PSU providing project management consultancy for landmark government redevelopment projects, smart cities, and stalled housing turnarounds."
  },
  {
    "symbol": "HUDCO.NS",
    "cleanSymbol": "HUDCO",
    "name": "Housing & Urban Development Corp Ltd",
    "exchange": "NSE",
    "sector": "Financials",
    "industry": "Housing & Urban Infra Finance",
    "category": "MIDCAP",
    "aliases": [
      "HUDCO"
    ],
    "summary": "Premier public techno-financial institution financing social housing, urban water supply, sewage schemes, roads, and smart infrastructure."
  },
  {
    "symbol": "TATASTEEL.NS",
    "cleanSymbol": "TATASTEEL",
    "name": "Tata Steel Ltd",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Steel Manufacturing",
    "category": "NIFTY50",
    "aliases": [
      "TATA STEEL"
    ],
    "summary": "Pioneer of Indian industrial steel with fully integrated captive iron ore mines in India, expanding green steel capacity in Kalinganagar and the UK."
  },
  {
    "symbol": "JSWSTEEL.NS",
    "cleanSymbol": "JSWSTEEL",
    "name": "JSW Steel Ltd",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Steel Manufacturing",
    "category": "NIFTY50",
    "aliases": [
      "JSW STEEL",
      "JSW"
    ],
    "summary": "Flagship company of the JSW Group and one of India’s largest private steel producers by capacity with cutting-edge plants in Vijayanagar, Karnataka."
  },
  {
    "symbol": "HINDALCO.NS",
    "cleanSymbol": "HINDALCO",
    "name": "Hindalco Industries Ltd",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Aluminium & Copper",
    "category": "NIFTY50",
    "aliases": [
      "HINDALCO",
      "NOVELIS"
    ],
    "summary": "Global non-ferrous metals powerhouse part of Aditya Birla Group. Owns Novelis, the world’s largest recycler and roller of flat aluminium cans and automotive sheets."
  },
  {
    "symbol": "VEDL.NS",
    "cleanSymbol": "VEDL",
    "name": "Vedanta Ltd",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Diversified Natural Resources",
    "category": "NEXT50",
    "aliases": [
      "VEDANTA",
      "VEDL"
    ],
    "summary": "Diversified natural resources conglomerate with premier assets across zinc (Hindustan Zinc), aluminium, oil & gas (Cairn India), and power."
  },
  {
    "symbol": "NMDC.NS",
    "cleanSymbol": "NMDC",
    "name": "NMDC Ltd",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Iron Ore Mining PSU",
    "category": "MIDCAP",
    "aliases": [
      "NMDC"
    ],
    "summary": "India’s largest single iron ore producer and exporter, operating highly mechanized mines in Bailadila (Chhattisgarh) and Donimalai (Karnataka)."
  },
  {
    "symbol": "SAIL.NS",
    "cleanSymbol": "SAIL",
    "name": "Steel Authority of India Ltd",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Public Sector Steel",
    "category": "MIDCAP",
    "aliases": [
      "SAIL"
    ],
    "summary": "Maharatna public steelmaker operating integrated steel plants at Bhilai, Rourkela, Bokaro, and Durgapur, supplying steel rails to Indian Railways."
  },
  {
    "symbol": "JINDALSTEL.NS",
    "cleanSymbol": "JINDALSTEL",
    "name": "Jindal Steel & Power Ltd",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Steel & Mining",
    "category": "NEXT50",
    "aliases": [
      "JSPL",
      "JINDAL STEEL"
    ],
    "summary": "Leading industrial steelmaker with dominant presence in structural rails, plates, and sponge iron, boasting competitive low production cost per tonne."
  },
  {
    "symbol": "NATIONALUM.NS",
    "cleanSymbol": "NATIONALUM",
    "name": "National Aluminium Company Ltd (NALCO)",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Alumina & Aluminium PSU",
    "category": "MIDCAP",
    "aliases": [
      "NALCO",
      "NATIONAL ALUMINIUM"
    ],
    "summary": "Navratna enterprise having integrated bauxite mines, alumina refinery, and smelter in Odisha with world-class low cost of bauxite extraction."
  },
  {
    "symbol": "HINDZINC.NS",
    "cleanSymbol": "HINDZINC",
    "name": "Hindustan Zinc Ltd",
    "exchange": "NSE",
    "sector": "Metals & Mining",
    "industry": "Zinc, Lead & Silver",
    "category": "NEXT50",
    "aliases": [
      "HINDUSTAN ZINC"
    ],
    "summary": "World’s second largest integrated zinc producer and among top global silver producers, operating premier underground mines at Rampura Agucha, Rajasthan."
  },
  {
    "symbol": "GRASIM.NS",
    "cleanSymbol": "GRASIM",
    "name": "Grasim Industries Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Viscose, Chemicals & Paints",
    "category": "NIFTY50",
    "aliases": [
      "GRASIM",
      "BIRLA OPUS"
    ],
    "summary": "Aditya Birla Group flagship holding viscose staple fibre leadership, caustic soda manufacturing, and the newly launched Birla Opus decorative paints brand."
  },
  {
    "symbol": "ULTRACEMCO.NS",
    "cleanSymbol": "ULTRACEMCO",
    "name": "UltraTech Cement Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Cement & Building Materials",
    "category": "NIFTY50",
    "aliases": [
      "ULTRATECH CEMENT",
      "ULTRATECH"
    ],
    "summary": "India’s largest cement producer and third largest globally (outside China) with over 150 million tonnes per annum (MTPA) manufacturing capacity."
  },
  {
    "symbol": "AMBUJACEM.NS",
    "cleanSymbol": "AMBUJACEM",
    "name": "Ambuja Cements Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Cement & Clinker",
    "category": "NEXT50",
    "aliases": [
      "AMBUJA",
      "AMBUJA CEMENT"
    ],
    "summary": "Adani Group cement company known for sustainable building solutions, massive coastal clinker logistics, and captive green energy power plants."
  },
  {
    "symbol": "ACC.NS",
    "cleanSymbol": "ACC",
    "name": "ACC Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Cement & Ready Mix Concrete",
    "category": "MIDCAP",
    "aliases": [
      "ACC",
      "ACC CEMENT"
    ],
    "summary": "One of India’s foremost manufacturers of cement and ready-mix concrete (RMX) with an extensive nationwide dealer network."
  },
  {
    "symbol": "SHREECEM.NS",
    "cleanSymbol": "SHREECEM",
    "name": "Shree Cement Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Cement & Power",
    "category": "NEXT50",
    "aliases": [
      "SHREE CEMENT",
      "BANGUR"
    ],
    "summary": "Cost-efficient cement manufacturer operating modern plants across Northern and Eastern India, distinguished by high waste heat recovery power usage."
  },
  {
    "symbol": "PIDILITIND.NS",
    "cleanSymbol": "PIDILITIND",
    "name": "Pidilite Industries Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Adhesives & Sealants",
    "category": "NEXT50",
    "aliases": [
      "PIDILITE",
      "FEVICOL",
      "M-SEAL",
      "DR FIXIT"
    ],
    "summary": "Synonymous with adhesives in India. Dominates craft and carpentry adhesives with iconic household brands Fevicol, Fevikwik, and Dr. Fixit waterproofing."
  },
  {
    "symbol": "SRF.NS",
    "cleanSymbol": "SRF",
    "name": "SRF Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Specialty Chemicals & Fluorochemicals",
    "category": "NEXT50",
    "aliases": [
      "SRF"
    ],
    "summary": "Multinational specialty chemicals manufacturer excelling in fluorochemicals, technical textiles, and high-performance industrial packaging films."
  },
  {
    "symbol": "DEEPAKNTR.NS",
    "cleanSymbol": "DEEPAKNTR",
    "name": "Deepak Nitrite Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Chemical Intermediates & Phenolics",
    "category": "MIDCAP",
    "aliases": [
      "DEEPAK NITRITE"
    ],
    "summary": "Pure-play Indian chemical intermediates leader with >70% market share in sodium nitrite and massive domestic phenol-acetone manufacturing operations."
  },
  {
    "symbol": "PIIND.NS",
    "cleanSymbol": "PIIND",
    "name": "PI Industries Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Agrochemical CSM & Formulations",
    "category": "NEXT50",
    "aliases": [
      "PI INDUSTRIES"
    ],
    "summary": "Premier contract development and manufacturing solutions (CSM) partner for global agroscience giants, backed by advanced synthesis R&D."
  },
  {
    "symbol": "TATACHEM.NS",
    "cleanSymbol": "TATACHEM",
    "name": "Tata Chemicals Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Soda Ash & Specialty Chemistry",
    "category": "MIDCAP",
    "aliases": [
      "TATA CHEMICALS"
    ],
    "summary": "World’s third largest producer of soda ash and a major supplier of sodium bicarbonate to glassmakers, detergent brands, and pharmaceutical manufacturers."
  },
  {
    "symbol": "AARTIIND.NS",
    "cleanSymbol": "AARTIIND",
    "name": "Aarti Industries Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Specialty Benzene Derivatives",
    "category": "MIDCAP",
    "aliases": [
      "AARTI INDUSTRIES"
    ],
    "summary": "Leading global manufacturer of specialty chemical intermediates based on benzene chemistry for dyes, pigments, pharmaceuticals, and polymer additives."
  },
  {
    "symbol": "COROMANDEL.NS",
    "cleanSymbol": "COROMANDEL",
    "name": "Coromandel International Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Fertilizers & Crop Protection",
    "category": "MIDCAP",
    "aliases": [
      "COROMANDEL",
      "MURUGAPPA FERTILIZERS"
    ],
    "summary": "Murugappa Group’s agricultural flagship, India’s top private phosphatic fertilizer maker with extensive rural retail outlets (Gromor)."
  },
  {
    "symbol": "UPL.NS",
    "cleanSymbol": "UPL",
    "name": "UPL Ltd",
    "exchange": "NSE",
    "sector": "Basic Materials",
    "industry": "Crop Protection & Agrochemicals",
    "category": "NEXT50",
    "aliases": [
      "UPL",
      "UNITED PHOSPHORUS"
    ],
    "summary": "Global provider of sustainable agriculture products and solutions, operating in 138+ countries with broad post-patent crop protection portfolios."
  },
  {
    "symbol": "BHARTIARTL.NS",
    "cleanSymbol": "BHARTIARTL",
    "name": "Bharti Airtel Ltd",
    "exchange": "NSE",
    "sector": "Telecommunications",
    "industry": "Telecom & Digital Services",
    "category": "NIFTY50",
    "aliases": [
      "AIRTEL",
      "BHARTI AIRTEL"
    ],
    "summary": "Global telecom giant serving 500M+ customers across India and Africa with high ARPU, nationwide 5G networks, Airtel Payments Bank, and enterprise cloud."
  },
  {
    "symbol": "IDEA.NS",
    "cleanSymbol": "IDEA",
    "name": "Vodafone Idea Ltd",
    "exchange": "NSE",
    "sector": "Telecommunications",
    "industry": "Wireless Telecommunications",
    "category": "MIDCAP",
    "aliases": [
      "VODAFONE IDEA",
      "VI",
      "IDEA"
    ],
    "summary": "Major Indian telecom service provider jointly promoted by Aditya Birla Group and Vodafone Group, rolling out 4G/5G mobile connectivity."
  },
  {
    "symbol": "TATACOMM.NS",
    "cleanSymbol": "TATACOMM",
    "name": "Tata Communications Ltd",
    "exchange": "NSE",
    "sector": "Telecommunications",
    "industry": "Enterprise Cloud & Subsea Cables",
    "category": "NEXT50",
    "aliases": [
      "TATA COMMUNICATIONS",
      "VSNL"
    ],
    "summary": "Global digital ecosystem enabler carrying ~30% of the world’s internet routes through its privately owned subsea fiber-optic cable network."
  },
  {
    "symbol": "INDUSTOWER.NS",
    "cleanSymbol": "INDUSTOWER",
    "name": "Indus Towers Ltd",
    "exchange": "NSE",
    "sector": "Telecommunications",
    "industry": "Telecom Tower Infrastructure",
    "category": "NEXT50",
    "aliases": [
      "INDUS TOWERS",
      "BHARTI INFRATEL"
    ],
    "summary": "One of the largest telecom tower companies in the world, managing over 220,000 tower sites across all 22 telecom circles in India."
  },
  {
    "symbol": "DLF.NS",
    "cleanSymbol": "DLF",
    "name": "DLF Ltd",
    "exchange": "NSE",
    "sector": "Real Estate",
    "industry": "Real Estate Development",
    "category": "NEXT50",
    "aliases": [
      "DLF"
    ],
    "summary": "India’s largest publicly traded real estate developer holding prime land parcels and rental office portfolio (DLF CyberCity) across NCR, Gurugram, and Chennai."
  },
  {
    "symbol": "GODREJPROP.NS",
    "cleanSymbol": "GODREJPROP",
    "name": "Godrej Properties Ltd",
    "exchange": "NSE",
    "sector": "Real Estate",
    "industry": "Residential Real Estate",
    "category": "NEXT50",
    "aliases": [
      "GODREJ PROPERTIES"
    ],
    "summary": "Real estate development arm of the Godrej Group, leading sales bookings across Mumbai Metropolitan Region, NCR, Bengaluru, and Pune."
  },
  {
    "symbol": "MACROTECH.NS",
    "cleanSymbol": "MACROTECH",
    "name": "Macrotech Developers Ltd (Lodha)",
    "exchange": "NSE",
    "sector": "Real Estate",
    "industry": "Residential & Commercial Realty",
    "category": "NEXT50",
    "aliases": [
      "LODHA",
      "MACROTECH"
    ],
    "summary": "India’s largest residential real estate developer by sales bookings, famous for Palava smart city, World Towers Mumbai, and London luxury residences."
  },
  {
    "symbol": "OBEROIRLTY.NS",
    "cleanSymbol": "OBEROIRLTY",
    "name": "Oberoi Realty Ltd",
    "exchange": "NSE",
    "sector": "Real Estate",
    "industry": "Luxury Residential & Retail",
    "category": "MIDCAP",
    "aliases": [
      "OBEROI REALTY"
    ],
    "summary": "Premium Mumbai-centric luxury developer with pristine balance sheet, known for Oberoi Garden City, Commerz office parks, and Oberoi Mall."
  },
  {
    "symbol": "PRESTIGE.NS",
    "cleanSymbol": "PRESTIGE",
    "name": "Prestige Estates Projects Ltd",
    "exchange": "NSE",
    "sector": "Real Estate",
    "industry": "Diversified Real Estate",
    "category": "MIDCAP",
    "aliases": [
      "PRESTIGE ESTATES",
      "PRESTIGE GROUP"
    ],
    "summary": "Premier South Indian developer expanding aggressively into Mumbai and NCR across residential townships, tech parks, and luxury Forum malls."
  },
  {
    "symbol": "PHOENIXLTD.NS",
    "cleanSymbol": "PHOENIXLTD",
    "name": "The Phoenix Mills Ltd",
    "exchange": "NSE",
    "sector": "Real Estate",
    "industry": "Retail Consumption Hubs & Malls",
    "category": "MIDCAP",
    "aliases": [
      "PHOENIX MILLS",
      "PHOENIX MALL"
    ],
    "summary": "India’s undisputed retail mall owner and operator (Phoenix Marketcity, Palladium) benefiting from rising consumption and luxury retail density."
  },
  {
    "symbol": "SUNTV.NS",
    "cleanSymbol": "SUNTV",
    "name": "Sun TV Network Ltd",
    "exchange": "NSE",
    "sector": "Media & Entertainment",
    "industry": "Broadcasting & IPL Franchise",
    "category": "MIDCAP",
    "aliases": [
      "SUN TV",
      "SUNRISERS HYDERABAD"
    ],
    "summary": "Dominant media network across South India operating 35+ satellite TV channels, Sun NXT streaming, Red FM, and Sunrisers Hyderabad IPL cricket team."
  },
  {
    "symbol": "PVRINOX.NS",
    "cleanSymbol": "PVRINOX",
    "name": "PVR INOX Ltd",
    "exchange": "NSE",
    "sector": "Media & Entertainment",
    "industry": "Multiplex Cinema Exhibition",
    "category": "MIDCAP",
    "aliases": [
      "PVR",
      "INOX",
      "PVR INOX"
    ],
    "summary": "Largest theatrical exhibition company in India with over 1,700 cinema screens across 115+ cities following the mega-merger of PVR and INOX."
  }
];
