import { LancamentoDto } from './lancamento.dto';

export interface LancamentosPaginadosDto {
  lancamentos: LancamentoDto[];
  total: number;
  pagina: number;
  totalPaginas: number;
  itensPorPagina: number;
}
