import { Lancamento } from '../../domain/lancamento';
import { LancamentoModel } from '../models/lancamento.model';
import { CategoriaMapper } from './categoria.mapper';

export class LancamentoMapper {
  static ModelToDomain(model: LancamentoModel): Lancamento {
    const categoriaDomain = model.categoria
      ? CategoriaMapper.ModelToDomain(model.categoria)
      : undefined;

    const domain = Lancamento.carregar({
      id: model.id.toString(),
      titulo: model.titulo,
      descricao: model.descricao,
      valor: parseFloat(model.valor.toString()),
      tipoTransacao: model.tipo,
      data: new Date(model.data),
      categoria: categoriaDomain,
    });

    return domain;
  }

  static ModelToDomainList(models: LancamentoModel[]): Lancamento[] {
    const listDomains = models.map((model) => this.ModelToDomain(model));
    return listDomains;
  }

  static DomainToModel(domain: Lancamento): LancamentoModel {
    const model = new LancamentoModel();

    if (domain.getId()) {
      model.id = parseInt(domain.getId());
    }

    model.categoriaId = domain.getCategoriaId();
    model.titulo = domain.getTitulo();
    model.descricao = domain.getDescricao();
    model.valor = domain.getValor();
    model.data = domain.getData();
    model.tipo = domain.getTipoTransacao();

    return model;
  }

  static DomainToModelList(domains: Lancamento[]): LancamentoModel[] {
    const listModels = domains.map((domain) => this.DomainToModel(domain));
    return listModels;
  }
}
