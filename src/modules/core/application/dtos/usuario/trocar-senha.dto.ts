import { IsString, IsStrongPassword, MinLength } from 'class-validator';

export class TrocarSenhaDto {
  @IsString()
  @MinLength(1, { message: 'A senha atual é obrigatória' })
  senhaAtual: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minNumbers: 0,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message:
        'A nova senha deve ter no mínimo 6 caracteres, incluindo letras maiúsculas, minúsculas e símbolos',
    },
  )
  novaSenha: string;
}
