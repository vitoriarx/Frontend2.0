"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { secretaryService} from "@/services/secretarioService"; // Passo 1
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Secretário</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Nome</label>
          <input type="text" {...register("name")} className="border p-2 w-full" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block">Email</label>
          <input type="email" {...register("email")} className="border p-2 w-full" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block">Senha</label>
          <input type="password" {...register("password")} className="border p-2 w-full" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}