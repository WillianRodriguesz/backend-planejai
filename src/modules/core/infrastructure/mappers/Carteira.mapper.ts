import { Carteira } from '../../domain/carteira';
import { CarteiraModel } from '../models/carteira.model';
import { LancamentoMapper } from './lancamento.mapper';
import { SaldoMensalMapper } from './saldo-mensal.mapper';

export class CarteiraMapper {
  static ModelToDomain(model: CarteiraModel): Carteira {
    const lancamentos = LancamentoMapper.ModelToDomainList(
      model.lancamentos || [],
    );
    const saldosMensais = SaldoMensalMapper.ModelToDomainList(
      model.saldosMensais || [],
    );

    return Carteira.carregar({
      id: model.id,
      usuarioId: model.usuarioId,
      criadoEm: model.criadoEm,
      lancamentos,
      saldosMensais,
    });
  }

  static ModelToDomainList(models: CarteiraModel[]): Carteira[] {
    return models.map((model) => this.ModelToDomain(model));
  }

  static DomainToModel(domain: Carteira): CarteiraModel {
    const model = new CarteiraModel();
    model.id = domain.getId();
    model.usuarioId = domain.getUsuarioId();
    model.criadoEm = domain.getCriadoEm();

    model.lancamentos = LancamentoMapper.DomainToModelList(
      domain.getLancamentos(),
    );
    model.saldosMensais = SaldoMensalMapper.DomainToModelList(
      domain.getSaldosMensais(),
    );

    model.lancamentos.forEach((l) => (l.carteiraId = domain.getId()));
    model.saldosMensais.forEach((s) => (s.carteiraId = domain.getId()));

    return model;
  }
}
