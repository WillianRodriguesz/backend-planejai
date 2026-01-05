import { Injectable } from '@nestjs/common';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { GastosMensaisDto } from '../../dtos/carteira/gastos-mensais.dto';
import { GastosMensaisService } from '../../../domain/services/gastos-mensais.service';

@Injectable()
export class BuscarGastosMensaisQuery {
  private readonly gastosMensaisService: GastosMensaisService;

  constructor(private readonly carteiraRepository: CarteiraRepositoryImpl) {
    this.gastosMensaisService = new GastosMensaisService();
  }

  async execute(idCarteira: string, mes: string): Promise<GastosMensaisDto> {
    const [ano, mesNumero] = mes.split('-').map(Number);
    const dataInicial = new Date(ano, mesNumero - 1, 1);
    const dataFinal = new Date(ano, mesNumero, 0);

    const lancamentos =
      await this.carteiraRepository.buscarLancamentosFiltrados({
        carteiraId: idCarteira,
        dataInicial,
        dataFinal,
        tipoTransacao: 'saida',
      });

    return this.gastosMensaisService.calcular(lancamentos);
  }
}
