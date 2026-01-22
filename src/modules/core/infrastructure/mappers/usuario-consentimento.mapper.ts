import { UsuarioConsentimento } from '../../domain/usuario-consentimento';
import { UsuarioConsentimentoModel } from '../models/usuario-consentimento.model';
import { TermoMapper } from './termo.mapper';

export class UsuarioConsentimentoMapper {
  static DomainToModel(
    domain: UsuarioConsentimento,
  ): UsuarioConsentimentoModel {
    const model = new UsuarioConsentimentoModel();
    model.id = domain.getId();
    model.usuarioId = domain.getUsuarioId();
    model.termoLgpdId = domain.getTermoLgpdId();
    model.termoLgpd = domain.getTermoLgpd()
      ? TermoMapper.DomainToModel(domain.getTermoLgpd())
      : undefined;
    model.aceitouLgpd = domain.getAceitouLgpd();
    model.dataAceitouLgpd = domain.getDataAceitouLgpd();
    model.termoTermosUsoId = domain.getTermoTermosUsoId();
    model.termoTermosUso = domain.getTermoTermosUso()
      ? TermoMapper.DomainToModel(domain.getTermoTermosUso())
      : undefined;
    model.aceitouTermosUso = domain.getAceitouTermosUso();
    model.dataAceitouTermosUso = domain.getDataAceitouTermosUso();
    model.termoPoliticaPrivacidadeId = domain.getTermoPoliticaPrivacidadeId();
    model.termoPoliticaPrivacidade = domain.getTermoPoliticaPrivacidade()
      ? TermoMapper.DomainToModel(domain.getTermoPoliticaPrivacidade())
      : undefined;
    model.aceitouPoliticaPrivacidade = domain.getAceitouPoliticaPrivacidade();
    model.dataAceitouPoliticaPrivacidade =
      domain.getDataAceitouPoliticaPrivacidade();
    model.criadoEm = domain.getCriadoEm();
    return model;
  }

  static ModelToDomain(model: UsuarioConsentimentoModel): UsuarioConsentimento {
    return UsuarioConsentimento.carregar({
      id: model.id,
      usuarioId: model.usuarioId,
      termoLgpdId: model.termoLgpdId,
      termoLgpd: model.termoLgpd
        ? TermoMapper.ModelToDomain(model.termoLgpd)
        : undefined,
      aceitouLgpd: model.aceitouLgpd,
      dataAceitouLgpd: model.dataAceitouLgpd,
      termoTermosUsoId: model.termoTermosUsoId,
      termoTermosUso: model.termoTermosUso
        ? TermoMapper.ModelToDomain(model.termoTermosUso)
        : undefined,
      aceitouTermosUso: model.aceitouTermosUso,
      dataAceitouTermosUso: model.dataAceitouTermosUso,
      termoPoliticaPrivacidadeId: model.termoPoliticaPrivacidadeId,
      termoPoliticaPrivacidade: model.termoPoliticaPrivacidade
        ? TermoMapper.ModelToDomain(model.termoPoliticaPrivacidade)
        : undefined,
      aceitouPoliticaPrivacidade: model.aceitouPoliticaPrivacidade,
      dataAceitouPoliticaPrivacidade: model.dataAceitouPoliticaPrivacidade,
      criadoEm: model.criadoEm,
    });
  }
}
