import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerificarEmailDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Código de verificação de 6 dígitos',
    example: '123456',
  })
  @IsString()
  @Length(6, 6)
  codigo: string;
}
