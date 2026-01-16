import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CategoriaDto } from '../application/dtos/categoria/categoria.dto';
import { BuscarTodasCategoriasQuery } from '../application/queries/categoria/buscar-todas-categorias.query';
import { BuscarCategoriaPorIdQuery } from '../application/queries/categoria/buscar-categoria-por-id.query';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';

@Controller('categoria')
export class CategoriaController {
  constructor(
    private readonly buscarTodasCategoriasQuery: BuscarTodasCategoriasQuery,
    private readonly buscarCategoriaPorIdQuery: BuscarCategoriaPorIdQuery,
  ) {}

  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Get()
  async buscarTodas(): Promise<CategoriaDto[]> {
    return this.buscarTodasCategoriasQuery.execute();
  }

  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Get('/:id')
  async buscarPorId(@Param('id') id: string): Promise<CategoriaDto> {
    return this.buscarCategoriaPorIdQuery.execute(parseInt(id, 10));
  }
}
