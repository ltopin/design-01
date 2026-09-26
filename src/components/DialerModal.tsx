import React from 'react';

interface DialerModalProps {
  onClose: () => void;
}

export const DialerModal: React.FC<DialerModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-[#cce5ff] overflow-hidden my-6">
        <div className="p-4 bg-[#131b2e] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#5bb8fe]">support_agent</span>
            <h2 className="text-[15px] font-bold">Plantão PortHub 24/7</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="p-5 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#eff4ff] text-[#006398] flex items-center justify-center mx-auto shadow-inner">
            <span className="material-symbols-outlined text-[28px]">phone_in_talk</span>
          </div>

          <div>
            <h3 className="text-[18px] font-bold text-[#0b1c30]">Canal Direto de Prontidão</h3>
            <p className="text-[12px] text-[#45464d] mt-1">
              Atendimento operacional ininterrupto para armadores e agências marítimas.
            </p>
          </div>

          <div className="p-3 bg-[#eff4ff] rounded-xl text-[13px] font-bold text-[#006398] font-data-tabular">
            (13) 3878-9000
          </div>

          <div className="text-[11px] text-[#45464d]">
            Frequência Marítima: <strong>Canal VHF 16 (Chamada e Socorro)</strong>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="tel:+551338789000"
              className="w-full py-2.5 rounded-xl bg-[#006398] text-white font-bold text-[13px] hover:bg-[#00476e] flex items-center justify-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              Discar Agora
            </a>
            <button
              onClick={onClose}
              className="w-full py-2 rounded-xl bg-[#eff4ff] text-[#45464d] font-semibold text-[12px] hover:bg-[#e5eeff] cursor-pointer"
              type="button"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
