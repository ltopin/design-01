import React, { useState } from 'react';
import { MaritimeRequest } from '../types/maritime';

interface LiveOperationModalProps {
  request: MaritimeRequest;
  onClose: () => void;
}

export const LiveOperationModal: React.FC<LiveOperationModalProps> = ({
  request,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'telemetria' | 'comunicacao'>('timeline');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#f8f9ff] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#cce5ff] overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#006398] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">radar</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006398]">
                  Rastreabilidade Operacional em Tempo Real
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Operação Ativa
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

        {/* Live Status Bar */}
        <div className="px-5 py-3 bg-[#131b2e] text-white flex items-center justify-between text-[12px] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5bb8fe] text-[18px]">sailing</span>
            <span>Prestador: <strong>{request.assignedSupplier || 'SubSea Rio Mergulho'}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-[#dae2fd]">
            <span>Local: <strong>Rio de Janeiro • Fundeio 4</strong></span>
            <span>Início: <strong>06:14 BRT</strong></span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 bg-white border-b border-[#e5eeff] flex gap-4 text-[13px] font-semibold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-2.5 border-b-2 cursor-pointer transition-all ${
              activeTab === 'timeline'
                ? 'border-[#006398] text-[#006398]'
                : 'border-transparent text-[#45464d] hover:text-[#0b1c30]'
            }`}
            type="button"
          >
            Linha do Tempo
          </button>
          <button
            onClick={() => setActiveTab('telemetria')}
            className={`pb-2.5 border-b-2 cursor-pointer transition-all ${
              activeTab === 'telemetria'
                ? 'border-[#006398] text-[#006398]'
                : 'border-transparent text-[#45464d] hover:text-[#0b1c30]'
            }`}
            type="button"
          >
            Telemetria Subaquática
          </button>
          <button
            onClick={() => setActiveTab('comunicacao')}
            className={`pb-2.5 border-b-2 cursor-pointer transition-all ${
              activeTab === 'comunicacao'
                ? 'border-[#006398] text-[#006398]'
                : 'border-transparent text-[#45464d] hover:text-[#0b1c30]'
            }`}
            type="button"
          >
            Comunicação & Laudo
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 max-h-[55vh] overflow-y-auto">
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="relative pl-6 border-l-2 border-[#006398] space-y-6">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white"></span>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#0b1c30]">Chegada da Barcaça de Apoio (Diving Boat)</span>
                    <span className="text-[11px] font-mono text-[#45464d]">06:05</span>
                  </div>
                  <p className="text-[12px] text-[#45464d] mt-0.5">
                    Embarcação SubSea I atracou no costado de bombordo com equipe de 5 mergulhadores e supervisor DPC.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white"></span>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#0b1c30]">Inspeção Visual Preliminar UWILD CFTV</span>
                    <span className="text-[11px] font-mono text-[#45464d]">06:40</span>
                  </div>
                  <p className="text-[12px] text-[#45464d] mt-0.5">
                    Câmera submarina registrou grau de incrustação nível 3 no hélice e caixas de tomada d’água (Sea Chests).
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#006398] ring-4 ring-white animate-pulse"></span>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#006398]">Polimento de Hélice e Escovação Mecânica</span>
                    <span className="text-[11px] font-mono text-[#006398] font-bold">EM ANDAMENTO</span>
                  </div>
                  <p className="text-[12px] text-[#0b1c30] mt-0.5">
                    Mergulhador 1 e 2 operando equipamento hidráulico rotativo. Progresso: 70% das pás concluídas.
                  </p>
                </div>

                <div className="relative opacity-60">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#c6c6cd] ring-4 ring-white"></span>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#45464d]">Inspeção Final & Assinatura do Termo de Prontidão</span>
                    <span className="text-[11px] font-mono text-[#45464d]">Previsto 11:30</span>
                  </div>
                  <p className="text-[12px] text-[#45464d] mt-0.5">
                    Apresentação do relatório fotográfico com certificação de consumo de combustível mitigado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'telemetria' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl border border-[#e5eeff]">
                <span className="text-[11px] text-[#45464d] uppercase font-bold">Profundidade Atual</span>
                <div className="text-[22px] font-bold text-[#006398] mt-1 font-data-tabular">11.4 metros</div>
                <span className="text-[11px] text-emerald-600 font-semibold">Dentro dos limites de tabela DPC</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#e5eeff]">
                <span className="text-[11px] text-[#45464d] uppercase font-bold">Visibilidade Subaquática</span>
                <div className="text-[22px] font-bold text-[#0b1c30] mt-1 font-data-tabular">2.8 metros</div>
                <span className="text-[11px] text-[#45464d]">Boa transparência no fundeio</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#e5eeff]">
                <span className="text-[11px] text-[#45464d] uppercase font-bold">Correnteza</span>
                <div className="text-[22px] font-bold text-[#0b1c30] mt-1 font-data-tabular">0.4 nós</div>
                <span className="text-[11px] text-emerald-600 font-semibold">Mar calmo • Seguro para mergulho</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#e5eeff]">
                <span className="text-[11px] text-[#45464d] uppercase font-bold">Área Limpa Estimada</span>
                <div className="text-[22px] font-bold text-[#006398] mt-1 font-data-tabular">2.940 m²</div>
                <span className="text-[11px] text-[#006398] font-bold">70% do casco concluído</span>
              </div>
            </div>
          )}

          {activeTab === 'comunicacao' && (
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-[#e5eeff] space-y-2">
                <span className="text-[12px] font-bold text-[#0b1c30] block">Contato Rádio & Supervisão</span>
                <div className="text-[12px] text-[#45464d] space-y-1">
                  <div>Supervisor em Cais: <strong>Eng. Marcos Vinicius (CREA RJ-9942)</strong></div>
                  <div>Canal Rádio Marítimo: <strong>VHF Canal 72 (Privativo SubSea) / Canal 16</strong></div>
                  <div>Telefone Satelital de Emergência: <strong>+55 (21) 98822-1004</strong></div>
                </div>
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#cce5ff] flex items-center justify-between">
                <div>
                  <span className="text-[12px] font-bold text-[#0b1c30] block">Relatório Fotográfico Parcial</span>
                  <span className="text-[11px] text-[#45464d]">8 fotos em alta definição do hélice e do leme</span>
                </div>
                <button
                  onClick={() => alert('Download do arquivo laudo_cctv_polaris_parcial.pdf iniciado.')}
                  className="px-3 py-1.5 bg-[#006398] text-white rounded-lg text-[11px] font-bold hover:bg-[#00476e] cursor-pointer"
                  type="button"
                >
                  Baixar Laudo PDF
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-white border-t border-[#e5eeff] flex items-center justify-between text-[12px]">
          <span className="text-[#45464d]">SLA garantido sob cláusula de demurrage contratual</span>
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg bg-[#eff4ff] text-[#0b1c30] font-semibold hover:bg-[#e5eeff] cursor-pointer"
            type="button"
          >
            Fechar Acompanhamento
          </button>
        </div>
      </div>
    </div>
  );
};
