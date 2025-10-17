import { Categoria } from '../categoria';

export interface CategoriaRepository {
  buscarPorId(id: string): Promise<Categoria | null>;
}
