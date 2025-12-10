import { Controller, Get } from '@nestjs/common';
import { CategoriaDto } from '../application/dtos/categoria/categoria.dto';
import { BuscarTodasCategoriasQuery } from '../application/queries/categoria/buscar-todas-categorias.query';

@Controller('categoria')
export class CategoriaController {
  constructor(
    private readonly buscarTodasCategoriasQuery: BuscarTodasCategoriasQuery,
  ) {}

  @Get()
  async buscarTodas(): Promise<CategoriaDto[]> {
    return this.buscarTodasCategoriasQuery.execute();
  }
}
