import { Categoria } from '../../domain/categoria';
import { CategoriaDto } from '../dtos/categoria/categoria.dto';

export class CategoriaMapper {
  static DomainToDto(categoria: Categoria): CategoriaDto {
    return {
      id: categoria.getId(),
      nome: categoria.getNome(),
    };
  }

  static DomainToDtoList(categorias: Categoria[]): CategoriaDto[] {
    return categorias.map((categoria) => this.DomainToDto(categoria));
  }
}
