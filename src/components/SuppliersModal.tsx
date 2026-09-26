import React, { useState } from 'react';
import { INITIAL_SUPPLIERS } from '../data/maritimeData';

interface SuppliersModalProps {
  onClose: () => void;
}

export const SuppliersModal: React.FC<SuppliersModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');

  const suppliers = INITIAL_SUPPLIERS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.portBase.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#f8f9ff] w-full max-w-xl rounded-2xl shadow-2xl border border-[#cce5ff] overflow-hidden my-6">
        <div className="p-4 bg-white border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#006398] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">domain_verification</span>
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#0b1c30]">
                Fornecedores Homologados
              </h2>
              <p className="text-[11px] text-[#45464d]">
                Empresas certificadas com conformidade ativa em Santos e portos base
              </p>
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

        <div className="p-4 bg-white border-b border-[#e5eeff]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#45464d]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por nome, especialidade ou porto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#eff4ff] text-[13px] text-[#0b1c30] focus:ring-2 focus:ring-[#006398] focus:bg-white"
            />
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          {suppliers.map((s) => (
            <div
              key={s.id}
              className="p-3.5 bg-white rounded-xl border border-[#e5eeff] shadow-sm hover:border-[#cce5ff] transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[14px] font-bold text-[#0b1c30]">{s.name}</h3>
                    {s.verified && (
                      <span className="material-symbols-outlined text-[16px] text-[#006398]">
                        verified
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-[#006398] block">
                    {s.category} • Base: {s.portBase}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[12px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  {s.rating}
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {s.certifications.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] bg-[#eff4ff] text-[#45464d] px-2 py-0.5 rounded font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-[#e5eeff] flex items-center justify-between text-[11px] text-[#45464d]">
                <span>{s.completedJobs} operações concluídas</span>
                <span className="font-semibold text-[#006398]">{s.contactPhone}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-white border-t border-[#e5eeff] text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#eff4ff] text-[#0b1c30] text-[12px] font-semibold rounded-lg hover:bg-[#e5eeff] cursor-pointer"
            type="button"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
