import { Lancamento } from '../lancamento';

export interface GastoPorCategoria {
  categoria: {
    id: number;
    nome: string;
  };
  valor: number;
  porcentagem: number;
}

export interface RelacaoMesAnterior {
  diferencaGastosMensal: number;
  mensagemEconomia: string;
}

export interface GastosMensais {
  totalGastos: number;
  relacaoMesAnterior: RelacaoMesAnterior;
  gastosPorCategoria: GastoPorCategoria[];
}

export class GastosMensaisService {
  public calcular(
    lancamentosMesAtual: Lancamento[],
    totalGastosMesAnterior: number,
  ): GastosMensais {
    const gastosPorCategoriaMap = new Map<
      number,
      { categoria: { id: number; nome: string }; valor: number }
    >();

    lancamentosMesAtual.forEach((lancamento) => {
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

    const totalGastos = gastosPorCategoria.reduce(
      (total, gasto) => total + gasto.valor,
      0,
    );

    const economiaMensal = totalGastosMesAnterior - totalGastos;

    const mensagemEconomiaMensal =
      this.determinarMensagemEconomia(economiaMensal);

    const gastosComPorcentagem = gastosPorCategoria
      .map((gasto) => ({
        ...gasto,
        porcentagem:
          totalGastos > 0 ? Math.round((gasto.valor / totalGastos) * 100) : 0,
      }))
      .sort((a, b) => b.porcentagem - a.porcentagem);

    return {
      totalGastos,
      relacaoMesAnterior: {
        diferencaGastosMensal: economiaMensal,
        mensagemEconomia: mensagemEconomiaMensal,
      },
      gastosPorCategoria: gastosComPorcentagem,
    };
  }

  private determinarMensagemEconomia(economiaMensal: number): string {
    if (economiaMensal > 0) {
      return `Economizou R$ ${economiaMensal.toFixed(2)} em relação ao mês anterior!`;
    }

    if (economiaMensal < 0) {
      return `Gastou R$ ${Math.abs(economiaMensal).toFixed(2)} a mais que o mês anterior.`;
    }
    return 'Seus gastos se mantiveram iguais ao mês anterior.';
  }
}
