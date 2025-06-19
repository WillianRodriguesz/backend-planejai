import { Carteira } from "../carteira/carteira.entity";

export interface CarteiraRepository {
  buscarPorId(id: string): Promise<Carteira>;
  criar(carteira: Carteira): Promise<Carteira>;
  buscarTodas(): Promise<Carteira[]>;
}