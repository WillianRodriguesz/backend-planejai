import { Inject, Injectable } from '@nestjs/common';
import { CarteiraRepository } from '../../../domain/entities/repositories/carteira.repository.interface';
import { CarteiraMapper } from '../../mappers/carteira.mapper';
import { CarteiraDto } from '../../dtos/carteira/carteira.dto';

type CarteirasResult = CarteiraDto[];
@Injectable()
export class ListarCarteirasUseCase {
  constructor(
    @Inject('CarteiraRepository') 
    private readonly carteiraRepository: CarteiraRepository) {}

  async execute(): Promise<CarteirasResult> {
    const carteirasResult = await this.carteiraRepository.buscarTodas();

    const carteirasDto: CarteiraDto[] = carteirasResult.map(CarteiraMapper.domainToDto);

    if (!carteirasDto || carteirasDto.length === 0) {
      throw new Error('Nenhuma carteira encontrada');
    }

    return carteirasDto;
  }
}
