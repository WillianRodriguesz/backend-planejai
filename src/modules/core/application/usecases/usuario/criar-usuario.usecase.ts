import { Injectable, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../infrastructure/services/hash-bcrypt.service';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { CarteiraRepository } from 'src/modules/core/domain/repositories/Carteira.repository';
import { Carteira } from 'src/modules/core/domain/carteira';
import { Usuario } from 'src/modules/core/domain/usuario';
import { EmailService } from '../../../infrastructure/services/email.service';

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
