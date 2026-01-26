import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';

@Injectable()
export class DeletarLancamentoUseCase {
  constructor(
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
  ) {}

  async execute(idCarteira: string, idLancamento: string): Promise<void> {
    const carteira = await this.carteiraRepository.buscarPorId(idCarteira);

    if (!carteira) {
      throw new DomainException(`Carteira com ID ${idCarteira} não encontrada`);
    }

    carteira.excluirLancamento(idLancamento);

    await this.carteiraRepository.salvar(carteira);
  }
}
