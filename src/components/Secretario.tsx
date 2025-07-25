"use client";

import { useRouter } from "next/navigation";
import { LogOut, Home, FileText, UserPlus } from "lucide-react";
import { useAuth } from "@/context/AutoContext";

export default function SecretarioMenu() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
   <div className="h-screen w-95 bg-blue-800 text-white flex flex-col justify-between">
      <div className="p-6 space-y-4">
        <h2 className="text-[30px] font-bold mb-6" >Menu do Secretário</h2>

        <button
          onClick={() => router.push("/secretario/ex-alunos")}
          className="flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-blue-700 transition-colors text-xl"
        >
          <Home size={18} />
          Tela Inicial
        </button>

        <button
          onClick={() => router.push("/secretario/ex-alunos/novoAluno")}
          className="flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-blue-700 transition-colors text-xl"
        >
          <UserPlus size={18}  />
          Cadastrar Aluno
        </button>

        <button
          onClick={() => router.push("/secretario/ex-alunos")}
          className="flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-blue-700 transition-colors text-xl"
        >
          <FileText size={18} />
          Consultar Ex-Alunos
        </button>
      </div>

      <div className="p-8">
        <button
          onClick={logout}
          className="flex items-center gap-4 w-full px-6 py-4 rounded hover:bg-red-700 bg-red-600 text-xl"
        >
          <LogOut size={28} />
          Sair
        </button>
      </div>
    </div>
  );
}