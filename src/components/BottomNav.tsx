import React from 'react';

export type NavTab = 'dashboard' | 'solicitacoes' | 'propostas' | 'operacoes' | 'mais';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingProposalsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  pendingProposalsCount = 4
}) => {
  const navItems: { id: NavTab; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'solicitacoes', label: 'Solicitações', icon: 'assignment' },
    { id: 'propostas', label: 'Propostas', icon: 'request_quote', badge: pendingProposalsCount },
    { id: 'operacoes', label: 'Operações', icon: 'directions_boat' },
    { id: 'mais', label: 'Mais', icon: 'menu' }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-t border-[#e5eeff]/80 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-md sm:max-w-lg mx-auto h-16 px-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[58px] min-h-[44px] px-1 py-1 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#006398] font-semibold'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
              type="button"
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform ${
                    isActive ? 'scale-110 font-bold' : ''
                  }`}
                >
                  {item.icon}
                </span>
                {item.badge && item.badge > 0 && item.id === 'propostas' && !isActive && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-4 h-4 rounded-full bg-[#006398] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-semibold text-[#006398]' : 'font-normal'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#006398] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
