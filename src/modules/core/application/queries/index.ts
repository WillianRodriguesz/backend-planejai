import { BuscarSaldoMensalQuery } from './carteira/buscar-saldo-mensal.query';
import { BuscarTodosLancamentosQuery } from './carteira/buscar-todos-lancamentos.query';
import { BuscarLancamentoPorIdQuery } from './carteira/buscar-lancamento-por-id.query';
import { FiltrarLancamentosQuery } from './carteira/filtrar-lancamentos.query';
import { BuscarTodasCategoriasQuery } from './categoria/buscar-todas-categorias.query';

export const CoreQueries = [
  BuscarSaldoMensalQuery,
  BuscarTodosLancamentosQuery,
  BuscarLancamentoPorIdQuery,
  FiltrarLancamentosQuery,
  BuscarTodasCategoriasQuery,
];
