import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/core/infrastructure/database/Prisma/prisma.service';
import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository.interface';
import { UsuarioMapper } from '../mapper/usuario.mapper';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  private readonly logger = new Logger(UsuarioRepositoryImpl.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly usuarioMapper: UsuarioMapper,
  ) {}

  async criar(usuario: Usuario): Promise<Usuario> {
    try {
      const usuarioModel = this.usuarioMapper.domainToModel(usuario);

      const usuarioData = await this.prisma.usuario.create({
        data: usuarioModel,
      });

      const usuarioDomain = this.usuarioMapper.modelToDomain(usuarioData);
      if (!usuarioDomain) {
        throw new InternalServerErrorException(
          'Erro ao transformar model do usuário para o domínio',
        );
      }

      return usuarioDomain;
    } catch (error) {
      this.logger.error(`Erro ao criar usuário: ${error.message}`, {
        stack: error.stack,
      });

      if (error instanceof NotFoundException) {
        throw error;
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new NotFoundException(
          `Usuário não encontrado (chave estrangeira inválida): ${usuario.getId()}`,
        );
      }
      throw new InternalServerErrorException('Erro ao criar carteira');
    }
  }
}
