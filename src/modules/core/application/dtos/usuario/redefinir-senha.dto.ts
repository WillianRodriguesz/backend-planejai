import { IsString, IsStrongPassword, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RedefinirSenhaDto {
  @ApiProperty({
    description: 'Token de redefinição de senha',
    example: 'token-string',
  })
  @IsString()
  @MinLength(1)
  token: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'NovaSenha123!',
  })
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  novaSenha: string;
}
