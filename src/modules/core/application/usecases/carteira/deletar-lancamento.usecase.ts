import { Injectable } from '@nestjs/common';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';

@Injectable()
export class DeletarLancamentoUseCase {
  constructor(private readonly carteiraRepository: CarteiraRepositoryImpl) {}

  async execute(idCarteira: string, idLancamento: string): Promise<void> {
    const carteira = await this.carteiraRepository.buscarPorId(idCarteira);

    if (!carteira) {
      throw new DomainException(`Carteira com ID ${idCarteira} não encontrada`);
    }

    carteira.excluirLancamento(idLancamento);

    await this.carteiraRepository.salvar(carteira);
  }
}
