import { Injectable, Inject } from '@nestjs/common';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { DateUtils } from '../../../domain/shared/data.utils';
import { AtualizarLancamentoDto } from '../../dtos/lancamento/atualizar-lancamento.dto';

export interface AtualizarLancamentoProps {
  idCarteira: string;
  idLancamento: string;
  dados: AtualizarLancamentoDto;
}

@Injectable()
export class AtualizarLancamentoUseCase {
  constructor(
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
    @Inject('CategoriaRepository')
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  async execute(props: AtualizarLancamentoProps): Promise<void> {
    const carteira = await this.carteiraRepository.buscarPorId(
      props.idCarteira,
    );

    if (!carteira) {
      throw new DomainException(
        `Carteira com ID ${props.idCarteira} não encontrada`,
      );
    }

    const categoria = props.dados.idCategoria
      ? await this.categoriaRepository.buscarPorId(props.dados.idCategoria)
      : undefined;

    if (props.dados.idCategoria && !categoria) {
      throw new DomainException(
        `Categoria com ID ${props.dados.idCategoria} não encontrada`,
      );
    }

    const dataConvertida = props.dados.data
      ? DateUtils.converterParaDate(props.dados.data)
      : undefined;

    carteira.atualizarLancamento(props.idLancamento, {
      categoria,
      tipoTransacao: props.dados.tipoTransacao,
      titulo: props.dados.titulo,
      valor: props.dados.valor,
      descricao: props.dados.descricao,
      data: dataConvertida,
    });

    await this.carteiraRepository.salvar(carteira);
  }
}
