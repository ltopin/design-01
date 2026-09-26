import React, { useState } from 'react';
import { MaritimeRequest, ActivityItem } from '../types/maritime';

interface DashboardViewProps {
  requests: MaritimeRequest[];
  activityItems: ActivityItem[];
  onOpenNewRequest: () => void;
  onOpenCompareProposals: (reqId: string) => void;
  onOpenRequestDetails: (req: MaritimeRequest) => void;
  onOpenLiveOperation: (req: MaritimeRequest) => void;
  onOpenSuppliers: () => void;
  onOpenPendingProposals: () => void;
  onCallDutyDesk: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  requests,
  activityItems,
  onOpenNewRequest,
  onOpenCompareProposals,
  onOpenRequestDetails,
  onOpenLiveOperation,
  onOpenSuppliers,
  onOpenPendingProposals,
  onCallDutyDesk
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'propostas' | 'abertas' | 'execucao'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter requests
  const filteredRequests = requests.filter((req) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'propostas') return req.status === 'Recebendo propostas';
    if (selectedFilter === 'abertas') return req.status === 'Aberta';
    if (selectedFilter === 'execucao') return req.status === 'Em execução' || req.status === 'Contratada';
    return true;
  });

  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto sm:max-w-xl md:max-w-2xl px-4 space-y-4 pb-8">
      {/* Header & Contexto Corporativo */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d3e4fe] text-[#0b1c30] text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006398]"></span>
            Transmar Navegação S/A • Porto Base: Santos (SP)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#45464d] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[13px] text-[#006398]">verified</span>
            Homologado
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="text-[24px] sm:text-[28px] font-bold text-[#0b1c30] tracking-tight leading-tight">
            Bom dia, Luiz
          </h1>
          <p className="text-[13px] text-[#45464d] mt-0.5 leading-snug">
            Gerencie suas solicitações e contratações de serviços portuários com rastreabilidade operacional.
          </p>
        </div>

        {/* CTAs de Acesso Rápido */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={onOpenNewRequest}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-black text-white font-semibold text-[15px] shadow-md hover:bg-[#131b2e] active:scale-[0.99] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Nova solicitação</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenPendingProposals}
              className="h-10 flex items-center justify-center gap-1.5 px-2 rounded-xl bg-[#e5eeff] text-[#0b1c30] text-[12px] font-semibold hover:bg-[#dce9ff] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[17px] text-[#006398]">pending_actions</span>
              <span className="truncate">Ver cotações (3)</span>
            </button>
            <button
              onClick={onOpenSuppliers}
              className="h-10 flex items-center justify-center gap-1.5 px-2 rounded-xl bg-[#e5eeff] text-[#0b1c30] text-[12px] font-semibold hover:bg-[#dce9ff] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[17px] text-[#006398]">domain_verification</span>
              <span className="truncate">Fornecedores</span>
            </button>
          </div>
        </div>
      </section>

      {/* Alerta Operacional Crítico */}
      <section className="rounded-xl p-4 bg-[#d3e4fe] shadow-sm relative overflow-hidden border border-[#cce5ff]">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#e5eeff] flex items-center justify-center shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-[20px] text-[#006398]">crisis_alert</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006398]">
                Atenção Operacional
              </span>
              <span className="text-[11px] font-semibold text-[#ba1a1a] flex items-center gap-1 bg-[#ffdad6]/60 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                Crítico
              </span>
            </div>
            <p className="text-[13px] text-[#0b1c30] mt-1 leading-snug">
              <strong>4 propostas recebidas</strong> para a{' '}
              <span className="text-[#006398] font-semibold cursor-pointer hover:underline" onClick={() => onOpenCompareProposals('req-1')}>
                Fumigação do MV Ocean Star
              </span>{' '}
              aguardando análise para liberação de atracação em Santos.
            </p>
            <div className="flex items-center justify-between gap-2 mt-3 pt-1 border-t border-[#cce5ff]/80">
              <button
                onClick={() => onOpenCompareProposals('req-1')}
                className="inline-flex items-center gap-1 text-[12px] font-semibold text-white bg-[#006398] px-3.5 py-1.5 rounded-full hover:bg-[#00476e] active:scale-95 transition-all shadow-sm cursor-pointer"
                type="button"
              >
                <span>Avaliar Propostas</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
              <span className="text-[11px] font-medium text-[#45464d]">
                Janela: 10 Out • 08:00
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Painel de Controle (Grid 2 Colunas) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[11px] uppercase text-[#45464d] tracking-wider font-bold">
            Painel de Controle
          </span>
          <span className="text-[12px] text-[#006398] font-semibold">Outubro 2024</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Métrica 1 */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-white border border-[#e5eeff] shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-32 hover:border-[#cce5ff] transition-colors">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006398]">
                <span className="material-symbols-outlined text-[18px]">folder_open</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#dce9ff] text-[#0b1c30] text-[11px] font-semibold">
                +2 hoje
              </span>
            </div>
            <div>
              <div className="text-[28px] text-[#0b1c30] font-bold leading-tight font-data-tabular">
                8
              </div>
              <div className="text-[11px] text-[#45464d] font-medium truncate">Solicitações abertas</div>
            </div>
          </div>

          {/* Métrica 2 */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-white border border-[#cce5ff] shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-32 hover:border-[#93ccff] transition-colors">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-[#cce5ff] text-[#00476e] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">request_quote</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#cce5ff] text-[#00476e] text-[11px] font-bold">
                3 novas
              </span>
            </div>
            <div>
              <div className="text-[28px] text-[#006398] font-bold leading-tight font-data-tabular">
                14
              </div>
              <div className="text-[11px] text-[#45464d] font-medium truncate">Propostas recebidas</div>
            </div>
          </div>

          {/* Métrica 3 */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-white border border-[#e5eeff] shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-32 hover:border-[#cce5ff] transition-colors">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]">
                <span className="material-symbols-outlined text-[18px]">anchor</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#d3e4fe] text-[#006398] text-[11px] font-semibold">
                No prazo
              </span>
            </div>
            <div>
              <div className="text-[28px] text-[#0b1c30] font-bold leading-tight font-data-tabular">
                5
              </div>
              <div className="text-[11px] text-[#45464d] font-medium truncate">Serviços em execução</div>
            </div>
          </div>

          {/* Métrica 4 */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-white border border-[#e5eeff] shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-32 hover:border-[#cce5ff] transition-colors">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#0b1c30]">
                <span className="material-symbols-outlined text-[18px]">task_alt</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#eff4ff] text-[#45464d] text-[11px] font-semibold">
                Mês atual
              </span>
            </div>
            <div>
              <div className="text-[28px] text-[#0b1c30] font-bold leading-tight font-data-tabular">
                29
              </div>
              <div className="text-[11px] text-[#006398] font-bold truncate">R$ 480k contratados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Solicitações Recentes */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div>
            <h2 className="text-[16px] font-bold text-[#0b1c30] tracking-tight">
              Solicitações recentes
            </h2>
            <span className="text-[12px] text-[#45464d]">
              Acompanhamento de compras portuárias
            </span>
          </div>
          <button
            onClick={() => setSelectedFilter('all')}
            className="text-[12px] text-[#006398] font-semibold hover:underline cursor-pointer"
            type="button"
          >
            Ver todas ({requests.length})
          </button>
        </div>

        {/* Filtros de Pílula Interativos */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-black text-white shadow-sm'
                : 'bg-[#e5eeff] text-[#45464d] hover:bg-[#dce9ff]'
            }`}
            type="button"
          >
            Todas ({requests.length})
          </button>
          <button
            onClick={() => setSelectedFilter('propostas')}
            className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all cursor-pointer ${
              selectedFilter === 'propostas'
                ? 'bg-black text-white shadow-sm'
                : 'bg-[#e5eeff] text-[#45464d] hover:bg-[#dce9ff]'
            }`}
            type="button"
          >
            Recebendo propostas ({requests.filter(r => r.status === 'Recebendo propostas').length})
          </button>
          <button
            onClick={() => setSelectedFilter('abertas')}
            className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all cursor-pointer ${
              selectedFilter === 'abertas'
                ? 'bg-black text-white shadow-sm'
                : 'bg-[#e5eeff] text-[#45464d] hover:bg-[#dce9ff]'
            }`}
            type="button"
          >
            Abertas ({requests.filter(r => r.status === 'Aberta').length})
          </button>
          <button
            onClick={() => setSelectedFilter('execucao')}
            className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all cursor-pointer ${
              selectedFilter === 'execucao'
                ? 'bg-black text-white shadow-sm'
                : 'bg-[#e5eeff] text-[#45464d] hover:bg-[#dce9ff]'
            }`}
            type="button"
          >
            Em execução ({requests.filter(r => r.status === 'Em execução' || r.status === 'Contratada').length})
          </button>
        </div>

        {/* Cards de Solicitação */}
        <div className="flex flex-col gap-3">
          {filteredRequests.map((req) => {
            const isFumigacao = req.code === 'REQ-2024-884';
            const isSurvey = req.code === 'REQ-2024-881';
            const isCasco = req.code === 'ORD-2024-762';

            return (
              <article
                key={req.id}
                className="flex flex-col rounded-xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#e5eeff] space-y-3 hover:border-[#cce5ff] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-[#d3e4fe] text-[#006398] text-[11px] font-semibold">
                        {req.category}
                      </span>
                      <span className="text-[11px] text-[#45464d] font-mono">
                        {req.code}
                      </span>
                    </div>
                    <h3 className="text-[16px] font-bold text-[#0b1c30] mt-1 truncate">
                      {req.title}
                    </h3>
                  </div>

                  {req.status === 'Recebendo propostas' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#cce5ff] text-[#00476e] text-[11px] font-bold shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006398] animate-pulse"></span>
                      Recebendo propostas
                    </span>
                  )}
                  {req.status === 'Aberta' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#006398] text-[11px] font-bold shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006398]"></span>
                      Aberta
                    </span>
                  )}
                  {(req.status === 'Contratada' || req.status === 'Em execução') && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#0b1c30] text-[11px] font-bold shrink-0">
                      <span className="material-symbols-outlined text-[13px] text-[#006398]">check_circle</span>
                      {req.status}
                    </span>
                  )}
                  {req.status === 'Concluída' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold shrink-0 border border-emerald-200">
                      <span className="material-symbols-outlined text-[13px] text-emerald-600">verified</span>
                      Concluída
                    </span>
                  )}
                </div>

                {/* Specs Grid 2 Colunas */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 p-2.5 rounded-lg bg-[#eff4ff] border border-[#e5eeff]">
                  <div>
                    <span className="text-[11px] text-[#45464d] block font-medium">Embarcação • Berço</span>
                    <span className="text-[13px] text-[#0b1c30] font-bold truncate block">
                      {req.vesselName}
                    </span>
                    <span className="text-[11px] text-[#45464d] truncate block">
                      {req.berth}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#45464d] block font-medium">
                      {req.assignedSupplier ? 'Prestador Homologado' : (isSurvey ? 'Carga • Janela' : 'Volume • Janela')}
                    </span>
                    <span className="text-[13px] text-[#0b1c30] font-bold block truncate">
                      {req.assignedSupplier ? (
                        <span className="text-[#006398] font-bold">{req.assignedSupplier}</span>
                      ) : (
                        req.volumeOrScope
                      )}
                    </span>
                    <span className="text-[11px] text-[#006398] font-semibold block truncate">
                      {req.allocatedTeam || req.window}
                    </span>
                  </div>
                </div>

                {/* Resumo Financeiro / Propostas */}
                {isFumigacao && (
                  <div className="flex items-center justify-between py-0.5 px-0.5 text-[#0b1c30]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[20px] text-[#006398]">request_quote</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-semibold text-[#0b1c30]">
                          {req.proposalsCount} propostas recebidas
                        </span>
                        <span className="text-[11px] text-[#006398] font-bold font-data-tabular">
                          Menor valor: R$ {req.lowestAmount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#e5eeff] text-[#45464d]">
                      {req.expiresIn}
                    </span>
                  </div>
                )}

                {isSurvey && (
                  <div className="flex items-center justify-between py-0.5 px-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-[#45464d]">groups</span>
                      <span className="text-[13px] text-[#0b1c30] font-medium">
                        2 propostas recebidas de agências
                      </span>
                    </div>
                    <span className="text-[11px] text-[#006398] font-semibold">
                      Aguardando mais 1
                    </span>
                  </div>
                )}

                {isCasco && (
                  <div className="flex items-center justify-between py-0.5 px-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-[#006398]">schedule</span>
                      <span className="text-[13px] text-[#0b1c30]">
                        Agendado para <strong>08 Out • 06:00</strong>
                      </span>
                    </div>
                    <span className="text-[11px] text-[#45464d] font-semibold">SLA Garantido</span>
                  </div>
                )}

                {/* Other requests generic status bar */}
                {!isFumigacao && !isSurvey && !isCasco && (
                  <div className="flex items-center justify-between py-0.5 px-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-[#006398]">receipt_long</span>
                      <span className="text-[13px] text-[#0b1c30] font-medium">
                        {req.proposalsCount} cotações registradas
                      </span>
                    </div>
                    {req.lowestAmount && (
                      <span className="text-[11px] text-[#006398] font-bold font-data-tabular">
                        A partir de R$ {req.lowestAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>
                )}

                {/* Ação do Card */}
                <div className="pt-0.5">
                  {isFumigacao && (
                    <button
                      onClick={() => onOpenCompareProposals(req.id)}
                      className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-[#006398] text-white font-semibold text-[13px] hover:bg-[#00476e] active:scale-[0.99] transition-all shadow-sm cursor-pointer"
                      type="button"
                    >
                      <span>Comparar 4 propostas</span>
                      <span className="material-symbols-outlined text-[18px]">stacked_bar_chart</span>
                    </button>
                  )}

                  {isSurvey && (
                    <button
                      onClick={() => onOpenRequestDetails(req)}
                      className="w-full h-10 flex items-center justify-center gap-1.5 rounded-xl bg-[#dce9ff] text-[#0b1c30] font-semibold text-[13px] hover:bg-[#cbdbf5] transition-colors cursor-pointer"
                      type="button"
                    >
                      <span>Ver detalhes da solicitação</span>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  )}

                  {isCasco && (
                    <button
                      onClick={() => onOpenLiveOperation(req)}
                      className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-[#dce9ff] text-[#0b1c30] font-semibold text-[13px] hover:bg-[#cbdbf5] transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#006398]">radar</span>
                      <span>Acompanhar operação em tempo real</span>
                    </button>
                  )}

                  {!isFumigacao && !isSurvey && !isCasco && (
                    <button
                      onClick={() => onOpenRequestDetails(req)}
                      className="w-full h-10 flex items-center justify-center gap-1.5 rounded-xl bg-[#e5eeff] text-[#0b1c30] font-semibold text-[13px] hover:bg-[#dce9ff] transition-colors cursor-pointer"
                      type="button"
                    >
                      <span>Detalhes da Solicitação</span>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Seção: Visual de Capacidade Operacional */}
      <section className="rounded-xl p-4 bg-[#eff4ff] shadow-sm border border-[#e5eeff] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#006398]">sailing</span>
            <span className="text-[14px] font-bold text-[#0b1c30]">Capacidade Operacional</span>
          </div>
          <span className="text-[11px] text-[#45464d] font-semibold">Santos • Maré 1.4m</span>
        </div>

        <div className="flex flex-col gap-1.5 pt-0.5">
          <div className="flex items-center justify-between text-[11px] text-[#45464d]">
            <span>Atracações atendidas no trimestre</span>
            <span className="font-bold text-[#006398] font-data-tabular">86% da meta</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#e5eeff] overflow-hidden">
            <div
              className="h-full bg-[#006398] rounded-full transition-all duration-700"
              style={{ width: '86%' }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[#45464d] text-[11px] pt-0.5">
            <span>43 navios assistidos</span>
            <span className="font-medium">Meta: 50 navios</span>
          </div>
        </div>
      </section>

      {/* Seção: Atividade Recente (Feed em Tempo Real) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <h2 className="text-[16px] font-bold text-[#0b1c30]">Atividade recente</h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#006398] text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5bb8fe] animate-pulse"></span>
              Ao vivo
            </span>
          </div>
          <button
            onClick={handleRefreshFeed}
            aria-label="Atualizar feed"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-colors cursor-pointer"
            type="button"
          >
            <span className={`material-symbols-outlined text-[18px] ${isRefreshing ? 'animate-spin' : ''}`}>
              sync
            </span>
          </button>
        </div>

        {/* Feed List */}
        <div className="flex flex-col gap-2">
          {activityItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-[#e5eeff] hover:border-[#cce5ff] transition-colors"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                item.type === 'proposal'
                  ? 'bg-[#cce5ff] text-[#00476e]'
                  : item.type === 'question'
                  ? 'bg-[#dce9ff] text-[#0b1c30]'
                  : item.type === 'report'
                  ? 'bg-[#d3e4fe] text-[#006398]'
                  : 'bg-[#eff4ff] text-[#45464d]'
              }`}>
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-[12px] font-bold text-[#0b1c30] truncate">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#45464d] shrink-0 font-medium">
                    {item.timeAgo}
                  </span>
                </div>
                <span className="text-[13px] text-[#006398] font-medium truncate mt-0.5">
                  {item.subtitle}
                </span>
                {item.extra && (
                  <span className="text-[11px] text-[#45464d] mt-0.5">
                    {item.actionText ? (
                      <button
                        onClick={() => alert(`Abrindo canal de mensagens para: ${item.title}`)}
                        className="text-[#006398] font-semibold hover:underline cursor-pointer"
                      >
                        {item.extra}
                      </button>
                    ) : (
                      item.extra
                    )}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suporte e Contato Rápido de Plantão Portuário */}
      <section className="rounded-xl p-4 bg-[#d3e4fe] border border-[#cce5ff] flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shrink-0 shadow">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-bold text-[#0b1c30]">Plantão PortHub 24/7</span>
            <span className="text-[12px] text-[#45464d] truncate">
              Santos (13) 3878-9000 • Canal VHF 16
            </span>
          </div>
        </div>
        <button
          onClick={onCallDutyDesk}
          className="h-9 px-3.5 rounded-lg bg-white text-[#0b1c30] text-[12px] font-bold hover:bg-[#eff4ff] active:scale-95 transition-all shrink-0 border border-[#cce5ff] shadow-sm cursor-pointer"
          type="button"
        >
          Chamar
        </button>
      </section>
    </div>
  );
};
