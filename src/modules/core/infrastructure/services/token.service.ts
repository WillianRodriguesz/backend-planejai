import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { TokenService, TokenData } from '../../domain/interfaces/token.service';

@Injectable()
export class TokenServiceImpl implements TokenService {
  /**
   * Gera token completamente aleatório (não expõe userId)
   * Token: 64 caracteres hexadecimais (256 bits de entropia)
   */
  gerarToken(): TokenData {
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(token);

    return {
      token,
      tokenHash,
    };
  }

  /**
   * Gera hash SHA-256 do token
   */
  hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Valida formato do token e retorna o hash
   * Token deve ter 64 caracteres hexadecimais
   */
  validarFormatoToken(token: string): string | null {
    // Valida formato: 64 caracteres hexadecimais
    if (token.length !== 64 || !/^[0-9a-f]{64}$/i.test(token)) {
      return null;
    }

    return this.hashToken(token);
  }

  /**
   * Verifica se token expirou
   */
  tokenExpirado(dataExpiracao: Date): boolean {
    return dataExpiracao < new Date();
  }
}
