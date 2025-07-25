"use client";

import { useRouter } from "next/navigation";
import { LogOut, Home, FileText, UserPlus } from "lucide-react";
import { useAuth } from "@/context/AutoContext";

export default function SecretarioMenu() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="h-auto w-90 bg-blue-600  shadow-g overflow-hidden">
      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold text-white mb-10 px-5">Menu do Secretário</h2>

        <button
          onClick={() => router.push("/secretario/ex-alunos")}
          className="flex items-center gap-3 w-full px-3 py-4 text-sm font-medium text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          <Home size={25} className="text-blue-100" />
          Tela Inicial
        </button>

        <button
          onClick={() => router.push("/secretario/ex-alunos/novoAluno")}
          className="flex items-center gap-3 w-full px-3 py-4 text-sm font-medium text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          <UserPlus size={25} className="text-blue-100" />
          Cadastrar Aluno
        </button>

        <button
          onClick={() => router.push("/secretario/ex-alunos")}
          className="flex items-center gap-3 w-full px-3 py-4 text-sm font-medium text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          <FileText size={25} className="text-blue-100" />
          Consultar Ex-Alunos
        </button>
      </div>

      <div className="p-5 border-t border-blue-500">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-white rounded-lg hover:bg-red-500 bg-red-600 transition-colors"
        >
          <LogOut size={40} />
          Sair do Sistema
        </button>
      </div>
    </div>
  );
}