import { Injectable, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { EmailService } from '../../../infrastructure/services/email.service';

export interface ReenviarCodigoProps {
  email: string;
}

@Injectable()
export class ReenviarCodigoUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    @Inject('EmailService')
    private readonly emailService: EmailService,
  ) {}

  async execute(props: ReenviarCodigoProps): Promise<{ message: string }> {
    const usuario = await this.usuarioRepository.buscarPorEmail(props.email);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    if (usuario.getEmailVerificado()) {
      throw new Error('Email já verificado');
    }

    // Gerar novo código
    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
    usuario.setCodigoVerificacao(codigo);

    await this.usuarioRepository.atualizar(usuario.getId(), usuario);

    // Enviar email
    await this.emailService.enviarCodigoVerificacao(props.email, codigo);

    return { message: 'Código reenviado com sucesso' };
  }
}
