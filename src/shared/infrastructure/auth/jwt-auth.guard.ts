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
        // Gerar novo token com expiração renovada
        const newToken = this.jwtService.sign(payload);
        response.cookie('access_token', newToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 3600000, // 1 hora
        });
      } catch (error) {
        // Token inválido, não renovar
        return false;
      }
    }

    return true;
  }
}
