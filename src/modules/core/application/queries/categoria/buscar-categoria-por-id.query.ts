import { Injectable } from '@nestjs/common';
import { CategoriaRepositoryImpl } from '../../../infrastructure/repositories/categoria.repository';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { CategoriaDto } from '../../dtos/categoria/categoria.dto';
import { CategoriaMapper } from '../../mappers/categoria.mapper';

@Injectable()
export class BuscarCategoriaPorIdQuery {
  constructor(private readonly categoriaRepository: CategoriaRepositoryImpl) {}

  async execute(id: number): Promise<CategoriaDto> {
    const categoria = await this.categoriaRepository.buscarPorId(id);

    if (!categoria) {
      throw new DomainException(`Categoria com ID ${id} não encontrada`);
    }

    return CategoriaMapper.DomainToDto(categoria);
  }
}
