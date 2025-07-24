import React from 'react';
import MenuSecretario from "@/components/Secretario";

export default function SecretarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <MenuSecretario />
      <main className="p-6 w-full">
        {children} {/* moldura com o menu*/}
      </main>
    </div>
  );
}