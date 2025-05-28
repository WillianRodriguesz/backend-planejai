import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/Prisma/prisma.service";

@Injectable()
export class LoginUsuarioUseCase {

    constructor (
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly 
    ){}


}