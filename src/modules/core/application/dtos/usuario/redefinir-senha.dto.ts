import { IsString, IsStrongPassword, MinLength } from 'class-validator';

export class RedefinirSenhaDto {
  @IsString()
  @MinLength(1)
  token: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  novaSenha: string;
}
