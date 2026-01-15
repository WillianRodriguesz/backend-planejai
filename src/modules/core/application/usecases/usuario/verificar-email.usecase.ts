import { Injectable, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { CarteiraRepository } from 'src/modules/core/domain/repositories/Carteira.repository';
import { Carteira } from 'src/modules/core/domain/carteira';

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

    // Verificar email
    usuario.verificarEmail();

    await this.usuarioRepository.atualizar(usuario.getId(), usuario);

    // Criar carteira após verificação
    const carteira = Carteira.criar({
      usuarioId: usuario.getId(),
    });
    await this.carteiraRepository.salvar(carteira);

    return UsuarioMapper.DomainToDto(usuario);
  }
}
