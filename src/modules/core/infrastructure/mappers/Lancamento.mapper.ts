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
      data: new Date(model.data),
      categoria,
    });
  }

  static ModelToDomainList(models: LancamentoModel[]): Lancamento[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: Lancamento): Partial<LancamentoModel> {
    const descricao = domain.getDescricao();
    const categoria = domain.getCategoria();
    const tipoCategoria = categoria?.getTipo();

    // Se a categoria for 'ambos', usa 'saida' como padrão
    const tipo =
      tipoCategoria === 'ambos'
        ? 'saida'
        : (tipoCategoria as 'entrada' | 'saida');

    return {
      id: domain.getId() ? parseInt(domain.getId()) : undefined,
      titulo: descricao.substring(0, 50), // Usa os primeiros 50 caracteres da descrição como título
      descricao: descricao,
      valor: domain.getValor(),
      data: domain.getData(),
      tipo: tipo || 'saida', // Padrão para 'saida' se não houver categoria
      categoriaId: categoria?.getId(),
    };
  }

  static DomainToModelList(domains: Lancamento[]): Partial<LancamentoModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
