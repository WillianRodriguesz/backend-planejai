import { IsEmail, IsOptional, IsString, IsStrongPassword, Matches } from "class-validator";

export class CriarUsuarioDto{
    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @Matches(/^55\d{11}$/, { message: 'telefone deve seguir o padrão 55 + DDD(2) + número(9), ex: 5599999999999' })
    telefone: string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
    })
    senha: string;

    @IsString()
    @IsOptional()
    carteira: string
} 