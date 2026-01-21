import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReenviarCodigoDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@example.com',
  })
  @IsEmail()
  email: string;
}
