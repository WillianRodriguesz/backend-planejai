import { IsString, IsStrongPassword, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TrocarSenhaDto {
  @ApiProperty({
    description: 'Senha atual do usuário',
    example: 'SenhaAntiga123!',
  })
  @IsString()
  @MinLength(1, { message: 'A senha atual é obrigatória' })
  senhaAtual: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'NovaSenha123!',
  })
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
