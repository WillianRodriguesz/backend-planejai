import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../../domain/categoria';
import { CategoriaModel } from '../models/categoria.model';
import { CategoriaMapper } from '../mappers/categoria.mapper';
import { CategoriaRepository } from '../../domain/repositories/Categoria.repository';

@Injectable()
export class CategoriaRepositoryImpl implements CategoriaRepository {
  private readonly logger = new Logger(CategoriaRepositoryImpl.name);

  constructor(
    @InjectRepository(CategoriaModel)
    private readonly categoriaRepository: Repository<CategoriaModel>,
  ) {}

  async buscarPorId(id: string): Promise<Categoria | null> {
    try {
      const model = await this.categoriaRepository.findOne({
        where: { id: parseInt(id) },
      });

      if (!model) {
        this.logger.warn(`Categoria com ID ${id} não encontrada`);
        return null;
      }

      return CategoriaMapper.ModelToDomain(model);
    } catch (error) {
      this.logger.error(
        `Erro ao buscar categoria com ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new Error('Erro interno ao buscar categoria');
    }
  }
}
