import React, { useState } from 'react';
import { MaritimeRequest, RequestStatus } from '../types/maritime';

interface RequestsListViewProps {
  requests: MaritimeRequest[];
  onOpenNewRequest: () => void;
  onOpenCompareProposals: (reqId: string) => void;
  onOpenLiveOperation: (req: MaritimeRequest) => void;
  onOpenDetails: (req: MaritimeRequest) => void;
}

export const RequestsListView: React.FC<RequestsListViewProps> = ({
  requests,
  onOpenNewRequest,
  onOpenCompareProposals,
  onOpenLiveOperation,
  onOpenDetails
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.port.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === 'todos') return true;
    return r.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  return (
    <div className="flex flex-col w-full max-w-md sm:max-w-xl md:max-w-3xl mx-auto px-4 space-y-4 pb-24">
      {/* Title & Action */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#0b1c30] tracking-tight">
            Todas as Solicitações
          </h1>
          <p className="text-[12px] text-[#45464d]">
            Gerenciamento e status de compras portuárias da agência
          </p>
        </div>
        <button
          onClick={onOpenNewRequest}
          className="h-10 px-3.5 rounded-xl bg-black text-white text-[12px] font-bold flex items-center gap-1.5 shadow hover:bg-[#131b2e] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Nova</span>
        </button>
      </div>

      {/* Search & Status Filter */}
      <div className="bg-white p-3 rounded-xl border border-[#e5eeff] shadow-sm flex flex-col gap-2.5">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#45464d]">
            search
          </span>
          <input
            type="text"
            placeholder="Filtrar por navio, código REQ ou porto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#eff4ff] text-[13px] text-[#0b1c30] placeholder:text-[#45464d]/60 focus:ring-2 focus:ring-[#006398] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'todos', label: `Todos (${requests.length})` },
            { id: 'propostas', label: 'Com Propostas' },
            { id: 'aberta', label: 'Abertas' },
            { id: 'execução', label: 'Em Execução' },
            { id: 'contratada', label: 'Contratadas' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-[#006398] text-white shadow-sm'
                  : 'bg-[#e5eeff] text-[#45464d] hover:bg-[#dce9ff]'
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-[#e5eeff] text-[#45464d] text-[13px]">
            Nenhuma solicitação encontrada para os filtros aplicados.
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-xl bg-white border border-[#e5eeff] shadow-sm hover:border-[#cce5ff] transition-all flex flex-col gap-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#45464d] bg-[#eff4ff] px-2 py-0.5 rounded">
                      {req.code}
                    </span>
                    <span className="text-[11px] font-bold text-[#006398] bg-[#d3e4fe] px-2 py-0.5 rounded-full">
                      {req.category}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0b1c30] mt-1">{req.title}</h3>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#cce5ff] text-[#00476e]">
                  {req.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#eff4ff] rounded-lg text-[12px]">
                <div>
                  <span className="text-[10px] text-[#45464d] uppercase font-bold block">Navio & Porto</span>
                  <span className="font-bold text-[#0b1c30]">{req.vesselName}</span>
                  <span className="text-[#45464d] block text-[11px]">{req.berth}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#45464d] uppercase font-bold block">Janela & Escopo</span>
                  <span className="font-bold text-[#0b1c30]">{req.volumeOrScope}</span>
                  <span className="text-[#006398] block text-[11px]">{req.window}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[12px] text-[#45464d]">
                  {req.proposalsCount > 0 ? (
                    <strong className="text-[#006398]">{req.proposalsCount} propostas recebidas</strong>
                  ) : (
                    'Aguardando respostas de agências'
                  )}
                </span>

                <div className="flex gap-2">
                  {req.proposals && req.proposals.length > 0 && (
                    <button
                      onClick={() => onOpenCompareProposals(req.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#006398] text-white text-[11px] font-bold hover:bg-[#00476e] cursor-pointer"
                      type="button"
                    >
                      Comparar Propostas
                    </button>
                  )}
                  {req.status === 'Contratada' && (
                    <button
                      onClick={() => onOpenLiveOperation(req)}
                      className="px-3 py-1.5 rounded-lg bg-[#dce9ff] text-[#0b1c30] text-[11px] font-bold hover:bg-[#cbdbf5] flex items-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#006398]">radar</span>
                      Rastrear
                    </button>
                  )}
                  <button
                    onClick={() => onOpenDetails(req)}
                    className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-[11px] font-semibold hover:bg-[#e5eeff] cursor-pointer"
                    type="button"
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
