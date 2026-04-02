"use client";

import { useState } from "react";
import { FileText, Download, Loader2, Calendar } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function ExportTax() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const handleExport = async () => {
    if (!user) return;
    
    setLoading(true);

    try {
      // Fetch les revenus pour l'année sélectionnée
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      
      const response = await fetch(
        `/api/revenues?userId=${user.id}&startDate=${startDate}&endDate=${endDate}`
      );
      const result = await response.json();

      if (!result.success) {
        throw new Error("Failed to fetch revenues");
      }

      const revenues = result.data || [];

      // Générer le PDF
      const doc = generatePDF(revenues, year);
      
      // Télécharger
      doc.save(`CreatorVault_Declaration_${year}.pdf`);
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Erreur lors de l'export");
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (revenues: any[], year: string) => {
    // Simple text-based PDF generation
    // Pour un vrai PDF, utiliser jspdf ou pdfmake
    const total = revenues.reduce((sum, r) => sum + Number(r.amount), 0);
    
    // Grouper par plateforme
    const byPlatform = revenues.reduce((acc: Record<string, number>, r) => {
      acc[r.platform] = (acc[r.platform] || 0) + Number(r.amount);
      return acc;
    }, {});

    let content = `
CREATORVAULT - DÉCLARATION DE REVENUS
=====================================
Année: ${year}
Date de génération: ${new Date().toLocaleDateString('fr-FR')}

RÉSUMÉ ANNUEL
-------------
Total des revenus: ${total.toFixed(2)} USD

PAR PLATEFORME
-------------
`;
    Object.entries(byPlatform).forEach(([platform, amount]) => {
      content += `${platform}: ${amount.toFixed(2)} USD\n`;
    });

    content += `
DÉTAIL DES REVENUS
------------------
Date        Plateforme    Montant    Note
`;
    revenues.forEach(r => {
      content += `${r.date}    ${r.platform}    ${Number(r.amount).toFixed(2)} USD    ${r.note || '-'}\n`;
    });

    // Download as text file ( workaround sans lib PDF )
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CreatorVault_Declaration_${year}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    return { save: () => {} };
  };

  if (!user) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Export pour les taxes
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Année</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary appearance-none"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const y = new Date().getFullYear() - i;
                return (
                  <option key={y} value={y} className="bg-secondary">
                    {y}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Exporter ma déclaration
            </>
          )}
        </button>

        <p className="text-gray-500 text-sm text-center">
          Format: TXT (convertissable en PDF)
        </p>
      </div>
    </div>
  );
}
