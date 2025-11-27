import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginUsuarioUseCase } from '../application/usecases/usuario/login-usuario.usecase';
import { LoginUsuarioDto } from '../application/dtos/usuario/login-usuario.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUsuarioUseCase: LoginUsuarioUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUsuarioDto, @Res() res: Response) {
    const result = await this.loginUsuarioUseCase.execute({
      telefone: (dto.telefone ?? '').trim(),
      senha: (dto.senha ?? '').trim(),
    });

    res.cookie('auth_token', result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.status(HttpStatus.OK).send('Acesso autorizado');
  }
}