import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUSUARIO_REPOSITORY, IUsuarioRepository } from "../repositories/usuario.repository.interface";
import { PrismaService } from "src/Prisma/prisma.service";
import { ExisteIdUsecase } from "./existeId.use-case";

@Injectable()
export class DeletarUsecase {

    constructor ( 
        @Inject(IUSUARIO_REPOSITORY)
        private readonly usuarioRepository: IUsuarioRepository,
        private readonly prisma: PrismaService,
        private readonly existeId: ExisteIdUsecase
    ){}

    async delete (id:string): Promise<{ mensagem: string }>{
        const existe = await this.existeId.executar(id.toString());

        if(!existe){
            throw new NotFoundException(`Usuario com id ${id} não foi encontrado!`)
        }

        await this.usuarioRepository.deletar(id.toString());
        
        return { mensagem: `Usuário com id ${id} foi excluído com sucesso!` };
    }
}