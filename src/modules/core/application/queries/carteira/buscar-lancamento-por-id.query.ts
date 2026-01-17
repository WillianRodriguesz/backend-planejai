import { Injectable, NotFoundException } from '@nestjs/common';
import { LancamentoDto } from '../../dtos/lancamento/lancamento.dto';
import { LancamentoMapper } from '../../mappers/lancamento.mapper';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/Carteira.repository';

@Injectable()
export class BuscarLancamentoPorIdQuery {
  constructor(private readonly carteiraRepository: CarteiraRepositoryImpl) {}

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
