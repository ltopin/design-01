import React from 'react';
import { USER_AVATAR_URL } from '../data/maritimeData';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-[#cce5ff] overflow-hidden my-6">
        <div className="p-4 bg-gradient-to-r from-[#131b2e] to-[#00476e] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt="Luiz"
              src={USER_AVATAR_URL}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50 shadow"
            />
            <div>
              <h2 className="text-[16px] font-bold">Luiz Topin</h2>
              <span className="text-[11px] text-[#dae2fd]">Gerente de Operações Portuárias</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 text-[12px]">
          <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#e5eeff] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#006398] block">Agência Vinculada</span>
            <div className="text-[13px] font-bold text-[#0b1c30]">Transmar Navegação S/A</div>
            <div className="text-[#45464d]">CNPJ: 14.288.904/0001-92 • Porto Base: Santos (SP)</div>
            <div className="text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Homologação Portuária Ativa
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between py-1.5 border-b border-[#e5eeff] text-[#45464d]">
              <span>Email:</span>
              <strong className="text-[#0b1c30]">ltopin@gmail.com</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#e5eeff] text-[#45464d]">
              <span>Telefone Móvel:</span>
              <strong className="text-[#0b1c30]">(13) 99742-1080</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#e5eeff] text-[#45464d]">
              <span>Perfil de Acesso:</span>
              <span className="bg-[#cce5ff] text-[#00476e] px-2 py-0.5 rounded font-bold text-[10px]">
                CONTRATANTE MASTER
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#f8f9ff] border-t border-[#e5eeff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#eff4ff] text-[#0b1c30] font-semibold rounded-lg hover:bg-[#e5eeff] cursor-pointer"
            type="button"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
