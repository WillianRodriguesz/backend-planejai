import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carteira } from '../../domain/Carteira';
import { CarteiraModel } from '../models/Carteira.model';
import { CarteiraMapper } from '../mappers/Carteira.mapper';
import { CarteiraRepository } from '../../domain/repositories/Carteira.repository';

@Injectable()
export class CarteiraRepositoryImpl implements CarteiraRepository {
  private readonly logger = new Logger(CarteiraRepositoryImpl.name);

  constructor(
    @InjectRepository(CarteiraModel)
    private readonly carteiraRepository: Repository<CarteiraModel>,
  ) {}

  async buscarPorId(id: string): Promise<Carteira | null> {
    try {
      const model = await this.carteiraRepository.findOne({
        where: { id },
        relations: ['lancamentos', 'lancamentos.categoria', 'saldosMensais'],
      });

      if (!model) {
        this.logger.warn(`Carteira com ID ${id} não encontrada`);
        return null;
      }

      return CarteiraMapper.ModelToDomain(model);
    } catch (error) {
      this.logger.error(
        `Erro ao buscar carteira com ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new Error('Erro interno ao buscar carteira');
    }
  }

  async salvar(carteira: Carteira): Promise<void> {
    try {
      const modelData = CarteiraMapper.DomainToModel(carteira);
      const model = this.carteiraRepository.create(modelData);
      await this.carteiraRepository.save(model);
    } catch (error) {
      this.logger.error(
        `Erro ao salvar carteira: ${error.message}`,
        error.stack,
      );
      throw new Error('Erro interno ao salvar carteira');
    }
  }
}
