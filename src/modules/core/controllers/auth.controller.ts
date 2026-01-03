import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginUsuarioUseCase } from '../application/usecases/usuario/login-usuario.usecase';
import { LoginUsuarioDto } from '../application/dtos/usuario/login-usuario.dto';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUsuarioUseCase: LoginUsuarioUseCase) {}

  @Post('login')
  async login(@Body() body: LoginUsuarioDto, @Res() res: Response) {
    const result = await this.loginUsuarioUseCase.execute(body);
    res.cookie('access_token', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7200000, // 2 horas
    });
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Login realizado com sucesso',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Logout realizado com sucesso',
    });
  }
}
