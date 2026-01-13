import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../infrastructure/services/hash-bcrypt.service';
import { JwtService } from '@nestjs/jwt';

export interface LoginUsuarioProps {
  email: string;
  senha: string;
}

export interface LoginResult {
  token: string;
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
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    const senhaValida = await this.hashService.compare(
      props.senha,
      usuario.getSenha(),
    );
    if (!senhaValida) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    if (!usuario.getEmailVerificado()) {
      throw new HttpException(
        'Email não verificado. Verifique seu email antes de fazer login.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { sub: usuario.getId(), email: usuario.getEmail() };
    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }
}
