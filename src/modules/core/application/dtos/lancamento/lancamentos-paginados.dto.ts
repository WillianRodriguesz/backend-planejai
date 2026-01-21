import { ApiProperty } from '@nestjs/swagger';
import { LancamentoDto } from './lancamento.dto';

export class LancamentosPaginadosDto {
  @ApiProperty({ description: 'Lista de lançamentos', type: [LancamentoDto] })
  lancamentos: LancamentoDto[];

  @ApiProperty({ description: 'Total de lançamentos', example: 100 })
  total: number;

  @ApiProperty({ description: 'Página atual', example: 1 })
  pagina: number;

  @ApiProperty({ description: 'Total de páginas', example: 10 })
  totalPaginas: number;

  @ApiProperty({ description: 'Itens por página', example: 10 })
  itensPorPagina: number;
}
