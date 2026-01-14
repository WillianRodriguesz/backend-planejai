import { Usuario } from '../usuario';

export interface UsuarioRepository {
  salvar(usuario: Usuario): Promise<void>;
  buscarPorId(id: string): Promise<Usuario | null>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  buscarPorTokenRedefinicao(tokenHash: string): Promise<Usuario | null>;
  buscarTodos(): Promise<Usuario[]>;
  atualizar(id: string, usuario: Partial<Usuario>): Promise<void>;
  deletar(id: string): Promise<void>;
}
