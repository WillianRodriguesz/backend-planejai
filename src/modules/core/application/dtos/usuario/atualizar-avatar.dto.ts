import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizarAvatarDto {
  @ApiProperty({
    description: 'URL do avatar do usuário',
    example: 'https://example.com/avatar.jpg',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  avatar: string;
}
