import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepository {
  criar(usuario: Usuario): Promise<Usuario>;
}
