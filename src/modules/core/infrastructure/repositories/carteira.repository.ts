import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/Prisma/prisma.service';
import { Carteira } from '../../domain/entities/carteira/carteira.entity';
import { CarteiraRepository } from '../../domain/entities/repositories/carteira.repository.interface';
import { CarteiraMapper } from '../mapper/carteira.mapper';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CarteiraRepositoryImpl implements CarteiraRepository {
  private readonly logger = new Logger(CarteiraRepositoryImpl.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly carteiraMapper: CarteiraMapper,
  ) {}

  async buscarTodas(): Promise<Carteira[]> {
    const carteirasData = await this.prisma.carteira.findMany();

    if (!carteirasData) {
      throw new NotFoundException('Nenhuma carteira encontrada');
    }

    const carteirasDomain: Carteira[] = carteirasData.map(
      this.carteiraMapper.modelToDomain,
    );

    return carteirasDomain;
  }

  async buscarPorId(id: string): Promise<Carteira> {
    if (!id) {
      throw new BadRequestException('ID da carteira inválido');
    }

    try {
      const carteiraData = await this.prisma.carteira.findUnique({
        where: { id_carteira: id },
      });

      if (!carteiraData) {
        throw new NotFoundException(`Carteira não encontrada: ${id}`);
      }

      const carteiraDomain = this.carteiraMapper.modelToDomain(carteiraData);

      if (!carteiraDomain) {
        throw new InternalServerErrorException(
          'Erro ao transformar model da carteira para o domínio',
        );
      }

      return carteiraDomain;
    } catch (error) {
      this.logger.error(`Erro ao buscar carteira: ${error.message}`, {
        stack: error.stack,
      });

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(`Erro ao buscar carteira: ${id}`);
    }
  }

  async criar(carteira: Carteira): Promise<Carteira> {
    try {
      const usuarioExiste = await this.prisma.usuario.findUnique({
        where: { id_usuario: carteira.getIdUsuario() },
      });

      if (!usuarioExiste) {
        throw new NotFoundException(
          `Usuário não encontrado: ${carteira.getIdUsuario()}`,
        );
      }

      const carteiraModel = this.carteiraMapper.domainToModel(carteira);

      const carteiraData = await this.prisma.carteira.create({
        data: carteiraModel,
      });

      const carteiraDomain = this.carteiraMapper.modelToDomain(carteiraData);

      if (!carteiraDomain) {
        throw new InternalServerErrorException(
          'Erro ao transformar model da carteira para o domínio',
        );
      }

      return carteiraDomain;
    } catch (error) {
      this.logger.error(`Erro ao criar carteira: ${error.message}`, {
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
          `Usuário não encontrado (chave estrangeira inválida): ${carteira.getIdUsuario()}`,
        );
      }
      throw new InternalServerErrorException('Erro ao criar carteira');
    }
  }
}
