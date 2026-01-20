import { Injectable, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';

export interface BuscarUsuarioResult {
  usuario: UsuarioDto;
  carteiraId: string;
}

@Injectable()
export class BuscarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
  ) {}

  async execute(userId: string): Promise<BuscarUsuarioResult> {
    const usuario = await this.usuarioRepository.buscarPorId(userId);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const carteira = await this.carteiraRepository.buscarPorUsuarioId(userId);
    if (!carteira) {
      throw new Error('Carteira não encontrada');
    }

    return {
      usuario: UsuarioMapper.DomainToDto(usuario),
      carteiraId: carteira.getId(),
    };
  }
}
