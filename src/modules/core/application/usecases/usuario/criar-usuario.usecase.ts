import { Inject, Injectable } from '@nestjs/common';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';
import { Usuario } from '../../../domain/usuario';
import { EmailService } from '../../../domain/interfaces/email.service';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../domain/interfaces/bcrypt-hash.service';
import { TermoRepository } from '../../../domain/repositories/termo.repository';
import { UsuarioConsentimentoRepository } from '../../../domain/repositories/usuario-consentimento.repository';
import { UsuarioConsentimento } from '../../../domain/usuario-consentimento';
import { TipoTermo } from '../../../domain/termo';

export interface CriarUsuarioProps {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  aceitouLgpd: boolean;
  aceitouTermosUso: boolean;
  aceitouPoliticaPrivacidade: boolean;
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
    @Inject('TermoRepository')
    private readonly termoRepository: TermoRepository,
    @Inject('UsuarioConsentimentoRepository')
    private readonly usuarioConsentimentoRepository: UsuarioConsentimentoRepository,
  ) {}

  async execute(props: CriarUsuarioProps): Promise<{ message: string }> {
    const { aceitouLgpd, aceitouTermosUso, aceitouPoliticaPrivacidade } = props;

    // Validar consentimentos obrigatórios
    if (!aceitouLgpd || !aceitouTermosUso || !aceitouPoliticaPrivacidade) {
      throw new Error(
        'Todos os consentimentos são obrigatórios: LGPD, Termos de Uso e Política de Privacidade',
      );
    }

    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(
      props.email,
    );
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    const senhaHashed = await this.hashService.hash(props.senha);

    const usuario = Usuario.criar({
      nome: props.nome,
      email: props.email,
      senha: senhaHashed,
      telefone: props.telefone,
    });

    // Gerar código de verificação
    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
    usuario.setCodigoVerificacao(codigo);

    await this.usuarioRepository.salvar(usuario);

    // Buscar versões ativas dos termos
    const termoLgpd = await this.termoRepository.buscarAtivoPorTipo(
      TipoTermo.LGPD,
    );
    const termoTermosUso = await this.termoRepository.buscarAtivoPorTipo(
      TipoTermo.TERMOS_USO,
    );
    const termoPolitica = await this.termoRepository.buscarAtivoPorTipo(
      TipoTermo.POLITICA_PRIVACIDADE,
    );

    // Criar consentimento
    const consentimento = UsuarioConsentimento.criar({
      usuarioId: usuario.getId(),
      termoLgpdId: termoLgpd?.getId(),
      aceitouLgpd,
      termoTermosUsoId: termoTermosUso?.getId(),
      aceitouTermosUso,
      termoPoliticaPrivacidadeId: termoPolitica?.getId(),
      aceitouPoliticaPrivacidade,
    });

    await this.usuarioConsentimentoRepository.salvar(consentimento);

    // Enviar email com código
    await this.emailService.enviarCodigoVerificacao(props.email, codigo);

    return {
      message: 'Usuário criado. Verifique seu email para confirmar a conta.',
    };
  }
}
