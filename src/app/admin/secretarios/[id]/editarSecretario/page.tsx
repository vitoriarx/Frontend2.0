"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { secretaryService } from "@/services/secretarioService";
import { useEffect } from "react";


// Schema para validação. A senha é opcional na edição.
const schemaEdicao = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
});

type FormData = z.infer<typeof schemaEdicao>;

export default function EditarSecretario() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string; // Pega o ID da URL

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // Função para preencher o formulário com dados existentes
  } = useForm<FormData>({
    resolver: zodResolver(schemaEdicao),
  });

  // Busca os dados do secretário ao carregar a página
  useEffect(() => {
    if (id) {
      const carregarDadosSecretario = async () => {
        try {
          const dados = await secretaryService.getById(id);
          // Preenche o formulário com os dados recebidos da API
          reset(dados);
        } catch (error) {
          toast.error("Não foi possível carregar os dados do secretário.");
          console.error(error);
        }
      };
      carregarDadosSecretario();
    }
  }, [id, reset]);

  // Função chamada ao submeter o formulário
  const onSubmit = async (data: FormData) => {
    try {
      // Chama o método 'atualizar' do service, passando o ID e os novos dados
      await secretaryService.update(id, data);
      toast.success("Secretário atualizado com sucesso!");
      router.push("/admin/secretarios"); // Redireciona de volta para a lista
      router.refresh(); // Garante que a lista seja atualizada
    } catch (error) {
      toast.error("Falha ao atualizar o secretário.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Secretário</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Nome</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="border p-2 w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="border p-2 w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}