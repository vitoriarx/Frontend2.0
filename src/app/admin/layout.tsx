"use client";

import { useRouter } from "next/navigation";
import { LogOut, UserPlus, Home, FileText } from "lucide-react";
import { useAuth } from "@/context/AutoContext"; // <-- Aqui importa seu contexto

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { logout } = useAuth(); // <-- usa o logout do contexto

  // Funções auxiliares de navegação
  const handleNavigation = (path: string) => router.push(path);

  return (
    <div className="flex h-screen">
      {/* Menu lateral */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6">
        {/* Cabeçalho do menu */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Painel do Administrador</h2>

          <button
            onClick={() => handleNavigation("/admin/secretarios")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-gray-700"
          >
            <Home size={18} />
            Tela Inicial
          </button>

          <button
            onClick={() => handleNavigation("/admin/secretarios/novoSecretario")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-gray-700"
          >
            <UserPlus size={18} />
            Cadastrar Secretários
          </button>

          <button
            onClick={() => handleNavigation("/admin/historico-consultas")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-gray-700"
          >
            <FileText size={18} />
            Ver Histórico de Consultas
          </button>
        </div>

        <div>
          <button
            onClick={logout} // <-- logout do contexto
            className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-red-600 bg-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
}
