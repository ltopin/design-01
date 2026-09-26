import React from 'react';

interface MoreMenuModalProps {
  onOpenSuppliers: () => void;
  onOpenProfile: () => void;
  onCallDutyDesk: () => void;
  onSelectTab: (tab: any) => void;
}

export const MoreMenuModal: React.FC<MoreMenuModalProps> = ({
  onOpenSuppliers,
  onOpenProfile,
  onCallDutyDesk,
  onSelectTab
}) => {
  const menuOptions = [
    {
      icon: 'domain_verification',
      title: 'Fornecedores Homologados',
      desc: 'Catálogo de empresas credenciadas na agência',
      action: onOpenSuppliers
    },
    {
      icon: 'receipt_long',
      title: 'Relatórios Fiscais & Faturamento',
      desc: 'Notas fiscais de serviços e conciliação bancária',
      action: () => alert('Módulo de Relatórios Fiscais e Conciliação baixado com sucesso.')
    },
    {
      icon: 'support_agent',
      title: 'Plantão PortHub 24/7',
      desc: 'Canal de emergência e apoio à navegação',
      action: onCallDutyDesk
    },
    {
      icon: 'account_circle',
      title: 'Perfil & Dados da Empresa',
      desc: 'Transmar Navegação S/A • Santos (SP)',
      action: onOpenProfile
    },
    {
      icon: 'security',
      title: 'Compliance & Normas Portuárias',
      desc: 'Regulamentos ANTAQ, MAPA, ANVISA e Marinha',
      action: () => alert('Certificados e normas de conformidade marítima atualizados.')
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-4 space-y-4 pb-24">
      <div className="pt-1">
        <h1 className="text-[22px] sm:text-[26px] font-bold text-[#0b1c30] tracking-tight">
          Mais Opções
        </h1>
        <p className="text-[12px] text-[#45464d]">
          Configurações, fornecedores e suporte operacional
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {menuOptions.map((opt) => (
          <button
            key={opt.title}
            onClick={opt.action}
            className="p-4 bg-white rounded-xl border border-[#e5eeff] shadow-sm hover:border-[#cce5ff] hover:bg-[#eff4ff]/40 transition-all flex items-center justify-between text-left cursor-pointer"
            type="button"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e5eeff] text-[#006398] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">{opt.icon}</span>
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#0b1c30]">{opt.title}</h3>
                <p className="text-[12px] text-[#45464d]">{opt.desc}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px] text-[#45464d]">
              chevron_right
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
