import React from 'react';
import { PORTHUB_LOGO_URL, USER_AVATAR_URL } from '../data/maritimeData';

interface HeaderProps {
  unreadCount?: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  isDesktopFrame: boolean;
  onToggleDesktopFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  unreadCount = 2,
  onOpenNotifications,
  onOpenProfile,
  isDesktopFrame,
  onToggleDesktopFrame
}) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#f8f9ff]/85 backdrop-blur-xl border-b border-[#e5eeff]/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand & Context */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            alt="PortHub Logo"
            className="h-8 w-auto object-contain shrink-0"
            src={PORTHUB_LOGO_URL}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[16px] text-[#0b1c30] tracking-tight truncate">
                PortHub
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#dce9ff] text-[#45464d] px-1.5 py-0.5 rounded-full shrink-0">
                CONTRATANTE
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#006398] truncate">
              Agência Marítima Santos
            </span>
          </div>
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Frame switch tool */}
          <button
            onClick={onToggleDesktopFrame}
            title={isDesktopFrame ? "Alternar para visualização móvel centralizada" : "Expandir para tela cheia"}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#e5eeff] text-[#006398] hover:bg-[#dce9ff] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">
              {isDesktopFrame ? 'stay_current_portrait' : 'desktop_windows'}
            </span>
            <span>{isDesktopFrame ? 'Modo Mobile' : 'Modo Expandido'}</span>
          </button>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notificações Operacionais"
            className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-2 ring-[#f8f9ff]"></span>
            )}
          </button>

          {/* Luiz Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 pl-1 rounded-full hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#006398]"
            title="Perfil de Luiz - Agência Marítima"
            type="button"
          >
            <div className="relative">
              <img
                alt="Foto de perfil de Luiz"
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-[#c6c6cd]/50 shadow-sm"
                src={USER_AVATAR_URL}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
