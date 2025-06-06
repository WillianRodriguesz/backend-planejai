import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/core/infrastructure/database/Prisma/prisma.service';
import { isUUID } from 'class-validator';
import { UsuarioRepository } from 'src/modules/core/domain/entities/repositories/usuario.repository.interface';

@Injectable()
export class ExisteIdUsecase {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    private readonly prisma: PrismaService,
  ) {}

  async executar(id: string): Promise<boolean> {
    if (!isUUID(id)) {
      console.error('ID inválido', id);
      throw new BadRequestException(`ID invalido: ${id}`);
    }

    const IdValido = await this.usuarioRepository.existeId(id);

    if (!IdValido) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado!`);
    }

    //RETORNAR UM DTO
    
    return true; // aqui quero retornar apenas se existe ID se não lança exceptions, acho que naõ faz sentido criar DTO
  }
}
