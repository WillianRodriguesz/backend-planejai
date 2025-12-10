export interface PaginacaoResultado<T> {
  items: T[];
  total: number;
  pagina: number;
  totalPaginas: number;
  itensPorPagina: number;
}

export class PaginacaoUtils {
  static paginar<T>(
    items: T[],
    pagina: number,
    itensPorPagina: number,
  ): PaginacaoResultado<T> {
    const total = items.length;
    const totalPaginas = Math.ceil(total / itensPorPagina);
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const itensPaginados = items.slice(inicio, fim);

    return {
      items: itensPaginados,
      total,
      pagina,
      totalPaginas,
      itensPorPagina,
    };
  }
}
