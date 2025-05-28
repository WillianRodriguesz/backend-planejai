import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUSUARIO_REPOSITORY, IUsuarioRepository } from "../repositories/usuario.repository.interface";
import { PrismaService } from "src/Prisma/prisma.service";
import { isUUID } from "class-validator";

@Injectable()
export class ExisteIdUsecase {  //criei para fazer a consulta do ID

    constructor(
        @Inject(IUSUARIO_REPOSITORY)
        private readonly usuarioReposytory: IUsuarioRepository,
        private readonly prisma: PrismaService
    ) {}
 
    async executar(id: string): Promise<boolean>{
        if (!isUUID(id)){
            console.error('ID inválido', id);
            throw new BadRequestException(`ID invalido: ${id}`);
        }
        
        const existe = await this.usuarioReposytory.existeId(id);

        if (!existe) {
            throw new NotFoundException ('Usuario com ID ${id} não encontrado! ')
        }

        return true;
    }
}