
export enum MarketCategory {
  TREND = '趋势定论',
  HOTSPOT = '热点博弈',
  FRONTIER = '前沿猜想',
  BUBBLE = '泡沫预警'
}

export enum EntityType {
  TECH = '技术关键词',
  PERSON = '人',
  PAPER = '论文',
  INSTITUTION = '机构',
  FUNDING = '基金',
  CONTROL_POINT = '控制点'
}

export interface EntityValue {
  type: EntityType;
  label: string;
}

export enum OracleTier {
  APPRENTICE = 'Apprentice',
  SENIOR = 'Senior',
  ORACLE = 'Oracle'
}

export interface Market {
  id: string;
  title: string;
  description: string;
  category: MarketCategory;
  entities: EntityType[]; 
  entityValues?: EntityValue[]; 
  probability: number; 
  volume: number;
  expiryDate: string;
  tags: string[];
  yesPrice: number;
  noPrice: number;
  history: { date: string; value: number }[];
  comparisonLabel?: string;
  comparisonHistory?: { date: string; value: number }[];
  personName?: string; 
  avatar?: string;     
  personInstitution?: string;
}

export interface Scholar {
  id: string;
  name: string;
  avatar: string;
  institution: string;
  mentor: string;
  hIndex: number;
  topPapers: number;
  marketPrice: number;
  change24h: number;
  field: string;
}

export interface User {
  id: string;
  username: string;
  points: number;
  boleScore: number;
  activeBets: Bet[];
}

export interface Bet {
  marketId: string;
  type: 'YES' | 'NO';
  amount: number;
  odds: number;
  timestamp: string;
}

export interface Scout {
  id: string;
  username: string;
  avatar: string;
  tier: OracleTier;
  kp: number; 
  accuracy: number; 
  totalPredictions: number;
  tags: string[];
  affiliation: string;
  accuracyHistory: { month: string; value: number }[];
  preference: { name: string; value: number }[];
  masterpieces: { title: string; gain: string; date: string }[];
}
