import { Inject, Injectable } from '@nestjs/common';
import { CarteiraRepository } from 'src/modules/core/domain/repositories/Carteira.repository';
import { Usuario } from 'src/modules/core/domain/usuario';
import { EmailService } from '../../../domain/interfaces/email.service';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../domain/interfaces/bcrypt-hash.service';

export interface CriarUsuarioProps {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

@Injectable()
export class CriarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
    @Inject('BcryptHashService')
    private readonly hashService: BcryptHashService,
    @Inject('EmailService')
    private readonly emailService: EmailService,
  ) {}

  async execute(props: CriarUsuarioProps): Promise<{ message: string }> {
    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(
      props.email,
    );
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    const senhaHashed = await this.hashService.hash(props.senha);

    const usuario = Usuario.criar({
      ...props,
      senha: senhaHashed,
    });

    // Gerar código de verificação
    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
    usuario.setCodigoVerificacao(codigo);

    await this.usuarioRepository.salvar(usuario);

    // Enviar email com código
    await this.emailService.enviarCodigoVerificacao(props.email, codigo);

    return {
      message: 'Usuário criado. Verifique seu email para confirmar a conta.',
    };
  }
}
