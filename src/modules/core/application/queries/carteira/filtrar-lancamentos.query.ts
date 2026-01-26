import { Injectable, Inject } from '@nestjs/common';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { Lancamento } from '../../../domain/lancamento';
import { DateUtils } from '../../../domain/shared/data.utils';
import { PaginacaoUtils } from '../../../domain/shared/paginacao.utils';
import { FiltrarLancamentosDto } from '../../dtos/lancamento/filtrar-lancamentos.dto';
import { LancamentosPaginadosDto } from '../../dtos/lancamento/lancamentos-paginados.dto';
import { LancamentoMapper } from '../../mappers/lancamento.mapper';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';


@Injectable()
export class FiltrarLancamentosQuery {
  constructor(
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
  ) {}

  async execute(
    idCarteira: string,
    filtros: FiltrarLancamentosDto,
  ): Promise<LancamentosPaginadosDto> {
    const carteira = await this.carteiraRepository.buscarPorId(idCarteira);

    if (!carteira) {
      throw new DomainException(`Carteira com ID ${idCarteira} não encontrada`);
    }

    const lancamentosFiltrados =
      await this.carteiraRepository.buscarLancamentosFiltrados({
        carteiraId: idCarteira,
        dataInicial: filtros.dataInicial
          ? DateUtils.converterParaDate(filtros.dataInicial)
          : undefined,
        dataFinal: filtros.dataFinal
          ? DateUtils.converterParaDate(filtros.dataFinal)
          : undefined,
        idCategoria: filtros.idCategoria,
        titulo: filtros.titulo,
        tipoTransacao:
          filtros.tipoTransacao && filtros.tipoTransacao !== 'todos'
            ? filtros.tipoTransacao
            : undefined,
      });

    const pagina = filtros.pagina || 1;
    const itensPorPagina = filtros.itensPorPagina || 10;

    const resultado = PaginacaoUtils.paginar<Lancamento>(
      lancamentosFiltrados,
      pagina,
      itensPorPagina,
    );

    return {
      lancamentos: LancamentoMapper.DomainToDtoList(resultado.items),
      total: resultado.total,
      pagina: resultado.pagina,
      itensPorPagina: resultado.itensPorPagina,
      totalPaginas: resultado.totalPaginas,
    };
  }
}
