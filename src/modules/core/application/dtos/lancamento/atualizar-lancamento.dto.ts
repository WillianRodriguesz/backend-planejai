import { TipoTransacao } from '../../../domain/lancamento';

export interface AtualizarLancamentoDto {
  idCategoria?: number;
  tipoTransacao?: TipoTransacao;
  titulo?: string;
  valor?: number;
  descricao?: string;
  data?: string; // formato YYYY-MM-DD
}
