"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { Home, DollarSign, TrendingUp, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <aside className={cn("w-64 min-h-screen bg-secondary/30 border-r border-white/10 p-4 fixed left-0 top-0", className)}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <DollarSign className="w-8 h-8" />
          CreatorVault
        </h1>
      </div>

      <nav className="space-y-2">
        <a
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/20 text-white hover:bg-primary/30 transition-colors"
        >
          <Home className="w-5 h-5" />
          Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <TrendingUp className="w-5 h-5" />
          Revenus
        </a>
        <a
          href="/pricing"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          Abonnement
        </a>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        {user && (
          <div className="text-gray-400 text-sm mb-2 px-4 truncate">
            {user.email}
          </div>
        )}
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
