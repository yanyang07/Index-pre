
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MarketCard from './components/MarketCard';
import MarketDetail from './components/MarketDetail';
import MarketLab from './components/MarketLab';
import Leaderboard from './components/Leaderboard';
import { MOCK_MARKETS } from './constants';
import { Market, MarketCategory } from './types';
import { Search, Bell, Wallet, Sparkles, Filter } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<MarketCategory | 'All'>('All');

  const filteredMarkets = categoryFilter === 'All' 
    ? MOCK_MARKETS 
    : MOCK_MARKETS.filter(m => m.category === categoryFilter);

  const renderContent = () => {
    if (selectedMarket) {
      return <MarketDetail market={selectedMarket} onBack={() => setSelectedMarket(null)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  Trending Markets <Sparkles className="text-amber-400" size={24} />
                </h1>
                <p className="text-slate-400 mt-1">Predict the future of AI research and win research grants (points).</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl w-full md:w-auto">
                <Search size={18} className="text-slate-500" />
                <input 
                  type="text" 
                  placeholder="搜索技术、论文、学者、机构..." 
                  className="bg-transparent border-none outline-none text-sm text-slate-200 w-full md:w-64"
                />
              </div>
            </div>

            {/* Thematic Filter Bar */}
            <div className="flex flex-wrap items-center gap-3 pb-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 text-slate-500 mr-2 border-r border-slate-700 pr-4">
                <Filter size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">分类检索</span>
              </div>
              <button 
                onClick={() => setCategoryFilter('All')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  categoryFilter === 'All' 
                  ? 'bg-indigo-600 border-indigo-500 text-white' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                全部
              </button>
              {Object.values(MarketCategory).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    categoryFilter === cat 
                    ? 'bg-indigo-600 border-indigo-500 text-white' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMarkets.length > 0 ? (
                filteredMarkets.map(market => (
                  <MarketCard key={market.id} market={market} onSelect={setSelectedMarket} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
                  该分类下暂无预测市场。
                </div>
              )}
            </div>

            <div className="mt-12 bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-2xl font-bold text-white mb-4">伯乐计划已上线</h2>
                 <p className="text-slate-300 max-w-xl mb-6">
                   精准预测论文影响力或学者潜力将获得“伯乐积分”。 
                   顶级伯乐可优先获取独家实验室报告及名企内推机会。
                 </p>
                 <button 
                   onClick={() => setActiveTab('leaderboard')}
                   className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
                 >
                   查看伯乐排行榜
                 </button>
               </div>
               <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        );
      case 'leaderboard':
        return <Leaderboard />;
      case 'lab':
        return <MarketLab />;
      case 'portfolio':
        return (
          <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-2xl font-bold mb-8">我的头寸</h2>
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="text-slate-600" size={32} />
              </div>
              <p className="text-slate-400">暂无活跃头寸，开始你的预测吧！</p>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="mt-6 text-indigo-400 font-bold hover:text-indigo-300"
              >
                浏览市场 &rarr;
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-slate-200">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedMarket(null);
      }} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="flex justify-end items-center gap-6 mb-12">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-slate-400">Mainnet v1.2</span>
          </div>
          <button className="text-slate-400 hover:text-white relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-4 bg-slate-900 p-1 pl-4 rounded-full border border-slate-800">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-bold uppercase leading-none">Bole Score</span>
              <span className="text-sm font-bold text-amber-400">1,420</span>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-600 border-2 border-slate-800 flex items-center justify-center font-bold text-white">
              JD
            </div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
