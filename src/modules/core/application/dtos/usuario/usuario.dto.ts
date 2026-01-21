import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
  @ApiProperty({ description: 'ID único do usuário', example: 'uuid-string' })
  id: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  nome: string;

  @ApiProperty({ description: 'Email do usuário', example: 'joao@example.com' })
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+5511999999999',
    required: false,
  })
  telefone?: string;

  @ApiProperty({
    description: 'URL do avatar',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar?: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  criadoEm?: Date;
}
