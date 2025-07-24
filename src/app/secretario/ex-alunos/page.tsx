import AlunoConsulta, { Aluno } from "@/components/alunoConsulta";
import { listarExAlunos } from "@/services/exAlunoService";

export default async function ExAlunosPage() {
  const alunos: Aluno[] = await listarExAlunos(); // chamada server-side

  return <AlunoConsulta titulo="Consulta de Ex-Alunos" alunos={alunos} />;
}
