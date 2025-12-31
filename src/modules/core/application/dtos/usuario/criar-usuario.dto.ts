import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CriarUsuarioDto{
    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
    })
    senha: string;

    @IsString()
    telefone: string;
} 