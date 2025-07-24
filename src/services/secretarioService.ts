import { createApiClient } from "@/lib/api";

const api = createApiClient();

/*
// Define a estrutura de dados para criar ou atualizar um secretário.
export interface SecretaryData {
  name: string;
  email: string;
  password?: string; // Opcional, usado principalmente na criação.
}

// Define a estrutura de dados de um secretário retornado pela API.
export interface Secretary extends SecretaryData {
  _id: string;
}

export const secretaryService = {
  // Cria um novo secretário no banco de dados.
  async create(data: SecretaryData): Promise<Secretary> {
    const response = await api.post('/users', data);
    return response.data;
  },

  // Retorna a lista de todos os secretários.
  async getAll(): Promise<Secretary[]> {
    const response = await api.get('/users');
    return response.data;
  },

  // Busca um único secretário pelo seu ID.
  async getById(id: string): Promise<Secretary> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Atualiza os dados de um secretário existente.
  async update(id: string, data: Partial<SecretaryData>): Promise<Secretary> {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  },

  // Exclui um secretário pelo ID.
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
*/

// ✅ CONTROLE MOCK - Mude só esta linha
const USE_MOCK = true;

// Define a estrutura de dados para criar ou atualizar um secretário.
export interface SecretaryData {
  name: string;
  email: string;
  password?: string; // Opcional, usado principalmente na criação.
}

// Define a estrutura de dados de um secretário retornado pela API.
export interface Secretary extends SecretaryData {
  _id: string;
  role?: "admin" | "secretario";
  createdAt?: string;
}

// ✅ Dados mock temporários
const mockSecretarios: Secretary[] = [
  {
    _id: "sec1",
    name: "Maria Silva",
    email: "maria@escola.com",
    role: "secretario",
    createdAt: "2024-01-15"
  },
  {
    _id: "sec2", 
    name: "João Santos",
    email: "joao@escola.com",
    role: "secretario",
    createdAt: "2024-02-20"
  },
  {
    _id: "sec3",
    name: "Ana Paula Costa",
    email: "ana@escola.com",
    role: "secretario", 
    createdAt: "2024-03-10"
  },
  {
    _id: "admin1",
    name: "Administrador Principal",
    email: "admin@escola.com", 
    role: "admin",
    createdAt: "2024-01-01"
  }
];

// Simular delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Gerar ID único
const generateId = () => "user_" + (Math.random() * 1000000).toString().split('.')[0];

export const secretaryService = {
  // Cria um novo secretário no banco de dados.
  async create(data: SecretaryData): Promise<Secretary> {
    if (USE_MOCK) {
      // ✅ Mock mode
      await delay(600);
      console.log("➕ MOCK: Criando secretário:", data);
      
      // Validações mock
      if (!data.name || data.name.length < 2) {
        throw new Error("Nome deve ter pelo menos 2 caracteres");
      }
      
      if (!data.email || !data.email.includes('@')) {
        throw new Error("Email inválido");
      }
      
      if (mockSecretarios.some(s => s.email === data.email)) {
        throw new Error("Email já cadastrado");
      }
      
      const novoSecretario: Secretary = {
        ...data,
        _id: generateId(),
        role: "secretario",
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      mockSecretarios.push(novoSecretario);
      return novoSecretario;
    }
    
    throw new Error("Modo real não implementado"); // fallback
  },

  // Retorna a lista de todos os secretários.
  async getAll(): Promise<Secretary[]> {
    if (USE_MOCK) {
      // ✅ Mock mode
      await delay(400);
      console.log("📋 MOCK: Listando secretários");
      return [...mockSecretarios];
    }
    
    return []; // fallback
  },

  // Busca um único secretário pelo seu ID.
  async getById(id: string): Promise<Secretary> {
    if (USE_MOCK) {
      // ✅ Mock mode
      await delay(300);
      console.log("🔍 MOCK: Buscando secretário por ID:", id);
      
      const secretario = mockSecretarios.find(s => s._id === id);
      if (!secretario) {
        throw new Error("Secretário não encontrado");
      }
      
      return secretario;
    }
    
    throw new Error("Modo real não implementado"); // fallback
  },

  // Atualiza os dados de um secretário existente.
  async update(id: string, data: Partial<SecretaryData>): Promise<Secretary> {
    if (USE_MOCK) {
      // ✅ Mock mode
      await delay(500);
      console.log("✏️ MOCK: Atualizando secretário:", id, data);
      
      const index = mockSecretarios.findIndex(s => s._id === id);
      if (index === -1) {
        throw new Error("Secretário não encontrado");
      }
      
      // Validações mock
      if (data.name && data.name.length < 2) {
        throw new Error("Nome deve ter pelo menos 2 caracteres");
      }
      
      if (data.email && !data.email.includes('@')) {
        throw new Error("Email inválido");
      }
      
      // Verificar email único (exceto o próprio secretário)
      if (data.email && mockSecretarios.some(s => s.email === data.email && s._id !== id)) {
        throw new Error("Email já cadastrado para outro usuário");
      }
      
      mockSecretarios[index] = { ...mockSecretarios[index], ...data };
      return mockSecretarios[index];
    }
    
    throw new Error("Modo real não implementado"); // fallback
  },

  // Exclui um secretário pelo ID.
  async delete(id: string): Promise<void> {
    if (USE_MOCK) {
      // ✅ Mock mode
      await delay(400);
      console.log("🗑️ MOCK: Excluindo secretário:", id);
      
      const index = mockSecretarios.findIndex(s => s._id === id);
      if (index === -1) {
        throw new Error("Secretário não encontrado");
      }
      
      // Não permitir excluir admin principal
      if (mockSecretarios[index].role === "admin" && mockSecretarios[index]._id === "admin1") {
        throw new Error("Não é possível excluir o administrador principal");
      }
      
      mockSecretarios.splice(index, 1);
      return;
    }
    
    throw new Error("Modo real não implementado"); // fallback
  },
};