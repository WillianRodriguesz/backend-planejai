import { Lancamento } from '../../domain/lancamento';
import { LancamentoModel } from '../models/lancamento.model';
import { CategoriaMapper } from './categoria.mapper';

export class LancamentoMapper {
  static ModelToDomain(model: LancamentoModel): Lancamento {
    const categoria = model.categoria
      ? CategoriaMapper.ModelToDomain(model.categoria)
      : undefined;
    return Lancamento.carregar({
      id: model.id.toString(),
      valor: model.valor,
      descricao: model.descricao,
      data: model.data,
      categoria,
    });
  }

  static ModelToDomainList(models: LancamentoModel[]): Lancamento[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: Lancamento): Partial<LancamentoModel> {
    return {
      id: parseInt(domain.getId()),
      valor: domain.getValor(),
      descricao: domain.getDescricao(),
      data: domain.getData(),
    };
  }

  static DomainToModelList(domains: Lancamento[]): Partial<LancamentoModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
