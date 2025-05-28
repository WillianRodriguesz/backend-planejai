import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { CriarUsuarioUseCase } from "./use-case/criar-usuario.use-case";
import { CriarUsuarioDto } from "./dto/criar-usuario.dto";
import { ListarTodosUseCase } from "./use-case/listarTodos.use-case";
import { DeletarUsecase } from "./use-case/deletar.use-case";

@Controller('usuarios')
export class UsuarioControle {
    constructor(
        private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
        private readonly listarTodosUseCase: ListarTodosUseCase,
        private readonly deletarUseCase: DeletarUsecase
    
    ) {}

    @Post()
  async criarUsuario(@Body(new ValidationPipe()) dto: CriarUsuarioDto) {
    return await this.criarUsuarioUseCase.executar(dto);
  }

    @Get()
    async listarTodos(){
        return this.listarTodosUseCase.listarTodos(); 
    }

    async atualizar(){
        return;
    }

    async atualizarParcialmente(){
        return;
    }

    @Delete(':id')
    async deletar(@Param('id') id: string){
        return this.deletarUseCase.delete(id);
    }
}