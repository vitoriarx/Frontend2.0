"use client";

import { useRouter } from "next/navigation";

export default function TelaInicial() {
  const router = useRouter();

  const entrarComoAdm = () => {
    router.push("/login/admin");  // caminho para página do administrador
  };

  const entrarComoSecretario = () => {
    router.push("/login/secretario");  // caminho para página do secretário
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Escolha o tipo de login</h1>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={entrarComoAdm}
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Login como Administrador
        </button>

        <button
          onClick={entrarComoSecretario}
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Login como Secretário
        </button>
      </div>
    </div>
  );
}
