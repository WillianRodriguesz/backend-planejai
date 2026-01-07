import { Controller, Get, Param } from '@nestjs/common';
import { CategoriaDto } from '../application/dtos/categoria/categoria.dto';
import { BuscarTodasCategoriasQuery } from '../application/queries/categoria/buscar-todas-categorias.query';
import { BuscarCategoriaPorIdQuery } from '../application/queries/categoria/buscar-categoria-por-id.query';

@Controller('categoria')
export class CategoriaController {
  constructor(
    private readonly buscarTodasCategoriasQuery: BuscarTodasCategoriasQuery,
    private readonly buscarCategoriaPorIdQuery: BuscarCategoriaPorIdQuery,
  ) {}

  @Get()
  async buscarTodas(): Promise<CategoriaDto[]> {
    return this.buscarTodasCategoriasQuery.execute();
  }

  @Get('/:id')
  async buscarPorId(@Param('id') id: string): Promise<CategoriaDto> {
    return this.buscarCategoriaPorIdQuery.execute(parseInt(id, 10));
  }
}
