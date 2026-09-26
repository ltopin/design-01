import React, { useState } from 'react';
import { ServiceCategory, ServiceItem, MaritimeRequest } from '../types/maritime';
import { INITIAL_SERVICE_CATEGORIES } from '../data/maritimeData';

interface NewRequestWizardProps {
  onBackToDashboard: () => void;
  onCreateRequest: (newReq: MaritimeRequest) => void;
}

export const NewRequestWizard: React.FC<NewRequestWizardProps> = ({
  onBackToDashboard,
  onCreateRequest
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Step 1 state
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('Operações e carga');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'Operações e carga': true
  });

  // Step 2 state: Operation
  const [vesselName, setVesselName] = useState<string>('MV Ocean Star');
  const [portBase, setPortBase] = useState<string>('Santos (SP)');
  const [berth, setBerth] = useState<string>('Terminal XXX - Berço 1');
  const [eta, setEta] = useState<string>('2024-10-10T08:00');
  const [etd, setEtd] = useState<string>('2024-10-12T18:00');
  const [scaleNumber, setScaleNumber] = useState<string>('ESC-2024/9912');

  // Step 3 state: Details & Scope
  const [cargoType, setCargoType] = useState<string>('Soja em Grãos');
  const [volume, setVolume] = useState<string>('65.000 MT');
  const [holdsCount, setHoldsCount] = useState<string>('7 Porões');
  const [operationalNotes, setOperationalNotes] = useState<string>(
    'Exigida recirculação forçada tipo J-System com monitoramento de fosfina pré-atracação.'
  );

  // Step 4 state: Documentation & SLA
  const [requireMapa, setRequireMapa] = useState<boolean>(true);
  const [requireAnvisa, setRequireAnvisa] = useState<boolean>(true);
  const [requireInsurance, setRequireInsurance] = useState<boolean>(true);
  const [targetSla, setTargetSla] = useState<string>('12 horas com certificado preliminar');

  const toggleAccordion = (catName: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  const handleSelectService = (item: ServiceItem, categoryName: string) => {
    setSelectedService(item);
    setSelectedCategoryName(categoryName);
  };

  const handleQuickChip = (chipTitle: string) => {
    // Find matching service
    for (const cat of INITIAL_SERVICE_CATEGORIES) {
      const match = cat.items.find(
        (i) => i.title.toLowerCase().includes(chipTitle.toLowerCase())
      );
      if (match) {
        setOpenAccordions((prev) => ({ ...prev, [cat.name]: true }));
        handleSelectService(match, cat.name);
        return;
      }
    }
    setSearchQuery(chipTitle);
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete creation
      const newReq: MaritimeRequest = {
        id: `req-${Date.now()}`,
        code: `REQ-2024-${Math.floor(100 + Math.random() * 900)}`,
        category: selectedCategoryName,
        title: selectedService?.title || 'Serviço Portuário',
        vesselName: vesselName,
        berth: `${portBase.split(' ')[0]} • ${berth}`,
        port: portBase,
        volumeOrScope: volume ? `${volume} ${cargoType}` : cargoType,
        window: '10–12 Out',
        status: 'Recebendo propostas',
        proposalsCount: 0,
        expiresIn: 'Expira em 48h',
        urgency: 'Normal',
        createdAt: 'Hoje, agora'
      };
      onCreateRequest(newReq);
    }
  };

  const handleCancel = () => {
    if (selectedService) {
      if (window.confirm('Deseja cancelar esta nova solicitação? Os dados preenchidos serão descartados.')) {
        onBackToDashboard();
      }
    } else {
      onBackToDashboard();
    }
  };

  // Filter service categories based on search
  const filteredCategories = INITIAL_SERVICE_CATEGORIES.map((cat) => {
    if (!searchQuery.trim()) return cat;
    const q = searchQuery.toLowerCase();
    const filteredItems = cat.items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        cat.name.toLowerCase().includes(q)
    );
    return {
      ...cat,
      items: filteredItems
    };
  }).filter((cat) => cat.items.length > 0);

  const stepLabels = ['1. Serviço', '2. Operação', '3. Detalhes', '4. Doc.', '5. Revisão'];
  const progressPercent = currentStep * 20;

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f8f9ff]">
      {/* Context Bar & Return Action */}
      <div className="px-4 pt-3 pb-2 bg-white border-b border-[#e5eeff]">
        <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
          <div className="flex items-center justify-between gap-2 pb-2">
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-1 text-[#006398] hover:text-[#00476e] transition-colors py-1 group cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
                arrow_back
              </span>
              <span className="text-[12px] font-bold">Voltar ao Dashboard</span>
            </button>
            <button
              onClick={handleCancel}
              aria-label="Fechar e descartar"
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Page Title & Operational Context */}
          <div className="py-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#001d31] text-[11px] font-bold uppercase tracking-wide">
                <span className="material-symbols-outlined text-[13px] text-[#006398]">anchor</span>
                Transmar Navegação S/A
              </span>
              <span className="text-[#45464d] text-[11px] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006398]"></span>
                Porto Base: Santos (SP)
              </span>
            </div>
            <h1 className="text-[22px] sm:text-[26px] font-bold text-[#0b1c30] tracking-tight leading-tight">
              Nova solicitação
            </h1>
            <p className="text-[13px] text-[#45464d] mt-0.5">
              {currentStep === 1 && 'Informe o serviço que sua empresa precisa contratar para a escala.'}
              {currentStep === 2 && 'Vincule a embarcação, berço de atracação e janela operacional.'}
              {currentStep === 3 && 'Defina o volume, porões ou especificações técnicas necessárias.'}
              {currentStep === 4 && 'Certificados obrigatórios (MAPA, ANVISA, Seguros e Marinha).'}
              {currentStep === 5 && 'Revise as especificações antes de enviar para os fornecedores homologados.'}
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="pt-2 pb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#0b1c30] font-semibold flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#006398] text-white text-[11px] font-bold">
                  {currentStep}
                </span>
                Etapa {currentStep} de 5:{' '}
                <span className="text-[#006398] font-bold">
                  {currentStep === 1 && 'Seleção de Serviço'}
                  {currentStep === 2 && 'Dados da Operação'}
                  {currentStep === 3 && 'Detalhes Técnicos'}
                  {currentStep === 4 && 'Documentação & SLA'}
                  {currentStep === 5 && 'Revisão & Publicação'}
                </span>
              </span>
              <span className="text-[11px] text-[#45464d] font-semibold font-data-tabular">
                {progressPercent}% concluído
              </span>
            </div>

            {/* Segmented Track */}
            <div className="grid grid-cols-5 gap-1.5">
              {stepLabels.map((lbl, idx) => {
                const stepNum = idx + 1;
                const isPassed = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;
                return (
                  <div key={lbl} className="flex flex-col gap-1">
                    <div
                      className={`h-1.5 w-full rounded-full transition-colors ${
                        isCurrent || isPassed ? 'bg-[#006398]' : 'bg-[#dce9ff]'
                      }`}
                    ></div>
                    <span
                      className={`text-[10px] sm:text-[11px] font-semibold truncate ${
                        isCurrent
                          ? 'text-[#006398]'
                          : isPassed
                          ? 'text-[#0b1c30]'
                          : 'text-[#45464d]/60'
                      }`}
                    >
                      {lbl}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-md sm:max-w-xl md:max-w-2xl mx-auto w-full px-4 py-4 flex flex-col gap-4 pb-28">
        {/* ================= STEP 1: SERVICE SELECTION ================= */}
        {currentStep === 1 && (
          <>
            {/* Search Section Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff]">
              <label
                className="block text-[12px] font-bold text-[#0b1c30] mb-2"
                htmlFor="service-search-input"
              >
                Qual serviço você precisa?
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[20px] text-[#45464d] pointer-events-none">
                  search
                </span>
                <input
                  id="service-search-input"
                  className="w-full h-11 pl-10 pr-9 rounded-lg bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#45464d]/60 text-[13px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006398] transition-all"
                  placeholder="Busque por serviço, ex: fumigação, survey..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpar busca"
                    className="absolute right-2.5 w-6 h-6 flex items-center justify-center rounded-full text-[#45464d] hover:text-[#0b1c30] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                  </button>
                )}
              </div>

              {/* Quick Category Chips */}
              <div className="mt-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#45464d] mb-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#006398]">
                    trending_up
                  </span>
                  Mais frequentes na agência:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Fumigação', 'Survey de Carga', 'Limpeza de Casco', 'Crew Change'].map(
                    (chip) => (
                      <button
                        key={chip}
                        onClick={() => handleQuickChip(chip)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#45464d] hover:bg-[#cce5ff] hover:text-[#001d31] text-[11px] font-semibold transition-colors cursor-pointer"
                        type="button"
                      >
                        <span>{chip}</span>
                        <span className="material-symbols-outlined text-[13px] opacity-70">add</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Active Selection Summary Card (Dynamic Feedback) */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] transition-all">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    selectedService
                      ? 'bg-[#cce5ff] text-[#001d31]'
                      : 'bg-[#e5eeff] text-[#45464d]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {selectedService ? 'check_circle' : 'pending'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold">
                      Resumo da seleção
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        selectedService
                          ? 'bg-[#cce5ff] text-[#001d31]'
                          : 'bg-[#e5eeff] text-[#45464d]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          selectedService ? 'bg-[#006398]' : 'bg-[#76777d]'
                        }`}
                      ></span>
                      {selectedService ? 'Selecionado' : 'Aguardando escolha'}
                    </span>
                  </div>
                  <div className="mt-1">
                    <p className="text-[15px] font-bold text-[#0b1c30] truncate">
                      {selectedService ? selectedService.title : 'Nenhum serviço selecionado'}
                    </p>
                    <p className="text-[12px] text-[#45464d] truncate">
                      Categoria: {selectedService ? selectedCategoryName : '—'}
                    </p>
                  </div>
                </div>
              </div>

              {!selectedService && (
                <div className="mt-3 pt-3 flex items-start gap-2 bg-[#eff4ff] rounded-lg p-2.5 border border-[#e5eeff]">
                  <span className="material-symbols-outlined text-[18px] text-[#006398] shrink-0 mt-0.5">
                    info
                  </span>
                  <p className="text-[12px] text-[#45464d] leading-relaxed">
                    Navegue pelas categorias estruturadas abaixo ou utilize o campo de busca rápida para
                    habilitar o avanço para a etapa 2.
                  </p>
                </div>
              )}

              {selectedService && (
                <div className="mt-3 pt-2.5 flex items-center justify-between text-[11px] text-[#45464d] border-t border-[#e5eeff]">
                  <span>Lead time estimado: <strong>{selectedService.estimatedLeadTime}</strong></span>
                  <span className="font-semibold text-[#006398]">Média: {selectedService.averageCost}</span>
                </div>
              )}
            </div>

            {/* Structured Maritime Categories Accordion */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1 mb-0.5">
                <h2 className="text-[12px] uppercase tracking-wider text-[#45464d] font-bold">
                  Catálogo Marítimo de Serviços
                </h2>
                <span className="text-[11px] text-[#45464d]">
                  {filteredCategories.length} categorias
                </span>
              </div>

              {filteredCategories.map((category) => {
                const isOpen = openAccordions[category.name] ?? false;

                return (
                  <div
                    key={category.name}
                    className="rounded-xl bg-white shadow-sm border border-[#e5eeff] overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(category.name)}
                      className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-[#eff4ff]/60 transition-colors cursor-pointer"
                      type="button"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#dce9ff] text-[#006398] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">
                            {category.icon}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[15px] font-bold text-[#0b1c30] truncate">
                              {category.name}
                            </span>
                            <span className="px-1.5 py-0.2 rounded-full bg-[#cce5ff] text-[#001d31] text-[10px] font-bold">
                              {category.countText}
                            </span>
                          </div>
                          <p className="text-[12px] text-[#45464d] truncate">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[20px] text-[#45464d] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 flex flex-col gap-2 border-t border-[#e5eeff]/60">
                        {category.items.map((item) => {
                          const isSelected = selectedService?.id === item.id;

                          return (
                            <label
                              key={item.id}
                              onClick={() => handleSelectService(item, category.name)}
                              className={`cursor-pointer flex items-center justify-between p-3 rounded-lg transition-all ${
                                isSelected
                                  ? 'bg-[#dce9ff] ring-2 ring-[#006398]'
                                  : 'bg-[#eff4ff] hover:bg-[#e5eeff]'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-[#006398]' : 'text-[#45464d]'}`}>
                                  {item.icon}
                                </span>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[13px] font-bold text-[#0b1c30] truncate">
                                      {item.title}
                                    </span>
                                    {item.tag && (
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#d3e4fe] text-[#006398] rounded">
                                        {item.tag}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[12px] text-[#45464d] truncate">
                                    {item.subtitle}
                                  </p>
                                </div>
                              </div>

                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 shadow-inner transition-colors ${
                                  isSelected
                                    ? 'bg-[#006398] text-white'
                                    : 'bg-white border border-[#c6c6cd]'
                                }`}
                              >
                                {isSelected && (
                                  <span className="material-symbols-outlined text-[15px] font-bold">
                                    check
                                  </span>
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Fallback / Support Link Area */}
            <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#e5eeff] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[20px] text-[#006398] shrink-0">
                  contact_support
                </span>
                <span className="text-[12px] text-[#45464d] truncate">
                  Não encontrou o serviço técnico que precisa?
                </span>
              </div>
              <button
                onClick={() => alert('Canal de solicitação de novo serviço técnico aberto para a Central PortHub.')}
                className="text-[12px] font-bold text-[#006398] hover:text-[#001d31] shrink-0 inline-flex items-center gap-0.5 cursor-pointer"
                type="button"
              >
                Solicitar cadastro
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </>
        )}

        {/* ================= STEP 2: OPERATIONAL CONTEXT ================= */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-4">
              <h2 className="text-[15px] font-bold text-[#0b1c30] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006398] text-[20px]">
                  directions_boat
                </span>
                Dados da Embarcação & Escala
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                    Nome da Embarcação
                  </label>
                  <input
                    type="text"
                    value={vesselName}
                    onChange={(e) => setVesselName(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[13px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                    Número da Escala
                  </label>
                  <input
                    type="text"
                    value={scaleNumber}
                    onChange={(e) => setScaleNumber(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[13px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                    Porto Base
                  </label>
                  <select
                    value={portBase}
                    onChange={(e) => setPortBase(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[13px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398] focus:bg-white"
                  >
                    <option value="Santos (SP)">Porto de Santos (SP)</option>
                    <option value="Paranaguá (PR)">Porto de Paranaguá (PR)</option>
                    <option value="Rio de Janeiro (RJ)">Porto do Rio de Janeiro (RJ)</option>
                    <option value="Itajaí (SC)">Complexo de Itajaí & Navegantes (SC)</option>
                    <option value="Rio Grande (RS)">Porto de Rio Grande (RS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                    Berço / Terminal Previsto
                  </label>
                  <input
                    type="text"
                    value={berth}
                    onChange={(e) => setBerth(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[13px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                    ETA (Previsão de Chegada)
                  </label>
                  <input
                    type="datetime-local"
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[12px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                    ETD (Previsão de Saída)
                  </label>
                  <input
                    type="datetime-local"
                    value={etd}
                    onChange={(e) => setEtd(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[12px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: DETAILS & SCOPE ================= */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-4">
              <h2 className="text-[15px] font-bold text-[#0b1c30] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006398] text-[20px]">
                  inventory
                </span>
                Especificações Técnicas do Serviço
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                    Tipo de Carga ou Alvo
                  </label>
                  <input
                    type="text"
                    value={cargoType}
                    onChange={(e) => setCargoType(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[13px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                    Volume Total / Metragem
                  </label>
                  <input
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[13px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                    Compartimentos / Porões
                  </label>
                  <input
                    type="text"
                    value={holdsCount}
                    onChange={(e) => setHoldsCount(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[13px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                  Requisitos Específicos & Orientações Operacionais
                </label>
                <textarea
                  rows={3}
                  value={operationalNotes}
                  onChange={(e) => setOperationalNotes(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[13px] text-[#0b1c30] focus:ring-2 focus:ring-[#006398] focus:bg-white"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: DOCS & SLA ================= */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-4">
              <h2 className="text-[15px] font-bold text-[#0b1c30] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006398] text-[20px]">
                  verified_user
                </span>
                Certificações & Compliance Exigidos
              </h2>

              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 rounded-lg bg-[#eff4ff] cursor-pointer hover:bg-[#e5eeff]">
                  <div>
                    <span className="text-[13px] font-bold text-[#0b1c30] block">
                      Certificado MAPA (Ministério da Agricultura)
                    </span>
                    <span className="text-[11px] text-[#45464d]">
                      Obrigatório para emissão de liberação fitossanitária de exportação
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={requireMapa}
                    onChange={(e) => setRequireMapa(e.target.checked)}
                    className="w-5 h-5 accent-[#006398] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-[#eff4ff] cursor-pointer hover:bg-[#e5eeff]">
                  <div>
                    <span className="text-[13px] font-bold text-[#0b1c30] block">
                      Homologação ANVISA / Autoridade Portuária
                    </span>
                    <span className="text-[11px] text-[#45464d]">
                      Livre Prática e conformidade sanitária
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={requireAnvisa}
                    onChange={(e) => setRequireAnvisa(e.target.checked)}
                    className="w-5 h-5 accent-[#006398] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-[#eff4ff] cursor-pointer hover:bg-[#e5eeff]">
                  <div>
                    <span className="text-[13px] font-bold text-[#0b1c30] block">
                      Seguro de Responsabilidade Civil & P&I
                    </span>
                    <span className="text-[11px] text-[#45464d]">
                      Apólice mínima de cobertura marítima ativa
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={requireInsurance}
                    onChange={(e) => setRequireInsurance(e.target.checked)}
                    className="w-5 h-5 accent-[#006398] cursor-pointer"
                  />
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                  Meta de SLA para Entrega do Laudo
                </label>
                <input
                  type="text"
                  value={targetSla}
                  onChange={(e) => setTargetSla(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] border border-[#e5eeff] text-[13px] font-semibold text-[#0b1c30] focus:ring-2 focus:ring-[#006398]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: REVIEW & PUBLISH ================= */}
        {currentStep === 5 && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-4">
              <div className="flex items-center justify-between border-b border-[#e5eeff] pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#006398]">
                    Revisão Final
                  </span>
                  <h2 className="text-[18px] font-bold text-[#0b1c30]">
                    {selectedService?.title}
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#cce5ff] text-[#00476e] text-[11px] font-bold">
                  Pronto para Cotação
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#eff4ff] rounded-lg">
                <div>
                  <span className="text-[11px] text-[#45464d] block font-medium">Navio & Escala</span>
                  <span className="text-[13px] font-bold text-[#0b1c30] block">{vesselName}</span>
                  <span className="text-[11px] text-[#45464d] block">{scaleNumber}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#45464d] block font-medium">Porto & Berço</span>
                  <span className="text-[13px] font-bold text-[#0b1c30] block">{portBase}</span>
                  <span className="text-[11px] text-[#006398] font-semibold block">{berth}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#45464d] block font-medium">Volume & Carga</span>
                  <span className="text-[13px] font-bold text-[#0b1c30] block">{volume}</span>
                  <span className="text-[11px] text-[#45464d] block">{cargoType} ({holdsCount})</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#45464d] block font-medium">SLA Requerido</span>
                  <span className="text-[12px] font-bold text-[#006398] block">{targetSla}</span>
                </div>
              </div>

              <div className="p-3 bg-[#dce9ff]/50 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#006398]">
                  broadcast_on_personal
                </span>
                <div className="text-[12px] text-[#0b1c30]">
                  <strong>4 fornecedores homologados</strong> na região de {portBase} receberão esta
                  solicitação instantaneamente via rádio web e portal do prestador.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Bar (Wizard Stepper Actions) */}
      <div className="fixed bottom-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-[#e5eeff] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-4 py-3 pb-safe">
        <div className="flex items-center gap-3 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
          {currentStep === 1 ? (
            <button
              onClick={handleCancel}
              className="w-1/3 h-11 px-3 rounded-lg bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff] font-semibold text-[14px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
              type="button"
            >
              Cancelar
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-1/3 h-11 px-3 rounded-lg bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff] font-semibold text-[14px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Voltar
            </button>
          )}

          <button
            onClick={handleNextStep}
            disabled={currentStep === 1 && !selectedService}
            className={`w-2/3 h-11 px-4 rounded-lg font-semibold text-[14px] transition-all flex items-center justify-center gap-2 shadow-sm ${
              currentStep === 1 && !selectedService
                ? 'bg-[#0b1c30]/30 text-white cursor-not-allowed opacity-60'
                : 'bg-black text-white hover:bg-[#131b2e] active:scale-[0.98] cursor-pointer'
            }`}
            type="button"
          >
            <span>
              {currentStep === 1 && 'Continuar para Operação'}
              {currentStep === 2 && 'Continuar para Detalhes'}
              {currentStep === 3 && 'Continuar para Documentos'}
              {currentStep === 4 && 'Continuar para Revisão'}
              {currentStep === 5 && 'Publicar Solicitação'}
            </span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
