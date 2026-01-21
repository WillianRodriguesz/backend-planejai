import { ApiProperty } from '@nestjs/swagger';

export class CategoriaDto {
  @ApiProperty({ description: 'ID único da categoria', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome da categoria', example: 'Alimentação' })
  nome: string;
}
