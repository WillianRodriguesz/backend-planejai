import { Lancamento } from '../lancamento';

export interface GastoPorCategoria {
  categoria: {
    id: number;
    nome: string;
  };
  valor: number;
  porcentagem: number;
}

export interface GastosMensais {
  totalGastos: number;
  gastosPorCategoria: GastoPorCategoria[];
}

export class GastosMensaisService {
  public calcular(lancamentos: Lancamento[]): GastosMensais {
    const gastosPorCategoriaMap = new Map<
      number,
      { categoria: { id: number; nome: string }; valor: number }
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

    const totalGastos = gastosPorCategoria.reduce(
      (total, gasto) => total + gasto.valor,
      0,
    );

    const gastosComPorcentagem = gastosPorCategoria
      .map((gasto) => ({
        ...gasto,
        porcentagem:
          totalGastos > 0 ? Math.round((gasto.valor / totalGastos) * 100) : 0,
      }))
      .sort((a, b) => b.porcentagem - a.porcentagem);

    return {
      totalGastos,
      gastosPorCategoria: gastosComPorcentagem,
    };
  }
}
