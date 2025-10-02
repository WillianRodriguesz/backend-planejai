import { Categoria } from '../../domain/Categoria';
import { CategoriaModel } from '../models/Categoria.model';

export class CategoriaMapper {
  static ModelToDomain(model: CategoriaModel): Categoria {
    return Categoria.carregar({
      id: model.id,
      nome: model.nome,
      tipo: model.tipo,
    });
  }

  static ModelToDomainList(models: CategoriaModel[]): Categoria[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: Categoria): Partial<CategoriaModel> {
    return {
      id: domain.getId(),
      nome: domain.getNome(),
      tipo: domain.getTipo(),
    };
  }

  static DomainToModelList(domains: Categoria[]): Partial<CategoriaModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
