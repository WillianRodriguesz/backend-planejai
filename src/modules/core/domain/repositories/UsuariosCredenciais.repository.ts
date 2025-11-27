import { Usuario } from '../..//domain/Usuario';

export interface UsuariosCredenciaisRepository {
  findPorTelefone(
    telefone: string,
  ): Promise<{ usuario: Usuario; passwordHash: string } | null>;
}
