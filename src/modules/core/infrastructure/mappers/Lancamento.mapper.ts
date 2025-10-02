import { Lancamento } from '../../domain/Lancamento';
import { LancamentoModel } from '../models/Lancamento.model';

export class LancamentoMapper {
  static ModelToDomain(model: LancamentoModel): Lancamento {
    return new Lancamento(
      model.id.toString(),
      model.carteiraId,
      model.valor,
      model.descricao,
      model.data,
    );
  }

  static ModelToDomainList(models: LancamentoModel[]): Lancamento[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: Lancamento): Partial<LancamentoModel> {
    return {
      id: parseInt(domain.id),
      carteiraId: domain.carteiraId,
      valor: domain.valor,
      descricao: domain.descricao,
      data: domain.data,
    };
  }

  static DomainToModelList(domains: Lancamento[]): Partial<LancamentoModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
