import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/Prisma/prisma.module";
import { UsuarioModule } from "src/usuario.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";


@Module({
    imports: [ JwtModule.register({
        secret: process.env.JWT_SECRET // busca o token no arquivo env
    }),
    forwardRef (() => UsuarioModule), // usei para anular o ciclo de dependencia 
    PrismaModule
],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})

export class AuthModule {}