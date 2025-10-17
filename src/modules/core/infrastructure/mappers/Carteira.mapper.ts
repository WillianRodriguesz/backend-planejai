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

  static DomainToModel(carteira: Carteira): Partial<CarteiraModel> {
    return {
      id: carteira.getId(),
      usuarioId: carteira.getUsuarioId(),
      criadoEm: carteira.getCriadoEm(),
    };
  }

  static DomainToModelList(carteiras: Carteira[]): Partial<CarteiraModel>[] {
    return carteiras.map((carteira) => this.DomainToModel(carteira));
  }
}
