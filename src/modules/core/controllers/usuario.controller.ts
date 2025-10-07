import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { CriarUsuarioUseCase, UsuarioUsecaseProps } from '../application/usecases/usuario/criar-usuario.usecase';
import { UsuarioDto } from '../application/dtos/usuario/usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
  ) {}

  // @Post('/criar')
  // async criar(@Body() body: UsuarioUsecaseProps): Promise<UsuarioDto> {
  //   return this.criarUsuarioUseCase.execute(body);
  // }
}
