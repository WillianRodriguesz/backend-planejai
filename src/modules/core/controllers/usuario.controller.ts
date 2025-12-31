import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CriarUsuarioUseCase } from '../application/usecases/usuario/criar-usuario.usecase';
import { LoginUsuarioUseCase } from '../application/usecases/usuario/login-usuario.usecase';
import { AtualizarUsuarioUseCase } from '../application/usecases/usuario/atualizar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../application/usecases/usuario/deletar-usuario.usecase';
import { BuscarUsuarioPorIdUseCase } from '../application/usecases/usuario/buscar-usuario-por-id.usecase';
import { BuscarUsuarioUseCase } from '../application/usecases/usuario/buscar-usuario.usecase';
import { CriarUsuarioDto } from '../application/dtos/usuario/criar-usuario.dto';
import { LoginUsuarioDto } from '../application/dtos/usuario/login-usuario.dto';
import { AtualizarUsuarioDto } from '../application/dtos/usuario/atualizar-usuario.dto';
import { UsuarioDto } from '../application/dtos/usuario/usuario.dto';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';

interface User {
  id: string;
  email: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
    private readonly loginUsuarioUseCase: LoginUsuarioUseCase,
    private readonly atualizarUsuarioUseCase: AtualizarUsuarioUseCase,
    private readonly deletarUsuarioUseCase: DeletarUsuarioUseCase,
    private readonly buscarUsuarioPorIdUseCase: BuscarUsuarioPorIdUseCase,
    private readonly buscarUsuarioUseCase: BuscarUsuarioUseCase,
  ) {}

  @Post()
  async criar(@Body() body: CriarUsuarioDto): Promise<UsuarioDto> {
    return this.criarUsuarioUseCase.execute(body);
  }

  @Post('/login')
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
  @Put('')
  async atualizar(
    @Req() req: AuthenticatedRequest,
    @Body() body: AtualizarUsuarioDto,
  ): Promise<UsuarioDto> {
    const userId = req.user.id;
    return this.atualizarUsuarioUseCase.execute({ id: userId, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async deletar(@Req() req: AuthenticatedRequest): Promise<void> {
    const userId = req.user.id;
    return this.deletarUsuarioUseCase.execute(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async buscar(
    @Req() req: AuthenticatedRequest,
  ): Promise<{ usuario: UsuarioDto; carteiraId: string }> {
    const userId = req.user.id;
    return this.buscarUsuarioUseCase.execute(userId);
  }
}
