import { Inject, Injectable } from "@nestjs/common"
import { CriarUsuarioDto } from "../dto/criar-usuario.dto"
import { Usuario } from "../usuario.entity"
import { IUSUARIO_REPOSITORY, IUsuarioRepository } from "../repositories/usuario.repository.interface"

@Injectable()
export class CriarUsuarioUseCase {
    constructor (
        @Inject(IUSUARIO_REPOSITORY)
        private readonly usuarioRepository: IUsuarioRepository) {}

    async executar(dto: CriarUsuarioDto): Promise<Usuario> {
        const novoUsuario = new Usuario(dto.nome, dto.email, dto.senha, dto.carteira);
        return await this.usuarioRepository.criarUsuario(novoUsuario);

    } 
    
}