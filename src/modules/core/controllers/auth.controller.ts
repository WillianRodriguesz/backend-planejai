import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';
import { LoginUsuarioUseCase } from '../application/usecases/usuario/login-usuario.usecase';
import { VerificarEmailUseCase } from '../application/usecases/usuario/verificar-email.usecase';
import { ReenviarCodigoUseCase } from '../application/usecases/usuario/reenviar-codigo.usecase';
import { SolicitarRedefinicaoSenhaUseCase } from '../application/usecases/usuario/solicitar-redefinicao-senha.usecase';
import { RedefinirSenhaUseCase } from '../application/usecases/usuario/redefinir-senha.usecase';
import { LoginUsuarioDto } from '../application/dtos/usuario/login-usuario.dto';
import { VerificarEmailDto } from '../application/dtos/usuario/verificar-email.dto';
import { ReenviarCodigoDto } from '../application/dtos/usuario/reenviar-codigo.dto';
import { SolicitarRedefinicaoSenhaDto } from '../application/dtos/usuario/solicitar-redefinicao-senha.dto';
import { RedefinirSenhaDto } from '../application/dtos/usuario/redefinir-senha.dto';
import { UsuarioDto } from '../application/dtos/usuario/usuario.dto';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';
import { UsuarioHttpErrorMapper } from '../../../shared/infrastructure/mappers/usuario-http-error.mapper';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUsuarioUseCase: LoginUsuarioUseCase,
    private readonly verificarEmailUseCase: VerificarEmailUseCase,
    private readonly reenviarCodigoUseCase: ReenviarCodigoUseCase,
    private readonly solicitarRedefinicaoSenhaUseCase: SolicitarRedefinicaoSenhaUseCase,
    private readonly redefinirSenhaUseCase: RedefinirSenhaUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: LoginUsuarioDto, @Res() res: Response) {
    const result = await this.loginUsuarioUseCase.execute(body);
    res.cookie('access_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hora
    });
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Login realizado com sucesso',
    });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Logout realizado com sucesso',
    });
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  async validateToken() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Token válido',
    };
  }

  @Post('verificar-email')
  @UseGuards(ThrottlerGuard)
  async verificarEmail(@Body() body: VerificarEmailDto): Promise<UsuarioDto> {
    try {
      return await this.verificarEmailUseCase.execute(body);
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }

  @Post('reenviar-codigo')
  @UseGuards(ThrottlerGuard)
  async reenviarCodigo(
    @Body() body: ReenviarCodigoDto,
  ): Promise<{ message: string }> {
    try {
      return await this.reenviarCodigoUseCase.execute(body);
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }

  @Post('solicitar-redefinicao-senha')
  @UseGuards(ThrottlerGuard)
  async solicitarRedefinicaoSenha(
    @Body() body: SolicitarRedefinicaoSenhaDto,
  ): Promise<{ message: string }> {
    try {
      return await this.solicitarRedefinicaoSenhaUseCase.execute(body);
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }

  @Post('redefinir-senha')
  @UseGuards(ThrottlerGuard)
  async redefinirSenha(@Body() body: RedefinirSenhaDto): Promise<UsuarioDto> {
    try {
      return await this.redefinirSenhaUseCase.execute(body);
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }
}
