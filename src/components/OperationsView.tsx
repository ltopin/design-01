import React from 'react';
import { MaritimeRequest } from '../types/maritime';

interface OperationsViewProps {
  requests: MaritimeRequest[];
  onOpenLiveOperation: (req: MaritimeRequest) => void;
}

export const OperationsView: React.FC<OperationsViewProps> = ({
  requests,
  onOpenLiveOperation
}) => {
  const activeOperations = requests.filter(
    (r) => r.status === 'Em execução' || r.status === 'Contratada'
  );

  return (
    <div className="flex flex-col w-full max-w-md sm:max-w-xl md:max-w-3xl mx-auto px-4 space-y-4 pb-24">
      <div className="pt-1">
        <h1 className="text-[22px] sm:text-[26px] font-bold text-[#0b1c30] tracking-tight">
          Operações Portuárias Ativas
        </h1>
        <p className="text-[12px] text-[#45464d]">
          Acompanhamento de equipes alocadas no cais e fundeio
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {activeOperations.map((req) => (
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
                  {req.vesselName} • {req.berth}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                Em Andamento
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#eff4ff] rounded-lg text-[12px]">
              <div>
                <span className="text-[10px] text-[#45464d] uppercase font-bold block">
                  Prestador Homologado
                </span>
                <strong className="text-[#006398] block truncate">
                  {req.assignedSupplier || 'Fornecedor Credenciado'}
                </strong>
                <span className="text-[#45464d] text-[11px] block">
                  {req.allocatedTeam || 'Equipe técnica alocada'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#45464d] uppercase font-bold block">
                  Janela / Agendamento
                </span>
                <strong className="text-[#0b1c30] block">
                  {req.scheduledFor || req.window}
                </strong>
                <span className="text-emerald-700 font-semibold text-[11px] block">
                  SLA Monitorado
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#45464d]">
                Canal VHF 16 / Telemetria ativa
              </span>
              <button
                onClick={() => onOpenLiveOperation(req)}
                className="px-3.5 py-2 rounded-xl bg-[#006398] text-white text-[12px] font-bold hover:bg-[#00476e] flex items-center gap-1.5 cursor-pointer shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[17px]">radar</span>
                <span>Rastrear em Tempo Real</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
