import { Termo } from '../../domain/termo';
import { TermoModel } from '../models/termo.model';

export class TermoMapper {
  static DomainToModel(domain: Termo): TermoModel {
    const model = new TermoModel();
    model.id = domain.getId();
    model.tipo = domain.getTipo();
    model.versao = domain.getVersao();
    model.titulo = domain.getTitulo();
    model.texto = domain.getTexto();
    model.ativo = domain.getAtivo();
    model.criadoEm = domain.getCriadoEm();
    return model;
  }

  static ModelToDomain(model: TermoModel): Termo {
    return Termo.carregar({
      id: model.id,
      tipo: model.tipo,
      versao: model.versao,
      titulo: model.titulo,
      texto: model.texto,
      ativo: model.ativo,
      criadoEm: model.criadoEm,
    });
  }
}
