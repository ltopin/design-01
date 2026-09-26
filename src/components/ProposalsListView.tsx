import React from 'react';
import { MaritimeRequest } from '../types/maritime';

interface ProposalsListViewProps {
  requests: MaritimeRequest[];
  onOpenCompareProposals: (reqId: string) => void;
}

export const ProposalsListView: React.FC<ProposalsListViewProps> = ({
  requests,
  onOpenCompareProposals
}) => {
  const requestsWithProposals = requests.filter(
    (r) => r.proposals && r.proposals.length > 0
  );

  return (
    <div className="flex flex-col w-full max-w-md sm:max-w-xl md:max-w-3xl mx-auto px-4 space-y-4 pb-24">
      <div className="pt-1">
        <h1 className="text-[22px] sm:text-[26px] font-bold text-[#0b1c30] tracking-tight">
          Propostas Recebidas
        </h1>
        <p className="text-[12px] text-[#45464d]">
          Cotações de fornecedores homologados aguardando deliberação da agência
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {requestsWithProposals.map((req) => (
          <div
            key={req.id}
            className="p-4 bg-white rounded-xl border border-[#e5eeff] shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#006398] uppercase">
                  {req.category} • {req.code}
                </span>
                <h3 className="text-[16px] font-bold text-[#0b1c30] mt-0.5">
                  {req.title}
                </h3>
                <span className="text-[12px] text-[#45464d]">
                  Navio: <strong>{req.vesselName}</strong> ({req.berth})
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#cce5ff] text-[#00476e] text-[11px] font-bold">
                {req.proposals?.length} Propostas
              </span>
            </div>

            {/* Proposals mini-cards */}
            <div className="flex flex-col gap-2">
              {req.proposals?.map((prop) => (
                <div
                  key={prop.id}
                  className="p-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-bold text-[#0b1c30]">
                        {prop.supplierName}
                      </span>
                      {prop.isHomologated && (
                        <span className="material-symbols-outlined text-[14px] text-[#006398]">
                          verified
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#45464d] block mt-0.5">
                      SLA: {prop.sla.slice(0, 45)}... • Validade: {prop.validity}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#006398] font-data-tabular block">
                      R$ {prop.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-[#45464d]">
                      {prop.paymentTerms}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-[#ba1a1a] font-semibold">
                Janela limite: {req.window}
              </span>
              <button
                onClick={() => onOpenCompareProposals(req.id)}
                className="px-4 py-2 bg-[#006398] text-white text-[12px] font-bold rounded-xl hover:bg-[#00476e] flex items-center gap-1.5 shadow-sm cursor-pointer"
                type="button"
              >
                <span>Comparar e Contratar</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
