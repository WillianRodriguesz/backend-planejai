import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';

// TODO IMPLEMENTAR
@Controller('usuarios')
export class UsuarioControle {
  constructor(
    // private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
    // private readonly listarTodosUseCase: ListarTodosUseCase,
    // private readonly deletarUseCase: DeletarUsecase,
  ) {}

  // @Post()
  // async criarUsuario(@Body(new ValidationPipe()) dto: CriarUsuarioDto) {
  //   return await this.criarUsuarioUseCase.executar(dto);
  // }

  // @Get()
  // async listarTodos() {
  //   return this.listarTodosUseCase.listarTodos();
  // }

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
  
  // @Delete(':id')
  // async deletar(@Param('id') id: string) {
  //   return this.deletarUseCase.delete(id);
  // }
}
