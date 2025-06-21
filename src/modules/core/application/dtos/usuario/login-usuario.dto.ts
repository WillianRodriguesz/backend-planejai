import { IsEmail, IsString, Matches } from "class-validator";

export class LoginDto {

    @IsEmail()
    email: string;

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/, {
        message: 'A senha deve ter entre 6 e 20 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos',
    })
    senha: string;
}