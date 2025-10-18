import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carteira } from '../../domain/carteira';
import { CarteiraModel } from '../models/carteira.model';
import { LancamentoModel } from '../models/lancamento.model';
import { SaldoMensalModel } from '../models/saldo-mensal.model';
import { CarteiraMapper } from '../mappers/carteira.mapper';
import { LancamentoMapper } from '../mappers/lancamento.mapper';
import { SaldoMensalMapper } from '../mappers/saldo-mensal.mapper';
import { CarteiraRepository } from '../../domain/repositories/carteira.repository';
import { RepositoryException } from '../exceptions/repository.exception';

@Injectable()
export class CarteiraRepositoryImpl implements CarteiraRepository {
  private readonly logger = new Logger(CarteiraRepositoryImpl.name);

  constructor(
    @InjectRepository(CarteiraModel)
    private readonly carteiraRepository: Repository<CarteiraModel>,
    @InjectRepository(LancamentoModel)
    private readonly lancamentoRepository: Repository<LancamentoModel>,
    @InjectRepository(SaldoMensalModel)
    private readonly saldoMensalRepository: Repository<SaldoMensalModel>,
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
      this.logger.error(`Erro ao buscar carteira com ID ${id}: ${error.message}`, error.stack);
      throw new RepositoryException('Erro interno ao buscar carteira', error);
    }
  }

  async salvar(carteira: Carteira): Promise<void> {
    try {
      this.logger.log(`Salvando agregado Carteira ${carteira.getId()}`);

      let carteiraId = carteira.getId();
      
      if (!carteiraId) {
        const savedCarteira = await this.carteiraRepository.save({
          usuarioId: carteira.getUsuarioId(),
          criadoEm: carteira.getCriadoEm(),
        });
        carteiraId = savedCarteira.id;
        carteira['setId'](carteiraId);
      } else {
        await this.carteiraRepository.save({
          id: carteiraId,
          usuarioId: carteira.getUsuarioId(),
          criadoEm: carteira.getCriadoEm(),
        });
      }

      const lancamentosNovos = carteira.getLancamentos().filter(l => !l.getId());
      
      for (const lancamentoDomain of lancamentosNovos) {
        const lancamentoModel = LancamentoMapper.DomainToModel(lancamentoDomain);
        lancamentoModel.carteiraId = carteiraId;
        
        await this.lancamentoRepository.save(lancamentoModel);
        
        this.logger.debug(`Lançamento salvo`);
      }

      const saldosNovos = carteira.getSaldosMensais().filter(s => !s.getId());
      
      for (const saldoDomain of saldosNovos) {
        const saldoModel = SaldoMensalMapper.DomainToModel(saldoDomain);
        saldoModel.carteiraId = carteiraId;
        
        await this.saldoMensalRepository.save(saldoModel);
        
        this.logger.debug(`Saldo salvo`);
      }

      const saldosExistentes = carteira.getSaldosMensais().filter(s => s.getId());
      
      for (const saldoDomain of saldosExistentes) {
        await this.saldoMensalRepository.update(
          { id: parseInt(saldoDomain.getId()) },
          { saldoMes: saldoDomain.getSaldoMes() }
        );
        
        this.logger.debug(`Saldo atualizado: ID=${saldoDomain.getId()}`);
      }

      this.logger.log('Agregado Carteira salvo com sucesso');
    } catch (error) {
      this.logger.error(`Erro ao salvar carteira: ${error.message}`, error.stack);
      throw new RepositoryException('Erro interno ao salvar carteira', error);
    }
  }

  async buscarPorUsuarioId(usuarioId: string): Promise<Carteira | null> {
    try {
      const model = await this.carteiraRepository.findOne({
        where: { usuarioId },
        relations: ['lancamentos', 'lancamentos.categoria', 'saldosMensais'],
      });

      if (!model) {
        this.logger.warn(`Carteira do usuário ${usuarioId} não encontrada`);
        return null;
      }

      return CarteiraMapper.ModelToDomain(model);
    } catch (error) {
      this.logger.error(`Erro ao buscar carteira do usuário ${usuarioId}: ${error.message}`, error.stack);
      throw new RepositoryException('Erro interno ao buscar carteira por usuário', error);
    }
  }
}