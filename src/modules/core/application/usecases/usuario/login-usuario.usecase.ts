import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioRepository } from "src/modules/core/domain/repositories/usuario.repository.interface";
import { LoginDto } from "../../dtos/usuario/login-usuario.dto";
import { BcryptHashService } from "src/modules/core/infrastructure/services/hash-bcrypt.service";
import { LoginResponseDto } from "../../dtos/usuario/login-response.dto";

export interface LoginUsecaseProps{
    email: string;  
    senha: string;
    }

type UsuarioResult = LoginDto;

@Injectable()
export class LoginUsuarioUseCase {

    constructor(
        @Inject('UsuarioRepository')
            private readonly usuarioRepository: UsuarioRepository,
        @Inject('HashService')
            private readonly hashService: BcryptHashService
    ){}

    async executar(props: LoginUsecaseProps): Promise<LoginResponseDto> {
        if((!props.email || !props.senha)){
            throw new UnauthorizedException ('Email e senha são obrigatórios')
        }

        const usuario = await this.usuarioRepository.buscarPorEmail(props.email);

        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const senhaValida = await this.hashService.compare(props.senha, usuario.getSenha());

        if(!senhaValida){
            throw new UnauthorizedException('Senha inválida');
        }

        return {
            id: usuario.getId(),
            email: usuario.getEmail(),
            nome: usuario.getNome(),
        };
    }
}