import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { CriarUsuarioUseCase, UsuarioUsecaseProps } from '../application/usecases/usuario/criar-usuario.usecase';
import { UsuarioDto } from '../application/dtos/usuario/usuario.dto';
import { LoginDto } from '../application/dtos/usuario/login-usuario.dto';
import { LoginUsuarioUseCase } from '../application/usecases/usuario/login-usuario.usecase';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
    private readonly loginUsuarioUseCase: LoginUsuarioUseCase
  ) {}

  @Post('/criar')
  async criar(@Body() body: UsuarioUsecaseProps): Promise<UsuarioDto> {
    return this.criarUsuarioUseCase.execute(body);
  }

  @Post('/login')
    async login(@Body() dto: LoginDto){
      return this.loginUsuarioUseCase.executar(dto);
    }
}
