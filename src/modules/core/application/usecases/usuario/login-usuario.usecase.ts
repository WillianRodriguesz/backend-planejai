import { Injectable, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../infrastructure/services/hash-bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { UsuarioDto } from '../../dtos/usuario/usuario.dto';

export interface LoginUsuarioProps {
  email: string;
  senha: string;
}

export interface LoginResult {
  token: string;
  usuario: UsuarioDto;
}

@Injectable()
export class LoginUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    private readonly hashService: BcryptHashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(props: LoginUsuarioProps): Promise<LoginResult> {
    const usuario = await this.usuarioRepository.buscarPorEmail(props.email);
    if (!usuario) {
      throw new Error('Credenciais inválidas');
    }

    const senhaValida = await this.hashService.compare(
      props.senha,
      usuario.getSenha(),
    );
    if (!senhaValida) {
      throw new Error('Credenciais inválidas');
    }

    const payload = { sub: usuario.getId(), email: usuario.getEmail() };
    const token = this.jwtService.sign(payload);

    return {
      token,
      usuario: UsuarioMapper.DomainToDto(usuario),
    };
  }
}
