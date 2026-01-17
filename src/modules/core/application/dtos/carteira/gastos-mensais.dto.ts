import { ApiProperty } from '@nestjs/swagger';

export class GastoPorCategoriaDto {
  @ApiProperty({
    description: 'Categoria',
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

  @ApiProperty({ description: 'Valor gasto na categoria', example: 500.0 })
  valor: number;

  @ApiProperty({ description: 'Porcentagem do total', example: 25.5 })
  porcentagem: number;
}

export class RelacaoMesAnteriorDto {
  @ApiProperty({ description: 'Diferença de gastos mensal', example: -100.0 })
  diferencaGastosMensal: number;

  @ApiProperty({
    description: 'Mensagem sobre economia',
    example: 'Você economizou R$ 100,00 este mês!',
  })
  mensagemEconomia: string;
}

export class GastosMensaisDto {
  @ApiProperty({ description: 'Total de gastos', example: 2000.0 })
  totalGastos: number;

  @ApiProperty({ description: 'Quantidade de saídas', example: 15 })
  quantidadeSaidas: number;

  @ApiProperty({
    description: 'Relação com o mês anterior',
    type: RelacaoMesAnteriorDto,
  })
  relacaoMesAnterior: RelacaoMesAnteriorDto;

  @ApiProperty({
    description: 'Gastos por categoria',
    type: [GastoPorCategoriaDto],
  })
  gastosPorCategoria: GastoPorCategoriaDto[];
}
