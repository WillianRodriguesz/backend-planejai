import { Injectable, Inject } from '@nestjs/common';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { CategoriaDto } from '../../dtos/categoria/categoria.dto';
import { CategoriaMapper } from '../../mappers/categoria.mapper';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';

@Injectable()
export class BuscarCategoriaPorIdQuery {
  constructor(
    @Inject('CategoriaRepository')
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  async execute(id: number): Promise<CategoriaDto> {
    const categoria = await this.categoriaRepository.buscarPorId(id);

    if (!categoria) {
      throw new DomainException(`Categoria com ID ${id} não encontrada`);
    }

    return CategoriaMapper.DomainToDto(categoria);
  }
}
