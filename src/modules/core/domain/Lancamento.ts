import { Categoria } from './categoria';
import { DomainException } from './exceptions/domain.exception';

export type TipoTransacao = 'entrada' | 'saida';

export interface CriarLancamentoProps {
  titulo: string;
  descricao: string;
  valor: number;
  tipoTransacao: TipoTransacao;
  categoria: Categoria;
  data: Date;
}

export class Lancamento {
  private id: string;
  private titulo: string;
  private descricao: string;
  private valor: number;
  private tipoTransacao: TipoTransacao;
  private categoria: Categoria;
  private data: Date;

  private constructor(id?: string) {
    this.id = id;
  }

  public static criar(props: CriarLancamentoProps): Lancamento {
    const { titulo, descricao, valor, tipoTransacao, categoria, data } = props;
    const lancamento = new Lancamento();
    lancamento.setTitulo(titulo);
    lancamento.setDescricao(descricao);
    lancamento.setValor(valor);
    lancamento.setTipoTransacao(tipoTransacao);
    lancamento.setCategoria(categoria);
    lancamento.setData(data);
    return lancamento;
  }

  public static carregar(props: {
    id: string;
    titulo: string;
    descricao: string;
    valor: number;
    tipoTransacao: TipoTransacao;
    categoria: Categoria;
    data: Date;
  }): Lancamento {
    const lancamento = new Lancamento(props.id);
    lancamento.setTitulo(props.titulo);
    lancamento.setDescricao(props.descricao);
    lancamento.setValor(props.valor);
    lancamento.setTipoTransacao(props.tipoTransacao);
    lancamento.setCategoria(props.categoria);
    lancamento.setData(props.data);
    return lancamento;
  }

  public getId(): string {
    return this.id;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public getValor(): number {
    return this.valor;
  }

  public getTipoTransacao(): TipoTransacao {
    return this.tipoTransacao;
  }

  public getCategoria(): Categoria {
    return this.categoria;
  }

  public getCategoriaId(): number {
    return this.categoria.getId();
  }

  public getData(): Date {
    return this.data;
  }

  private setTitulo(titulo: string): void {
    if (!titulo || titulo.trim() === '') {
      throw new DomainException('Título é obrigatório');
    }
    if (titulo.length > 150) {
      throw new DomainException('Título não pode ter mais de 150 caracteres');
    }
    this.titulo = titulo;
  }

  private setDescricao(descricao: string): void {
    if (!descricao || descricao.trim() === '') {
      throw new DomainException('Descrição é obrigatória');
    }
    if (descricao.length > 150) {
      throw new DomainException('Descrição não pode ter mais de 150 caracteres');
    }
    this.descricao = descricao;
  }

  private setValor(valor: number): void {
    if (valor <= 0) {
      throw new DomainException('Valor deve ser positivo');
    }
    this.valor = valor;
  }

  private setTipoTransacao(tipoTransacao: TipoTransacao): void {
    if (!tipoTransacao) {
      throw new DomainException('Tipo de transação é obrigatório');
    }
    if (tipoTransacao !== 'entrada' && tipoTransacao !== 'saida') {
      throw new DomainException('Tipo de transação deve ser "entrada" ou "saida"');
    }
    this.tipoTransacao = tipoTransacao;
  }

  private setCategoria(categoria: Categoria): void {
    if (!categoria) {
      throw new DomainException('Categoria é obrigatória');
    }
    this.categoria = categoria;
  }

  private setData(data: Date): void {
    if (!data || data > new Date()) {
      throw new DomainException('Data deve ser válida e não futura');
    }
    this.data = data;
  }
}