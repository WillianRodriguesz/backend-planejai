import { Injectable, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';

@Injectable()
export class BuscarUsuarioPorIdUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(id: string): Promise<UsuarioDto | null> {
    const usuario = await this.usuarioRepository.buscarPorId(id);
    return usuario ? UsuarioMapper.DomainToDto(usuario) : null;
  }
}
