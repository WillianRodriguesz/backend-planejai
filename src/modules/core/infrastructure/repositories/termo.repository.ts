import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Termo, TipoTermo } from '../../domain/termo';
import { TermoRepository } from '../../domain/repositories/termo.repository';
import { TermoModel } from '../models/termo.model';
import { TermoMapper } from '../mappers/termo.mapper';

@Injectable()
export class TermoRepositoryImpl implements TermoRepository {
  constructor(
    @InjectRepository(TermoModel)
    private readonly termoModelRepository: Repository<TermoModel>,
  ) {}

  async salvar(termo: Termo): Promise<void> {
    const model = TermoMapper.DomainToModel(termo);
    await this.termoModelRepository.save(model);
    termo.setId(model.id);
  }

  async buscarPorId(id: number): Promise<Termo | null> {
    const model = await this.termoModelRepository.findOne({ where: { id } });
    return model ? TermoMapper.ModelToDomain(model) : null;
  }

  async buscarPorTipoEVersao(
    tipo: TipoTermo,
    versao: string,
  ): Promise<Termo | null> {
    const model = await this.termoModelRepository.findOne({
      where: { tipo, versao },
    });
    return model ? TermoMapper.ModelToDomain(model) : null;
  }

  async buscarAtivoPorTipo(tipo: TipoTermo): Promise<Termo | null> {
    const model = await this.termoModelRepository.findOne({
      where: { tipo, ativo: true },
      order: { criadoEm: 'DESC' },
    });
    return model ? TermoMapper.ModelToDomain(model) : null;
  }

  async buscarTodos(): Promise<Termo[]> {
    const models = await this.termoModelRepository.find();
    return models.map(TermoMapper.ModelToDomain);
  }

  async atualizar(id: number, termo: Partial<Termo>): Promise<void> {
    const updateData = TermoMapper.DomainToModel(termo as Termo);
    await this.termoModelRepository.update(id, updateData);
  }

  async deletar(id: number): Promise<void> {
    await this.termoModelRepository.delete(id);
  }
}
