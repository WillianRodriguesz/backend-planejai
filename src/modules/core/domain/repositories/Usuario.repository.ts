export interface UsuarioWriteRepository {
  existsByTelefone(telefone: string): Promise<boolean>;
  createUsuario(data: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
  }): Promise<{
    id: string;
    nome: string;
    email: string;
    telefone: string;
  }>;
}
