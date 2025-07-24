"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { criarExAluno } from "@/services/exAlunoService";

// Schema corrigido para o formato da API
const schema = z.object({
  nome_completo: z.string()
    .min(3, "Nome deve ter entre 3 e 120 caracteres")
    .max(120, "Nome deve ter entre 3 e 120 caracteres")
    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/, "Nome deve conter apenas letras, espaços e acentos"),
  data_nascimento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato AAAA-MM-DD"), // ✅ Formato correto
  nome_pai: z.string().min(3).max(120).optional().or(z.literal("")),
  nome_mae: z.string().min(3).max(120).optional().or(z.literal("")),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter exatamente 11 números").optional().or(z.literal("")),
  box: z.string().regex(/^\d{4}$/, "BOX deve conter exatamente 4 dígitos representando o ano"),
}).refine((data) => data.nome_pai || data.nome_mae, {
  message: "Pelo menos o nome do pai ou da mãe deve ser informado",
  path: ["nome_pai"],
});

type FormData = z.infer<typeof schema>;

export default function CadastroExAlunoPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Dados sendo enviados:", data);

      // Garantir que campos opcionais sejam string, nunca undefined
      const dataToSend = {
        ...data,
        nome_pai: data.nome_pai ?? "",
        nome_mae: data.nome_mae ?? "",
        cpf: data.cpf ?? "",
      };

      // Usar o serviço correto
      await criarExAluno(dataToSend);

      toast.success("Aluno cadastrado com sucesso!");
      router.push("/secretario");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar aluno");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Ex-Aluno</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Nome Completo</label>
          <input 
            type="text" 
            {...register("nome_completo")} 
            className="border p-2 w-full" 
          />
          {errors.nome_completo && (
            <p className="text-red-500 text-sm">{errors.nome_completo.message}</p>
          )}
        </div>

        <div>
          <label className="block">Data de Nascimento</label>
          <input 
            type="date" // ✅ Usar type="date" para formato YYYY-MM-DD
            {...register("data_nascimento")} 
            className="border p-2 w-full"
          />
          {errors.data_nascimento && (
            <p className="text-red-500 text-sm">{errors.data_nascimento.message}</p>
          )}
        </div>

        <div>
          <label className="block">Nome do Pai</label>
          <input 
            type="text" 
            {...register("nome_pai")} 
            className="border p-2 w-full" 
          />
        </div>

        <div>
          <label className="block">Nome da Mãe</label>
          <input 
            type="text" 
            {...register("nome_mae")} 
            className="border p-2 w-full" 
          />
          {errors.nome_pai && (
            <p className="text-red-500 text-sm">{errors.nome_pai.message}</p>
          )}
        </div>

        <div>
          <label className="block">CPF (apenas números)</label>
          <input 
            type="text" 
            {...register("cpf")} 
            className="border p-2 w-full"
            placeholder="12345678901" // ✅ Apenas números
            maxLength={11}
          />
          {errors.cpf && (
            <p className="text-red-500 text-sm">{errors.cpf.message}</p>
          )}
        </div>

        <div>
          <label className="block">BOX (ano - 4 dígitos)</label>
          <input 
            type="text" 
            {...register("box")} 
            className="border p-2 w-full"
            placeholder="2024"
            maxLength={4}
          />
          {errors.box && (
            <p className="text-red-500 text-sm">{errors.box.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/secretario')}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
