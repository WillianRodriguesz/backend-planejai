import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();
    const token = request.cookies?.access_token;

    if (token) {
      try {
        const payload = this.jwtService.verify(token);
        // Verificar se o token expira em menos de 30 minutos (1800 segundos)
        const currentTime = Math.floor(Date.now() / 1000);
        const timeToExpiry = payload.exp - currentTime;
        if (timeToExpiry < 1800) {
          // Menos de 30 minutos
          // Gerar novo token com expiração renovada
          const newToken = this.jwtService.sign({
            sub: payload.sub,
            email: payload.email,
          });
          response.cookie('access_token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 3600000, // 1 hora
          });
        }
      } catch (error) {
        // Token inválido, não renovar
        return false;
      }
    }

    return true;
  }
}
