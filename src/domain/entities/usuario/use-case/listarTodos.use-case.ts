import { Inject, Injectable } from "@nestjs/common";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { IUSUARIO_REPOSITORY, IUsuarioRepository } from "../repositories/usuario.repository.interface";

@Injectable()
export class ListarTodosUseCase{

    constructor(
        @Inject(IUSUARIO_REPOSITORY)
        private readonly usuarioRepository: IUsuarioRepository) {}

    async listarTodos(){
        return this.usuarioRepository.listarTodos();
    }
}