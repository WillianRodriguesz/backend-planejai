import { ApiProperty } from '@nestjs/swagger';

export class LancamentoDto {
  @ApiProperty({ description: 'ID do lançamento', example: 'uuid-string' })
  id: string;

  @ApiProperty({
    description: 'Título do lançamento',
    example: 'Compra de supermercado',
  })
  titulo: string;

  @ApiProperty({
    description: 'Descrição do lançamento',
    example: 'Compras do mês',
  })
  descricao: string;

  @ApiProperty({ description: 'Valor do lançamento', example: 150.5 })
  valor: number;

  @ApiProperty({
    description: 'Tipo de transação',
    enum: ['entrada', 'saida'],
    example: 'saida',
  })
  tipoTransacao: 'entrada' | 'saida';

  @ApiProperty({
    description: 'Data do lançamento',
    example: '2023-01-15T00:00:00Z',
  })
  data: Date;

  @ApiProperty({
    description: 'Categoria do lançamento',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      nome: { type: 'string', example: 'Alimentação' },
    },
  })
  categoria: {
    id: number;
    nome: string;
  };
}
