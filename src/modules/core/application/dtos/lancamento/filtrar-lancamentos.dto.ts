import { ApiProperty } from '@nestjs/swagger';
import { TipoTransacao } from '../../../domain/lancamento';

export class FiltrarLancamentosDto {
  @ApiProperty({
    description: 'Data inicial (YYYY-MM-DD)',
    example: '2023-01-01',
    required: false,
  })
  dataInicial?: string;

  @ApiProperty({
    description: 'Data final (YYYY-MM-DD)',
    example: '2023-01-31',
    required: false,
  })
  dataFinal?: string;

  @ApiProperty({ description: 'ID da categoria', example: 1, required: false })
  idCategoria?: number;

  @ApiProperty({
    description: 'Título do lançamento',
    example: 'Compra',
    required: false,
  })
  titulo?: string;

  @ApiProperty({
    description: 'Tipo de transação',
    enum: ['entrada', 'saida', 'todos'],
    example: 'saida',
    required: false,
  })
  tipoTransacao?: TipoTransacao | 'todos';

  @ApiProperty({ description: 'Página', example: 1, required: false })
  pagina?: number;

  @ApiProperty({
    description: 'Itens por página',
    example: 10,
    required: false,
  })
  itensPorPagina?: number;
}
