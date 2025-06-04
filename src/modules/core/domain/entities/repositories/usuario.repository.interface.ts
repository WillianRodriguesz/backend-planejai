import { Usuario } from '../usuario/usuario.entity';

export const UsuarioRepository = 'UsuarioRepository'; // precisei criar um injecção de token para poder importar no Usuario.modele

export interface UsuarioRepository {
  criarUsuario(usuario: Usuario): Promise<Usuario>; // vai retornar um usuario
  buscarPorEmail(email: string): Promise<Usuario | null>; // vai retornar um usuario ou valor nulo
  listarTodos(): Promise<Usuario[]>;
  atualizarNome(usuario: Usuario): Promise<void>;
  atualizarSenha(usuario: Usuario): Promise<void>;
  deletar(id: string): Promise<void>;
  existeId(id: string): Promise<boolean>;
}
