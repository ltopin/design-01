import React from 'react';
import { MaritimeRequest } from '../types/maritime';

interface RequestDetailsModalProps {
  request: MaritimeRequest;
  onClose: () => void;
  onOpenCompare?: () => void;
}

export const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({
  request,
  onClose,
  onOpenCompare
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#f8f9ff] w-full max-w-lg rounded-2xl shadow-2xl border border-[#cce5ff] overflow-hidden my-6">
        <div className="p-4 bg-white border-b border-[#e5eeff] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#45464d] bg-[#eff4ff] px-2 py-0.5 rounded">
                {request.code}
              </span>
              <span className="text-[11px] font-bold text-[#006398] bg-[#d3e4fe] px-2 py-0.5 rounded-full">
                {request.category}
              </span>
            </div>
            <h2 className="text-[17px] font-bold text-[#0b1c30] mt-1">{request.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#45464d] hover:text-[#0b1c30] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          <div className="p-3 bg-white rounded-xl border border-[#e5eeff] space-y-2">
            <span className="text-[11px] uppercase font-bold text-[#45464d]">Dados da Operação</span>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div>
                <span className="text-[#45464d] block">Embarcação:</span>
                <strong className="text-[#0b1c30]">{request.vesselName}</strong>
              </div>
              <div>
                <span className="text-[#45464d] block">Porto Base:</span>
                <strong className="text-[#0b1c30]">{request.port}</strong>
              </div>
              <div>
                <span className="text-[#45464d] block">Berço / Terminal:</span>
                <strong className="text-[#0b1c30]">{request.berth}</strong>
              </div>
              <div>
                <span className="text-[#45464d] block">Janela Operacional:</span>
                <strong className="text-[#006398]">{request.window}</strong>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#e5eeff] space-y-1">
            <span className="text-[11px] uppercase font-bold text-[#45464d]">Escopo Contratual</span>
            <p className="text-[13px] text-[#0b1c30] font-medium">{request.volumeOrScope}</p>
            <p className="text-[12px] text-[#45464d] mt-1">
              Status atual: <span className="font-bold text-[#006398]">{request.status}</span>
            </p>
          </div>

          {request.proposals && request.proposals.length > 0 && (
            <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#cce5ff] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#006398]">
                  {request.proposals.length} Propostas Registradas
                </span>
                {request.lowestAmount && (
                  <span className="text-[11px] font-bold text-emerald-700 font-data-tabular">
                    Menor: R$ {request.lowestAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
              {onOpenCompare && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCompare();
                  }}
                  className="w-full py-2 bg-[#006398] text-white rounded-lg text-[12px] font-bold hover:bg-[#00476e] flex items-center justify-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span>Abrir Comparativo Detalhado</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="p-3 bg-white border-t border-[#e5eeff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#eff4ff] text-[#0b1c30] text-[12px] font-semibold rounded-lg hover:bg-[#e5eeff] cursor-pointer"
            type="button"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
