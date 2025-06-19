import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../database/Prisma/prisma.service';
import { Carteira } from '../../domain/entities/carteira/carteira.entity';
import { CarteiraRepository } from '../../domain/entities/repositories/carteira.repository.interface';
import { CarteiraMapper } from '../mapper/carteira.mapper';
import { CarteiraModel } from '../models/carteira.model';

@Injectable()
export class CarteiraRepositoryImpl implements CarteiraRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly carteiraMapper: CarteiraMapper,
  ) {}

  async buscarPorId(id: string): Promise<Carteira> {
    if (!id) {
      throw new NotFoundException('ID da carteira não informado');
    }
    try {
      const carteiraData = await this.prisma.carteira.findUnique({
        where: { id_carteira: id },
      });

      if (!carteiraData) {
        throw new NotFoundException('Carteira não encontrada');
      }

      const carteiraModel = new CarteiraModel().criar({
        id: carteiraData.id_carteira,
        id_usuario: carteiraData.id_usuario,
        saldo: carteiraData.saldo,
      });
      if (!carteiraModel) {
        throw new InternalServerErrorException(
          'Erro ao criar model da carteira',
        );
      }

      const carteiraDomain = this.carteiraMapper.modelToDomain(carteiraModel);
      if (!carteiraDomain) {
        throw new InternalServerErrorException(
          'Erro ao transformar model da carteira para o domínio',
        );
      }

      return carteiraDomain;
    } catch (error) {
      console.error('Erro ao buscar carteira:', error);
      throw error;
    }
  }

  async criar(carteira: Carteira): Promise<Carteira> {
    try {
      const createdCarteira = await this.prisma.carteira.create({
        data: {
          id_carteira: carteira.getId(),
          id_usuario: carteira.getIdUsuario(),
          saldo: carteira.getSaldo().getValor(),
        },
      });
      const carteiraModel = new CarteiraModel().criar({
        id: createdCarteira.id_carteira,
        id_usuario: createdCarteira.id_usuario,
        saldo: createdCarteira.saldo,
      });
      if (!carteiraModel) {
        throw new InternalServerErrorException(
          'Erro ao criar model da carteira',
        );
      }

      const carteiraDomain = this.carteiraMapper.modelToDomain(carteiraModel);

      return carteiraDomain;
    } catch (error) {
      console.error('Erro ao criar carteira:', error);
      throw new InternalServerErrorException('Erro ao criar carteira');
    }
  }
}
