import { Termo, TipoTermo } from '../termo';

export interface TermoRepository {
  salvar(termo: Termo): Promise<void>;
  buscarPorId(id: number): Promise<Termo | null>;
  buscarPorTipoEVersao(tipo: TipoTermo, versao: string): Promise<Termo | null>;
  buscarAtivoPorTipo(tipo: TipoTermo): Promise<Termo | null>;
  buscarTodos(): Promise<Termo[]>;
  atualizar(id: number, termo: Partial<Termo>): Promise<void>;
  deletar(id: number): Promise<void>;
}
