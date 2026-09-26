export type RequestStatus = 'Recebendo propostas' | 'Aberta' | 'Em execução' | 'Contratada' | 'Concluída';

export interface ServiceItem {
  id: string;
  code: string;
  category: string;
  title: string;
  subtitle: string;
  tag?: string;
  icon: string;
  estimatedLeadTime?: string;
  averageCost?: string;
}

export interface ServiceCategory {
  name: string;
  icon: string;
  countText: string;
  description: string;
  items: ServiceItem[];
}

export interface Proposal {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierRating: number;
  isHomologated: boolean;
  amount: number;
  currency: string;
  validity: string;
  paymentTerms: string;
  sla: string;
  insuranceIncluded: boolean;
  notes: string;
  submittedAt: string;
}

export interface MaritimeRequest {
  id: string;
  code: string;
  category: string;
  title: string;
  vesselName: string;
  berth: string;
  port: string;
  volumeOrScope: string;
  window: string;
  status: RequestStatus;
  proposalsCount: number;
  lowestAmount?: number;
  expiresIn?: string;
  assignedSupplier?: string;
  allocatedTeam?: string;
  scheduledFor?: string;
  proposals?: Proposal[];
  urgency?: 'Normal' | 'Crítico';
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: 'proposal' | 'question' | 'proposal_update' | 'report';
  title: string;
  subtitle: string;
  extra?: string;
  timeAgo: string;
  icon: string;
  actionText?: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  rating: number;
  completedJobs: number;
  portBase: string;
  certifications: string[];
  contactPhone: string;
  contactEmail: string;
  verified: boolean;
}
