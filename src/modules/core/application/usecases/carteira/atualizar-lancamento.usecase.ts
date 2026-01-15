import { Injectable } from '@nestjs/common';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { CategoriaRepositoryImpl } from '../../../infrastructure/repositories/categoria.repository';
import { DateUtils } from '../../../domain/shared/data.utils';
import { AtualizarLancamentoDto } from '../../dtos/lancamento/atualizar-lancamento.dto';
import { CarteiraRepositoryImpl } from 'src/modules/core/infrastructure/repositories/Carteira.repository';

export interface AtualizarLancamentoProps {
  idCarteira: string;
  idLancamento: string;
  dados: AtualizarLancamentoDto;
}

@Injectable()
export class AtualizarLancamentoUseCase {
  constructor(
    private readonly carteiraRepository: CarteiraRepositoryImpl,
    private readonly categoriaRepository: CategoriaRepositoryImpl,
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
