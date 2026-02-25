
import React from 'react';
import { MOCK_SCHOLARS } from '../constants';
import { TrendingUp, TrendingDown, Star, TreePine } from 'lucide-react';

const ScholarIndex: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Scholar Potential Index</h1>
          <p className="text-slate-400 mt-2">Prediction markets for the next generation of academic leaders.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium hover:border-indigo-500 transition-all">Filter: All Fields</button>
          <button className="px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-500 transition-all">Nominate Scholar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SCHOLARS.map(scholar => (
          <div key={scholar.id} className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 hover:translate-y-[-4px] transition-all">
            <div className="flex gap-4 mb-6">
              <img src={scholar.avatar} alt={scholar.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20" />
              <div>
                <h3 className="text-lg font-bold text-white">{scholar.name}</h3>
                <p className="text-sm text-slate-400">{scholar.institution}</p>
                <div className="flex items-center gap-1 text-[10px] text-indigo-400 font-bold mt-1 uppercase">
                  <TreePine size={10} /> {scholar.mentor}'s Lineage
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Market Price</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white">${scholar.marketPrice}</span>
                  <span className={`text-xs flex items-center ${scholar.change24h > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {scholar.change24h > 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                    {Math.abs(scholar.change24h)}%
                  </span>
                </div>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">H-Index</p>
                <span className="text-xl font-bold text-white">{scholar.hIndex}</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Field</span>
                <span className="text-slate-300 font-medium">{scholar.field}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Top Tier Papers</span>
                <span className="text-slate-300 font-medium">{scholar.topPapers}</span>
              </div>
            </div>

            <button className="w-full py-3 bg-indigo-600/10 text-indigo-400 border border-indigo-600/30 rounded-xl font-bold hover:bg-indigo-600/20 transition-all flex items-center justify-center gap-2">
              <Star size={16} /> Predict Performance
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-800/30 border border-slate-700 rounded-3xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Identify the next "LeCun" or "Bengio"</h3>
        <p className="text-slate-400 max-w-2xl mx-auto mb-6">Our price discoveries often predict h-index growth 2-3 years before it happens. Earn "Bole Points" by identifying rising stars early.</p>
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center p-4">
            <span className="text-2xl font-bold text-emerald-400">89%</span>
            <span className="text-xs text-slate-500 uppercase font-bold mt-1">Prediction Accuracy</span>
          </div>
          <div className="w-px h-12 bg-slate-700 self-center"></div>
          <div className="flex flex-col items-center p-4">
            <span className="text-2xl font-bold text-indigo-400">12k+</span>
            <span className="text-xs text-slate-500 uppercase font-bold mt-1">Active Scouts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarIndex;
