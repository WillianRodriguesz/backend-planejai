import { Injectable } from '@nestjs/common';
import { GastosMensaisDto } from '../../dtos/carteira/gastos-mensais.dto';
import { GastosMensaisService } from '../../../domain/services/gastos-mensais.service';
import { CarteiraRepositoryImpl } from 'src/modules/core/infrastructure/repositories/Carteira.repository';

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

    // Calcular mês anterior
    const dataMesAnterior = new Date(ano, mesNumero - 2, 1);
    const dataFinalMesAnterior = new Date(ano, mesNumero - 1, 0);

    const [lancamentosMesAtual, lancamentosMesAnterior] = await Promise.all([
      this.carteiraRepository.buscarLancamentosFiltrados({
        carteiraId: idCarteira,
        dataInicial,
        dataFinal,
        tipoTransacao: 'saida',
      }),
      this.carteiraRepository.buscarLancamentosFiltrados({
        carteiraId: idCarteira,
        dataInicial: dataMesAnterior,
        dataFinal: dataFinalMesAnterior,
        tipoTransacao: 'saida',
      }),
    ]);

    const totalGastosMesAnterior = lancamentosMesAnterior.reduce(
      (total, lancamento) => total + lancamento.getValor(),
      0,
    );

    return this.gastosMensaisService.calcular(
      lancamentosMesAtual,
      totalGastosMesAnterior,
    );
  }
}
