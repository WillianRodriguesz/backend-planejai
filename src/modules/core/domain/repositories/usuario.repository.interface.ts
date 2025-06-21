import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepository {
  criar(usuario: Usuario): Promise<Usuario>;
  buscarPorEmail(email: string): Promise<Usuario>;
}
