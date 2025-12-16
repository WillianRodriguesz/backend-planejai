import { BuscarSaldoMensalQuery } from './carteira/buscar-saldo-mensal.query';
import { BuscarTodosLancamentosQuery } from './carteira/buscar-todos-lancamentos.query';
import { BuscarLancamentoPorIdQuery } from './carteira/buscar-lancamento-por-id.query';
import { FiltrarLancamentosQuery } from './carteira/filtrar-lancamentos.query';
import { BuscarTodasCategoriasQuery } from './categoria/buscar-todas-categorias.query';
import { BuscarCategoriaPorIdQuery } from './categoria/buscar-categoria-por-id.query';

export const CoreQueries = [
  BuscarSaldoMensalQuery,
  BuscarTodosLancamentosQuery,
  BuscarLancamentoPorIdQuery,
  FiltrarLancamentosQuery,
  BuscarTodasCategoriasQuery,
  BuscarCategoriaPorIdQuery,
];
