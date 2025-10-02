import { Usuario } from '../../domain/Usuario';
import { UsuarioModel } from '../models/Usuario.model';

export class UsuarioMapper {
  static ModelToDomain(model: UsuarioModel): Usuario {
    return Usuario.carregar({
      id: model.id,
      nome: model.nome,
      email: model.email,
      criadoEm: model.criadoEm,
      telefone: model.telefone,
    });
  }

  static ModelToDomainList(models: UsuarioModel[]): Usuario[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: Usuario): Partial<UsuarioModel> {
    return {
      id: domain.getId(),
      nome: domain.getNome(),
      email: domain.getEmail(),
      criadoEm: domain.getCriadoEm(),
      telefone: domain.getTelefone(),
    };
  }

  static DomainToModelList(domains: Usuario[]): Partial<UsuarioModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
