import { Injectable } from '@nestjs/common';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { GastosMensaisDto } from '../../dtos/carteira/gastos-mensais.dto';
import { DateUtils } from '../../../domain/shared/data.utils';

@Injectable()
export class BuscarGastosMensaisQuery {
  constructor(private readonly carteiraRepository: CarteiraRepositoryImpl) {}

  async execute(idCarteira: string, mes: string): Promise<GastosMensaisDto> {
    const carteira = await this.carteiraRepository.buscarPorId(idCarteira);

    if (!carteira) {
      throw new DomainException(`Carteira com ID ${idCarteira} não encontrada`);
    }

    // Parse do mês (YYYY-MM)
    const [ano, mesNumero] = mes.split('-').map(Number);
    const dataInicial = new Date(ano, mesNumero - 1, 1); // Primeiro dia do mês
    const dataFinal = new Date(ano, mesNumero, 0); // Último dia do mês

    // Buscar lançamentos filtrados por mês e tipo 'saida'
    const lancamentos =
      await this.carteiraRepository.buscarLancamentosFiltrados({
        carteiraId: idCarteira,
        dataInicial,
        dataFinal,
        tipoTransacao: 'saida',
      });

    // Agrupar por categoria e somar valores
    const gastosPorCategoriaMap = new Map<
      number,
      { categoria: any; valor: number }
    >();

    lancamentos.forEach((lancamento) => {
      const categoriaId = lancamento.getCategoria().getId();
      const valor = lancamento.getValor();

      if (gastosPorCategoriaMap.has(categoriaId)) {
        const existing = gastosPorCategoriaMap.get(categoriaId);
        existing.valor += valor;
      } else {
        gastosPorCategoriaMap.set(categoriaId, {
          categoria: {
            id: categoriaId,
            nome: lancamento.getCategoria().getNome(),
          },
          valor,
        });
      }
    });

    const gastosPorCategoria = Array.from(gastosPorCategoriaMap.values());

    // Calcular total de gastos
    const totalGastos = gastosPorCategoria.reduce(
      (total, gasto) => total + gasto.valor,
      0,
    );

    // Calcular porcentagens
    const gastosComPorcentagem = gastosPorCategoria.map((gasto) => ({
      ...gasto,
      porcentagem: totalGastos > 0 ? Math.round((gasto.valor / totalGastos) * 100) : 0,
    }));

    return {
      totalGastos,
      gastosPorCategoria: gastosComPorcentagem,
    };
  }
}
