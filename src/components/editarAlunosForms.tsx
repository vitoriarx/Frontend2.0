"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Aluno } from "./alunoConsulta"; // 1. Importe o tipo Aluno
import { atualizarExAluno } from "@/services/exAlunoService"; // Importe a função de atualização

// Schema de validação para a edição
const schemaEdicao = z.object({
  nome_completo: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  cpf: z.string(),
  box: z.string(),
  // Adicione outros campos que podem ser editados
});

type FormData = z.infer<typeof schemaEdicao>;

// 2. Defina as props corretamente
interface EditarAlunoFormProps {
  aluno: Aluno; // A prop 'aluno' deve ser do tipo 'Aluno'
}

export default function EditarAlunoForm({ aluno }: EditarAlunoFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schemaEdicao),
  });

  // Preenche o formulário com os dados do aluno quando o componente carrega
  useEffect(() => {
    if (aluno) {
      reset(aluno);
    }
  }, [aluno, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const dadosAtualizados = { ...aluno, ...data };
      
      await atualizarExAluno(dadosAtualizados);
      console.log("Dados que serão enviados para a API:", dadosAtualizados);
      console.log("ID sendo usado para a URL:", dadosAtualizados.id);
      
      toast.success("Aluno atualizado com sucesso!");
      
      // Redirecionar para a página principal dos secretários
      router.push("/secretario"); // ✅ Página inicial com lista de alunos
      
    } catch (error) {
      toast.error("Falha ao atualizar o aluno.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome_completo" className="block">Nome Completo</label>
        <input
          id="nome_completo"
          type="text"
          {...register("nome_completo")}
          className="border p-2 w-full"
        />
        {errors.nome_completo && <p className="text-red-500 text-sm">{errors.nome_completo.message}</p>}
      </div>

      <div>
        <label htmlFor="cpf" className="block">CPF</label>
        <input
          id="cpf"
          type="text"
          {...register("cpf")}
          className="border p-2 w-full"
        />
        {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
      </div>

       <div>
        <label htmlFor="box" className="block">BOX</label>
        <input
          id="box"
          type="text"
          {...register("box")}
          className="border p-2 w-full"
        />
        {errors.box && <p className="text-red-500 text-sm">{errors.box.message}</p>}
      </div>


      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isSubmitting ? "Salvando..." : "Salvar Alterações"}
      </button>
    </form>
  );
}