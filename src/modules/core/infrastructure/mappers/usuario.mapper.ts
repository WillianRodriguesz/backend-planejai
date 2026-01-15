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
      emailVerificado: model.emailVerificado,
      codigoVerificacao: model.codigoVerificacao,
      expiracaoCodigo: model.expiracaoCodigo,
      tokenRedefinicaoSenha: model.tokenRedefinicaoSenha,
      expiracaoToken: model.expiracaoToken,
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
      emailVerificado: domain.getEmailVerificado(),
      codigoVerificacao: domain.getCodigoVerificacao(),
      expiracaoCodigo: domain.getExpiracaoCodigo(),
      tokenRedefinicaoSenha: domain.getTokenRedefinicaoSenha(),
      expiracaoToken: domain.getExpiracaoToken(),
    };
  }

  static DomainToModelList(domains: Usuario[]): Partial<UsuarioModel>[] {
    return domains.map((domain) => this.DomainToModel(domain));
  }
}
