import { Inject, Injectable } from '@nestjs/common';
import { UsuarioRepository } from 'src/modules/core/domain/entities/repositories/usuario.repository.interface';

@Injectable()
export class ListarTodosUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    
  ) {}

  async listarTodos() {
    return this.usuarioRepository.listarTodos();
    //PRECISA ADICIONAR VALIDAÇÃO E SE NÃO RETORNAR NENHUM? COMO VOU SABER?
    // O RETORNO PRECISA SER UM DTO OU UM ARRAY DE DTOs
    // OU SEJA, CONVERTER A ENTIDADE Usuario PARA UM DTO QUE SERÁ RETORNADO
    // CRIAR UM MAPPER DE DOMINIO DE USUARIO PARA DTO
    // EXEMPLO:
    // domainToDto(usuario: Usuario): UsuarioDto
  }
}
