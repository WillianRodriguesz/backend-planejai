import { Carteira } from '../../domain/carteira';
import { SaldoMensalDto } from '../dtos/carteira/saldo-mensal.dto';

export class CarteiraSaldoMensalMapper {
  static DomainToDto(
    carteira: Carteira,
    mes: number,
    ano: number,
  ): SaldoMensalDto {
    const saldoMes = carteira.buscarSaldoMensal(mes, ano);
    const totalEntradas = carteira.calcularTotalEntradasMensal(mes, ano);
    const totalSaidas = carteira.calcularTotalSaidasMensal(mes, ano);

    return {
      mes,
      ano,
      saldoMes: saldoMes ?? 0,
      totalEntradas,
      totalSaidas,
    };
  }
}
