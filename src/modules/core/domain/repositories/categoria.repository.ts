import { Categoria } from '../categoria';

export interface CategoriaRepository {
  buscarPorId(id: number): Promise<Categoria | null>;
  buscarTodas(): Promise<Categoria[]>;
}
