import { ApiProperty } from '@nestjs/swagger';
import { TipoTermo } from '../../../domain/termo';

export class TermoDto {
  @ApiProperty({ description: 'ID do termo', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Tipo do termo',
    example: 'termos_uso',
    enum: TipoTermo,
  })
  tipo: TipoTermo;

  @ApiProperty({ description: 'Versão do termo', example: '1.0' })
  versao: string;

  @ApiProperty({ description: 'Título do termo', example: 'Termos de Uso' })
  titulo: string;

  @ApiProperty({ description: 'Texto completo do termo' })
  texto: string;

  @ApiProperty({ description: 'Se o termo está ativo', example: true })
  ativo: boolean;

  @ApiProperty({
    description: 'Data de criação',
    example: '2023-01-01T00:00:00Z',
  })
  criadoEm: Date;
}
