import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';

export type tipoTransacao = 'entrada' | 'saida';
export interface AdicionarLancamentoUseCaseProps {
  idCarteira: string;
  idCategoria: number;
  tipoTransacao: tipoTransacao;
  titulo: string;
  valor: number;
  descricao?: string;
  data: Date;
}

@Injectable()
export class AdicionarLancamentoUseCase {
  constructor(
    @Inject('CarteiraRepository')
    private readonly carteiraRepository: CarteiraRepository,
    @Inject('CategoriaRepository')
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  async execute(props: AdicionarLancamentoUseCaseProps): Promise<void> {
    const resultCarteiraDomain = await this.carteiraRepository.buscarPorId(
      props.idCarteira,
    );

    if (!resultCarteiraDomain) {
      throw new NotFoundException('Carteira não encontrada');
    }

    const resultCategoriaDomain = await this.categoriaRepository.buscarPorId(
      props.idCategoria,
    );
    if (!resultCategoriaDomain) {
      throw new NotFoundException('Categoria não encontrada');
    }

    resultCarteiraDomain.adicionarLancamento({
      categoria: resultCategoriaDomain,
      tipoTransacao: props.tipoTransacao,
      titulo: props.titulo,
      valor: props.valor,
      descricao: props.descricao,
      data: props.data,
    });

    await this.carteiraRepository.salvar(resultCarteiraDomain);
  }
}
