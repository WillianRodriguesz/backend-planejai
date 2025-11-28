import { SaldoMes } from '../../domain/saldo-mensal';
import { SaldoMensalModel } from '../models/saldo-mensal.model';

export class SaldoMensalMapper {
  static ModelToDomain(model: SaldoMensalModel): SaldoMes | null {
    // Validar dados antes de passar para o domain
    if (!model || !model.mes || !model.ano || !model.id) {
      console.warn('SaldoMensalModel inválido:', model);
      return null;
    }

    try {
      const domain = SaldoMes.carregar({
        id: model.id.toString(),
        mes: model.mes,
        ano: model.ano,
        saldoMes: parseFloat(model.saldoMes.toString()),
      });

      return domain;
    } catch (error) {
      console.error('Erro ao converter SaldoMensalModel para Domain:', error.message, model);
      return null;
    }
  }

  static ModelToDomainList(models: SaldoMensalModel[]): SaldoMes[] {
    if (!models || models.length === 0) {
      return [];
    }

    const listDomains = models
      .map((model) => this.ModelToDomain(model))
      .filter((domain) => domain !== null);
    return listDomains;
  }

  static DomainToModel(domain: SaldoMes): SaldoMensalModel {
    const model = new SaldoMensalModel();
    
    if (domain.getId()) {
      model.id = parseInt(domain.getId());
    }
    
    model.mes = domain.getMes();
    model.ano = domain.getAno();
    model.saldoMes = domain.getSaldoMes();
    
    return model;
  }

  static DomainToModelList(domains: SaldoMes[]): SaldoMensalModel[] {
    const listModels = domains.map((domain) => this.DomainToModel(domain));
    return listModels;
  }
}