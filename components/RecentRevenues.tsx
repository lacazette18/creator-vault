"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Trash2, Edit2 } from "lucide-react";

interface Revenue {
  id: string;
  platform: string;
  amount: number;
  note: string | null;
  date: string;
  created_at: string;
}

interface RecentRevenuesProps {
  revenues: Revenue[];
}

const platformLabels: Record<string, string> = {
  onlyfans: "OnlyFans",
  fansly: "Fansly",
  chaturbate: "Chaturbate",
  manyvids: "ManyVids",
  custom: "Autre",
};

const platformColors: Record<string, string> = {
  onlyfans: "#00AFFE",
  fansly: "#FF6B6B",
  chaturbate: "#7C3AED",
  manyvids: "#F59E0B",
  custom: "#6B7280",
};

export default function RecentRevenues({ revenues }: RecentRevenuesProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Revenus récents</h2>

      {revenues.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          Aucun revenu enregistré. Ajoutez votre premier revenu !
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-400 font-medium pb-3">Date</th>
                <th className="text-left text-gray-400 font-medium pb-3">Plateforme</th>
                <th className="text-left text-gray-400 font-medium pb-3">Montant</th>
                <th className="text-left text-gray-400 font-medium pb-3">Note</th>
                <th className="text-right text-gray-400 font-medium pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {revenues.map((revenue) => (
                <tr key={revenue.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4 text-white">
                    {format(new Date(revenue.date), "dd MMM", { locale: fr })}
                  </td>
                  <td className="py-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm text-white"
                      style={{ backgroundColor: platformColors[revenue.platform] + "40" }}
                    >
                      {platformLabels[revenue.platform] || revenue.platform}
                    </span>
                  </td>
                  <td className="py-4 text-green-400 font-semibold">
                    ${revenue.amount.toFixed(2)}
                  </td>
                  <td className="py-4 text-gray-400">
                    {revenue.note || "—"}
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-gray-400 hover:text-white p-2">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-400 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
