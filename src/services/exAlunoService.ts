//import { createApiClient } from "@/lib/api";
import { Aluno } from "@/components/alunoConsulta";

//const api = createApiClient();

/*interface AlunoFromAPI {


  _id: string;
  nome_completo: string;
  data_nascimento: string;
  cpf: string;
  box: string;
  nome_pai: string;
  nome_mae: string;
}

export async function listarExAlunos(): Promise<Aluno[]> {
  const response = await api.get<AlunoFromAPI[]>("/ex-alunos");
  
  return response.data.map((alunoDaApi: AlunoFromAPI) => ({
    ...alunoDaApi,
    id: alunoDaApi._id,
  }));
}

export async function buscarExAlunoPorId(id: string): Promise<Aluno | null> {
  try {
    const response = await api.get<AlunoFromAPI>(`/ex-alunos/${id}`);
    const alunoDaApi = response.data;
    
    if (!alunoDaApi) return null;
    return { ...alunoDaApi, id: alunoDaApi._id };
  } catch (error) {
    console.error("Erro ao buscar ex-aluno:", error);
    return null;
  }
}

export async function atualizarExAluno(dadosAtualizados: Aluno): Promise<Aluno> {
  const { id, ...updateData } = dadosAtualizados;

 
  const response = await api.patch<AlunoFromAPI>(`/ex-alunos/${id}`, updateData);
  
  const alunoDaApi = response.data;
  return { ...alunoDaApi, id: alunoDaApi._id };
}

export async function criarExAluno(dados: Omit<Aluno, "id">): Promise<Aluno> {
  const response = await api.post<AlunoFromAPI>("/ex-alunos", dados);
  const alunoDaApi = response.data;

  return { ...alunoDaApi, id: alunoDaApi._id };
}*/



// ✅ CONTROLE MOCK - Mude só esta linha
const USE_MOCK = true;

// ✅ Dados mock temporários
const mockAlunos: Aluno[] = [
  {
    id: "1",
    nome_completo: "João Silva Santos",
    data_nascimento: "1995-03-15",
    cpf: "12345678901",
    box: "2020",
    nome_pai: "José Silva Santos",
    nome_mae: "Maria Silva Santos"
  },
  {
    id: "2", 
    nome_completo: "Ana Carolina Oliveira",
    data_nascimento: "1997-08-22",
    cpf: "98765432109",
    box: "2021",
    nome_pai: "Carlos Oliveira",
    nome_mae: "Sandra Oliveira"
  },
  {
    id: "3",
    nome_completo: "Pedro Henrique Costa",
    data_nascimento: "1996-12-10",
    cpf: "11122233344",
    box: "2022",
    nome_pai: "",
    nome_mae: "Fernanda Costa"
  }
];


// Simular delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function listarExAlunos(): Promise<Aluno[]> {
  if (USE_MOCK) {
    // ✅ Mock mode
    await delay(500);
    console.log("📋 MOCK: Listando ex-alunos");
    return [...mockAlunos];
  }
  
  return []; // fallback
}

export async function buscarExAlunoPorId(id: string): Promise<Aluno | null> {
  if (USE_MOCK) {
    
    await delay(300);
    console.log("🔍 MOCK: Buscando aluno por ID:", id);
    return mockAlunos.find(a => a.id === id) || null;
  }
  
 
  
  return null; // fallback
}

export async function atualizarExAluno(dadosAtualizados: Aluno): Promise<Aluno> {
  if (USE_MOCK) {
    // ✅ Mock mode
    await delay(500);
    console.log("✏️ MOCK: Atualizando aluno:", dadosAtualizados);
    
    const index = mockAlunos.findIndex(a => a.id === dadosAtualizados.id);
    if (index === -1) {
      throw new Error("Aluno não encontrado");
    }
    
    // Validação mock
    if (!dadosAtualizados.nome_pai && !dadosAtualizados.nome_mae) {
      throw new Error("Pelo menos um responsável deve ser informado");
    }
    
    mockAlunos[index] = { ...dadosAtualizados };
    return mockAlunos[index];
  }
  
  
  throw new Error("Modo real não implementado"); // fallback
}

export async function criarExAluno(dados: Omit<Aluno, "id">): Promise<Aluno> {
  if (USE_MOCK) {
    // ✅ Mock mode
    await delay(600);
    console.log("➕ MOCK: Criando novo aluno:", dados);
    
    // Validações mock
    if (!dados.nome_completo || dados.nome_completo.length < 3) {
      throw new Error("Nome deve ter pelo menos 3 caracteres");
    }
    
    if (!dados.nome_pai && !dados.nome_mae) {
      throw new Error("Pelo menos um responsável deve ser informado");
    }
    
    if (dados.cpf && mockAlunos.some(a => a.cpf === dados.cpf)) {
      throw new Error("CPF já cadastrado");
    }
    
    const novoAluno: Aluno = {
      ...dados,
      id: (Math.random() * 1000000).toString(),
      nome_pai: dados.nome_pai || "",
      nome_mae: dados.nome_mae || "",
      cpf: dados.cpf || ""
    };
    
    mockAlunos.push(novoAluno);
    return novoAluno;
  }
  
  
  throw new Error("Modo real não implementado"); // fallback
}