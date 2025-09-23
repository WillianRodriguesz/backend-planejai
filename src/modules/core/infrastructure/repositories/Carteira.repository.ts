import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carteira } from '../../domain/aggregate/Carteira';
import { CarteiraModel } from '../models/Carteira.model'; // Seu modelo TypeORM

@Injectable()
export class CarteiraRepositoryImpl {
  constructor(
    @InjectRepository(CarteiraModel)
    private readonly carteiraRepo: Repository<CarteiraModel>,
  ) {}

  async findById(id: string): Promise<Carteira | null> {
    const model = await this.carteiraRepo.findOne({
      where: { id },
      relations: ['lancamentos', 'orcamentos'], // Carrega relacionamentos se necessário
    });
    if (!model) return null;

    // Mapeia do modelo para a entidade de domínio
    return Carteira.reconstruir({
      id: model.id,
      usuarioId: model.usuarioId,
      criadoEm: model.criadoEm,
    });
  }

  async save(carteira: Carteira): Promise<void> {
    // Mapeia da entidade para o modelo
    const model = this.carteiraRepo.create({
      id: carteira.getId(),
      usuarioId: carteira.getUsuarioId(),
      criadoEm: carteira.getCriadoEm(),
    });
    await this.carteiraRepo.save(model);
  }
}
