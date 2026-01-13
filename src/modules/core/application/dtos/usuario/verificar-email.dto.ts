import { IsEmail, IsString, Length } from 'class-validator';

export class VerificarEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  codigo: string;
}
