import { Termo, TipoTermo } from './termo';

export interface CriarUsuarioConsentimentoProps {
  usuarioId: string;
  termoLgpdId?: number;
  aceitouLgpd: boolean;
  termoTermosUsoId?: number;
  aceitouTermosUso: boolean;
  termoPoliticaPrivacidadeId?: number;
  aceitouPoliticaPrivacidade: boolean;
}

export class UsuarioConsentimento {
  private id: number;
  private usuarioId: string;
  private termoLgpdId?: number;
  private termoLgpd?: Termo;
  private aceitouLgpd: boolean;
  private dataAceitouLgpd?: Date;
  private termoTermosUsoId?: number;
  private termoTermosUso?: Termo;
  private aceitouTermosUso: boolean;
  private dataAceitouTermosUso?: Date;
  private termoPoliticaPrivacidadeId?: number;
  private termoPoliticaPrivacidade?: Termo;
  private aceitouPoliticaPrivacidade: boolean;
  private dataAceitouPoliticaPrivacidade?: Date;
  private criadoEm: Date;

  private constructor(id?: number) {
    this.id = id;
  }

  public static criar(
    props: CriarUsuarioConsentimentoProps,
  ): UsuarioConsentimento {
    const {
      usuarioId,
      termoLgpdId,
      aceitouLgpd,
      termoTermosUsoId,
      aceitouTermosUso,
      termoPoliticaPrivacidadeId,
      aceitouPoliticaPrivacidade,
    } = props;
    const consentimento = new UsuarioConsentimento();
    consentimento.setUsuarioId(usuarioId);
    consentimento.setTermoLgpdId(termoLgpdId);
    consentimento.setAceitouLgpd(aceitouLgpd);
    if (aceitouLgpd) consentimento.setDataAceitouLgpd(new Date());
    consentimento.setTermoTermosUsoId(termoTermosUsoId);
    consentimento.setAceitouTermosUso(aceitouTermosUso);
    if (aceitouTermosUso) consentimento.setDataAceitouTermosUso(new Date());
    consentimento.setTermoPoliticaPrivacidadeId(termoPoliticaPrivacidadeId);
    consentimento.setAceitouPoliticaPrivacidade(aceitouPoliticaPrivacidade);
    if (aceitouPoliticaPrivacidade)
      consentimento.setDataAceitouPoliticaPrivacidade(new Date());
    consentimento.setCriadoEm(new Date());
    return consentimento;
  }

  public static carregar(props: {
    id: number;
    usuarioId: string;
    termoLgpdId?: number;
    termoLgpd?: Termo;
    aceitouLgpd: boolean;
    dataAceitouLgpd?: Date;
    termoTermosUsoId?: number;
    termoTermosUso?: Termo;
    aceitouTermosUso: boolean;
    dataAceitouTermosUso?: Date;
    termoPoliticaPrivacidadeId?: number;
    termoPoliticaPrivacidade?: Termo;
    aceitouPoliticaPrivacidade: boolean;
    dataAceitouPoliticaPrivacidade?: Date;
    criadoEm: Date;
  }): UsuarioConsentimento {
    const consentimento = new UsuarioConsentimento(props.id);
    consentimento.setUsuarioId(props.usuarioId);
    consentimento.setTermoLgpdId(props.termoLgpdId);
    consentimento.setTermoLgpd(props.termoLgpd);
    consentimento.setAceitouLgpd(props.aceitouLgpd);
    consentimento.setDataAceitouLgpd(props.dataAceitouLgpd);
    consentimento.setTermoTermosUsoId(props.termoTermosUsoId);
    consentimento.setTermoTermosUso(props.termoTermosUso);
    consentimento.setAceitouTermosUso(props.aceitouTermosUso);
    consentimento.setDataAceitouTermosUso(props.dataAceitouTermosUso);
    consentimento.setTermoPoliticaPrivacidadeId(
      props.termoPoliticaPrivacidadeId,
    );
    consentimento.setTermoPoliticaPrivacidade(props.termoPoliticaPrivacidade);
    consentimento.setAceitouPoliticaPrivacidade(
      props.aceitouPoliticaPrivacidade,
    );
    consentimento.setDataAceitouPoliticaPrivacidade(
      props.dataAceitouPoliticaPrivacidade,
    );
    consentimento.setCriadoEm(props.criadoEm);
    return consentimento;
  }

  public getId(): number {
    return this.id;
  }

  public getUsuarioId(): string {
    return this.usuarioId;
  }

  public getTermoLgpdId(): number | undefined {
    return this.termoLgpdId;
  }

  public getTermoLgpd(): Termo | undefined {
    return this.termoLgpd;
  }

  public getAceitouLgpd(): boolean {
    return this.aceitouLgpd;
  }

  public getDataAceitouLgpd(): Date | undefined {
    return this.dataAceitouLgpd;
  }

  public getTermoTermosUsoId(): number | undefined {
    return this.termoTermosUsoId;
  }

  public getTermoTermosUso(): Termo | undefined {
    return this.termoTermosUso;
  }

  public getAceitouTermosUso(): boolean {
    return this.aceitouTermosUso;
  }

  public getDataAceitouTermosUso(): Date | undefined {
    return this.dataAceitouTermosUso;
  }

  public getTermoPoliticaPrivacidadeId(): number | undefined {
    return this.termoPoliticaPrivacidadeId;
  }

  public getTermoPoliticaPrivacidade(): Termo | undefined {
    return this.termoPoliticaPrivacidade;
  }

  public getAceitouPoliticaPrivacidade(): boolean {
    return this.aceitouPoliticaPrivacidade;
  }

  public getDataAceitouPoliticaPrivacidade(): Date | undefined {
    return this.dataAceitouPoliticaPrivacidade;
  }

  public getCriadoEm(): Date {
    return this.criadoEm;
  }

  private setUsuarioId(usuarioId: string): void {
    this.usuarioId = usuarioId;
  }

  private setTermoLgpdId(termoLgpdId?: number): void {
    this.termoLgpdId = termoLgpdId;
  }

  private setTermoLgpd(termoLgpd?: Termo): void {
    this.termoLgpd = termoLgpd;
  }

  private setAceitouLgpd(aceitouLgpd: boolean): void {
    this.aceitouLgpd = aceitouLgpd;
  }

  private setDataAceitouLgpd(dataAceitouLgpd?: Date): void {
    this.dataAceitouLgpd = dataAceitouLgpd;
  }

  private setTermoTermosUsoId(termoTermosUsoId?: number): void {
    this.termoTermosUsoId = termoTermosUsoId;
  }

  private setTermoTermosUso(termoTermosUso?: Termo): void {
    this.termoTermosUso = termoTermosUso;
  }

  private setAceitouTermosUso(aceitouTermosUso: boolean): void {
    this.aceitouTermosUso = aceitouTermosUso;
  }

  private setDataAceitouTermosUso(dataAceitouTermosUso?: Date): void {
    this.dataAceitouTermosUso = dataAceitouTermosUso;
  }

  private setTermoPoliticaPrivacidadeId(
    termoPoliticaPrivacidadeId?: number,
  ): void {
    this.termoPoliticaPrivacidadeId = termoPoliticaPrivacidadeId;
  }

  private setTermoPoliticaPrivacidade(termoPoliticaPrivacidade?: Termo): void {
    this.termoPoliticaPrivacidade = termoPoliticaPrivacidade;
  }

  private setAceitouPoliticaPrivacidade(
    aceitouPoliticaPrivacidade: boolean,
  ): void {
    this.aceitouPoliticaPrivacidade = aceitouPoliticaPrivacidade;
  }

  private setDataAceitouPoliticaPrivacidade(
    dataAceitouPoliticaPrivacidade?: Date,
  ): void {
    this.dataAceitouPoliticaPrivacidade = dataAceitouPoliticaPrivacidade;
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
