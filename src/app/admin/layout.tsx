"use client";

import { useRouter } from "next/navigation";
import { LogOut, UserPlus, Home, FileText } from "lucide-react";
import { useAuth } from "@/context/AutoContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleNavigation = (path: string) => router.push(path);

  return (
    <div className="flex min-h-screen">
      {/* Menu lateral */}
      <aside className="w-70  bg-blue-800 text-white flex flex-col justify-between p-6 shadow-xl">
        {/* Cabeçalho do menu */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-blue-700 pb-3">
            Painel Administrativo
          </h2>

          <button
            onClick={() => handleNavigation("/admin/secretarios")}
            className="flex items-center gap-3 w-full px-2 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            <Home size={20} />
            Tela Inicial
          </button>

          <button
            onClick={() => handleNavigation("/admin/secretarios/novoSecretario")}
            className="flex items-center gap-1 w-full px-2 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            <UserPlus size={20} />
            Cadastrar Secretários
          </button>

          <button
            onClick={() => handleNavigation("/admin/historico-consultas")}
            className="flex items-center gap-1 w-full px-2 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            <FileText size={20} />
            Histórico de Consultas
          </button>
        </div>

        <div>
          <button
            onClick={logout}
            className="flex items-center gap-1 w-full px-9 py-3 rounded-lg text-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-md transition duration-300 ease-in-out"
          >
            <LogOut size={30} />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 p-0 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}