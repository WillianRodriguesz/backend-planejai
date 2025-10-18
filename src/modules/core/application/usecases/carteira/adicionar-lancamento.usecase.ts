import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { CategoriaRepositoryImpl } from '../../../infrastructure/repositories/categoria.repository';

export type tipoTransacao = 'entrada' | 'saida';
export interface AdicionarLancamentoUseCaseProps {
  idCarteira: string;
  idCategoria: number;
  tipoTransacao: tipoTransacao;
  titulo: string;
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
    const resultCarteiraDomain = await this.carteiraRepository.buscarPorId(
      props.idCarteira,
    );
    if (!resultCarteiraDomain) {
      throw new NotFoundException('Carteira não encontrada');
    }

    console.log('carteira:', resultCarteiraDomain); // REMOVER LOG 
    

    const resultCategoriaDomain = await this.categoriaRepository.buscarPorId(
      props.idCategoria,
    );
    if (!resultCategoriaDomain) {
      throw new NotFoundException('Categoria não encontrada');
    }


    console.log('resultCategoriaDomain:', resultCategoriaDomain); // REMOVER LOG 

    resultCarteiraDomain.adicionarLancamento({
      categoria: resultCategoriaDomain,
      tipoTransacao: props.tipoTransacao,
      titulo: props.titulo,
      valor: props.valor,
      descricao: props.descricao,
      data: props.data,
    });

    console.log('carteira depois de adicionar lancamento:', resultCarteiraDomain);

    await this.carteiraRepository.salvar(resultCarteiraDomain);
  }
}
