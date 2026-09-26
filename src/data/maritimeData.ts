import { MaritimeRequest, ServiceCategory, ActivityItem, Supplier } from '../types/maritime';

export const PORTHUB_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1WtQr01sWKN2B9MNNNKvgjQDkHO4BF6Ctmg-owv9J7l0dhnJQk2hnimcoT1g9_htkHNfIUPxz9USEcVBPOYsCahr-DQTIpyv2sVyZQI8A7KovM67MT7s_rbpETnaKoGx85BBA6GXMkzbYfJSSppmZi1Ak8mopMet4bw9oTIjEK3z2OkPSSkwai9Eh3YwYdTaIF-ohQdzjH1AzVGui0st68G_iEhsg-UZf1uvAGrR-AFuSZg1Lc0DNZ1eXc';
export const USER_AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1hrFYPDZahNSqGHDyMI1EmS5o8_8_dIt9ra-oxY0sAaPVRQ_DZhSMyS1db1hwswgpKEje6An4QFTjZAalzkZ7Gomsy4-FfPHxk18h-v0reQh8wBL9HmfYq19JwVMrkLNin-NZnBNm3ByuN6dc_Te33wav60L8Nn4tpsD9KYjlHRBph4DHA7zTPyob-hVfn4dF9YV4MzTiEAbTw41lJLX3U1vEy8QN4SfSZHIwkHMHWSRf1AcFxh9N';

export const INITIAL_SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: 'Operações e carga',
    icon: 'conveyor_belt',
    countText: '6 itens',
    description: 'Fumigação, amostragem, peação e perícias de porão',
    items: [
      {
        id: 'srv-op-1',
        code: 'SRV-OP-01',
        category: 'Operações e carga',
        title: 'Fumigação de Carga',
        subtitle: 'Tratamento fitossanitário em grãos e granéis agrícolas',
        tag: 'MAPA',
        icon: 'pest_control',
        estimatedLeadTime: '12 a 24 horas',
        averageCost: 'R$ 16.000 - R$ 22.000'
      },
      {
        id: 'srv-op-2',
        code: 'SRV-OP-02',
        category: 'Operações e carga',
        title: 'Inspeção de carga',
        subtitle: 'Vistoria física pré-embarque e conferência de integridade',
        icon: 'search_check',
        estimatedLeadTime: '6 a 12 horas',
        averageCost: 'R$ 6.500 - R$ 9.800'
      },
      {
        id: 'srv-op-3',
        code: 'SRV-OP-03',
        category: 'Operações e carga',
        title: 'Survey (Draft & Peritagem)',
        subtitle: 'Cálculo metrológico de calado e mensuração de peso',
        icon: 'calculate',
        estimatedLeadTime: '4 a 8 horas',
        averageCost: 'R$ 7.200 - R$ 11.500'
      },
      {
        id: 'srv-op-4',
        code: 'SRV-OP-04',
        category: 'Operações e carga',
        title: 'Amostragem',
        subtitle: 'Coleta estéril com retenção de contra-prova e laudo',
        icon: 'science',
        estimatedLeadTime: '8 horas',
        averageCost: 'R$ 4.500 - R$ 6.800'
      },
      {
        id: 'srv-op-5',
        code: 'SRV-OP-05',
        category: 'Operações e carga',
        title: 'Limpeza de porão',
        subtitle: 'Lavagem de alta pressão com certificado de prontidão',
        icon: 'cleaning_services',
        estimatedLeadTime: '18 a 36 horas',
        averageCost: 'R$ 14.000 - R$ 25.000'
      },
      {
        id: 'srv-op-6',
        code: 'SRV-OP-06',
        category: 'Operações e carga',
        title: 'Peação e despeação',
        subtitle: 'Amarração técnica de cargas pesadas e contêineres flat-rack',
        icon: 'lock',
        estimatedLeadTime: '8 a 16 horas',
        averageCost: 'R$ 9.000 - R$ 15.000'
      }
    ]
  },
  {
    name: 'Navio',
    icon: 'directions_boat',
    countText: '5 itens',
    description: 'Manutenção mecânica, mergulho e casco',
    items: [
      {
        id: 'srv-nv-1',
        code: 'SRV-NV-01',
        category: 'Navio',
        title: 'Manutenção mecânica e elétrica',
        subtitle: 'Motores auxiliares, bombas e geradores',
        icon: 'build',
        estimatedLeadTime: 'Conforme chamado',
        averageCost: 'Sob cotação'
      },
      {
        id: 'srv-nv-2',
        code: 'SRV-NV-02',
        category: 'Navio',
        title: 'Mergulho profissional',
        subtitle: 'Inspeção UWILD por CFTV e polimento de hélice',
        icon: 'scuba_diving',
        estimatedLeadTime: '12 a 24 horas',
        averageCost: 'R$ 18.000 - R$ 32.000'
      },
      {
        id: 'srv-nv-3',
        code: 'SRV-NV-03',
        category: 'Navio',
        title: 'Limpeza de casco',
        subtitle: 'Remoção de bioincrustações e medição antifouling',
        icon: 'water',
        estimatedLeadTime: '24 horas',
        averageCost: 'R$ 22.000 - R$ 40.000'
      },
      {
        id: 'srv-nv-4',
        code: 'SRV-NV-04',
        category: 'Navio',
        title: 'Pintura e jateamento',
        subtitle: 'Tratamento hidrojato e retoque de costado',
        icon: 'format_paint',
        estimatedLeadTime: '24 a 48 horas',
        averageCost: 'R$ 15.000 - R$ 35.000'
      }
    ]
  },
  {
    name: 'Suprimentos',
    icon: 'inventory_2',
    countText: '4 itens',
    description: 'Água potável, provisões de bordo e lubrificantes',
    items: [
      {
        id: 'srv-sup-1',
        code: 'SRV-SUP-01',
        category: 'Suprimentos',
        title: 'Água potável (Barge ou Cais)',
        subtitle: 'Abastecimento volumétrico certificado pela ANVISA',
        icon: 'water_drop',
        estimatedLeadTime: '6 horas',
        averageCost: 'R$ 8.000 - R$ 16.000'
      },
      {
        id: 'srv-sup-2',
        code: 'SRV-SUP-02',
        category: 'Suprimentos',
        title: 'Provisões de rancho',
        subtitle: 'Alimentos congelados, frescos e secos para rancho naval',
        icon: 'restaurant',
        estimatedLeadTime: '12 horas',
        averageCost: 'R$ 12.000 - R$ 30.000'
      },
      {
        id: 'srv-sup-3',
        code: 'SRV-SUP-03',
        category: 'Suprimentos',
        title: 'Lubrificantes e graxas',
        subtitle: 'Entregas em tambores ou caminhão-tanque',
        icon: 'oil_barrel',
        estimatedLeadTime: '24 horas',
        averageCost: 'Sob demanda'
      }
    ]
  },
  {
    name: 'Tripulação',
    icon: 'groups',
    countText: '4 itens',
    description: 'Crew change, traslado, vistos e hospedagem',
    items: [
      {
        id: 'srv-trp-1',
        code: 'SRV-TRP-01',
        category: 'Tripulação',
        title: 'Crew change completo',
        subtitle: 'Despacho de imigração na Polícia Federal e embarque/desembarque',
        icon: 'sync_alt',
        estimatedLeadTime: 'Turno imediato',
        averageCost: 'R$ 3.500 - R$ 6.000'
      },
      {
        id: 'srv-trp-2',
        code: 'SRV-TRP-02',
        category: 'Tripulação',
        title: 'Transporte aeroporto / porto',
        subtitle: 'Translados GRU/CGH até cais do Porto de Santos',
        icon: 'airport_shuttle',
        estimatedLeadTime: 'Sob demanda',
        averageCost: 'R$ 1.800 - R$ 3.200'
      }
    ]
  },
  {
    name: 'Ambiental',
    icon: 'eco',
    countText: '4 itens',
    description: 'Marpol, sludge, água oleosa e lixo',
    items: [
      {
        id: 'srv-amb-1',
        code: 'SRV-AMB-01',
        category: 'Ambiental',
        title: 'Sludge e efluentes oleosos (Anexo I)',
        subtitle: 'Retirada por barcaça com manifesto e certificado Marpol',
        icon: 'delete_sweep',
        estimatedLeadTime: '12 horas',
        averageCost: 'R$ 15.000 - R$ 28.000'
      }
    ]
  },
  {
    name: 'Logística Portuária',
    icon: 'local_shipping',
    countText: '4 itens',
    description: 'Armazenagem retroportuária e guindastes',
    items: [
      {
        id: 'srv-log-1',
        code: 'SRV-LOG-01',
        category: 'Logística Portuária',
        title: 'Locação de guindaste móvel',
        subtitle: 'Içamentos especiais no cais e balsa de suporte',
        icon: 'precision_manufacturing',
        estimatedLeadTime: 'Conforme escala',
        averageCost: 'R$ 18.000 - R$ 45.000'
      }
    ]
  },
  {
    name: 'Inspeção e certificação',
    icon: 'verified',
    countText: '4 itens',
    description: 'Certificados estatutários e laudos periciais',
    items: [
      {
        id: 'srv-cert-1',
        code: 'SRV-CERT-01',
        category: 'Inspeção e certificação',
        title: 'Auditoria de Sociedade Classificadora',
        subtitle: 'Acompanhamento de vistorias DNV, ABS, Lloyd\'s e Bureau Veritas',
        icon: 'fact_check',
        estimatedLeadTime: 'Agendamento prévio',
        averageCost: 'R$ 9.000 - R$ 16.000'
      }
    ]
  }
];

export const INITIAL_REQUESTS: MaritimeRequest[] = [
  {
    id: 'req-1',
    code: 'REQ-2024-884',
    category: 'Operações • Carga',
    title: 'Fumigação de Carga',
    vesselName: 'MV Ocean Star',
    berth: 'Santos • Term. XXX',
    port: 'Santos (SP)',
    volumeOrScope: '65.000 MT Soja',
    window: '10–12 Out',
    status: 'Recebendo propostas',
    proposalsCount: 4,
    lowestAmount: 17900.00,
    expiresIn: 'Expira em 6h',
    urgency: 'Crítico',
    createdAt: '2024-10-09 14:20',
    proposals: [
      {
        id: 'prop-1',
        supplierId: 'sup-1',
        supplierName: 'AgroPort Vet Fumigações',
        supplierRating: 4.9,
        isHomologated: true,
        amount: 17900.00,
        currency: 'BRL',
        validity: '48h',
        paymentTerms: '30 dias faturado',
        sla: 'Janela de 14h com emissão do Certificado MAPA em 2h',
        insuranceIncluded: true,
        notes: 'Incluso equipe especializada de 6 técnicos certificados, dosagem fosfina conforme Portaria MAPA 384.',
        submittedAt: 'Há 18 min'
      },
      {
        id: 'prop-2',
        supplierId: 'sup-2',
        supplierName: 'Ocean Fumigation & Marine Care',
        supplierRating: 4.8,
        isHomologated: true,
        amount: 18500.00,
        currency: 'BRL',
        validity: '48h',
        paymentTerms: '28 dias faturado',
        sla: 'Janela de 12h com monitoramento de recirculação automática J-System',
        insuranceIncluded: true,
        notes: 'Seguro de responsabilidade civil P&I incluso de até USD 2M.',
        submittedAt: 'Há 12 min'
      },
      {
        id: 'prop-3',
        supplierId: 'sup-3',
        supplierName: 'SafeGrain Marítima Santos',
        supplierRating: 4.7,
        isHomologated: true,
        amount: 18100.00,
        currency: 'BRL',
        validity: '24h',
        paymentTerms: '15 dias',
        sla: 'Janela de 16h com laudo digital assinado via ICP-Brasil',
        insuranceIncluded: true,
        notes: 'Equipamento de recirculação próprio já mobilizado na Ponta da Praia.',
        submittedAt: 'Há 1h'
      },
      {
        id: 'prop-4',
        supplierId: 'sup-4',
        supplierName: 'BioControl Santos Port Services',
        supplierRating: 4.6,
        isHomologated: true,
        amount: 19200.00,
        currency: 'BRL',
        validity: '72h',
        paymentTerms: '45 dias faturado',
        sla: 'Janela de 18h com assistência técnica no destino de descarga (China)',
        insuranceIncluded: true,
        notes: 'Emissão de dossiê bilíngue (EN/PT) com fotos de cada porão antes e após selagem.',
        submittedAt: 'Há 3h'
      }
    ]
  },
  {
    id: 'req-2',
    code: 'REQ-2024-881',
    category: 'Inspeção • Certificação',
    title: 'Inspeção e Survey de Carga',
    vesselName: 'MV Atlantic',
    berth: 'Paranaguá • Berço 204',
    port: 'Paranaguá (PR)',
    volumeOrScope: 'Açúcar Granel',
    window: '15 Out • 14:00',
    status: 'Aberta',
    proposalsCount: 2,
    lowestAmount: 8400.00,
    expiresIn: 'Aguardando mais 1',
    urgency: 'Normal',
    createdAt: '2024-10-09 10:15',
    proposals: [
      {
        id: 'prop-201',
        supplierId: 'sup-5',
        supplierName: 'Marine Survey Paranaguá',
        supplierRating: 4.8,
        isHomologated: true,
        amount: 8400.00,
        currency: 'BRL',
        validity: '3 dias',
        paymentTerms: '45 dias faturados',
        sla: 'Peritagem contínua durante carregamento + Draft survey final',
        insuranceIncluded: true,
        notes: 'Condição ajustada para 45 dias faturados conforme solicitação da agência.',
        submittedAt: 'Há 2 horas'
      },
      {
        id: 'prop-202',
        supplierId: 'sup-6',
        supplierName: 'SGS South America Maritime',
        supplierRating: 4.9,
        isHomologated: true,
        amount: 9800.00,
        currency: 'BRL',
        validity: '5 dias',
        paymentTerms: '30 dias',
        sla: 'Emissão do Certificate of Weight and Quality',
        insuranceIncluded: true,
        notes: 'Auditores credenciados GAFTA e FOSFA em prontidão.',
        submittedAt: 'Há 4 horas'
      }
    ]
  },
  {
    id: 'req-3',
    code: 'ORD-2024-762',
    category: 'Navio • Manutenção',
    title: 'Limpeza de Casco & Mergulho',
    vesselName: 'MV Polaris Leader',
    berth: 'Rio de Janeiro • Fundeio',
    port: 'Rio de Janeiro (RJ)',
    volumeOrScope: 'Área molhada ~4.200 m²',
    window: '08 Out • 06:00',
    status: 'Contratada',
    proposalsCount: 3,
    assignedSupplier: 'SubSea Rio Mergulho',
    allocatedTeam: 'Equipe alocada (5 merg.)',
    scheduledFor: '08 Out • 06:00',
    lowestAmount: 26500.00,
    urgency: 'Normal',
    createdAt: '2024-10-07 09:00'
  },
  {
    id: 'req-4',
    code: 'REQ-2024-878',
    category: 'Suprimentos • Bunkering',
    title: 'Fornecimento de Água Potável',
    vesselName: 'MV Santos Trader',
    berth: 'Santos • Terminal 1',
    port: 'Santos (SP)',
    volumeOrScope: '450 Toneladas Métricas',
    window: '11 Out • 10:00',
    status: 'Recebendo propostas',
    proposalsCount: 3,
    lowestAmount: 11200.00,
    expiresIn: 'Expira em 18h',
    urgency: 'Normal',
    createdAt: '2024-10-08 17:30'
  },
  {
    id: 'req-5',
    code: 'ORD-2024-755',
    category: 'Tripulação • Crew Change',
    title: 'Desembarque e Translado de 4 Oficiais',
    vesselName: 'MV Nordic Brasil',
    berth: 'Santos • Cais Público 33',
    port: 'Santos (SP)',
    volumeOrScope: '4 Tripulantes + Imigração PF',
    window: '09 Out • 20:00',
    status: 'Em execução',
    proposalsCount: 2,
    assignedSupplier: 'PortCrew Express Logística',
    allocatedTeam: 'Van blindada executiva + Despachante',
    scheduledFor: 'Hoje • 20:00',
    lowestAmount: 4200.00,
    urgency: 'Normal',
    createdAt: '2024-10-08 11:00'
  },
  {
    id: 'req-6',
    code: 'REQ-2024-870',
    category: 'Ambiental • Marpol',
    title: 'Descarte de Sludge & Água Oleosa',
    vesselName: 'MV Cape Horizon',
    berth: 'Itajaí • Berço 2',
    port: 'Itajaí (SC)',
    volumeOrScope: '35 m³ Sludge Anexo I',
    window: '14 Out • 08:00',
    status: 'Aberta',
    proposalsCount: 1,
    lowestAmount: 16800.00,
    expiresIn: 'Aguardando mais 2',
    urgency: 'Normal',
    createdAt: '2024-10-07 16:45'
  },
  {
    id: 'req-7',
    code: 'ORD-2024-749',
    category: 'Logística • Içamento',
    title: 'Locação Guindaste 120t para Peça Sobressalente',
    vesselName: 'MV Mediterranean Dream',
    berth: 'Santos • BTP Cais Leste',
    port: 'Santos (SP)',
    volumeOrScope: 'Rotor do turbo de 14 toneladas',
    window: '06 Out • Concluído',
    status: 'Concluída',
    proposalsCount: 4,
    assignedSupplier: 'Santos Heavy Lift & Guindastes',
    allocatedTeam: 'Liebherr LTM 1120',
    lowestAmount: 31000.00,
    urgency: 'Normal',
    createdAt: '2024-10-05 08:30'
  },
  {
    id: 'req-8',
    code: 'REQ-2024-865',
    category: 'Operações • Amostragem',
    title: 'Amostragem e Retenção de Contra-prova Grãos',
    vesselName: 'MV Stellar Navigator',
    berth: 'Santos • Terminal TGG',
    port: 'Santos (SP)',
    volumeOrScope: '50.000 MT Milho Amarelo',
    window: '16–18 Out',
    status: 'Recebendo propostas',
    proposalsCount: 3,
    lowestAmount: 5900.00,
    expiresIn: 'Expira em 2 dias',
    urgency: 'Normal',
    createdAt: '2024-10-06 14:10'
  }
];

export const INITIAL_ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'proposal',
    title: 'Ocean Fumigation enviou proposta',
    subtitle: 'MV Ocean Star • R$ 18.500,00',
    extra: 'Validade de 48h • Seguro incluso',
    timeAgo: 'Há 12 min',
    icon: 'payments'
  },
  {
    id: 'act-2',
    type: 'question',
    title: 'Nova dúvida na solicitação #1024',
    subtitle: '“DiverSul perguntou sobre calado máximo no berço”',
    extra: 'Responder fornecedor →',
    timeAgo: 'Há 45 min',
    icon: 'chat',
    actionText: 'Responder fornecedor →'
  },
  {
    id: 'act-3',
    type: 'proposal_update',
    title: 'Marine Survey atualizou proposta',
    subtitle: 'Condição de pagamento ajustada para 45 dias faturados',
    extra: 'REQ-2024-881 • Paranaguá',
    timeAgo: 'Há 2 horas',
    icon: 'edit_note'
  },
  {
    id: 'act-4',
    type: 'report',
    title: 'Relatório de atracação anexado',
    subtitle: 'MV Santos Trader • Terminal 1 concluído com êxito',
    extra: 'Laudo assinado digitalmente',
    timeAgo: 'Ontem, 18:30',
    icon: 'assignment_turned_in'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'AgroPort Vet Fumigações',
    category: 'Fumigação & Fitossanitário',
    rating: 4.9,
    completedJobs: 142,
    portBase: 'Santos, Paranaguá, Rio Grande',
    certifications: ['MAPA Credenciado', 'ISO 9001', 'CRQ IV'],
    contactPhone: '(13) 3224-8800',
    contactEmail: 'operacoes@agroportvet.com.br',
    verified: true
  },
  {
    id: 'sup-2',
    name: 'Ocean Fumigation & Marine Care',
    category: 'Fumigação & Fitossanitário',
    rating: 4.8,
    completedJobs: 98,
    portBase: 'Santos (SP)',
    certifications: ['MAPA', 'J-System Certified', 'P&I Approved'],
    contactPhone: '(13) 3345-1290',
    contactEmail: 'rfq@oceanfumigation.com',
    verified: true
  },
  {
    id: 'sup-3',
    name: 'SubSea Rio Mergulho & Engenharia',
    category: 'Mergulho & Casco',
    rating: 4.9,
    completedJobs: 215,
    portBase: 'Rio de Janeiro, Santos, Vitória',
    certifications: ['Marinha do Brasil - DPC', 'DNV UWILD', 'ABS Approved'],
    contactPhone: '(21) 2534-7700',
    contactEmail: 'plantao@subseario.com.br',
    verified: true
  },
  {
    id: 'sup-4',
    name: 'Marine Survey Paranaguá & Santos',
    category: 'Survey & Peritagens',
    rating: 4.8,
    completedJobs: 180,
    portBase: 'Paranaguá, Santos, São Francisco do Sul',
    certifications: ['GAFTA', 'FOSFA', 'IFIA'],
    contactPhone: '(41) 3422-9910',
    contactEmail: 'survey@marinesurvey.com.br',
    verified: true
  },
  {
    id: 'sup-5',
    name: 'SGS South America Maritime',
    category: 'Inspeção & Certificação',
    rating: 4.9,
    completedJobs: 540,
    portBase: 'Nacional (Todos os Portos)',
    certifications: ['ISO 17025', 'GAFTA', 'FOSFA', 'MAPA'],
    contactPhone: '(13) 3878-4000',
    contactEmail: 'maritime.brasil@sgs.com',
    verified: true
  }
];
