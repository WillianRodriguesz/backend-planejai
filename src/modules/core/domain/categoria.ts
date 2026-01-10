import { DomainException } from './exceptions/domain.exception';

export interface CriarCategoriaProps {
  nome: string;
}

export class Categoria {
  private id: number;
  private nome: string;

  private constructor(id?: number) {
    this.id = id;
  }

  public static criar(props: CriarCategoriaProps): Categoria {
    const { nome} = props;
    const categoria = new Categoria();
    categoria.setNome(nome);
    return categoria;
  }

  public static carregar(props: {
    id: number;
    nome: string;
  }): Categoria {
    const categoria = new Categoria(props.id);
    categoria.setNome(props.nome);
    return categoria;
  }

  public getId(): number {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }


  private setNome(nome: string): void {
    if (!nome || nome.trim() === '') {
      throw new DomainException('Nome é obrigatório');
    }
    this.nome = nome;
  }


  private setId(id: number): void {
    if (this.id !== undefined) {
      throw new DomainException('ID já foi definido');
    }
    this.id = id;
  }
}
