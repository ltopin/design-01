import React from 'react';

interface NotificationsModalProps {
  onClose: () => void;
  onOpenCompare: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  onOpenCompare
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#cce5ff] overflow-hidden my-6">
        <div className="p-4 border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#006398]">notifications</span>
            <h2 className="text-[16px] font-bold text-[#0b1c30]">Notificações Operacionais</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#45464d] hover:text-[#0b1c30] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2.5 max-h-[60vh] overflow-y-auto">
          {/* Urgent Notification */}
          <div className="p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ba1a1a] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                Crítico • Liberação de Atracação
              </span>
              <span className="text-[10px] text-[#45464d]">Há 12 min</span>
            </div>
            <p className="text-[12px] text-[#0b1c30] font-semibold">
              4 propostas recebidas para a Fumigação do MV Ocean Star aguardando aprovação.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenCompare();
              }}
              className="text-[11px] font-bold text-[#ba1a1a] hover:underline inline-flex items-center gap-1 pt-0.5 cursor-pointer"
              type="button"
            >
              <span>Avaliar Propostas agora</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </button>
          </div>

          {/* Normal Notifications */}
          <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#e5eeff] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006398]">
                Atualização de Cotação
              </span>
              <span className="text-[10px] text-[#45464d]">Há 2h</span>
            </div>
            <p className="text-[12px] text-[#0b1c30]">
              Marine Survey Paranaguá alterou os termos de pagamento para 45 dias faturados.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#e5eeff] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006398]">
                Operação Concluída
              </span>
              <span className="text-[10px] text-[#45464d]">Ontem 18:30</span>
            </div>
            <p className="text-[12px] text-[#0b1c30]">
              Relatório de atracação do MV Santos Trader emitido e anexado com assinatura ICP-Brasil.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#f8f9ff] border-t border-[#e5eeff] text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#e5eeff] text-[#0b1c30] text-[12px] font-semibold rounded-lg hover:bg-[#eff4ff] cursor-pointer"
            type="button"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
