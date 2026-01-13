import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from '../../../domain/usuario';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../infrastructure/services/hash-bcrypt.service';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';

export interface AtualizarUsuarioProps {
  id: string;
  nome?: string;
  email?: string;
  telefone?: string;
}

@Injectable()
export class AtualizarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    private readonly hashService: BcryptHashService,
  ) {}

  async execute(props: AtualizarUsuarioProps): Promise<UsuarioDto> {
    const usuario = await this.usuarioRepository.buscarPorId(props.id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se email já existe se estiver sendo alterado
    if (props.email && props.email !== usuario.getEmail()) {
      const usuarioExistente = await this.usuarioRepository.buscarPorEmail(
        props.email,
      );
      if (usuarioExistente) {
        throw new Error('Email já cadastrado');
      }
    }

    // Atualizar propriedades (senha não pode ser alterada aqui)
    const usuarioAtualizado = Usuario.carregar({
      id: usuario.getId(),
      nome: props.nome || usuario.getNome(),
      email: props.email || usuario.getEmail(),
      senha: usuario.getSenha(),
      criadoEm: usuario.getCriadoEm(),
      telefone:
        props.telefone !== undefined ? props.telefone : usuario.getTelefone(),
      avatar: usuario.getAvatar(),
      emailVerificado: usuario.getEmailVerificado(),
      codigoVerificacao: usuario.getCodigoVerificacao(),
      expiracaoCodigo: usuario.getExpiracaoCodigo(),
    });

    await this.usuarioRepository.atualizar(props.id, usuarioAtualizado);

    return UsuarioMapper.DomainToDto(usuarioAtualizado);
  }
}
