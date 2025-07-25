"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { secretaryService} from "@/services/secretarioService";
import { isAxiosError } from 'axios';

const schema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function CadastroSecretarioPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await secretaryService.create(data);
      toast.success("Secretário cadastrado com sucesso!");
      router.push("/admin/secretarios");
      
    } catch (error) {
      console.error("Erro ao cadastrar secretário:", error);

      if (isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          toast.error(error.response.data.message || 'Este e-mail já está em uso.');
        } else {
          toast.error('Ocorreu um erro no servidor. Tente novamente.');
        }
      } else {
        toast.error("Não foi possível cadastrar o secretário. Verifique sua conexão.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-8 text-center">
          Novo Secretário
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <input
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o e-mail do secretário"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite a senha"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md transition duration-300 ease-in-out"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}