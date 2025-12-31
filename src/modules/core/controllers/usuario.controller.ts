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
} from '@nestjs/common';
import { Response } from 'express';
import { CriarUsuarioUseCase } from '../application/usecases/usuario/criar-usuario.usecase';
import { LoginUsuarioUseCase } from '../application/usecases/usuario/login-usuario.usecase';
import { AtualizarUsuarioUseCase } from '../application/usecases/usuario/atualizar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../application/usecases/usuario/deletar-usuario.usecase';
import { BuscarUsuarioPorIdUseCase } from '../application/usecases/usuario/buscar-usuario-por-id.usecase';
import { CriarUsuarioDto } from '../application/dtos/usuario/criar-usuario.dto';
import { LoginUsuarioDto } from '../application/dtos/usuario/login-usuario.dto';
import { AtualizarUsuarioDto } from '../application/dtos/usuario/atualizar-usuario.dto';
import { UsuarioDto } from '../application/dtos/usuario/usuario.dto';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
    private readonly loginUsuarioUseCase: LoginUsuarioUseCase,
    private readonly atualizarUsuarioUseCase: AtualizarUsuarioUseCase,
    private readonly deletarUsuarioUseCase: DeletarUsuarioUseCase,
    private readonly buscarUsuarioPorIdUseCase: BuscarUsuarioPorIdUseCase,
  ) {}

  @Post('/criar')
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
    res.status(HttpStatus.OK).json({ usuario: result.usuario });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async buscarPorId(@Param('id') id: string): Promise<UsuarioDto | null> {
    return this.buscarUsuarioPorIdUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async atualizar(
    @Param('id') id: string,
    @Body() body: AtualizarUsuarioDto,
  ): Promise<UsuarioDto> {
    return this.atualizarUsuarioUseCase.execute({ id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletar(@Param('id') id: string): Promise<void> {
    return this.deletarUsuarioUseCase.execute(id);
  }
}
