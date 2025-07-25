// app/secretario/editar/[id]/page.tsx
import EditarAlunoForm from "@/components/editarAlunosForms";
import { buscarExAlunoPorId } from "@/services/exAlunoService";
import { Aluno } from "@/components/alunoConsulta";

interface PageProps {
  params: Promise<{ id: string }>; // params é uma Promise no Next.js 15
}

export default async function EditarAlunoPage({ params }: PageProps) {
  // Aguardar params antes de usar
  const { id } = await params;
  
  const aluno: Aluno | null = await buscarExAlunoPorId(id);

  if (!aluno) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Aluno não encontrado</h2>
        <p className="text-gray-700">
          O aluno solicitado não foi encontrado em nosso sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-extrabold text-blue-500 mb-2">
        Editar Aluno
      </h1>
      <p className="text-gray-600 mb-6">
        Atualize as informações do aluno abaixo
      </p>
      <EditarAlunoForm aluno={aluno} />
    </div>
  );
}