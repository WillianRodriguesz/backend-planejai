import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from 'src/modules/core/domain/entities/repositories/usuario.repository.interface';
import { PrismaService } from 'src/modules/core/infrastructure/database/Prisma/prisma.service';

@Injectable()
export class LoginUsuarioUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute({ email, password }: { email: string; password: string }): Promise<any> {
    
    return 
  }
}