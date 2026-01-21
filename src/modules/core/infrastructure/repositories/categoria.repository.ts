import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaModel } from '../models/categoria.model';
import { CategoriaMapper } from '../mappers/categoria.mapper';
import { RepositoryException } from '../exceptions/repository.exception';
import { CategoriaRepository } from '../../domain/repositories/categoria.repository';
import { Categoria } from '../../domain/categoria';

@Injectable()
export class CategoriaRepositoryImpl implements CategoriaRepository {
  private readonly logger = new Logger(CategoriaRepositoryImpl.name);

  constructor(
    @InjectRepository(CategoriaModel)
    private readonly categoriaRepository: Repository<CategoriaModel>,
  ) {}

  async buscarPorId(id: number): Promise<Categoria | null> {
    try {
      const model = await this.categoriaRepository.findOne({
        where: { id },
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
      throw new RepositoryException('Erro interno ao buscar categoria', error);
    }
  }

  async buscarTodas(): Promise<Categoria[]> {
    try {
      const models = await this.categoriaRepository.find({
        order: { nome: 'ASC' },
      });

      return models.map((model) => CategoriaMapper.ModelToDomain(model));
    } catch (error) {
      this.logger.error(
        `Erro ao buscar todas as categorias: ${error.message}`,
        error.stack,
      );
      throw new RepositoryException('Erro interno ao buscar categorias', error);
    }
  }
}
