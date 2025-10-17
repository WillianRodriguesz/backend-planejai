import { Categoria } from './categoria';
import { DomainException } from './exceptions/domain.exception';

export interface CriarLancamentoProps {
  categoria: Categoria;
  valor: number;
  descricao: string;
  data: Date;
}

export class Lancamento {
  private id: string;
  private categoria: Categoria;
  private valor: number;
  private descricao: string;
  private data: Date;

  private constructor(id?: string) {
    this.id = id;
  }

  public static criar(props: CriarLancamentoProps): Lancamento {
    const { valor, descricao, data, categoria } = props;
    const lancamento = new Lancamento();
    lancamento.setValor(valor);
    lancamento.setDescricao(descricao);
    lancamento.setData(data);
    lancamento.setCategoria(categoria);
    return lancamento;
  }

  public static carregar(props: {
    id: string;
    valor: number;
    descricao: string;
    data: Date;
    categoria: Categoria;
  }): Lancamento {
    const lancamento = new Lancamento(props.id);
    lancamento.setValor(props.valor);
    lancamento.setDescricao(props.descricao);
    lancamento.setData(props.data);
    lancamento.setCategoria(props.categoria);
    return lancamento;
  }

  public getId(): string {
    return this.id;
  }

  public getValor(): number {
    return this.valor;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public getData(): Date {
    return this.data;
  }

  private setValor(valor: number): void {
    if (valor <= 0) {
      throw new DomainException('Valor deve ser positivo');
    }
    this.valor = valor;
  }

  private setDescricao(descricao: string): void {
    if (!descricao || descricao.trim() === '') {
      throw new DomainException('Descrição é obrigatória');
    }
    this.descricao = descricao;
  }

  private setData(data: Date): void {
    if (!data || data > new Date()) {
      throw new DomainException('Data deve ser válida e não futura');
    }
    this.data = data;
  }

  public getCategoria(): Categoria | undefined {
    return this.categoria;
  }

  private setCategoria(categoria?: Categoria): void {
    if (!categoria) {
      throw new DomainException('Categoria é obrigatória');
    }
    this.categoria = categoria;
  }
}
