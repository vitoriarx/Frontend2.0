"use client";

import { createApiClient } from "@/lib/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode }from "jwt-decode"; 

const api = createApiClient();

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      

      const decodedToken: { role: string } = jwtDecode(token);

      if (decodedToken.role === "admin") {
        router.push("/admin/secretarios");
      } else if (decodedToken.role === "secretario") {
        router.push("/secretario");
      } else {
        setError("Tipo de usuário inválido.");
      }
    } catch (err: unknown) {
      const errorObj = err as {
        response?: { data?: { message?: string } };
      };

      if (errorObj?.response?.data?.message) {
        setError(errorObj.response.data.message);
      } else {
        setError("Erro no login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-blue-500 mb-8 flex items-center justify-center gap-3">
          <img
            src="https://img.icons8.com/?size=100&id=Xn8WlU0Db8Cs&format=png&color=000000"
            alt="Ícone de Lupa"
            className="w-10 h-10 object-contain"
          />
          SIGAF
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg bg-blue-600 hover:bg-blue-700 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;