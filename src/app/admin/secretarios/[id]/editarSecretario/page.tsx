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
  const id = params?.id as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schemaEdicao),
  });

  useEffect(() => {
    if (id) {
      const carregarDadosSecretario = async () => {
        try {
          const dados = await secretaryService.getById(id);
          reset(dados);
        } catch (error) {
          toast.error("Não foi possível carregar os dados do secretário.");
          console.error(error);
        }
      };
      carregarDadosSecretario();
    }
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await secretaryService.update(id, data);
      toast.success("Secretário atualizado com sucesso!");
      router.push("/admin/secretarios");
      router.refresh();
    } catch (error) {
      toast.error("Falha ao atualizar o secretário.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-8 text-center">
          Editar Secretário
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o nome do secretário"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o e-mail do secretário"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md transition duration-300 ease-in-out ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </div>
  );
}