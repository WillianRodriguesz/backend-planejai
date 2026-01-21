import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';
import { UsuarioHttpErrorMapper } from '../../../shared/infrastructure/mappers/usuario-http-error.mapper';
import { AtualizarAvatarDto } from '../application/dtos/usuario/atualizar-avatar.dto';
import { AtualizarUsuarioDto } from '../application/dtos/usuario/atualizar-usuario.dto';
import { CriarUsuarioDto } from '../application/dtos/usuario/criar-usuario.dto';
import { TrocarSenhaDto } from '../application/dtos/usuario/trocar-senha.dto';
import { UsuarioDto } from '../application/dtos/usuario/usuario.dto';
import { AtualizarAvatarUseCase } from '../application/usecases/usuario/atualizar-avatar.usecase';
import { AtualizarUsuarioUseCase } from '../application/usecases/usuario/atualizar-usuario.usecase';
import { BuscarUsuarioUseCase } from '../application/usecases/usuario/buscar-usuario.usecase';
import { CriarUsuarioUseCase } from '../application/usecases/usuario/criar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../application/usecases/usuario/deletar-usuario.usecase';
import { TrocarSenhaUseCase } from '../application/usecases/usuario/trocar-senha.usecase';

interface User {
  id: string;
  email: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

@ApiTags('usuarios')
@ApiCookieAuth('access_token')
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

  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({ type: CriarUsuarioDto })
  @Post()
  async criar(@Body() body: CriarUsuarioDto): Promise<{ message: string }> {
    try {
      return await this.criarUsuarioUseCase.execute(body);
    } catch (error) {
      UsuarioHttpErrorMapper.map(error);
    }
  }

  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    type: UsuarioDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBody({ type: AtualizarUsuarioDto })
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

  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
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

  @ApiOperation({ summary: 'Buscar dados do usuário logado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário retornados' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
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

  @ApiOperation({ summary: 'Trocar senha do usuário' })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBody({ type: TrocarSenhaDto })
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

  @ApiOperation({ summary: 'Atualizar avatar do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Avatar atualizado',
    type: UsuarioDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiBody({ type: AtualizarAvatarDto })
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
