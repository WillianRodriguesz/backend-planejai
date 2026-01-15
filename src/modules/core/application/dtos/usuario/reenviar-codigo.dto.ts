import { IsEmail } from 'class-validator';

export class ReenviarCodigoDto {
  @IsEmail()
  email: string;
}
