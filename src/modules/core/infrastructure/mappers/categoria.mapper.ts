import { Categoria } from '../../domain/Categoria';
import { CategoriaModel } from '../models/Categoria.model';

export class CategoriaMapper {
  static ModelToDomain(model: CategoriaModel): Categoria {
    return new Categoria(model.id, model.nome, model.tipo);
  }

  static ModelToDomainList(models: CategoriaModel[]): Categoria[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: Categoria): Partial<CategoriaModel> {
    return {
      id: domain.id,
      nome: domain.nome,
      tipo: domain.tipo,
    };
  }

  static DomainToModelList(domains: Categoria[]): Partial<CategoriaModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
