import React, { useState } from 'react';
import { MaritimeRequest, Proposal } from '../types/maritime';

interface ProposalsComparisonModalProps {
  request: MaritimeRequest;
  onClose: () => void;
  onAcceptProposal: (reqId: string, proposal: Proposal) => void;
}

export const ProposalsComparisonModal: React.FC<ProposalsComparisonModalProps> = ({
  request,
  onClose,
  onAcceptProposal
}) => {
  const [selectedProposalId, setSelectedProposalId] = useState<string>(
    request.proposals?.[0]?.id || ''
  );
  const [contractSuccess, setContractSuccess] = useState<string | null>(null);

  const proposals = request.proposals || [];

  const handleHire = (prop: Proposal) => {
    setContractSuccess(prop.supplierName);
    setTimeout(() => {
      onAcceptProposal(request.id, prop);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#f8f9ff] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#cce5ff] overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#006398] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">stacked_bar_chart</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006398]">
                  Comparador de Propostas Portuárias
                </span>
                <span className="text-[11px] font-mono text-[#45464d] bg-[#eff4ff] px-2 py-0.5 rounded">
                  {request.code}
                </span>
              </div>
              <h2 className="text-[18px] font-bold text-[#0b1c30]">
                {request.title} • {request.vesselName}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#45464d] hover:text-[#0b1c30] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {contractSuccess && (
          <div className="bg-emerald-600 text-white p-3 text-center text-[13px] font-bold flex items-center justify-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Proposta de {contractSuccess} aprovada com sucesso! Ordem de serviço gerada.
          </div>
        )}

        {/* Vessel & Window Brief */}
        <div className="px-5 py-3 bg-[#dce9ff]/40 border-b border-[#cce5ff] flex items-center justify-between text-[12px] flex-wrap gap-2">
          <span className="text-[#0b1c30] font-semibold">
            Berço: <strong>{request.berth}</strong> • Escopo: <strong>{request.volumeOrScope}</strong>
          </span>
          <span className="text-[#006398] font-bold">
            Janela Crítica: {request.window}
          </span>
        </div>

        {/* Proposals Comparison List */}
        <div className="p-5 flex flex-col gap-3.5 max-h-[62vh] overflow-y-auto">
          {proposals.map((prop, idx) => {
            const isLowest = prop.amount === request.lowestAmount;
            const isSelected = selectedProposalId === prop.id;

            return (
              <div
                key={prop.id}
                onClick={() => setSelectedProposalId(prop.id)}
                className={`p-4 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-[#006398] shadow-md ring-2 ring-[#006398]/30'
                    : 'bg-white border-[#e5eeff] hover:border-[#cce5ff] shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[15px] font-bold text-[#0b1c30]">
                        {prop.supplierName}
                      </h3>
                      {prop.isHomologated && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#cce5ff] text-[#00476e] px-2 py-0.5 rounded-full">
                          <span className="material-symbols-outlined text-[12px]">verified</span>
                          Homologado
                        </span>
                      )}
                      {isLowest && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                          Menor Valor
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-[11px] text-[#45464d]">
                      <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                        <span className="material-symbols-outlined text-[14px]">star</span>
                        {prop.supplierRating}
                      </span>
                      <span>Pagamento: {prop.paymentTerms}</span>
                      <span>Validade: {prop.validity}</span>
                      <span>Enviado: {prop.submittedAt}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[18px] sm:text-[20px] font-bold text-[#006398] font-data-tabular">
                      R$ {prop.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    {prop.insuranceIncluded && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                        Seguro P&I incluso
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 p-2.5 bg-[#eff4ff] rounded-lg text-[12px] text-[#0b1c30] space-y-1 border border-[#e5eeff]">
                  <div>
                    <strong className="text-[#006398]">SLA Operacional:</strong> {prop.sla}
                  </div>
                  <div className="text-[#45464d] text-[11px]">
                    <strong>Observações Técnicas:</strong> {prop.notes}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#e5eeff] flex items-center justify-between">
                  <span className="text-[11px] text-[#45464d]">
                    Classificação técnica: <strong>Aprovada pela Agência Santos</strong>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHire(prop);
                    }}
                    className="h-8 px-4 rounded-lg bg-black text-white hover:bg-[#006398] text-[12px] font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    type="button"
                  >
                    <span>Contratar Fornecedor</span>
                    <span className="material-symbols-outlined text-[15px]">done</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-white border-t border-[#e5eeff] flex items-center justify-between text-[12px] text-[#45464d]">
          <span>4 propostas auditadas pelo compliance da agência</span>
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg bg-[#eff4ff] text-[#0b1c30] font-semibold hover:bg-[#e5eeff] cursor-pointer"
            type="button"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
