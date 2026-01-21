export enum TipoTermo {
  LGPD = 'lgpd',
  TERMOS_USO = 'termos_uso',
  POLITICA_PRIVACIDADE = 'politica_privacidade',
}

export interface CriarTermoProps {
  tipo: TipoTermo;
  versao: string;
  titulo: string;
  texto: string;
  ativo?: boolean;
}

export class Termo {
  private id: number;
  private tipo: TipoTermo;
  private versao: string;
  private titulo: string;
  private texto: string;
  private ativo: boolean;
  private criadoEm: Date;

  private constructor(id?: number) {
    this.id = id;
  }

  public static criar(props: CriarTermoProps): Termo {
    const { tipo, versao, titulo, texto, ativo = true } = props;
    const termo = new Termo();
    termo.setTipo(tipo);
    termo.setVersao(versao);
    termo.setTitulo(titulo);
    termo.setTexto(texto);
    termo.setAtivo(ativo);
    termo.setCriadoEm(new Date());
    return termo;
  }

  public static carregar(props: {
    id: number;
    tipo: TipoTermo;
    versao: string;
    titulo: string;
    texto: string;
    ativo: boolean;
    criadoEm: Date;
  }): Termo {
    const termo = new Termo(props.id);
    termo.setTipo(props.tipo);
    termo.setVersao(props.versao);
    termo.setTitulo(props.titulo);
    termo.setTexto(props.texto);
    termo.setAtivo(props.ativo);
    termo.setCriadoEm(props.criadoEm);
    return termo;
  }

  public getId(): number {
    return this.id;
  }

  public getTipo(): TipoTermo {
    return this.tipo;
  }

  public getVersao(): string {
    return this.versao;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getTexto(): string {
    return this.texto;
  }

  public getAtivo(): boolean {
    return this.ativo;
  }

  public getCriadoEm(): Date {
    return this.criadoEm;
  }

  private setTipo(tipo: TipoTermo): void {
    this.tipo = tipo;
  }

  private setVersao(versao: string): void {
    this.versao = versao;
  }

  private setTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  private setTexto(texto: string): void {
    this.texto = texto;
  }

  private setAtivo(ativo: boolean): void {
    this.ativo = ativo;
  }

  private setCriadoEm(criadoEm: Date): void {
    this.criadoEm = criadoEm;
  }

  public setId(id: number): void {
    if (this.id) {
      throw new Error('ID já foi definido');
    }
    this.id = id;
  }
}
