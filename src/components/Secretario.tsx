"use client";

import { useRouter } from "next/navigation";
import { LogOut, Home, FileText, UserPlus } from "lucide-react";
import { useAuth } from "@/context/AutoContext";

export default function SecretarioMenu() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Painel do Secretário</h2>

        <button
          onClick={() => router.push("/secretario/ex-alunos")}
          className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-gray-700"
        >
          <Home size={18} />
          Tela Inicial
        </button>

        <button
          onClick={() => router.push("/secretario/ex-alunos/novoAluno")}
          className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-gray-700"
        >
          <UserPlus size={18} />
          Cadastrar Aluno
        </button>

        <button
          onClick={() => router.push("/secretario/ex-alunos")}
          className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-gray-700"
        >
          <FileText size={18} />
          Consultar Ex-Alunos
        </button>
      </div>

      <div className="p-6">
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-red-600 bg-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
