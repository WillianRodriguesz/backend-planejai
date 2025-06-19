import { Injectable } from '@nestjs/common';
import { Carteira } from '../../domain/entities/carteira/carteira.entity';
import { CarteiraModel } from '../models/carteira.model';

@Injectable()
export class CarteiraMapper {
  modelToDomain(model: CarteiraModel): Carteira {
    const domain = new Carteira({
      id: model.id,
      idUsuario: model.id_usuario,
      saldoInicial: Number(model.saldo.toString()),
    });

    if (!domain) {
      throw new Error('Erro ao transformar model da carteira para o dominio');
    }
    return domain;
  }

}
