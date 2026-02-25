
import { Market, MarketCategory, EntityType, Scholar, Scout, OracleTier } from './types';

export const MOCK_MARKETS: Market[] = [
  // 1. 趋势定论 (TREND)
  {
    id: 'm1',
    title: '学者 Lin Wei 是否会在 2026 年 ICML 获得 Best Paper？',
    description: '追踪清华大学学者 Lin Wei 在顶级机器学习会议中的获奖潜力。',
    category: MarketCategory.TREND,
    entities: [EntityType.PERSON, EntityType.PAPER, EntityType.INSTITUTION],
    entityValues: [
      { type: EntityType.PERSON, label: 'Lin Wei' },
      { type: EntityType.PAPER, label: 'Best Paper' },
      { type: EntityType.INSTITUTION, label: 'Tsinghua' }
    ],
    probability: 35,
    volume: 85400,
    expiryDate: '2026-07-15',
    tags: ['ICML', 'Awards'],
    yesPrice: 0.35,
    noPrice: 0.65,
    personName: 'Lin Wei',
    avatar: 'https://picsum.photos/seed/lin/200',
    personInstitution: 'Tsinghua University',
    history: [
      { date: '2024-11-01', value: 20 },
      { date: '2024-12-01', value: 35 },
    ]
  },
  {
    id: 'm2',
    title: 'Moonshot AI 2026 年新一轮融资额是否会超过 $5B？',
    description: '关注中国大模型领军初创公司的资金杠杆与估值增长。',
    category: MarketCategory.TREND,
    entities: [EntityType.FUNDING, EntityType.INSTITUTION],
    entityValues: [
      { type: EntityType.FUNDING, label: '$5B+' },
      { type: EntityType.INSTITUTION, label: 'Moonshot AI' }
    ],
    probability: 62,
    volume: 125000,
    expiryDate: '2026-12-31',
    tags: ['Funding', 'Startup'],
    yesPrice: 0.62,
    noPrice: 0.38,
    history: [
      { date: '2024-11-01', value: 50 },
      { date: '2024-12-01', value: 62 },
    ]
  },

  // 2. 热点博弈 (HOTSPOT)
  {
    id: 'm3',
    title: 'Clawd Bot 用户增长率能否重现 GPT-3 超越 BERT 的爆发式增长？',
    description: '博弈 Clawd Bot 的技术穿透力是否足以引发市场范式转移。图表展示了 Clawd (2026) 与 GPT (2023) 的同周期热度对标。',
    category: MarketCategory.HOTSPOT,
    entities: [EntityType.TECH, EntityType.INSTITUTION],
    entityValues: [
      { type: EntityType.TECH, label: 'Clawd Bot' },
      { type: EntityType.INSTITUTION, label: 'Anthropic' }
    ],
    probability: 48,
    volume: 245000,
    expiryDate: '2026-06-30',
    tags: ['Growth', 'Benchmark'],
    yesPrice: 0.48,
    noPrice: 0.52,
    history: [
      { date: '2026-02-01', value: 10 },
      { date: '2026-03-01', value: 25 },
      { date: '2026-04-01', value: 38 },
      { date: '2026-05-01', value: 48 },
    ],
    comparisonLabel: 'GPT Benchmark (2023)',
    comparisonHistory: [
      { date: '2023-01-01', value: 5 },
      { date: '2023-02-01', value: 15 },
      { date: '2023-03-01', value: 45 },
      { date: '2023-04-01', value: 65 },
    ]
  },
  {
    id: 'm4',
    title: 'Mamba 架构商业化效率能否达到 Transformer 早期普及速度？',
    description: 'SSM 架构与 Attention 机制在工业界落地的正面碰撞。图表对标了 Mamba (2024) 与 Transformer (2018) 的采用率轨迹。',
    category: MarketCategory.HOTSPOT,
    entities: [EntityType.TECH, EntityType.PAPER, EntityType.CONTROL_POINT],
    entityValues: [
      { type: EntityType.TECH, label: 'Mamba' },
      { type: EntityType.PAPER, label: 'Linear Attention' },
      { type: EntityType.CONTROL_POINT, label: '科学数据统一表征' }
    ],
    probability: 29,
    volume: 98000,
    expiryDate: '2026-01-01',
    tags: ['Mamba', 'Transformer'],
    yesPrice: 0.29,
    noPrice: 0.71,
    history: [
      { date: '2024-06-01', value: 12 },
      { date: '2024-09-01', value: 22 },
      { date: '2024-12-01', value: 29 },
    ],
    comparisonLabel: 'Transformer (2018)',
    comparisonHistory: [
      { date: '2018-06-01', value: 15 },
      { date: '2018-09-01', value: 35 },
      { date: '2018-12-01', value: 55 },
    ]
  },

  // 3. 前沿猜想 (FRONTIER)
  {
    id: 'm5',
    title: 'Hinton 实验室下一代学生中，是否会出现影响力超越 Hinton 本人的科学家？',
    description: '“深度学习教父”学术血脉的极限挑战，关注其顶级 PhD 的引用增长率。',
    category: MarketCategory.FRONTIER,
    entities: [EntityType.PERSON, EntityType.INSTITUTION],
    entityValues: [
      { type: EntityType.PERSON, label: 'Hinton Students' },
      { type: EntityType.INSTITUTION, label: 'U of Toronto' }
    ],
    probability: 15,
    volume: 56000,
    expiryDate: '2030-12-31',
    tags: ['Legacy', 'Impact'],
    yesPrice: 0.15,
    noPrice: 0.85,
    personName: 'Geoffrey Hinton',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hinton',
    personInstitution: 'University of Toronto',
    history: [
      { date: '2024-10-01', value: 12 },
      { date: '2024-12-01', value: 15 },
    ]
  },
  {
    id: 'm6',
    title: 'AI 安全研究在 2026 年是否会成为顶会主流（论文占比 > 20%）？',
    description: '随着技术风险加剧，学术界资源是否会发生根本性向 Safety 倾斜。',
    category: MarketCategory.FRONTIER,
    entities: [EntityType.TECH, EntityType.PAPER],
    entityValues: [
      { type: EntityType.TECH, label: 'AI Safety' },
      { type: EntityType.PAPER, label: 'Alignment' }
    ],
    probability: 54,
    volume: 112000,
    expiryDate: '2026-12-31',
    tags: ['Safety', 'Alignment'],
    yesPrice: 0.54,
    noPrice: 0.46,
    history: [
      { date: '2024-11-01', value: 40 },
      { date: '2024-12-01', value: 54 },
    ]
  },

  // 4. 泡沫预警 (BUBBLE)
  {
    id: 'm7',
    title: '“Clawd Bot” 最终会被验证为营销炒作而非真实技术突破吗？',
    description: '针对当前极高热度的 Clawd Bot 进行“去中心化审计”与泡沫证伪。',
    category: MarketCategory.BUBBLE,
    entities: [EntityType.TECH, EntityType.INSTITUTION],
    entityValues: [
      { type: EntityType.TECH, label: 'Clawd Bot' },
      { type: EntityType.INSTITUTION, label: 'Unknown' }
    ],
    probability: 78,
    volume: 167000,
    expiryDate: '2025-04-15',
    tags: ['Audit', 'Hype'],
    yesPrice: 0.78,
    noPrice: 0.22,
    history: [
      { date: '2024-11-01', value: 60 },
      { date: '2024-12-01', value: 78 },
    ]
  },
  {
    id: 'm8',
    title: '某篇声称“突破性进展”的 Mamba 变体论文，复现成功率是否会 < 30%？',
    description: '关注顶级期刊/会议论文的实验可靠性，结算于 GitHub 复现报告。',
    category: MarketCategory.BUBBLE,
    entities: [EntityType.PAPER, EntityType.CONTROL_POINT],
    entityValues: [
      { type: EntityType.PAPER, label: 'Breakthrough Claim' },
      { type: EntityType.CONTROL_POINT, label: '科学数据统一表征' }
    ],
    probability: 42,
    volume: 89000,
    expiryDate: '2025-08-20',
    tags: ['Reproducibility', 'Audit'],
    yesPrice: 0.42,
    noPrice: 0.58,
    history: [
      { date: '2024-11-01', value: 35 },
      { date: '2024-12-01', value: 42 },
    ]
  }
];

export const MOCK_SCHOLARS: Scholar[] = [
  {
    id: 's1',
    name: 'Dr. Alice Chen',
    avatar: 'https://picsum.photos/seed/alice/200',
    institution: 'Stanford University',
    mentor: 'Fei-Fei Li',
    hIndex: 12,
    topPapers: 8,
    marketPrice: 4.8,
    change24h: 12.5,
    field: 'Embodied AI'
  },
  {
    id: 's2',
    name: 'Yakov Bergman',
    avatar: 'https://picsum.photos/seed/yakov/200',
    institution: 'MIT CSAIL',
    mentor: 'Josh Tenenbaum',
    hIndex: 8,
    topPapers: 5,
    marketPrice: 3.2,
    change24h: -2.1,
    field: 'Cognitive Science'
  },
  {
    id: 's3',
    name: 'Lin Wei',
    avatar: 'https://picsum.photos/seed/lin/200',
    institution: 'Tsinghua University',
    mentor: 'Jian Sun',
    hIndex: 15,
    topPapers: 12,
    marketPrice: 7.5,
    change24h: 5.4,
    field: 'Efficient LLMs'
  }
];

const createScout = (id: string, username: string, seed: string, tier: OracleTier, kp: number, accuracy: number): Scout => ({
  id,
  username,
  avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`,
  tier,
  kp,
  accuracy,
  totalPredictions: Math.floor(Math.random() * 200) + 50,
  affiliation: 'Research Institute',
  tags: ['Analyst', 'Prediction'],
  accuracyHistory: [
    { month: 'Jan', value: 70 },
    { month: 'Feb', value: 75 },
    { month: 'Mar', value: accuracy - 5 },
    { month: 'Apr', value: accuracy },
  ],
  preference: [
    { name: 'Tech Path', value: 40 },
    { name: 'Talent', value: 60 },
  ],
  masterpieces: [
    { title: 'Project X Outcome', gain: '+150%', date: '2024' }
  ]
});

export const MOCK_SCOUTS: Scout[] = [
  {
    id: 'sc1',
    username: 'Neural_Prophet',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=prophet',
    tier: OracleTier.ORACLE,
    kp: 84200,
    accuracy: 94.2,
    totalPredictions: 156,
    affiliation: 'Stanford HAI (PhD)',
    tags: ['Hinton Family Long', 'Mamba Believer', 'Scaling Law Purist'],
    accuracyHistory: [
      { month: 'Jan', value: 85 },
      { month: 'Feb', value: 88 },
      { month: 'Mar', value: 87 },
      { month: 'Apr', value: 91 },
      { month: 'May', value: 93 },
      { month: 'Jun', value: 94.2 },
    ],
    preference: [
      { name: 'Tech Path', value: 45 },
      { name: 'Talent', value: 30 },
      { name: 'Lineage', value: 25 },
    ],
    masterpieces: [
      { title: 'o1-style Inference Scaling Adoption', gain: '+420%', date: 'Oct 2024' },
      { title: 'Dr. Lin Wei H-index Growth', gain: '+180%', date: 'Aug 2024' },
      { title: 'Mistral Series Performance Benchmark', gain: '+95%', date: 'Dec 2023' },
    ]
  },
  {
    id: 'sc2',
    username: 'Bole_Master',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=master',
    tier: OracleTier.SENIOR,
    kp: 62100,
    accuracy: 88.5,
    totalPredictions: 210,
    affiliation: 'Sequoia (Research Div)',
    tags: ['Transformer Skeptic', 'Agentic Workflow Bull'],
    accuracyHistory: [
      { month: 'Jan', value: 80 },
      { month: 'Feb', value: 82 },
      { month: 'Mar', value: 85 },
      { month: 'Apr', value: 84 },
      { month: 'May', value: 87 },
      { month: 'Jun', value: 88.5 },
    ],
    preference: [
      { name: 'Tech Path', value: 20 },
      { name: 'Talent', value: 60 },
      { name: 'Lineage', value: 20 },
    ],
    masterpieces: [
      { title: 'Agentic RAG Dominance', gain: '+210%', date: 'Nov 2024' },
      { title: 'DeepSeek-V2 Launch success', gain: '+120%', date: 'May 2024' },
      { title: 'Silicon Valley Talent Migration', gain: '+85%', date: 'Feb 2024' },
    ]
  },
  createScout('sc3', 'AI_Whale', 'whale', OracleTier.ORACLE, 58000, 92.1),
  createScout('sc4', 'Market_Maker', 'maker', OracleTier.SENIOR, 45000, 85.4),
  createScout('sc5', 'Data_Diver', 'diver', OracleTier.SENIOR, 42000, 84.2),
  createScout('sc6', 'Trend_Setter', 'setter', OracleTier.APPRENTICE, 31000, 78.9),
  createScout('sc7', 'Paper_Tiger', 'tiger', OracleTier.APPRENTICE, 28000, 76.5),
  createScout('sc8', 'Alpha_Seeker', 'alpha', OracleTier.ORACLE, 55000, 91.8),
  createScout('sc9', 'Quant_Researcher', 'quant', OracleTier.SENIOR, 48000, 87.2),
  createScout('sc10', 'Early_Bird', 'bird', OracleTier.SENIOR, 44000, 86.1),
  createScout('sc11', 'Oracle_One', 'one', OracleTier.ORACLE, 72000, 93.5),
  createScout('sc12', 'Tech_Scout', 'tech', OracleTier.SENIOR, 41000, 82.3),
  createScout('sc13', 'Future_Mind', 'future', OracleTier.APPRENTICE, 15000, 72.1),
  createScout('sc14', 'Scholar_Eye', 'eye', OracleTier.SENIOR, 39000, 81.5),
  createScout('sc15', 'Insight_Pro', 'pro', OracleTier.ORACLE, 61000, 92.8),
];
