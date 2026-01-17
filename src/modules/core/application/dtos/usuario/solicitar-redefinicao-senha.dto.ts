import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SolicitarRedefinicaoSenhaDto {
  @IsEmail()
  email: string;
}
