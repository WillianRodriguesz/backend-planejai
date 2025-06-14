import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CriarUsuarioUseCase } from '../application/usecases/usuario/criar-usuario.usecase';
import { ListarTodosUseCase } from '../application/usecases/usuario/listar-usuarios.usecase';
import { DeletarUsecase } from '../application/usecases/usuario/deletar-usuario.usecase';
import { CriarUsuarioDto } from '../application/dtos/usuario/criar-usuario.dto';

@Controller('usuarios')
export class UsuarioControle {
  constructor(
    private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
    private readonly listarTodosUseCase: ListarTodosUseCase,
    private readonly deletarUseCase: DeletarUsecase,
  ) {}

  @Post()
  async criarUsuario(@Body(new ValidationPipe()) dto: CriarUsuarioDto) {
    return await this.criarUsuarioUseCase.executar(dto);
  }

  @Get()
  async listarTodos() {
    return this.listarTodosUseCase.listarTodos();
  }

  //TODO Terminar os métodos de atualizar e atualizar parcialmente
  // @Put(':id')
  // async atualizar() {
  //   return;
  // }
  // @Patch(':id')
  // async atualizarParcialmente() {
  //   return;
  // }


  // ENDPOINT PARA AUTENTICAR USUARIO
  // @Post('autenticar')
  // async autenticar(@Body() dto: AutenticarUsuarioDto) {
  //   return this.autenticarUseCase.executar(dto);
  
  @Delete(':id')
  async deletar(@Param('id') id: string) {
    return this.deletarUseCase.delete(id);
  }
}
