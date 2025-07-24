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
    return <div>Aluno não encontrado.</div>;
  }

  return <EditarAlunoForm aluno={aluno} />;
}