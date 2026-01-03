import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Carteira } from '../../domain/carteira';
import { Lancamento } from '../../domain/lancamento';
import { CarteiraModel } from '../models/carteira.model';
import { LancamentoModel } from '../models/lancamento.model';
import { SaldoMensalModel } from '../models/saldo-mensal.model';
import { CarteiraMapper } from '../mappers/carteira.mapper';
import { LancamentoMapper } from '../mappers/lancamento.mapper';
import {
  CarteiraRepository,
  FiltrosLancamento,
} from '../../domain/repositories/carteira.repository';
import { RepositoryException } from '../exceptions/repository.exception';

@Injectable()
export class CarteiraRepositoryImpl implements CarteiraRepository {
  private readonly logger = new Logger(CarteiraRepositoryImpl.name);

  constructor(
    @InjectRepository(CarteiraModel)
    private readonly carteiraRepository: Repository<CarteiraModel>,
    private readonly dataSource: DataSource,
  ) {}

  async buscarPorId(id: string): Promise<Carteira | null> {
    try {
      console.log('\n📦 === REPOSITORY: BuscarPorId ===');
      console.log('Buscando carteira ID:', id);

      const model = await this.carteiraRepository.findOne({
        where: { id },
        relations: ['lancamentos', 'lancamentos.categoria', 'saldosMensais'],
        order: {
          lancamentos: {
            data: 'DESC', // Ordenar lançamentos por data decrescente
          },
        },
      });

      if (!model) {
        this.logger.warn(`Carteira com ID ${id} não encontrada`);
        return null;
      }

      console.log(
        'Carteira encontrada no DB com',
        model.lancamentos?.length || 0,
        'lançamentos',
      );
      console.log(
        'Lançamentos do DB:',
        model.lancamentos?.map((l) => ({
          id: l.id,
          titulo: l.titulo,
          valor: l.valor,
          tipo: l.tipo,
          data: l.data,
        })),
      );
      console.log(
        'Saldos mensais do DB:',
        model.saldosMensais?.map((s) => ({
          mes: s.mes,
          ano: s.ano,
          saldo: s.saldoMes,
        })),
      );

      const carteiraDomain = CarteiraMapper.ModelToDomain(model);
      console.log(
        'Carteira convertida para domain com',
        carteiraDomain.getLancamentos().length,
        'lançamentos',
      );
      console.log('📦 === FIM REPOSITORY ===\n');

      return carteiraDomain;
    } catch (error) {
      this.logger.error(
        `Erro ao buscar carteira: ${error.message}`,
        error.stack,
      );
      throw new RepositoryException('Erro interno ao buscar carteira', error);
    }
  }

  async salvar(carteira: Carteira): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.log(`Salvando agregado Carteira ${carteira.getId()}`);

      const carteiraModel = CarteiraMapper.DomainToModel(carteira);

      await queryRunner.manager.save(CarteiraModel, {
        id: carteiraModel.id,
        usuarioId: carteiraModel.usuarioId,
        criadoEm: carteiraModel.criadoEm,
      });

      const idsLancamentosRemovidos = carteira.getLancamentosRemovidos();
      if (idsLancamentosRemovidos.length > 0) {
        await queryRunner.manager.delete(
          LancamentoModel,
          idsLancamentosRemovidos,
        );
        carteira.limparLancamentosRemovidos();
      }

      if (carteiraModel.lancamentos?.length > 0) {
        await queryRunner.manager.save(
          LancamentoModel,
          carteiraModel.lancamentos,
        );
      }

      const saldosNovos =
        carteiraModel.saldosMensais?.filter((s) => !s.id) || [];
      const saldosExistentes =
        carteiraModel.saldosMensais?.filter((s) => s.id) || [];

      if (saldosNovos.length > 0) {
        await queryRunner.manager.save(SaldoMensalModel, saldosNovos);
      }

      for (const saldo of saldosExistentes) {
        await queryRunner.manager.update(SaldoMensalModel, saldo.id, {
          saldoMes: saldo.saldoMes,
        });
      }

      await queryRunner.commitTransaction();
      this.logger.log('Agregado Carteira salvo com sucesso');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Erro ao salvar carteira: ${error.message}`,
        error.stack,
      );
      throw new RepositoryException('Erro interno ao salvar carteira', error);
    } finally {
      await queryRunner.release();
    }
  }

  async buscarPorUsuarioId(usuarioId: string): Promise<Carteira | null> {
    try {
      const model = await this.carteiraRepository.findOne({
        where: { usuarioId },
        relations: ['lancamentos', 'lancamentos.categoria', 'saldosMensais'],
        order: {
          lancamentos: {
            data: 'DESC',
          },
        },
      });

      if (!model) {
        this.logger.warn(`Carteira do usuário ${usuarioId} não encontrada`);
        return null;
      }

      return CarteiraMapper.ModelToDomain(model);
    } catch (error) {
      this.logger.error(
        `Erro ao buscar carteira: ${error.message}`,
        error.stack,
      );
      throw new RepositoryException(
        'Erro interno ao buscar carteira por usuário',
        error,
      );
    }
  }

  async buscarLancamentosFiltrados(
    filtros: FiltrosLancamento,
  ): Promise<Lancamento[]> {
    try {
      const queryBuilder = this.dataSource
        .getRepository(LancamentoModel)
        .createQueryBuilder('lancamento')
        .leftJoinAndSelect('lancamento.categoria', 'categoria')
        .where('lancamento.carteiraId = :carteiraId', {
          carteiraId: filtros.carteiraId,
        });

      if (filtros.dataInicial) {
        queryBuilder.andWhere('lancamento.data >= :dataInicial', {
          dataInicial: filtros.dataInicial,
        });
      }

      if (filtros.dataFinal) {
        queryBuilder.andWhere('lancamento.data <= :dataFinal', {
          dataFinal: filtros.dataFinal,
        });
      }

      if (filtros.idCategoria) {
        queryBuilder.andWhere('lancamento.categoriaId = :idCategoria', {
          idCategoria: filtros.idCategoria,
        });
      }

      if (filtros.titulo) {
        queryBuilder.andWhere('LOWER(lancamento.titulo) LIKE LOWER(:titulo)', {
          titulo: `%${filtros.titulo}%`,
        });
      }

      if (filtros.tipoTransacao) {
        queryBuilder.andWhere('lancamento.tipo = :tipoTransacao', {
          tipoTransacao: filtros.tipoTransacao,
        });
      }

      queryBuilder.orderBy('lancamento.data', 'DESC');

      const models = await queryBuilder.getMany();

      return models.map((model) => LancamentoMapper.ModelToDomain(model));
    } catch (error) {
      this.logger.error(
        `Erro ao buscar lançamentos filtrados: ${error.message}`,
        error.stack,
      );
      throw new RepositoryException(
        'Erro interno ao buscar lançamentos filtrados',
        error,
      );
    }
  }
}
