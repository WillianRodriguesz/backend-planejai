import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../domain/interfaces/bcrypt-hash.service';
import { Usuario } from '../../../domain/usuario';

export interface TrocarSenhaProps {
  id: string;
  senhaAtual: string;
  novaSenha: string;
}

@Injectable()
export class TrocarSenhaUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    @Inject('BcryptHashService')
    private readonly hashService: BcryptHashService,
  ) {}

  async execute(props: TrocarSenhaProps): Promise<void> {
    const usuario = await this.usuarioRepository.buscarPorId(props.id);
    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const senhaValida = await this.hashService.compare(
      props.senhaAtual,
      usuario.getSenha(),
    );
    if (!senhaValida) {
      throw new HttpException('Senha atual incorreta', HttpStatus.UNAUTHORIZED);
    }

    const novaSenhaHashed = await this.hashService.hash(props.novaSenha);

    const usuarioAtualizado = Usuario.carregar({
      id: usuario.getId(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      senha: novaSenhaHashed,
      criadoEm: usuario.getCriadoEm(),
      telefone: usuario.getTelefone(),
      avatar: usuario.getAvatar(),
      emailVerificado: usuario.getEmailVerificado(),
      codigoVerificacao: usuario.getCodigoVerificacao(),
      expiracaoCodigo: usuario.getExpiracaoCodigo(),
    });

    await this.usuarioRepository.atualizar(props.id, usuarioAtualizado);
  }
}
