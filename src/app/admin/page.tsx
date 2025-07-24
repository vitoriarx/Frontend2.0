"use client";

import { secretaryService, Secretary } from '@/services/secretarioService';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [secretaries, setSecretaries] = useState<Secretary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSecretaries = async () => {
      try {
        const data = await secretaryService.getAll();
        setSecretaries(data);
      } catch (error) {
        console.error("Falha ao buscar secretários", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSecretaries();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este secretário?')) {
      try {
        await secretaryService.delete(id);
        setSecretaries(currentSecretaries =>
          currentSecretaries.filter(sec => sec._id !== id)
        );
      } catch (error) {
        console.error("Falha ao excluir secretário", error);
        alert('Não foi possível excluir o secretário.');
      }
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Gerenciamento de Secretários</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {secretaries.map(secretary => (
            <tr key={secretary._id}>
              <td>{secretary.name}</td>
              <td>{secretary.email}</td>
              <td>
                <button onClick={() => handleDelete(secretary._id)}>
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