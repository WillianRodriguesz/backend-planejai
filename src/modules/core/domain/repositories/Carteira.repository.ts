import { Carteira } from '../Carteira';

export interface CarteiraRepository { 
  buscarPorId(id: string): Promise<Carteira | null>;
  salvar(carteira: Carteira): Promise<void>;
}