
import React, { useState } from 'react';
import { MOCK_SCOUTS } from '../constants';
import { Scout, OracleTier } from '../types';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Trophy, TrendingUp, Target, BrainCircuit, Star, ExternalLink, ChevronDown, MapPin } from 'lucide-react';

const COLORS = ['#818cf8', '#34d399', '#f472b6', '#fbbf24'];

const Leaderboard: React.FC = () => {
  const [selectedScout, setSelectedScout] = useState<Scout>(MOCK_SCOUTS[0]);
  const [timeFilter, setTimeFilter] = useState<'Monthly' | 'All-time'>('All-time');
  const [trackFilter, setTrackFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(10);

  const tierColors: Record<OracleTier, string> = {
    [OracleTier.APPRENTICE]: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    [OracleTier.SENIOR]: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    [OracleTier.ORACLE]: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.2)]',
  };

  // Common tooltip style for all charts
  const tooltipStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f8fafc'
  };

  const tooltipItemStyle = {
    color: '#f8fafc',
    fontSize: '12px',
    fontWeight: '600'
  };

  const visibleScouts = MOCK_SCOUTS.slice(0, visibleCount);
  const hasMore = MOCK_SCOUTS.length > visibleCount;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-white flex items-center gap-4 italic tracking-tighter">
            SCOUT LEADERBOARD <Trophy className="text-amber-400" size={32} />
          </h1>
          <p className="text-slate-400 mt-2 text-lg">The world's most accurate academic oracles and talent scouts.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            {['Monthly', 'All-time'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeFilter(t as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeFilter === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <select 
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs font-bold text-slate-300 outline-none focus:border-indigo-500"
          >
            <option value="All">All Tracks</option>
            <option value="LLM">LLM & Agents</option>
            <option value="Robotics">Embodied AI</option>
            <option value="Bio">AI for Science</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Top Scouts List (Span 5) */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden backdrop-blur-sm flex flex-col">
            <div className="p-6 border-b border-slate-700 bg-slate-800/60 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Top Bole Scouts</h2>
              <span className="text-[10px] bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold">LIVE FEED</span>
            </div>
            <div className="divide-y divide-slate-700/50 flex-1 overflow-y-auto max-h-[600px] no-scrollbar">
              {visibleScouts.map((scout, index) => (
                <div 
                  key={scout.id}
                  onClick={() => setSelectedScout(scout)}
                  className={`p-5 flex items-center gap-4 cursor-pointer transition-all hover:bg-slate-700/30 group ${
                    selectedScout.id === scout.id ? 'bg-indigo-600/10 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="text-xl font-black text-slate-600 w-8 italic">{(index + 1).toString().padStart(2, '0')}</div>
                  <img src={scout.avatar} className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 group-hover:scale-105 transition-transform" alt={scout.username} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">{scout.username}</h4>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter border ${tierColors[scout.tier]}`}>
                        {scout.tier}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Oracle Index: <span className="text-indigo-400">{scout.accuracy}%</span></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">KP: <span className="text-emerald-400">{(scout.kp / 1000).toFixed(1)}k</span></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold ${scout.accuracy > 90 ? 'text-amber-400' : 'text-slate-400'}`}>
                      {scout.totalPredictions} Pred.
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {hasMore && (
              <button 
                onClick={() => setVisibleCount(MOCK_SCOUTS.length)}
                className="w-full py-4 bg-slate-800/80 hover:bg-slate-800 border-t border-slate-700 text-indigo-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                Show More ({MOCK_SCOUTS.length - visibleCount} more) <ChevronDown size={14} />
              </button>
            )}
          </div>

          {/* KP Wealth Chart (Small visualization for list context) */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-400" /> KP Wealth Rankings
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_SCOUTS.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="username" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: 'rgba(99, 102, 241, 0.1)'}}
                    contentStyle={tooltipStyle}
                    itemStyle={tooltipItemStyle}
                    labelStyle={{ color: '#94a3b8', fontWeight: 'bold', marginBottom: '4px' }}
                  />
                  <Bar dataKey="kp" radius={[4, 4, 0, 0]}>
                    {MOCK_SCOUTS.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={selectedScout.id === entry.id ? '#818cf8' : '#334155'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Drill-down Detail (Span 7) */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-indigo-500/30 rounded-[2.5rem] p-10 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[80px] rounded-full"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="shrink-0 relative">
                <img src={selectedScout.avatar} className="w-32 h-32 rounded-3xl bg-slate-900 border-2 border-indigo-500/30 shadow-2xl" alt={selectedScout.username} />
                <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${tierColors[selectedScout.tier]} shadow-xl`}>
                  {selectedScout.tier}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tight">{selectedScout.username}</h2>
                    <p className="text-slate-400 font-medium flex items-center gap-2 mt-1 italic">
                      <MapPin size={14} /> {selectedScout.affiliation}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {selectedScout.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-700/50 border border-slate-600 text-[10px] font-bold rounded-lg text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-700/50">
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Knowledge Points</div>
                    <div className="text-2xl font-black text-emerald-400">{selectedScout.kp.toLocaleString()}</div>
                  </div>
                  <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-700/50">
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Oracle Accuracy</div>
                    <div className="text-2xl font-black text-indigo-400">{selectedScout.accuracy}%</div>
                  </div>
                  <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-700/50">
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Total Signals</div>
                    <div className="text-2xl font-black text-white">{selectedScout.totalPredictions}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Drill-down Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-10 border-t border-slate-700/50">
              {/* Prediction Accuracy Trend */}
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Target size={14} className="text-rose-400" /> Accuracy Trend (12M)
                </h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedScout.accuracyHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} domain={[50, 100]} />
                      <Tooltip 
                        contentStyle={tooltipStyle}
                        itemStyle={tooltipItemStyle}
                        labelStyle={{ color: '#94a3b8', fontWeight: 'bold', marginBottom: '4px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#818cf8" 
                        strokeWidth={4} 
                        dot={{ fill: '#818cf8', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Track Preference Distribution */}
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <BrainCircuit size={14} className="text-indigo-400" /> Sector Allocation
                </h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={selectedScout.preference}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {selectedScout.preference.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                         contentStyle={tooltipStyle}
                         itemStyle={tooltipItemStyle}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        align="center"
                        iconType="circle"
                        formatter={(value) => <span className="text-[10px] font-bold text-slate-400 uppercase">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Masterpieces Table */}
            <div className="mt-12 pt-10 border-t border-slate-700/50">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Star size={14} className="text-amber-400" /> Notable Price Discoveries ("Masterpieces")
              </h4>
              <div className="overflow-hidden rounded-2xl border border-slate-700/50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-500 uppercase font-black tracking-tighter">
                    <tr>
                      <th className="px-6 py-3">Outcome Predicted</th>
                      <th className="px-6 py-3">Yield (Gain)</th>
                      <th className="px-6 py-3">Date Resolved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {selectedScout.masterpieces.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-700/20 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-200">{m.title}</td>
                        <td className="px-6 py-4">
                          <span className="text-emerald-400 font-black italic">{m.gain}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 font-medium">{m.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="w-full mt-6 py-3 rounded-2xl border border-indigo-500/20 bg-indigo-600/5 text-indigo-400 font-bold text-xs uppercase hover:bg-indigo-600/10 transition-all flex items-center justify-center gap-2 group">
                View Full Prediction History <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
