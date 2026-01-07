import { Injectable } from '@nestjs/common';
import { CategoriaRepositoryImpl } from '../../../infrastructure/repositories/categoria.repository';
import { CategoriaDto } from '../../dtos/categoria/categoria.dto';
import { CategoriaMapper } from '../../mappers/categoria.mapper';

@Injectable()
export class BuscarTodasCategoriasQuery {
  constructor(private readonly categoriaRepository: CategoriaRepositoryImpl) {}

  async execute(): Promise<CategoriaDto[]> {
    const categorias = await this.categoriaRepository.buscarTodas();
    return CategoriaMapper.DomainToDtoList(categorias);
  }
}
