import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from '../../../domain/usuario';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';

export interface AtualizarAvatarProps {
  id: string;
  avatar: string;
}

@Injectable()
export class AtualizarAvatarUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(props: AtualizarAvatarProps): Promise<UsuarioDto> {
    const usuario = await this.usuarioRepository.buscarPorId(props.id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const usuarioAtualizado = Usuario.carregar({
      id: usuario.getId(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      senha: usuario.getSenha(),
      criadoEm: usuario.getCriadoEm(),
      telefone: usuario.getTelefone(),
      avatar: props.avatar,
      emailVerificado: usuario.getEmailVerificado(),
      codigoVerificacao: usuario.getCodigoVerificacao(),
      expiracaoCodigo: usuario.getExpiracaoCodigo(),
    });

    await this.usuarioRepository.atualizar(props.id, usuarioAtualizado);

    return UsuarioMapper.DomainToDto(usuarioAtualizado);
  }
}
