import { ApiProperty } from '@nestjs/swagger';
import { TipoTransacao } from '../../../domain/lancamento';

export class AtualizarLancamentoDto {
  @ApiProperty({ description: 'ID da categoria', example: 1, required: false })
  idCategoria?: number;

  @ApiProperty({
    description: 'Tipo de transação',
    enum: ['entrada', 'saida'],
    example: 'saida',
    required: false,
  })
  tipoTransacao?: TipoTransacao;

  @ApiProperty({
    description: 'Título do lançamento',
    example: 'Compra atualizada',
    required: false,
  })
  titulo?: string;

  @ApiProperty({
    description: 'Valor do lançamento',
    example: 200.0,
    required: false,
  })
  valor?: number;

  @ApiProperty({
    description: 'Descrição do lançamento',
    example: 'Descrição atualizada',
    required: false,
  })
  descricao?: string;

  @ApiProperty({
    description: 'Data do lançamento (YYYY-MM-DD)',
    example: '2023-01-15',
    required: false,
  })
  data?: string; // formato YYYY-MM-DD
}
