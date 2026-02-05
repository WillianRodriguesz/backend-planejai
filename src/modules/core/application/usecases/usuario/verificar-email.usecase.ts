import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';
import { Carteira } from '../../../domain/carteira';

export interface VerificarEmailProps {
  email: string;
  codigo: string;
}

@Injectable()
export class VerificarEmailUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(props: VerificarEmailProps): Promise<UsuarioDto> {
    const usuario = await this.usuarioRepository.buscarPorEmail(props.email);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    if (usuario.getEmailVerificado()) {
      throw new Error('Email já verificado');
    }

    if (usuario.getCodigoVerificacao() !== props.codigo) {
      throw new Error('Código de verificação inválido');
    }

    if (
      usuario.getExpiracaoCodigo() &&
      usuario.getExpiracaoCodigo() < new Date()
    ) {
      throw new Error('Código de verificação expirado');
    }

    usuario.verificarEmail();

    await this.usuarioRepository.atualizar(usuario.getId(), usuario);

    await this.cacheManager.del(`login_attempts_${props.email}`);
    await this.cacheManager.del(`attempts_${props.email}`);

    const carteira = Carteira.criar({
      usuarioId: usuario.getId(),
    });
    await this.carteiraRepository.salvar(carteira);

    return UsuarioMapper.DomainToDto(usuario);
  }
}
