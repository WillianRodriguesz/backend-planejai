import { SaldoMes } from '../../domain/SaldoMes';
import { SaldoMensalModel } from '../models/SaldoMensal.model';

export class SaldoMensalMapper {
  static ModelToDomain(model: SaldoMensalModel): SaldoMes {
    return SaldoMes.carregar({
      id: model.id.toString(),
      mes: model.mes,
      ano: model.ano,
      saldoMes: model.saldoMes,
    });
  }

  static ModelToDomainList(models: SaldoMensalModel[]): SaldoMes[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: SaldoMes): Partial<SaldoMensalModel> {
    return {
      id: parseInt(domain.getId()),
      mes: domain.getMes(),
      ano: domain.getAno(),
      saldoMes: domain.getSaldoMes(),
    };
  }

  static DomainToModelList(domains: SaldoMes[]): Partial<SaldoMensalModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
