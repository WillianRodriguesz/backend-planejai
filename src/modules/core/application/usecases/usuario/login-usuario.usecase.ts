import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../domain/interfaces/bcrypt-hash.service';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

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
    @Inject('BcryptHashService')
    private readonly hashService: BcryptHashService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(props: LoginUsuarioProps): Promise<LoginResult> {
    const blockKey = `login_attempts_${props.email}`;
    const blockTime = await this.cacheManager.get(blockKey);

    if (blockTime) {
      throw new HttpException(
        'Muitas tentativas falhidas. Tente novamente em 60 segundos.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const usuario = await this.usuarioRepository.buscarPorEmail(props.email);
    if (!usuario) {
      await this.handleFailedAttempt(props.email);
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    const senhaValida = await this.hashService.compare(
      props.senha,
      usuario.getSenha(),
    );
    if (!senhaValida) {
      await this.handleFailedAttempt(props.email);
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    if (!usuario.getEmailVerificado()) {
      throw new HttpException(
        'Email não verificado. Verifique seu email antes de fazer login.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Resetar contador de tentativas em caso de sucesso
    await this.cacheManager.del(`attempts_${props.email}`);

    const payload = { sub: usuario.getId(), email: usuario.getEmail() };
    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }

  private async handleFailedAttempt(email: string): Promise<void> {
    const attemptsKey = `attempts_${email}`;
    const attempts = (await this.cacheManager.get<number>(attemptsKey)) || 0;
    const newAttempts = attempts + 1;

    if (newAttempts >= 5) {
      // Bloquear por 60 segundos
      await this.cacheManager.set(`login_attempts_${email}`, true, 60 * 1000);
      await this.cacheManager.del(attemptsKey); // Resetar contador
    } else {
      await this.cacheManager.set(attemptsKey, newAttempts, 15 * 60 * 1000); // 15 minutos TTL
    }
  }
}
