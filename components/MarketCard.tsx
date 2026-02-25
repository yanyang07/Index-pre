
import React, { useState } from 'react';
import { Market, MarketCategory, EntityType } from '../types';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, Clock, Swords, CheckCircle2, UserCircle, MapPin, ExternalLink, Activity } from 'lucide-react';

interface MarketCardProps {
  market: Market;
  onSelect: (market: Market) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onSelect }) => {
  const [voteFeedback, setVoteFeedback] = useState<'YES' | 'NO' | null>(null);
  
  const isUp = market.probability > 50;
  const yesWidth = market.probability;
  const noWidth = 100 - market.probability;

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || 
        (e.target as HTMLElement).closest('.special-tag') || 
        (e.target as HTMLElement).closest('.person-block')) return;
    onSelect(market);
  };

  const handleVote = (side: 'YES' | 'NO') => {
    setVoteFeedback(side);
    setTimeout(() => setVoteFeedback(null), 2000);
  };

  const themeColors: Record<MarketCategory, string> = {
    [MarketCategory.TREND]: 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30',
    [MarketCategory.HOTSPOT]: 'bg-amber-600/20 text-amber-400 border-amber-600/30',
    [MarketCategory.FRONTIER]: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
    [MarketCategory.BUBBLE]: 'bg-rose-600/20 text-rose-400 border-rose-600/30',
  };

  const hasPerson = market.entities.includes(EntityType.PERSON) && market.personName;
  const isHotspot = market.category === MarketCategory.HOTSPOT;

  // Prepare combined data for comparison charts if available
  const chartData = market.history.map((h, i) => ({
    value: h.value,
    comp: market.comparisonHistory?.[i]?.value
  }));

  // Contrast Colors for HOTSPOT comparison
  const primaryLineColor = isHotspot ? "#10b981" : (isUp ? "#10b981" : "#f43f5e");
  const comparisonLineColor = "#f43f5e";

  return (
    <div 
      onClick={handleClick}
      className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full"></div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          {/* Main Theme Badge */}
          <span className={`self-start text-[10px] px-2 py-0.5 border rounded-full font-black uppercase tracking-wider flex items-center gap-1 ${themeColors[market.category]}`}>
            {isHotspot && <Activity size={10} />}
            {market.category}
          </span>
          {/* Business Entity Tags - Descriptive Labels */}
          <div className="flex flex-wrap gap-1">
            {market.entityValues?.map((ev, idx) => {
              const isControlPoint = ev.type === EntityType.CONTROL_POINT;
              return (
                <span 
                  key={idx} 
                  onClick={(e) => {
                    if (isControlPoint) {
                      e.stopPropagation();
                      window.open('https://gregarious-medovik-d2997a.netlify.app/', '_blank');
                    }
                  }}
                  className={`text-[8px] px-1.5 py-0.5 rounded border font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                    isControlPoint 
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-500/40 cursor-pointer special-tag ring-1 ring-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]' 
                    : 'text-slate-400 border-slate-700/50 bg-slate-900/30'
                  }`}
                >
                  <span className="text-slate-500 opacity-70">{ev.type}:</span> {ev.label}
                  {isControlPoint && <ExternalLink size={8} className="opacity-70" />}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-[10px] font-bold">
          <Clock size={10} />
          {new Date(market.expiryDate).toLocaleDateString()}
        </div>
      </div>

      {/* Person Info Display */}
      {hasPerson && (
        <div className="person-block flex items-center gap-3 mb-4 bg-slate-900/40 p-2.5 rounded-xl border border-slate-700/30 hover:bg-slate-900/60 transition-colors">
          <div className="relative">
            <img src={market.avatar} className="w-10 h-10 rounded-lg bg-slate-700 border border-slate-600" alt={market.personName} />
            <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-0.5 border border-slate-900">
               <UserCircle size={8} className="text-white" />
            </div>
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-black text-slate-100 truncate">{market.personName}</h4>
            <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold truncate">
              <MapPin size={8} /> {market.personInstitution}
            </div>
          </div>
        </div>
      )}

      <h3 className={`text-lg font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 min-h-[3.5rem] ${hasPerson ? 'mt-0' : 'mt-2'}`}>
        {market.title}
      </h3>

      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-widest">Sentiment Score</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{market.probability}%</span>
            <span className={`text-xs font-bold flex items-center gap-0.5 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isUp ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
              {isUp ? '+4.2%' : '-1.5%'}
            </span>
          </div>
          {isHotspot && market.comparisonLabel && (
            <div className="flex flex-col gap-1 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-emerald-500 rounded-full"></div>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tighter">Current Trend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-rose-500 border-t border-dashed border-rose-300 rounded-full"></div>
                <span className="text-[9px] font-black text-rose-500/80 uppercase italic tracking-tighter">vs {market.comparisonLabel}</span>
              </div>
            </div>
          )}
        </div>

        <div className="w-32 h-16 opacity-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              {isHotspot && market.comparisonHistory && (
                <Line 
                  type="monotone" 
                  dataKey="comp" 
                  stroke={comparisonLineColor} 
                  strokeWidth={2} 
                  strokeDasharray="3 3"
                  dot={false} 
                />
              )}
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={primaryLineColor} 
                strokeWidth={3} 
                dot={false} 
              />
              <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="relative h-7 w-full rounded-full bg-slate-900 overflow-hidden flex border border-slate-700/50">
          <div 
            className="h-full bg-emerald-500/80 transition-all duration-700 ease-out flex items-center pl-3 relative group/yes" 
            style={{ width: `${yesWidth}%` }}
          >
            <span className="text-[9px] font-black text-white uppercase italic drop-shadow-md whitespace-nowrap">
              {yesWidth > 15 ? `YES ${yesWidth}%` : ''}
            </span>
          </div>
          <div 
            className="h-full bg-rose-500/80 transition-all duration-700 ease-out flex items-center justify-end pr-3 relative group/no" 
            style={{ width: `${noWidth}%` }}
          >
            <span className="text-[9px] font-black text-white uppercase italic drop-shadow-md whitespace-nowrap">
              {noWidth > 15 ? `${noWidth}% NO` : ''}
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center z-10 shadow-lg">
            <Swords size={14} className="text-slate-400" />
          </div>
        </div>

        <div className="flex gap-3 relative">
          <button 
            onClick={() => handleVote('YES')}
            disabled={voteFeedback !== null}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 overflow-hidden relative ${
              voteFeedback === 'YES' 
              ? 'bg-emerald-500 text-white border-emerald-400 scale-[0.98]' 
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
            }`}
          >
            {voteFeedback === 'YES' ? (
              <><CheckCircle2 size={14} className="animate-bounce" /> Recorded</>
            ) : (
              `YES ${market.yesPrice} pts`
            )}
          </button>
          
          <button 
            onClick={() => handleVote('NO')}
            disabled={voteFeedback !== null}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 overflow-hidden relative ${
              voteFeedback === 'NO' 
              ? 'bg-rose-500 text-white border-rose-400 scale-[0.98]' 
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
            }`}
          >
             {voteFeedback === 'NO' ? (
              <><CheckCircle2 size={14} className="animate-bounce" /> Recorded</>
            ) : (
              `NO ${market.noPrice} pts`
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        <span>Volume: {(market.volume / 1000).toFixed(1)}k pts</span>
        <span className="text-indigo-400 font-black group-hover:translate-x-1 transition-transform">
          Trade →
        </span>
      </div>
    </div>
  );
};

export default MarketCard;
