import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CategoriaDto } from '../application/dtos/categoria/categoria.dto';
import { BuscarTodasCategoriasQuery } from '../application/queries/categoria/buscar-todas-categorias.query';
import { BuscarCategoriaPorIdQuery } from '../application/queries/categoria/buscar-categoria-por-id.query';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';

@ApiTags('categorias')
@ApiCookieAuth('access_token')
@Controller('categoria')
export class CategoriaController {
  constructor(
    private readonly buscarTodasCategoriasQuery: BuscarTodasCategoriasQuery,
    private readonly buscarCategoriaPorIdQuery: BuscarCategoriaPorIdQuery,
  ) {}

  @ApiOperation({ summary: 'Buscar todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso',
    type: [CategoriaDto],
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Get()
  async buscarTodas(): Promise<CategoriaDto[]> {
    return this.buscarTodasCategoriasQuery.execute();
  }

  @ApiOperation({ summary: 'Buscar categoria por ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada',
    type: CategoriaDto,
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiParam({ name: 'id', description: 'ID da categoria', type: Number })
  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Get('/:id')
  async buscarPorId(@Param('id') id: string): Promise<CategoriaDto> {
    return this.buscarCategoriaPorIdQuery.execute(parseInt(id, 10));
  }
}
