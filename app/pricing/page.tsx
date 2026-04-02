"use client";

import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    id: "free",
    features: [
      { text: "1 plateforme", included: true },
      { text: "30 jours d'historique", included: true },
      { text: "Tableau de bord basique", included: true },
      { text: "Multi-plateformes", included: false },
      { text: "Historique illimité", included: false },
      { text: "Export taxes PDF", included: false },
      { text: "Support prioritaire", included: false },
    ],
  },
  {
    name: "Pro",
    price: 9,
    id: "pro",
    popular: true,
    features: [
      { text: "Multi-plateformes", included: true },
      { text: "Historique illimité", included: true },
      { text: "Tableau de bord avancé", included: true },
      { text: "Export taxes PDF", included: true },
      { text: "Alertes objectifs", included: true },
      { text: "Support prioritaire", included: false },
    ],
  },
  {
    name: "Premium",
    price: 19,
    id: "premium",
    features: [
      { text: "Tout de Pro", included: true },
      { text: "Support prioritaire", included: true },
      { text: "API access", included: true },
      { text: "White-label", included: true },
      { text: "Team members (3)", included: true },
    ],
  },
];

export default function PricingPage() {
  const handleSubscribe = async (planId: string) => {
    if (planId === "free") return;

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const result = await response.json();
      
      if (result.url) {
        window.location.href = result.url;
      } else {
        alert(result.error || "Erreur lors de la création du checkout");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Une erreur est survenue");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-gray-400">
            Commencez gratuitement, passez à Pro quand vous êtes prêt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white/5 border rounded-2xl p-8 ${
                plan.popular
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-white/10"
              }`}
            >
              {plan.popular && (
                <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Populaire
                </span>
              )}
              
              <h3 className="text-2xl font-bold text-white mt-4">{plan.name}</h3>
              
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-white">
                  ${plan.price}
                </span>
                <span className="text-gray-400">/mois</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500" />
                    )}
                    <span className={feature.included ? "text-white" : "text-gray-500"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={plan.id === "free"}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.id === "free"
                    ? "bg-white/10 text-gray-500 cursor-not-allowed"
                    : plan.popular
                    ? "bg-primary hover:bg-primary/80 text-white"
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                {plan.id === "free" ? "Gratuit" : `S'abonner à $${plan.price}/mois`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
