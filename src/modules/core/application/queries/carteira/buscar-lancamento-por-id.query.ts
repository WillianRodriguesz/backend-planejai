import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LancamentoDto } from '../../dtos/lancamento/lancamento.dto';
import { LancamentoMapper } from '../../mappers/lancamento.mapper';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';

@Injectable()
export class BuscarLancamentoPorIdQuery {
  constructor(
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
  ) {}

  async execute(
    idCarteira: string,
    idLancamento: string,
  ): Promise<LancamentoDto> {
    const resultCarteiraDomain =
      await this.carteiraRepository.buscarPorId(idCarteira);

    if (!resultCarteiraDomain) {
      throw new NotFoundException('Carteira não encontrada');
    }

    const lancamentos = resultCarteiraDomain.getLancamentos();
    const lancamento = lancamentos.find((l) => l.getId() === idLancamento);

    if (!lancamento) {
      throw new NotFoundException('Lançamento não encontrado');
    }

    return LancamentoMapper.DomainToDto(lancamento);
  }
}
