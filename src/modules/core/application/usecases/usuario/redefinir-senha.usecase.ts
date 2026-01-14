import { Injectable, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../infrastructure/services/hash-bcrypt.service';
import { TokenService } from '../../../infrastructure/services/token.service';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';
import { UsuarioMapper } from '../../mappers/usuario.mapper';

export interface RedefinirSenhaProps {
  token: string;
  novaSenha: string;
}

@Injectable()
export class RedefinirSenhaUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    private readonly hashService: BcryptHashService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(props: RedefinirSenhaProps): Promise<UsuarioDto> {
    const tokenHash = this.tokenService.validarFormatoToken(props.token);

    if (!tokenHash) {
      throw new Error('Token inválido ou expirado');
    }

    const usuario =
      await this.usuarioRepository.buscarPorTokenRedefinicao(tokenHash);

    if (!usuario) {
      throw new Error('Token inválido ou expirado');
    }

    const expiracaoToken = usuario.getExpiracaoToken();
    if (!expiracaoToken || this.tokenService.tokenExpirado(expiracaoToken)) {
      throw new Error('Token inválido ou expirado');
    }

    const senhaHashed = await this.hashService.hash(props.novaSenha);

    usuario.atualizarSenha(senhaHashed);

    await this.usuarioRepository.atualizar(usuario.getId(), usuario);

    return UsuarioMapper.DomainToDto(usuario);
  }
}
