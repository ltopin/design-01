import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { NewRequestWizard } from './components/NewRequestWizard';
import { ProposalsComparisonModal } from './components/ProposalsComparisonModal';
import { LiveOperationModal } from './components/LiveOperationModal';
import { RequestDetailsModal } from './components/RequestDetailsModal';
import { RequestsListView } from './components/RequestsListView';
import { ProposalsListView } from './components/ProposalsListView';
import { OperationsView } from './components/OperationsView';
import { MoreMenuModal } from './components/MoreMenuModal';
import { SuppliersModal } from './components/SuppliersModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ProfileModal } from './components/ProfileModal';
import { DialerModal } from './components/DialerModal';
import { INITIAL_REQUESTS, INITIAL_ACTIVITY_ITEMS } from './data/maritimeData';
import { MaritimeRequest, Proposal } from './types/maritime';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [activeScreen, setActiveScreen] = useState<'main' | 'new_request'>('main');
  const [requests, setRequests] = useState<MaritimeRequest[]>(INITIAL_REQUESTS);
  const [activityItems, setActivityItems] = useState(INITIAL_ACTIVITY_ITEMS);
  const [isDesktopFrame, setIsDesktopFrame] = useState(false);

  // Modals state
  const [comparisonReqId, setComparisonReqId] = useState<string | null>(null);
  const [liveOperationReq, setLiveOperationReq] = useState<MaritimeRequest | null>(null);
  const [detailsReq, setDetailsReq] = useState<MaritimeRequest | null>(null);
  const [isSuppliersModalOpen, setIsSuppliersModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDialerModalOpen, setIsDialerModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenNewRequest = () => {
    setActiveScreen('new_request');
  };

  const handleBackToDashboard = () => {
    setActiveScreen('main');
    setCurrentTab('dashboard');
  };

  const handleCreateRequest = (newReq: MaritimeRequest) => {
    setRequests((prev) => [newReq, ...prev]);
    // Also push to activity feed
    setActivityItems((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'proposal',
        title: `Nova solicitação publicada: ${newReq.code}`,
        subtitle: `${newReq.vesselName} • ${newReq.title}`,
        extra: 'Notificando fornecedores homologados da região',
        timeAgo: 'Agora',
        icon: 'broadcast_on_personal'
      },
      ...prev
    ]);
    setActiveScreen('main');
    setCurrentTab('dashboard');
    showToast(`Solicitação ${newReq.code} (${newReq.title}) criada com sucesso!`);
  };

  const handleAcceptProposal = (reqId: string, proposal: Proposal) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === reqId) {
          return {
            ...req,
            status: 'Contratada',
            assignedSupplier: proposal.supplierName,
            allocatedTeam: 'Equipe técnica alocada',
            scheduledFor: 'Janela confirmada'
          };
        }
        return req;
      })
    );

    setActivityItems((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'report',
        title: `Contrato firmado com ${proposal.supplierName}`,
        subtitle: `Ordem de serviço gerada para ${proposal.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
        extra: 'Termo assinado digitalmente',
        timeAgo: 'Agora',
        icon: 'task_alt'
      },
      ...prev
    ]);

    showToast(`Proposta de ${proposal.supplierName} aprovada! Status atualizado para Contratada.`);
  };

  const selectedComparisonRequest = requests.find((r) => r.id === comparisonReqId);

  return (
    <div className={`min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans transition-all ${
      isDesktopFrame ? 'max-w-md mx-auto my-3 border border-[#cce5ff] shadow-2xl rounded-3xl overflow-hidden' : ''
    }`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-[#006398] text-white px-4 py-2.5 rounded-xl shadow-lg text-[13px] font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen 2: Nova Solicitação Wizard */}
      {activeScreen === 'new_request' ? (
        <NewRequestWizard
          onBackToDashboard={handleBackToDashboard}
          onCreateRequest={handleCreateRequest}
        />
      ) : (
        /* Screen 1 & Main Tabs */
        <>
          <Header
            unreadCount={2}
            onOpenNotifications={() => setIsNotificationsModalOpen(true)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            isDesktopFrame={isDesktopFrame}
            onToggleDesktopFrame={() => setIsDesktopFrame((prev) => !prev)}
          />

          <main className="flex-1 pt-20 pb-20 w-full">
            {currentTab === 'dashboard' && (
              <DashboardView
                requests={requests}
                activityItems={activityItems}
                onOpenNewRequest={handleOpenNewRequest}
                onOpenCompareProposals={(reqId) => setComparisonReqId(reqId)}
                onOpenRequestDetails={(req) => setDetailsReq(req)}
                onOpenLiveOperation={(req) => setLiveOperationReq(req)}
                onOpenSuppliers={() => setIsSuppliersModalOpen(true)}
                onOpenPendingProposals={() => setCurrentTab('propostas')}
                onCallDutyDesk={() => setIsDialerModalOpen(true)}
              />
            )}

            {currentTab === 'solicitacoes' && (
              <RequestsListView
                requests={requests}
                onOpenNewRequest={handleOpenNewRequest}
                onOpenCompareProposals={(reqId) => setComparisonReqId(reqId)}
                onOpenLiveOperation={(req) => setLiveOperationReq(req)}
                onOpenDetails={(req) => setDetailsReq(req)}
              />
            )}

            {currentTab === 'propostas' && (
              <ProposalsListView
                requests={requests}
                onOpenCompareProposals={(reqId) => setComparisonReqId(reqId)}
              />
            )}

            {currentTab === 'operacoes' && (
              <OperationsView
                requests={requests}
                onOpenLiveOperation={(req) => setLiveOperationReq(req)}
              />
            )}

            {currentTab === 'mais' && (
              <MoreMenuModal
                onOpenSuppliers={() => setIsSuppliersModalOpen(true)}
                onOpenProfile={() => setIsProfileModalOpen(true)}
                onCallDutyDesk={() => setIsDialerModalOpen(true)}
                onSelectTab={setCurrentTab}
              />
            )}
          </main>

          <BottomNav
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            pendingProposalsCount={
              requests.filter((r) => r.status === 'Recebendo propostas').length
            }
          />
        </>
      )}

      {/* Global Modals */}
      {comparisonReqId && selectedComparisonRequest && (
        <ProposalsComparisonModal
          request={selectedComparisonRequest}
          onClose={() => setComparisonReqId(null)}
          onAcceptProposal={handleAcceptProposal}
        />
      )}

      {liveOperationReq && (
        <LiveOperationModal
          request={liveOperationReq}
          onClose={() => setLiveOperationReq(null)}
        />
      )}

      {detailsReq && (
        <RequestDetailsModal
          request={detailsReq}
          onClose={() => setDetailsReq(null)}
          onOpenCompare={
            detailsReq.proposals && detailsReq.proposals.length > 0
              ? () => setComparisonReqId(detailsReq.id)
              : undefined
          }
        />
      )}

      {isSuppliersModalOpen && (
        <SuppliersModal onClose={() => setIsSuppliersModalOpen(false)} />
      )}

      {isNotificationsModalOpen && (
        <NotificationsModal
          onClose={() => setIsNotificationsModalOpen(false)}
          onOpenCompare={() => setComparisonReqId('req-1')}
        />
      )}

      {isProfileModalOpen && (
        <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
      )}

      {isDialerModalOpen && (
        <DialerModal onClose={() => setIsDialerModalOpen(false)} />
      )}
    </div>
  );
}
