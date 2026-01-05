export interface GastoPorCategoriaDto {
  categoria: {
    id: number;
    nome: string;
  };
  valor: number;
  porcentagem: number;
}

export interface GastosMensaisDto {
  totalGastos: number;
  gastosPorCategoria: GastoPorCategoriaDto[];
}
