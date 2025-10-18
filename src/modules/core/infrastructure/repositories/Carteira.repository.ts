import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carteira } from '../../domain/carteira';
import { CarteiraModel } from '../models/carteira.model';
import { CarteiraMapper } from '../mappers/carteira.mapper';
import { CarteiraRepository } from '../../domain/repositories/carteira.repository';
import { RepositoryException } from '../exceptions/repository.exception';

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
      throw new RepositoryException('Erro interno ao buscar carteira', error);
    }
  }

  async salvar(carteira: Carteira): Promise<void> {
    try {
      this.logger.log(`Iniciando salvamento da carteira ${carteira.getId()}`);

      const modelData = CarteiraMapper.DomainToModel(carteira);
      this.logger.debug(
        `Dados mapeados para model: ${JSON.stringify({
          id: modelData.id,
          usuarioId: modelData.usuarioId,
          totalLancamentos: modelData.lancamentos?.length || 0,
          totalSaldos: modelData.saldosMensais?.length || 0,
        })}`,
      );

      // Log dos lançamentos
      if (modelData.lancamentos && modelData.lancamentos.length > 0) {
        this.logger.log(
          `Total de lançamentos a salvar: ${modelData.lancamentos.length}`,
        );
        modelData.lancamentos.forEach((lanc, index) => {
          this.logger.debug(
            `Lançamento ${index}: ID=${lanc.id}, Valor=${lanc.valor}, Descricao=${lanc.descricao}, CategoriaId=${lanc.categoriaId}`,
          );
        });
      }

      // Log dos saldos
      if (modelData.saldosMensais && modelData.saldosMensais.length > 0) {
        this.logger.log(
          `Total de saldos mensais a salvar: ${modelData.saldosMensais.length}`,
        );
        modelData.saldosMensais.forEach((saldo, index) => {
          this.logger.debug(
            `Saldo ${index}: ID=${saldo.id}, Mes=${saldo.mes}, Ano=${saldo.ano}, Valor=${saldo.saldoMes}`,
          );
        });
      }

      const model = this.carteiraRepository.create(modelData);
      this.logger.log('Model criado, executando save...');

      const resultado = await this.carteiraRepository.save(model);
      this.logger.log(
        `Save executado com sucesso! Resultado: ${JSON.stringify(resultado)}`,
      );
    } catch (error) {
      this.logger.error(
        `Erro ao salvar carteira: ${error.message}`,
        error.stack,
      );
      throw new RepositoryException('Erro interno ao salvar carteira', error);
    }
  }
}
