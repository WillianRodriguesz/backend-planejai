import { Inject, Injectable } from '@nestjs/common';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository.interface';
import { CarteiraMapper } from '../../mappers/carteira.mapper';
import { CarteiraDto } from '../../dtos/carteira/carteira.dto';
import { Carteira } from '../../../domain/entities/carteira.entity';
type CarteiraResult = CarteiraDto;

export interface CarteiraUsecaseProps {
  idUsuario: string;
  saldo: number;
}

@Injectable()
export class CriarCarteiraUseCase {
  constructor(
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
  ) {}

  async execute(props: CarteiraUsecaseProps): Promise<CarteiraResult> {
    if (!props.idUsuario) {
      throw new Error('ID do usuário não pode ser vazio');
    }

    const carteiraDomain = Carteira.criar({
      idUsuario: props.idUsuario,
      saldoInicial: props.saldo,
    });

    const carteiraResult = await this.carteiraRepository.criar(carteiraDomain);

    const carteiraDto = CarteiraMapper.domainToDto(carteiraResult);

    return carteiraDto;
  }
}
