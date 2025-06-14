import { Carteira } from "../carteira/carteira.entity";


export interface CarteiraRepository {
  buscarPorId(id: string): Promise<Carteira>;
//buscarPorIdUsuario(idUsuario: string): Promise<Carteira>;
}