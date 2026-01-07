import { Categoria } from '../../domain/categoria';
import { CategoriaModel } from '../models/categoria.model';

export class CategoriaMapper {
  static ModelToDomain(model: CategoriaModel): Categoria {
    const domain = Categoria.carregar({
      id: model.id,
      nome: model.nome,
    });
    
    return domain;
  }

  static ModelToDomainList(models: CategoriaModel[]): Categoria[] {
    const listDomains = models.map((model) => this.ModelToDomain(model));
    return listDomains;
  }

  static DomainToModel(domain: Categoria): CategoriaModel {
    const model = new CategoriaModel();
    model.id = domain.getId();
    model.nome = domain.getNome();
    return model;
  }

  static DomainToModelList(domains: Categoria[]): CategoriaModel[] {
    const listModels = domains.map((domain) => this.DomainToModel(domain));
    return listModels;
  }
}