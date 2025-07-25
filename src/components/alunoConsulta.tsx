"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Search, PlusCircle, Eye, EyeOff, Edit } from "lucide-react";

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

  const handleNovoAluno = () => {
    toast.info("Redirecionando para cadastro de novo aluno...");
    router.push("/secretario/ex-alunos/novoAluno");
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
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">{titulo}</h1>
        
        <button
          onClick={handleNovoAluno}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-colors shadow-md"
        >
          <PlusCircle size={20} />
          Novo Aluno
        </button>
      </div>
      
      {/* Filtros */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por Nome</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
              placeholder="Digite o nome completo"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por CPF</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={filtroCpf}
              onChange={(e) => setFiltroCpf(e.target.value)}
              placeholder="Digite o CPF (opcional)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Tabela de resultados */}
      {alunosFiltrados.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">Nenhum aluno encontrado com os filtros atuais.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nascimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alunosFiltrados.map((aluno) => (
                <React.Fragment key={aluno.id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{aluno.nome_completo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{aluno.data_nascimento}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            exibindoId === aluno.id
                              ? setExibindoId(null)
                              : handleVerFicha(aluno.id)
                          }
                          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            exibindoId === aluno.id 
                              ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
                              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          }`}
                        >
                          {exibindoId === aluno.id ? (
                            <>
                              <EyeOff size={16} />
                              Ocultar
                            </>
                          ) : (
                            <>
                              <Eye size={16} />
                              Ver Ficha
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {exibindoId === aluno.id && (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 bg-blue-50 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Nome do Pai</h3>
                              <p className="mt-1 text-sm text-gray-900">{aluno.nome_pai || "-"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Nome da Mãe</h3>
                              <p className="mt-1 text-sm text-gray-900">{aluno.nome_mae || "-"}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">CPF</h3>
                              <p className="mt-1 text-sm text-gray-900">{aluno.cpf || "-"}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">BOX</h3>
                              <p className="mt-1 text-sm text-gray-900">{aluno.box}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => {
                              toast.info("Redirecionando para edição...");
                              router.push(`/secretario/ex-alunos/editarAluno/${aluno.id}`);
                            }}
                            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                          >
                            <Edit size={16} />
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
        </div>
      )}
    </div>
  );
}