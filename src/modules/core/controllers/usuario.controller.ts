import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CriarUsuarioUseCase } from '../application/usecases/usuario/criar-usuario.usecase';
import { CriarUsuarioDto } from '../application/dtos/usuario/criar-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly criarUsuarioUseCase: CriarUsuarioUseCase) {}

  @Post('criar')
  @HttpCode(HttpStatus.CREATED)
  async criar(@Body() dto: CriarUsuarioDto) {
    const result = await this.criarUsuarioUseCase.execute({
      nome: (dto.nome ?? '').trim(),
      email: (dto.email ?? '').trim(),
      telefone: (dto.telefone ?? '').trim(),
      senha: (dto.senha ?? '').trim(),
    });
    return result;
  }
}