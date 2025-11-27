import { Injectable, NotFoundException } from '@nestjs/common';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';

export interface BuscarSaldoMesQueryProps {
  idCarteira: string;
  data: Date;
}

@Injectable()
export class AdicionarLancamentoUseCase {
  constructor(
    private readonly carteiraRepository: CarteiraRepositoryImpl,
  ) {}

  async execute(props: BuscarSaldoMesQueryProps): Promise<void> {
    const resultCarteiraDomain = await this.carteiraRepository.buscarPorId(
      props.idCarteira,
    );

    if (!resultCarteiraDomain) {
      throw new NotFoundException('Carteira não encontrada');
    }

    const mesAno = extrairMesAno(props.data);

    const saldoMes = resultCarteiraDomain.buscarSaldoMensal(props.data);

    await this.carteiraRepository.salvar(resultCarteiraDomain);
  }
}
