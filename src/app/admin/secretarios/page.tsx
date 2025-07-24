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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Secretários</h1>
      <button
        onClick={() => router.push("/admin/secretarios/novoSecretario")}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Novo Secretário
      </button>

      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {secretarios.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">
                <Link href={`/admin/secretarios/${s._id}/editarSecretario`}>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                  Editar
                </button>
              </Link>

               
                <button
                  onClick={() => excluir(s._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}