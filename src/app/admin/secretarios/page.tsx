"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { secretaryService, Secretary } from "@/services/secretarioService";
import { useRouter } from "next/navigation";
import Link from 'next/link';


export default function ListaSecretariosPage() {
  const [secretarios, setSecretarios] = useState<Secretary[]>([]);
  const router = useRouter();

  useEffect(() => {
    secretaryService.getAll().then(setSecretarios);
  }, []);

  const excluir = async (id: string) => {
    if (confirm("Deseja realmente excluir este secretário?")) {
      try {
        await secretaryService.delete(id);
        setSecretarios(secretarios.filter(s => s._id !== id));
        toast.success("Secretário removido com sucesso.");
      } catch (error) {
        toast.error("Falha ao remover secretário.");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-8 text-center">
          Lista de Secretários
        </h1>

        <div className="mb-6 flex justify-end">
          <button
            onClick={() => router.push("/admin/secretarios/novoSecretario")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Novo Secretário
          </button>
        </div>

        {secretarios.length === 0 ? (
          <p className="text-gray-600 text-center text-lg mt-10">Nenhum secretário encontrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-lg">Nome</th>
                  <th className="py-3 px-4 text-left font-semibold text-lg">Email</th>
                  <th className="py-3 px-4 text-left font-semibold text-lg">Ações</th>
                </tr>
              </thead>
              <tbody>
                {secretarios.map((s) => (
                  <tr key={s._id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{s.name}</td>
                    <td className="py-3 px-4 text-gray-800">{s.email}</td>
                    <td className="py-3 px-4 space-x-3 flex items-center">
                      <Link href={`/admin/secretarios/${s._id}/editarSecretario`} passHref>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300 ease-in-out">
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => excluir(s._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300 ease-in-out"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}