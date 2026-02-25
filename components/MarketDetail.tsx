
import React, { useState, useEffect } from 'react';
import { Market, MarketCategory, EntityType } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, BrainCircuit, ShieldCheck, UserCircle, Info, MessageSquare, Send, ExternalLink, Activity } from 'lucide-react';
import { getMarketAnalysis } from '../services/geminiService';

interface MarketDetailProps {
  market: Market;
  onBack: () => void;
}

const MOCK_COMMENTS = [
  { id: 1, user: 'Researcher_X', text: 'The inference-time scaling results from the recent paper actually support a higher probability here.', stance: 'YES', time: '2h ago' },
  { id: 2, user: 'SkepticalScalar', text: "I doubt it. The hardware constraints for ICML '25 deadlines are too tight for full adoption.", stance: 'NO', time: '5h ago' },
  { id: 3, user: 'DeepDive', text: 'Check the open-source benchmarks. The trend is clearly exponential.', stance: 'YES', time: '1d ago' },
];

const MarketDetail: React.FC<MarketDetailProps> = ({ market, onBack }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('Analyzing market signals...');
  const [betAmount, setBetAmount] = useState<number>(100);
  const [selectedSide, setSelectedSide] = useState<'YES' | 'NO'>('YES');

  useEffect(() => {
    const fetchAnalysis = async () => {
      const result = await getMarketAnalysis(market.title, market.description);
      setAiAnalysis(result || "Analysis unavailable at this time.");
    };
    fetchAnalysis();
  }, [market]);

  const handlePersonClick = () => {
    window.open('https://project-scholar-lineage-page-733.magicpatterns.app', '_blank');
  };

  const isHotspot = market.category === MarketCategory.HOTSPOT;
  
  // Align comparison data for charting
  const mergedHistory = market.history.map((h, i) => ({
    date: h.date,
    current: h.value,
    comp: market.comparisonHistory?.[i]?.value,
    compDate: market.comparisonHistory?.[i]?.date
  }));

  // High contrast colors for Hotspot
  const primaryColor = isHotspot ? "#10b981" : "#6366f1";
  const benchmarkColor = "#f43f5e";

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-2">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft size={20} /> Back to Markets
      </button>

      {/* Main Top Section: Market Chart and Trade Position (2:1 Ratio) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Left: Chart and Info (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-widest">
                <ShieldCheck size={16} /> Verifiable Academic Market
              </div>
              <div className="flex gap-2">
                {market.entities.includes(EntityType.PERSON) && (
                  <button 
                    onClick={handlePersonClick}
                    className="flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Scholar Lineage ↗
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              {market.entities.includes(EntityType.PERSON) && market.avatar && (
                <img src={market.avatar} className="w-12 h-12 rounded-2xl bg-slate-700" alt={market.personName} />
              )}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-white leading-tight">{market.title}</h1>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`text-[10px] px-2 py-1 border rounded-full font-black uppercase tracking-wider flex items-center gap-1.5 ${
                    isHotspot ? 'bg-amber-600/20 text-amber-400 border-amber-600/30 ring-1 ring-amber-500/20' : 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30'
                  }`}>
                    {isHotspot && <Activity size={10} />}
                    {market.category}
                  </span>
                  {market.entityValues?.map((ev, idx) => {
                    const isControlPoint = ev.type === EntityType.CONTROL_POINT;
                    return (
                      <span 
                        key={idx} 
                        onClick={() => isControlPoint && window.open('https://gregarious-medovik-d2997a.netlify.app/', '_blank')}
                        className={`text-[10px] px-2 py-1 rounded border font-bold transition-all flex items-center gap-1.5 ${
                          isControlPoint 
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 cursor-pointer hover:bg-indigo-500/40' 
                          : 'text-slate-400 border-slate-700/50 bg-slate-900/30'
                        }`}
                      >
                        <span className="text-slate-500 uppercase tracking-tighter">{ev.type}:</span> {ev.label}
                        {isControlPoint && <ExternalLink size={10} />}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="text-slate-400 mb-8 leading-relaxed">
              {market.description}
            </p>

            <div className="h-96 w-full mb-6 mt-auto bg-slate-900/30 p-4 rounded-2xl border border-slate-700/50">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mergedHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickMargin={10} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    formatter={(value: any, name: any) => [
                      `${value}%`, 
                      name === 'comp' ? `Benchmark: ${market.comparisonLabel}` : 'Current Sentiment'
                    ]}
                    labelFormatter={(label) => `Cycle Timestamp: ${label}`}
                  />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    height={36}
                    formatter={(value) => (
                      <span className={`text-[10px] font-black uppercase tracking-wider ${value === 'comp' ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {value === 'comp' ? market.comparisonLabel : 'Primary Trajectory'}
                      </span>
                    )}
                  />
                  {isHotspot && market.comparisonHistory && (
                    <Line 
                      type="monotone" 
                      dataKey="comp" 
                      name="comp"
                      stroke={benchmarkColor} 
                      strokeWidth={3} 
                      strokeDasharray="8 5"
                      dot={{ fill: benchmarkColor, r: 4 }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  )}
                  <Line 
                    type="stepAfter" 
                    dataKey="current" 
                    name="current"
                    stroke={primaryColor} 
                    strokeWidth={4} 
                    dot={{ fill: primaryColor, strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 10, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-t border-slate-700">
              <div>
                <p className="text-xs text-slate-500 mb-1">Market Volume</p>
                <p className="text-lg font-bold text-white">{market.volume.toLocaleString()} pts</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Expiry Date</p>
                <p className="text-lg font-bold text-white">{new Date(market.expiryDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Participants</p>
                <p className="text-lg font-bold text-white">1,245</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Right: Betting UI (Span 1) */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sticky top-6">
            <h2 className="text-xl font-bold text-white mb-6">Trade Position</h2>
            
            <div className="flex bg-slate-900 rounded-2xl p-1 mb-6">
              <button 
                onClick={() => setSelectedSide('YES')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  selectedSide === 'YES' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                YES
              </button>
              <button 
                onClick={() => setSelectedSide('NO')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  selectedSide === 'NO' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                NO
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Buy Price</span>
                <span className="text-white font-bold">{selectedSide === 'YES' ? market.yesPrice : market.noPrice} pts</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Potential Return</span>
                <span className="text-emerald-400 font-bold">+{selectedSide === 'YES' ? '47%' : '312%'}</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-xs text-slate-500 font-bold mb-2 block uppercase tracking-wider">Amount (Points)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 px-4 text-white font-bold text-xl focus:border-indigo-500 outline-none"
                />
                <button 
                  onClick={() => setBetAmount(24500)} // Max balance
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300 font-bold hover:bg-slate-600"
                >
                  MAX
                </button>
              </div>
            </div>

            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">
              Confirm {selectedSide} Trade
            </button>

            <div className="mt-6 flex items-start gap-2 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <Info size={16} className="text-slate-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-500 leading-tight">
                Markets are resolved based on verifiable academic outcomes (e.g. CSRankings, OpenReview, Turing Committee announcements).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: AI Insight & Discussion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-indigo-900/10 border border-indigo-500/20 rounded-3xl p-8 flex flex-col min-h-[400px]">
          <div className="flex items-center gap-3 text-indigo-400 mb-6">
            <BrainCircuit size={24} />
            <h2 className="text-xl font-bold uppercase tracking-tight">AI Analyst Insight</h2>
          </div>
          <div className="text-base text-slate-300 leading-relaxed whitespace-pre-wrap flex-1">
            {aiAnalysis}
          </div>
          <div className="mt-8 flex items-center gap-2 text-[10px] text-indigo-500/60 uppercase tracking-widest font-bold border-t border-indigo-500/10 pt-4">
            Powered by Gemini Intelligence
          </div>
        </div>

        <div className="lg:col-span-1 bg-slate-800/40 border border-slate-700 rounded-3xl p-8 flex flex-col min-h-[400px]">
          <div className="flex items-center gap-3 text-slate-300 mb-6">
            <MessageSquare size={24} className="text-indigo-400" />
            <h2 className="text-xl font-bold uppercase tracking-tight">Peer Discussion</h2>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar mb-6 pr-1 max-h-[500px]">
            {MOCK_COMMENTS.map((comment) => (
              <div key={comment.id} className="group border-b border-slate-700/30 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      {comment.user.charAt(0)}
                    </div>
                    <span className="text-[11px] font-bold text-slate-100">{comment.user}</span>
                  </div>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${comment.stance === 'YES' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {comment.stance}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/20 p-3 rounded-xl group-hover:bg-slate-900/40 transition-all border border-transparent group-hover:border-slate-700/50">
                  {comment.text}
                </p>
                <span className="text-[9px] text-slate-600 mt-2 block px-1 font-medium">{comment.time}</span>
              </div>
            ))}
          </div>

          <div className="relative mt-auto pt-4 border-t border-slate-700/50">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Share perspective..." 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-200 focus:border-indigo-500 outline-none shadow-sm"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-all flex items-center justify-center shadow-md">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;
