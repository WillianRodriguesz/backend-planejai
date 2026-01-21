import { ApiProperty } from '@nestjs/swagger';

export class SaldoMensalDto {
  @ApiProperty({ description: 'Mês do saldo', example: 1 })
  mes: number;

  @ApiProperty({ description: 'Ano do saldo', example: 2023 })
  ano: number;

  @ApiProperty({ description: 'Saldo do mês', example: 1500.5 })
  saldoMes: number;

  @ApiProperty({ description: 'Total de entradas', example: 2000.0 })
  entradas: number;

  @ApiProperty({ description: 'Total de saídas', example: 500.5 })
  saidas: number;
}
