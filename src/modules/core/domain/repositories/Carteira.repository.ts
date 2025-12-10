import { Carteira } from '../carteira';
import { Lancamento, TipoTransacao } from '../lancamento';

export interface FiltrosLancamento {
  carteiraId: string;
  dataInicial?: Date;
  dataFinal?: Date;
  idCategoria?: number;
  titulo?: string;
  tipoTransacao?: TipoTransacao;
}

export interface CarteiraRepository {
  buscarPorId(id: string): Promise<Carteira | null>;
  salvar(carteira: Carteira): Promise<void>;
  buscarLancamentosFiltrados(filtros: FiltrosLancamento): Promise<Lancamento[]>;
}
