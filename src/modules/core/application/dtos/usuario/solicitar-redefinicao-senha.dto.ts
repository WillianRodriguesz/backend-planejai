import { IsEmail } from 'class-validator';

export class SolicitarRedefinicaoSenhaDto {
  @IsEmail()
  email: string;
}
