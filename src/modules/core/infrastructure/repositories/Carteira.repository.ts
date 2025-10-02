import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carteira } from '../../domain/Carteira';
import { CarteiraModel } from '../models/Carteira.model';
import { CarteiraMapper } from '../mappers/Carteira.mapper';

@Injectable()
export class CarteiraRepositoryImpl {
  constructor(
    @InjectRepository(CarteiraModel)
    private readonly carteiraRepo: Repository<CarteiraModel>,
  ) {}

  async findById(id: string): Promise<Carteira | null> {
    const model = await this.carteiraRepo.findOne({
      where: { id },
      relations: ['lancamentos', 'saldosMensais'],
    });
    if (!model) return null;

    return CarteiraMapper.ModelToDomain(model);
  }

  async save(carteira: Carteira): Promise<void> {
    const modelData = CarteiraMapper.DomainToModel(carteira);
    const model = this.carteiraRepo.create(modelData);
    await this.carteiraRepo.save(model);
  }
}
