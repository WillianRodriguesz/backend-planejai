import { IsString, IsEmail, IsOptional } from 'class-validator';

export class AtualizarUsuarioDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefone?: string;
}
