import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioConsentimento } from '../../domain/usuario-consentimento';
import { UsuarioConsentimentoRepository } from '../../domain/repositories/usuario-consentimento.repository';
import { UsuarioConsentimentoModel } from '../models/usuario-consentimento.model';
import { UsuarioConsentimentoMapper } from '../mappers/usuario-consentimento.mapper';

@Injectable()
export class UsuarioConsentimentoRepositoryImpl
  implements UsuarioConsentimentoRepository
{
  constructor(
    @InjectRepository(UsuarioConsentimentoModel)
    private readonly usuarioConsentimentoModelRepository: Repository<UsuarioConsentimentoModel>,
  ) {}

  async salvar(consentimento: UsuarioConsentimento): Promise<void> {
    const model = UsuarioConsentimentoMapper.DomainToModel(consentimento);
    await this.usuarioConsentimentoModelRepository.save(model);
    consentimento.setId(model.id);
  }

  async buscarPorUsuarioId(
    usuarioId: string,
  ): Promise<UsuarioConsentimento | null> {
    const model = await this.usuarioConsentimentoModelRepository.findOne({
      where: { usuarioId },
      relations: ['termoLgpd', 'termoTermosUso', 'termoPoliticaPrivacidade'],
    });
    return model ? UsuarioConsentimentoMapper.ModelToDomain(model) : null;
  }

  async buscarTodos(): Promise<UsuarioConsentimento[]> {
    const models = await this.usuarioConsentimentoModelRepository.find({
      relations: ['termoLgpd', 'termoTermosUso', 'termoPoliticaPrivacidade'],
    });
    return models.map(UsuarioConsentimentoMapper.ModelToDomain);
  }

  async atualizar(
    id: number,
    consentimento: Partial<UsuarioConsentimento>,
  ): Promise<void> {
    const updateData = UsuarioConsentimentoMapper.DomainToModel(
      consentimento as UsuarioConsentimento,
    );
    await this.usuarioConsentimentoModelRepository.update(id, updateData);
  }

  async deletar(id: number): Promise<void> {
    await this.usuarioConsentimentoModelRepository.delete(id);
  }
}
