import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Lancamento } from '../../../domain/lancamento';
import { PaginacaoUtils } from '../../../domain/shared/paginacao.utils';
import { LancamentosPaginadosDto } from '../../dtos/lancamento/lancamentos-paginados.dto';
import { LancamentoMapper } from '../../mappers/lancamento.mapper';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';


export interface BuscarTodosLancamentosQueryProps {
  idCarteira: string;
  pagina?: number;
  itensPorPagina?: number;
}

@Injectable()
export class BuscarTodosLancamentosQuery {
  private readonly ITENS_POR_PAGINA_DEFAULT = 10;
  private readonly PAGINA_DEFAULT = 1;

  constructor(
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
  ) {}

  async execute(
    idCarteira: string,
    pagina: number = this.PAGINA_DEFAULT,
    itensPorPagina: number = this.ITENS_POR_PAGINA_DEFAULT,
  ): Promise<LancamentosPaginadosDto> {
    const resultCarteiraDomain =
      await this.carteiraRepository.buscarPorId(idCarteira);

    if (!resultCarteiraDomain) {
      throw new NotFoundException('Carteira não encontrada');
    }

    const todosLancamentos = resultCarteiraDomain.getLancamentos();

    const resultado = PaginacaoUtils.paginar(
      todosLancamentos,
      pagina,
      itensPorPagina,
    );

    return {
      lancamentos: LancamentoMapper.DomainToDtoList(
        resultado.items as Lancamento[],
      ),
      total: resultado.total,
      pagina: resultado.pagina,
      totalPaginas: resultado.totalPaginas,
      itensPorPagina: resultado.itensPorPagina,
    };
  }
}
