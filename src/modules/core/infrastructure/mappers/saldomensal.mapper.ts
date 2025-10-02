import { SaldoMes } from '../../domain/SaldoMes';
import { SaldoMensalModel } from '../models/SaldoMensal.model';

export class SaldoMensalMapper {
  static ModelToDomain(model: SaldoMensalModel): SaldoMes {
    return new SaldoMes(
      model.id.toString(),
      model.carteiraId,
      model.mes,
      model.ano,
      model.saldoMes,
    );
  }

  static ModelToDomainList(models: SaldoMensalModel[]): SaldoMes[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: SaldoMes): Partial<SaldoMensalModel> {
    return {
      id: parseInt(domain.id),
      carteiraId: domain.carteiraId,
      mes: domain.mes,
      ano: domain.ano,
      saldoMes: domain.saldoMes,
    };
  }

  static DomainToModelList(domains: SaldoMes[]): Partial<SaldoMensalModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
