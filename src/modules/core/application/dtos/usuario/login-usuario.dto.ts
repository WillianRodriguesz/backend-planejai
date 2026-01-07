import { IsEmail, IsString } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  email: string;

  @IsString()
  senha: string;
}
