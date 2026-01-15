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
  UseInterceptors,
  HttpException,
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
import { UsuarioHttpErrorMapper } from '../../../shared/infrastructure/mappers/usuario-http-error.mapper';

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
    private readonly atualizarUsuarioUseCase: AtualizarUsuarioUseCase,
    private readonly deletarUsuarioUseCase: DeletarUsuarioUseCase,
    private readonly buscarUsuarioUseCase: BuscarUsuarioUseCase,
    private readonly trocarSenhaUseCase: TrocarSenhaUseCase,
    private readonly atualizarAvatarUseCase: AtualizarAvatarUseCase,
  ) {}

  @Post()
  async criar(@Body() body: CriarUsuarioDto): Promise<{ message: string }> {
    try {
      return await this.criarUsuarioUseCase.execute(body);
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async atualizar(
    @Req() req: AuthenticatedRequest,
    @Body() body: AtualizarUsuarioDto,
  ): Promise<UsuarioDto> {
    try {
      const userId = req.user.id;
      return await this.atualizarUsuarioUseCase.execute({
        id: userId,
        ...body,
      });
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deletar(@Req() req: AuthenticatedRequest): Promise<void> {
    try {
      const userId = req.user.id;
      return await this.deletarUsuarioUseCase.execute(userId);
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async buscar(
    @Req() req: AuthenticatedRequest,
  ): Promise<{ usuario: UsuarioDto; carteiraId: string }> {
    try {
      const userId = req.user.id;
      return await this.buscarUsuarioUseCase.execute(userId);
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('senha')
  async trocarSenha(
    @Req() req: AuthenticatedRequest,
    @Body() body: TrocarSenhaDto,
  ): Promise<{ statusCode: number; message: string }> {
    try {
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
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('avatar')
  async atualizarAvatar(
    @Req() req: AuthenticatedRequest,
    @Body() body: AtualizarAvatarDto,
  ): Promise<UsuarioDto> {
    try {
      const userId = req.user.id;
      return await this.atualizarAvatarUseCase.execute({
        id: userId,
        avatar: body.avatar,
      });
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }
}
