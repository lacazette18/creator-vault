"use client";

import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface StatsCardsProps {
  data?: {
    monthlyTotal: number;
    yesterday: number;
    weeklyTotal: number;
    avgDaily: number;
  };
}

export default function StatsCards({ data }: StatsCardsProps) {
  const stats = data ? [
    {
      title: "Revenus ce mois",
      value: data.monthlyTotal,
      change: 0,
      icon: DollarSign,
      period: "ce mois",
    },
    {
      title: "Hier",
      value: data.yesterday,
      change: 0,
      icon: Calendar,
      period: "hier",
    },
    {
      title: "Cette semaine",
      value: data.weeklyTotal,
      change: 0,
      icon: TrendingUp,
      period: "cette semaine",
    },
    {
      title: "Moyenne quotidienne",
      value: data.avgDaily,
      change: 0,
      icon: TrendingDown,
      period: "30 derniers jours",
    },
  ] : [
    {
      title: "Revenus ce mois",
      value: 0,
      change: 0,
      icon: DollarSign,
      period: "En attente de données",
    },
    {
      title: "Hier",
      value: 0,
      change: 0,
      icon: Calendar,
      period: "En attente de données",
    },
    {
      title: "Cette semaine",
      value: 0,
      change: 0,
      icon: TrendingUp,
      period: "En attente de données",
    },
    {
      title: "Moyenne quotidienne",
      value: 0,
      change: 0,
      icon: TrendingDown,
      period: "En attente de données",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change >= 0;

        return (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">{stat.title}</span>
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(stat.value)}
            </div>
            <div className="text-sm text-gray-500">
              {stat.period}
            </div>
          </div>
        );
      })}
    </div>
  );
}
