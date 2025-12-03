import { TipoTransacao } from '../../../domain/lancamento';

export interface FiltrarLancamentosDto {
  dataInicial?: string;
  dataFinal?: string;
  idCategoria?: number;
  titulo?: string;
  tipoTransacao?: TipoTransacao | 'todos';
  pagina?: number;
  itensPorPagina?: number;
}
