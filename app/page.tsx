import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase-server";
import StatsCards from "@/components/StatsCards";
import RevenueInput from "@/components/RevenueInput";
import RevenueChart from "@/components/RevenueChart";
import RecentRevenues from "@/components/RecentRevenues";
import ExportTax from "@/components/ExportTax";

export default async function Home() {
  const supabase = createServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch les revenus
  const { data: revenues } = await supabase
    .from("revenues")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(10);

  // Calculer les stats
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const startOfYesterday = new Date(now);
  startOfYesterday.setDate(now.getDate() - 1);

  const monthlyRevenues = revenues?.filter(r => new Date(r.date) >= startOfMonth) || [];
  const weeklyRevenues = revenues?.filter(r => new Date(r.date) >= startOfWeek) || [];
  const yesterdayRevenues = revenues?.filter(r => {
    const d = new Date(r.date);
    return d >= startOfYesterday && d < now;
  }) || [];

  const monthlyTotal = monthlyRevenues.reduce((sum, r) => sum + Number(r.amount), 0);
  const weeklyTotal = weeklyRevenues.reduce((sum, r) => sum + Number(r.amount), 0);
  const yesterdayTotal = yesterdayRevenues.reduce((sum, r) => sum + Number(r.amount), 0);

  // Calculer les données pour le graphique (par jour)
  const chartDataMap = new Map<string, number>();
  revenues?.forEach(r => {
    const day = new Date(r.date).getDate().toString();
    const current = chartDataMap.get(day) || 0;
    chartDataMap.set(day, current + Number(r.amount));
  });

  const chartData = Array.from(chartDataMap.entries())
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => parseInt(a.date) - parseInt(b.date));

  // Calculer la moyenne quotidienne (30 derniers jours)
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const last30Days = revenues?.filter(r => new Date(r.date) >= thirtyDaysAgo) || [];
  const avgDaily = last30Days.length > 0 
    ? last30Days.reduce((sum, r) => sum + Number(r.amount), 0) / 30 
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Suivez vos revenus de créateur</p>
      </div>

      <StatsCards 
        data={{
          monthlyTotal,
          yesterday: yesterdayTotal,
          weeklyTotal,
          avgDaily,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueInput userId={user.id} />
        <RevenueChart data={chartData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentRevenues revenues={revenues || []} />
        <ExportTax />
      </div>
    </div>
  );
}
