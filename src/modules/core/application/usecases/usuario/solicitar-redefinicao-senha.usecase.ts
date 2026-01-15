import { Injectable, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { TokenService } from '../../../domain/interfaces/token.service';
import { EmailService } from 'src/modules/core/domain/interfaces/email.service';

export interface SolicitarRedefinicaoSenhaProps {
  email: string;
}

@Injectable()
export class SolicitarRedefinicaoSenhaUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    @Inject('EmailService')
    private readonly emailService: EmailService,
    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  async execute(
    props: SolicitarRedefinicaoSenhaProps,
  ): Promise<{ message: string }> {
    const usuario = await this.usuarioRepository.buscarPorEmail(props.email);

    if (!usuario) {
      return {
        message:
          'Se o email existir em nossa base, você receberá as instruções para redefinir sua senha.',
      };
    }

    if (!usuario.getEmailVerificado()) {
      throw new Error(
        'Email não verificado. Por favor, verifique seu email antes de redefinir a senha.',
      );
    }

    const { token, tokenHash } = this.tokenService.gerarToken();

    usuario.setTokenRedefinicaoSenha(tokenHash);

    await this.usuarioRepository.atualizar(usuario.getId(), usuario);

    await this.emailService.enviarTokenRedefinicaoSenha(props.email, token);

    return {
      message:
        'Se o email existir em nossa base, você receberá as instruções para redefinir sua senha.',
    };
  }
}
