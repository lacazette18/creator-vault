"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const platforms = [
  { id: "onlyfans", name: "OnlyFans", color: "#00AFFE" },
  { id: "fansly", name: "Fansly", color: "#FF6B6B" },
  { id: "chaturbate", name: "Chaturbate", color: "#7C3AED" },
  { id: "manyvids", name: "ManyVids", color: "#F59E0B" },
  { id: "custom", name: "Autre", color: "#6B7280" },
];

export default function RevenueInput() {
  const { user } = useAuth();
  const [platform, setPlatform] = useState("onlyfans");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/revenues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform,
          amount: parseFloat(amount),
          note,
          userId: user.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add revenue");
      }

      setSuccess(true);
      setAmount("");
      setNote("");
      
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Ajouter un revenu
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Plateforme</label>
          <div className="grid grid-cols-3 gap-2">
            {platforms.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  platform === p.id
                    ? "bg-primary text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Montant ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Note (optionnel)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ex: Tip exceptionnel, mois record..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Ajout en cours...
            </>
          ) : success ? (
            "✓ Ajouté !"
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Ajouter le revenu
            </>
          )}
        </button>
      </form>
    </div>
  );
}
