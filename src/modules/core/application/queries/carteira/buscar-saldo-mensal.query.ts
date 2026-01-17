import { Injectable, NotFoundException } from '@nestjs/common';
import { DateUtils } from '../../../domain/shared/data.utils';
import { SaldoMensalDto } from '../../dtos/carteira/saldo-mensal.dto';
import { CarteiraSaldoMensalMapper } from '../../mappers/saldo-mensal.mapper';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/Carteira.repository';

export interface BuscarSaldoMensalQueryProps {
  idCarteira: string;
  data: string;
}

@Injectable()
export class BuscarSaldoMensalQuery {
  constructor(private readonly carteiraRepository: CarteiraRepositoryImpl) {}

  async execute(idCarteira: string, data: string): Promise<SaldoMensalDto> {
    const resultCarteiraDomain =
      await this.carteiraRepository.buscarPorId(idCarteira);

    if (!resultCarteiraDomain) {
      throw new NotFoundException('Carteira não encontrada');
    }

    const { mes, ano } = DateUtils.extrairMesAno(data);

    return CarteiraSaldoMensalMapper.DomainToDto(
      resultCarteiraDomain,
      mes,
      ano,
    );
  }
}
