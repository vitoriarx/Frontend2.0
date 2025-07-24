"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface Aluno {
  id: string; 
  nome_completo: string;
  data_nascimento: string;
  cpf: string;
  box: string;
  nome_pai: string;
  nome_mae: string;
}

interface AlunoConsultaProps {
  titulo: string;
  alunos: Aluno[];
}

export default function AlunoConsulta({ titulo, alunos }: AlunoConsultaProps) {
  const router = useRouter();
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCpf, setFiltroCpf] = useState("");
  const [exibindoId, setExibindoId] = useState<string | null>(null);

  const handleVerFicha = (id: string) => {
    setExibindoId(id);
    toast.info("Consulta registrada.");
  };

  // Função para navegar para novo aluno
  const handleNovoAluno = () => {
    toast.info("Redirecionando para cadastro de novo aluno...");
    router.push("/secretario/ex-alunos/novoAluno"); // ou a rota que você usar
  };

  const alunosFiltrados = alunos.filter((aluno) => {
    const cpfMatch = filtroCpf
      ? aluno.cpf?.replace(/\D/g, "").includes(filtroCpf.replace(/\D/g, ""))
      : true;

    const nomeMatch = filtroNome
      ? aluno.nome_completo.toLowerCase().includes(filtroNome.toLowerCase().trim())
      : true;

    return cpfMatch && nomeMatch;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{titulo}</h1>
        
        {/* Botão Novo Aluno */}
        <button
          onClick={handleNovoAluno}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium"
        >
          + Novo Aluno
        </button>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Buscar por Nome</label>
          <input
            type="text"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            placeholder="Digite o nome completo"
            className="border p-2 w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Buscar por CPF</label>
          <input
            type="text"
            value={filtroCpf}
            onChange={(e) => setFiltroCpf(e.target.value)}
            placeholder="Digite o CPF (opcional)"
            className="border p-2 w-full"
          />
        </div>
      </div>

      {alunosFiltrados.length === 0 ? (
        <p className="text-gray-600">Nenhum aluno encontrado.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Nome</th>
              <th className="border p-2">Nascimento</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.map((aluno) => (
              <React.Fragment key={aluno.id}>
                <tr>
                  <td className="border p-2">{aluno.nome_completo}</td>
                  <td className="border p-2">{aluno.data_nascimento}</td>
                  <td className="border p-2">
                    <button
                      onClick={() =>
                        exibindoId === aluno.id
                          ? setExibindoId(null)
                          : handleVerFicha(aluno.id)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      {exibindoId === aluno.id ? "Ocultar Ficha" : "Ver Ficha"}
                    </button>
                  </td>
                </tr>
                {exibindoId === aluno.id && (
                  <tr>
                    <td colSpan={3} className="bg-gray-100 p-4 border">
                      <p><strong>Nome do Pai:</strong> {aluno.nome_pai || "-"}</p>
                      <p><strong>Nome da Mãe:</strong> {aluno.nome_mae || "-"}</p>
                      <p><strong>CPF:</strong> {aluno.cpf || "-"}</p>
                      <p><strong>BOX:</strong> {aluno.box}</p>
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            toast.info("Redirecionando para edição...");
                            router.push(`/secretario/ex-alunos/editarAluno/${aluno.id}`);
                          }}
                          className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                          Editar Aluno
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}