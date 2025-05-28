import { Module } from "@nestjs/common";
import { UsuarioControle } from "./domain/entities/usuario/usuario.controller";
import { PrismaService } from "./Prisma/prisma.service";
import { UsuarioRepository } from "./domain/entities/usuario/repositories/usuario.repository";
import { IUSUARIO_REPOSITORY, IUsuarioRepository } from "./domain/entities/usuario/repositories/usuario.repository.interface";
import { CriarUsuarioUseCase } from "./domain/entities/usuario/use-case/criar-usuario.use-case";
import { PrismaModule } from "./Prisma/prisma.module";
import { ListarTodosUseCase } from "./domain/entities/usuario/use-case/listarTodos.use-case";
import { DeletarUsecase } from "./domain/entities/usuario/use-case/deletar.use-case";
import { ExisteIdUsecase } from "./domain/entities/usuario/use-case/existeId.use-case";

@Module({
    imports: [PrismaModule ],
    controllers: [UsuarioControle],
    providers: [
        PrismaService,
        {
            provide: IUSUARIO_REPOSITORY,
            useClass: UsuarioRepository,
        }, 
        CriarUsuarioUseCase,
        ListarTodosUseCase,
        DeletarUsecase,
        ExisteIdUsecase
    ],
    exports: [CriarUsuarioUseCase]
})

export class UsuarioModule {}