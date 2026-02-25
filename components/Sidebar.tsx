
import React from 'react';
import { LayoutDashboard, BookOpen, Settings, Info, FlaskConical, Trophy } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Markets', icon: LayoutDashboard },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'lab', label: 'Market Lab', icon: FlaskConical },
    { id: 'portfolio', label: 'My Portfolio', icon: BookOpen },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl text-white">I</div>
          <span className="text-xl font-bold tracking-tight text-white">Index market</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Your Balance</p>
          <p className="text-xl font-bold text-white">24,500 <span className="text-sm text-indigo-400 font-normal">pts</span></p>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-200 text-sm">
          <Settings size={18} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-200 text-sm">
          <Info size={18} />
          About
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
