type Tipo = 'entrada' | 'saida' | 'ambos';
import { DomainException } from './exceptions/domain.exception';

export interface CriarCategoriaProps {
  nome: string;
  tipo: Tipo;
}

export class Categoria {
  private id: number;
  private nome: string;
  private tipo: Tipo;

  private constructor(id?: number) {
    this.id = id;
  }

  public static criar(props: CriarCategoriaProps): Categoria {
    const { nome, tipo } = props;
    const categoria = new Categoria();
    categoria.setNome(nome);
    categoria.setTipo(tipo);
    return categoria;
  }

  public static carregar(props: {
    id: number;
    nome: string;
    tipo: Tipo;
  }): Categoria {
    const categoria = new Categoria(props.id);
    categoria.setNome(props.nome);
    categoria.setTipo(props.tipo);
    return categoria;
  }

  public getId(): number {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getTipo(): Tipo {
    return this.tipo;
  }

  private setNome(nome: string): void {
    if (!nome || nome.trim() === '') {
      throw new DomainException('Nome é obrigatório');
    }
    this.nome = nome;
  }

  private setTipo(tipo: Tipo): void {
    if (!['entrada', 'saida', 'ambos'].includes(tipo)) {
      throw new DomainException('Tipo deve ser entrada, saida ou ambos');
    }
    this.tipo = tipo;
  }

  public setId(id: number): void {
    if (this.id !== undefined) {
      throw new DomainException('ID já foi definido');
    }
    this.id = id;
  }
}
