import { Injectable } from '@nestjs/common';
import { Carteira } from '../../domain/entities/carteira.entity';
import { Prisma } from 'generated/prisma';
type CarteiraModel = Prisma.carteiraGetPayload<{}>;
type CarteiraModelProps = Prisma.carteiraCreateInput;

@Injectable()
export class CarteiraMapper {
  modelToDomain(model: CarteiraModel): Carteira {
    return new Carteira({
      id: model.id_carteira,
      idUsuario: model.id_usuario,
      saldoInicial: Number(model.saldo.toString()),
    });
  }

  domainToModel(domain: Carteira): CarteiraModelProps {
    return {
      id_carteira: domain.getId(),
      saldo: domain.getSaldo().getValor(),
      usuario: {
        connect: { id_usuario: domain.getIdUsuario() },
      },
    };
  }
}
