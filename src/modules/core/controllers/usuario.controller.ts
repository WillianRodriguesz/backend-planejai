import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  UseGuards,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CriarUsuarioUseCase } from '../application/usecases/usuario/criar-usuario.usecase';
import { AtualizarUsuarioUseCase } from '../application/usecases/usuario/atualizar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../application/usecases/usuario/deletar-usuario.usecase';
import { BuscarUsuarioPorIdUseCase } from '../application/usecases/usuario/buscar-usuario-por-id.usecase';
import { BuscarUsuarioUseCase } from '../application/usecases/usuario/buscar-usuario.usecase';
import { TrocarSenhaUseCase } from '../application/usecases/usuario/trocar-senha.usecase';
import { AtualizarAvatarUseCase } from '../application/usecases/usuario/atualizar-avatar.usecase';
import { CriarUsuarioDto } from '../application/dtos/usuario/criar-usuario.dto';
import { AtualizarUsuarioDto } from '../application/dtos/usuario/atualizar-usuario.dto';
import { TrocarSenhaDto } from '../application/dtos/usuario/trocar-senha.dto';
import { AtualizarAvatarDto } from '../application/dtos/usuario/atualizar-avatar.dto';
import { UsuarioDto } from '../application/dtos/usuario/usuario.dto';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';

interface User {
  id: string;
  email: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
    private readonly atualizarUsuarioUseCase: AtualizarUsuarioUseCase,
    private readonly deletarUsuarioUseCase: DeletarUsuarioUseCase,
    private readonly buscarUsuarioUseCase: BuscarUsuarioUseCase,
    private readonly trocarSenhaUseCase: TrocarSenhaUseCase,
    private readonly atualizarAvatarUseCase: AtualizarAvatarUseCase,
  ) {}

  @Post()
  async criar(@Body() body: CriarUsuarioDto): Promise<UsuarioDto> {
    return this.criarUsuarioUseCase.execute(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async atualizar(
    @Req() req: AuthenticatedRequest,
    @Body() body: AtualizarUsuarioDto,
  ): Promise<UsuarioDto> {
    const userId = req.user.id;
    return this.atualizarUsuarioUseCase.execute({ id: userId, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
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

  @UseGuards(JwtAuthGuard)
  @Patch('senha')
  async trocarSenha(
    @Req() req: AuthenticatedRequest,
    @Body() body: TrocarSenhaDto,
  ): Promise<{ statusCode: number; message: string }> {
    const userId = req.user.id;
    await this.trocarSenhaUseCase.execute({
      id: userId,
      senhaAtual: body.senhaAtual,
      novaSenha: body.novaSenha,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Senha alterada com sucesso',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('avatar')
  async atualizarAvatar(
    @Req() req: AuthenticatedRequest,
    @Body() body: AtualizarAvatarDto,
  ): Promise<UsuarioDto> {
    const userId = req.user.id;
    return this.atualizarAvatarUseCase.execute({
      id: userId,
      avatar: body.avatar,
    });
  }
}
