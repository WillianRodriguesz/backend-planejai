import { Carteira } from '../../domain/carteira';
import { CarteiraModel } from '../models/carteira.model';
import { LancamentoMapper } from './lancamento.mapper';
import { SaldoMensalMapper } from './saldo-mensal.mapper';
import { Logger } from '@nestjs/common';

export class CarteiraMapper {
  private static readonly logger = new Logger(CarteiraMapper.name);

  static ModelToDomain(model: CarteiraModel): Carteira {
    const lancamentos = LancamentoMapper.ModelToDomainList(
      model.lancamentos || [],
    );
    const saldosMensais = SaldoMensalMapper.ModelToDomainList(
      model.saldosMensais || [],
    );

    const domain = Carteira.carregar({
      id: model.id,
      usuarioId: model.usuarioId,
      criadoEm: model.criadoEm,
      lancamentos,
      saldosMensais,
    });

    return domain;
  }

  static ModelToDomainList(models: CarteiraModel[]): Carteira[] {
    const listDomains = models.map((model) => this.ModelToDomain(model));
    return listDomains;
  }

  static DomainToModel(domain: Carteira): CarteiraModel {
    this.logger.log(`Convertendo Carteira Domain para Model. ID: ${domain.getId()}`);
    this.logger.debug(`Total de lançamentos no domínio: ${domain.getLancamentos().length}`);
    this.logger.debug(`Total de saldos no domínio: ${domain.getSaldosMensais().length}`);

    // Filtrar apenas lançamentos novos (sem ID)
    const lancamentosNovos = domain
      .getLancamentos()
      .filter((lancamento) => !lancamento.getId());
    
    this.logger.debug(`Lançamentos novos (sem ID): ${lancamentosNovos.length}`);

    // Mapear lançamentos novos
    const lancamentosModel = LancamentoMapper.DomainToModelList(lancamentosNovos);
    
    lancamentosModel.forEach((modelItem) => {
      this.logger.debug(`Lançamento mapeado: ${JSON.stringify({
        id: modelItem.id,
        categoriaId: modelItem.categoriaId,
        titulo: modelItem.titulo,
        valor: modelItem.valor,
        descricao: modelItem.descricao,
        tipo: modelItem.tipo,
      })}`);
    });

    // Mapear saldos mensais
    const saldosModel = SaldoMensalMapper.DomainToModelList(domain.getSaldosMensais());
    
    saldosModel.forEach((modelItem) => {
      this.logger.debug(`Saldo mapeado: ${JSON.stringify({
        id: modelItem.id,
        mes: modelItem.mes,
        ano: modelItem.ano,
        saldoMes: modelItem.saldoMes,
      })}`);
    });

    // Criar model
    const model = new CarteiraModel();
    model.id = domain.getId();
    model.usuarioId = domain.getUsuarioId();
    model.criadoEm = domain.getCriadoEm();
    model.lancamentos = lancamentosModel;
    model.saldosMensais = saldosModel;

    this.logger.log(`Model final: ${lancamentosModel.length} lançamentos, ${saldosModel.length} saldos`);

    return model;
  }

  static DomainToModelList(domains: Carteira[]): CarteiraModel[] {
    const listModels = domains.map((domain) => this.DomainToModel(domain));
    return listModels;
  }
}