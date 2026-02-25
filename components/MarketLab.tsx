
import React, { useState } from 'react';
import { Sparkles, Plus, ClipboardCheck, Clock, BrainCircuit, Wand2, ShieldAlert, FlaskConical, Zap } from 'lucide-react';
import { MarketCategory } from '../types';
import { suggestNewMarkets } from '../services/geminiService';

const TRENDING_AI_POOL = [
  { id: 's1', title: "Will 'Inference-Time Scaling' surpass training compute growth by 200% in 2025?", category: MarketCategory.TREND, trending: true },
  { id: 's2', title: "Will Andrej Karpathy's Eureka Labs release an 'AI-Native Chemistry' course by Q3?", category: MarketCategory.FRONTIER, trending: true },
  { id: 's3', title: "Will DeepSeek-V3 be the first open-source model to reach Top 1 on LMSYS?", category: MarketCategory.HOTSPOT, trending: true },
];

const MarketLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>(TRENDING_AI_POOL);
  const [proposals, setProposals] = useState<any[]>([
    { id: 'p1', title: 'Will Sam Altman rejoin the OpenAI board of directors as a voting member by end of year?', category: MarketCategory.HOTSPOT, status: 'Pending', author: 'User_402' },
    { id: 'p2', title: 'Is Meta releasing Llama 4 as a MoE architecture?', category: MarketCategory.TREND, status: 'Auditing', author: 'Admin' },
  ]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const suggestions = await suggestNewMarkets();
    if (suggestions && suggestions.length > 0) {
      setAiSuggestions([...suggestions, ...aiSuggestions.slice(0, 2)]);
    }
    setIsGenerating(false);
  };

  const pickSuggestion = (suggestion: any) => {
    const newProposal = {
      id: `p-${Date.now()}`,
      title: suggestion.title,
      category: suggestion.category || MarketCategory.TREND,
      status: 'Pending',
      author: 'Scholar_AI_Scout'
    };
    setProposals([newProposal, ...proposals]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            市场工厂 <FlaskConical className="text-indigo-400" />
          </h1>
          <p className="text-slate-400 mt-2">生成、提案并审计新的学术预测市场。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <BrainCircuit className="text-indigo-400" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-none">情报分析员</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">扫描近期预印本</span>
                   <div className="flex gap-1">
                      <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                </div>
              </div>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                isGenerating 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'
              }`}
            >
              <Wand2 size={16} />
              {isGenerating ? '分析中...' : '刷新灵感池'}
            </button>
          </div>

          <div className="flex-1 space-y-4">
             <div className="flex items-center gap-2 mb-2 px-1">
                <Zap size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">热门市场推荐</span>
             </div>
            {aiSuggestions.map((s, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 group hover:border-indigo-500/40 transition-all relative overflow-hidden">
                {s.trending && (
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-indigo-600/20 text-indigo-400 text-[8px] font-black uppercase tracking-widest rounded-bl-lg">
                    Trending
                  </div>
                )}
                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase mb-2">
                  <Sparkles size={10} /> {s.category || '趋势定论'}
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-4 pr-10">{s.title}</h4>
                <button 
                  onClick={() => pickSuggestion(s)}
                  className="w-full py-2 bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 rounded-lg text-[10px] font-bold uppercase hover:bg-indigo-600 text-white hover:border-transparent transition-all"
                >
                  起草并提案
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Plus className="text-emerald-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-none">发起新市场提案</h2>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">社区治理</span>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-2">市场清算问题</label>
              <textarea 
                placeholder="例如：'Agentic RAG' 在 MMLU 上的准确率是否会在 6 月前突破 90%？"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 focus:border-indigo-500 outline-none min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-2">分类</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:border-indigo-500 outline-none appearance-none">
                  {Object.values(MarketCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-2">清算日期</label>
                <input type="date" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:border-indigo-500 outline-none" />
              </div>
            </div>
            <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 mt-4">
              提交提案 (消耗 100 积分)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketLab;
