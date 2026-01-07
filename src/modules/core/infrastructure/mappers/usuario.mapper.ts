import { Usuario } from '../../domain/usuario';
import { UsuarioModel } from '../models/usuario.model';

export class UsuarioMapper {
  static ModelToDomain(model: UsuarioModel): Usuario {
    return Usuario.carregar({
      id: model.id,
      nome: model.nome,
      email: model.email,
      senha: model.senha,
      criadoEm: model.criadoEm,
      telefone: model.telefone,
      avatar: model.avatar,
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
      senha: domain.getSenha(),
      criadoEm: domain.getCriadoEm(),
      telefone: domain.getTelefone(),
      avatar: domain.getAvatar(),
    };
  }

  static DomainToModelList(domains: Usuario[]): Partial<UsuarioModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
