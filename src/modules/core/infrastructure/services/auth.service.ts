import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptHashService } from './hash-bcrypt.service';
import { UsuariosCredenciaisRepository } from '../../domain/repositories/UsuariosCredenciais.repository';

export type LoginResultado = {
  accessToken: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    telefone?: string;
  };
};

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsuariosCredenciaisRepository')
    private readonly repo: UsuariosCredenciaisRepository,
    private readonly jwt: JwtService,
    @Inject('HashService') private readonly hashService: BcryptHashService,
  ) {}

  async loginPorTelefone(
    telefone: string,
    senha: string,
  ): Promise<LoginResultado> {
    const tel = (telefone ?? '').trim();
    const pwd = (senha ?? '').trim();

    const registro = await this.repo.findPorTelefone(tel);
    if (!registro) throw new UnauthorizedException('Credenciais inválidas');

    const { usuario, passwordHash } = registro;
    const stored = (passwordHash ?? '').trim();

    const isValidBcrypt =
      stored.length === 60 &&
      stored.indexOf('\\') === -1 &&
      /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(stored);
    if (!isValidBcrypt) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const ok = await this.hashService.compare(pwd, stored);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { sub: usuario.getId(), tel: usuario.getTelefone() };
    const accessToken = await this.jwt.signAsync(payload);
    return {
      accessToken,
      usuario: {
        id: usuario.getId(),
        nome: usuario.getNome(),
        email: usuario.getEmail(),
        telefone: usuario.getTelefone(),
      },
    };
  }
}
