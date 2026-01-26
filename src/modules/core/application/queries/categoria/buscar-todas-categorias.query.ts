import { Injectable, Inject } from '@nestjs/common';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';
import { CategoriaDto } from '../../dtos/categoria/categoria.dto';
import { CategoriaMapper } from '../../mappers/categoria.mapper';

@Injectable()
export class BuscarTodasCategoriasQuery {
  constructor(
    @Inject('CategoriaRepository')
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  async execute(): Promise<CategoriaDto[]> {
    const categorias = await this.categoriaRepository.buscarTodas();
    return CategoriaMapper.DomainToDtoList(categorias);
  }
}
