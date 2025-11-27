import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUsuarioDto {
  @IsString()
  @IsNotEmpty()
  telefone!: string;

  @IsString()
  @MinLength(6)
  senha!: string;
}
