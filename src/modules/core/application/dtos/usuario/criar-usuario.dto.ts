import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarUsuarioDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Email do usuário', example: 'joao@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'Senha123!' })
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  senha: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+5511999999999',
  })
  @IsString()
  telefone: string;

  @ApiProperty({
    description: 'Aceitação da LGPD',
    example: true,
  })
  @IsBoolean()
  aceitouLgpd: boolean;

  @ApiProperty({
    description: 'Aceitação dos Termos de Uso',
    example: true,
  })
  @IsBoolean()
  aceitouTermosUso: boolean;

  @ApiProperty({
    description: 'Aceitação da Política de Privacidade',
    example: true,
  })
  @IsBoolean()
  aceitouPoliticaPrivacidade: boolean;
}
