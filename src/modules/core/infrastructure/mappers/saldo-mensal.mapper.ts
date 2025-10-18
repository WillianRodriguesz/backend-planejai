import { SaldoMes } from '../../domain/saldo-mensal';
import { SaldoMensalModel } from '../models/saldo-mensal.model';

export class SaldoMensalMapper {
  static ModelToDomain(model: SaldoMensalModel): SaldoMes {
    const domain = SaldoMes.carregar({
      id: model.id.toString(),
      mes: model.mes,
      ano: model.ano,
      saldoMes: parseFloat(model.saldoMes.toString()),
    });

    return domain;
  }

  static ModelToDomainList(models: SaldoMensalModel[]): SaldoMes[] {
    const listDomains = models.map((model) => this.ModelToDomain(model));
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