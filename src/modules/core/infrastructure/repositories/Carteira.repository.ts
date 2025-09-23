import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carteira } from '../../domain/Carteira';
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
      relations: ['lancamentos', 'saldosMensais'], // Carrega relacionamentos se necessário
    });
    if (!model) return null;

    // Mapeia do modelo para a entidade de domínio
    const lancamentos = model.lancamentos
      ? model.lancamentos.map((l) => ({
          id: l.id.toString(),
          carteiraId: l.carteiraId,
          valor: l.valor,
          descricao: l.descricao,
          data: l.data,
        }))
      : [];

    const saldosMensais = model.saldosMensais
      ? model.saldosMensais.map((s) => ({
          id: s.id.toString(),
          carteiraId: s.carteiraId,
          mes: s.mes,
          ano: s.ano,
          saldoMes: s.saldoMes,
        }))
      : [];

    return Carteira.reconstruir({
      id: model.id,
      usuarioId: model.usuarioId,
      criadoEm: model.criadoEm,
      lancamentos,
      saldosMensais,
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
