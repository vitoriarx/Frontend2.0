import { listarExAlunos } from "@/services/exAlunoService";
import AlunoConsulta from "@/components/alunoConsulta";

export default async function SecretariosPage() {
  const alunos = await listarExAlunos(); // chamada no server

  return <AlunoConsulta titulo="Consulta de Ex-Alunos" alunos={alunos} />;
}
