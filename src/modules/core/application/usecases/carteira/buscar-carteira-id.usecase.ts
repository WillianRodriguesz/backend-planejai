import { Inject, Injectable } from '@nestjs/common';
import { CarteiraRepository } from '../../../domain/entities/repositories/carteira.repository.interface';
import { CarteiraMapper } from '../../mappers/carteira.mapper';
import { CarteiraDto } from '../../dtos/carteira/carteira.dto';
type CarteiraResult = CarteiraDto;
@Injectable()
export class BuscarCarteiraPorIdUseCase {
  constructor(
    @Inject('CarteiraRepository') 
    private readonly carteiraRepository: CarteiraRepository) {}

  async execute(id: string): Promise<CarteiraResult> {
    if (!id) {
      throw new Error('ID da carteira não pode ser vazio');
    }

    const carteiraResult = await this.carteiraRepository.buscarPorId(id);

    const carteiraDto = CarteiraMapper.domainToDto(carteiraResult);

    return carteiraDto;
  }
}
