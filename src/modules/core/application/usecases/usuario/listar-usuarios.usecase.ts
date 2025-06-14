import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from 'src/modules/core/domain/entities/repositories/usuario.repository.interface';
import { UsuarioMapper } from '../../mappers/usuario.mapper';

@Injectable()
export class ListarTodosUseCase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    
  ) {}

  async listarTodos() {
    const usuarios = await this.usuarioRepository.listarTodos();

    if(!usuarios || (await usuarios).length === 0 ){
      throw new NotFoundException ('Nenhum usúario encontrado');
    } else{
      return UsuarioMapper.toDtoList(usuarios);
    }
    //validei para verificar se existe usuarios, retornando uma exceptions ou um array de DTOS.
  }
}
