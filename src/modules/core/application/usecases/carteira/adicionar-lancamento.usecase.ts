import { Injectable } from '@nestjs/common';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { CategoriaRepositoryImpl } from '../../../infrastructure/repositories/categoria.repository';

export interface AdicionarLancamentoUseCaseProps {
  idCarteira: string;
  idCategoria: string;
  valor: number;
  descricao: string;
  data: Date;
}

@Injectable()
export class AdicionarLancamentoUseCase {
  constructor(
    private readonly carteiraRepository: CarteiraRepositoryImpl,
    private readonly categoriaRepository: CategoriaRepositoryImpl,
  ) {}

  async execute(props: AdicionarLancamentoUseCaseProps): Promise<void> {
    const carteira = await this.carteiraRepository.buscarPorId(
      props.idCarteira,
    );
    if (!carteira) {
      throw new Error('Carteira não encontrada');
    }

    const categoria = await this.categoriaRepository.buscarPorId(
      props.idCategoria,
    );
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    carteira.adicionarLancamento({
      categoria,
      valor: props.valor,
      descricao: props.descricao,
      data: props.data,
    });

    await this.carteiraRepository.salvar(carteira);
  }
}
