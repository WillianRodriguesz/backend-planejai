import { Carteira } from '../carteira';

export interface CarteiraRepository {
  buscarPorId(id: string): Promise<Carteira | null>;
  salvar(carteira: Carteira): Promise<void>;
}
