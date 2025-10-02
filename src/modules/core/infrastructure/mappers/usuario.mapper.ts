import { Usuario } from '../../domain/Usuario';
import { UsuarioModel } from '../models/Usuario.model';

export class UsuarioMapper {
  static ModelToDomain(model: UsuarioModel): Usuario {
    return new Usuario(
      model.id,
      model.nome,
      model.email,
      model.criadoEm,
      model.telefone,
    );
  }

  static ModelToDomainList(models: UsuarioModel[]): Usuario[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: Usuario): Partial<UsuarioModel> {
    return {
      id: domain.id,
      nome: domain.nome,
      email: domain.email,
      criadoEm: domain.criadoEm,
      telefone: domain.telefone,
    };
  }

  static DomainToModelList(domains: Usuario[]): Partial<UsuarioModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
