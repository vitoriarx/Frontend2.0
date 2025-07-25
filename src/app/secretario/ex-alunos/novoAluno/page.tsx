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
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato AAAA-MM-DD"),
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
    <div className="max-w-ws-screen bg-gray-50 py-0 px-1 sm:px-1 lg:px-1">
      <div className="max-w-[500px] mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Novo Ex-Aluno</h1>
            <p className="mt-2 text-sm text-gray-600">Preencha os dados do ex-aluno</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="nome_completo" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                id="nome_completo"
                type="text"
                {...register("nome_completo")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Digite o nome completo"
              />
              {errors.nome_completo && (
                <p className="mt-1 text-sm text-red-600">{errors.nome_completo.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="data_nascimento" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <input
                id="data_nascimento"
                type="date"
                {...register("data_nascimento")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.data_nascimento && (
                <p className="mt-1 text-sm text-red-600">{errors.data_nascimento.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nome_pai" className="block text-sm font-medium text-gray-700">
                Nome do Pai (Opcional)
              </label>
              <input
                id="nome_pai"
                type="text"
                {...register("nome_pai")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nome completo do pai"
              />
            </div>

            <div>
              <label htmlFor="nome_mae" className="block text-sm font-medium text-gray-700">
                Nome da Mãe (Opcional)
              </label>
              <input
                id="nome_mae"
                type="text"
                {...register("nome_mae")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nome completo da mãe"
              />
              {errors.nome_pai && (
                <p className="mt-1 text-sm text-red-600">{errors.nome_pai.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                CPF (Opcional)
              </label>
              <input
                id="cpf"
                type="text"
                {...register("cpf")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Apenas números (11 dígitos)"
                maxLength={11}
              />
              {errors.cpf && (
                <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="box" className="block text-sm font-medium text-gray-700">
                BOX (Ano)
              </label>
              <input
                id="box"
                type="text"
                {...register("box")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="4 dígitos (ex: 2024)"
                maxLength={4}
              />
              {errors.box && (
                <p className="mt-1 text-sm text-red-600">{errors.box.message}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.push('/secretario')}
                className="w-full flex justify-center py-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cadastrando...
                  </>
                ) : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}