import { Lancamento } from './Lancamento';
import { SaldoMes } from './SaldoMes';

export interface CriarCarteiraProps {
  usuarioId: string;
}

export class Carteira {
  private id: string;
  private usuarioId: string;
  private lancamentos: Lancamento[];
  private saldosMensais: SaldoMes[];
  private criadoEm: Date;

  private constructor(id?: string) {
    this.id = id;
  }

  public static criar(props: CriarCarteiraProps): Carteira {
    const { usuarioId } = props;
    const carteira = new Carteira();
    carteira.setUsuarioId(usuarioId);
    carteira.setCriadoEm(new Date());
    carteira.setLancamentos([]);
    carteira.setSaldosMensais([]);
    return carteira;
  }

  public static reconstruir(props: {
    id: string;
    usuarioId: string;
    criadoEm: Date;
    lancamentos?: Lancamento[];
    saldosMensais?: SaldoMes[];
  }): Carteira {
    const carteira = new Carteira(props.id);
    carteira.setUsuarioId(props.usuarioId);
    carteira.setCriadoEm(props.criadoEm);
    carteira.setLancamentos(props.lancamentos || []);
    carteira.setSaldosMensais(props.saldosMensais || []);
    return carteira;
  }

  public getId(): string {
    return this.id;
  }

  public getUsuarioId(): string {
    return this.usuarioId;
  }

  public getCriadoEm(): Date {
    return this.criadoEm;
  }

  public getLancamentos(): Lancamento[] {
    return this.lancamentos;
  }

  public getSaldosMensais(): SaldoMes[] {
    return this.saldosMensais;
  }

  private setUsuarioId(usuarioId: string): void {
    this.usuarioId = usuarioId;
  }

  private setCriadoEm(criadoEm: Date): void {
    this.criadoEm = criadoEm;
  }

  private setLancamentos(lancamentos: Lancamento[]): void {
    this.lancamentos = lancamentos;
  }

  private setSaldosMensais(saldosMensais: SaldoMes[]): void {
    this.saldosMensais = saldosMensais;
  }

  public setId(id: string): void {
    if (this.id) {
      throw new Error('ID já foi definido');
    }
    this.id = id;
  }

  public adicionarLancamento(lancamento: Lancamento): void {
    if (lancamento.carteiraId !== this.id) {
      throw new Error('Lançamento não pertence a esta Carteira');
    }
    this.lancamentos.push(lancamento);
  }

  public calcularSaldoAtual(): number {
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();
    const lancamentosDoMes = this.lancamentos.filter(
      (l) =>
        l.data.getMonth() === mesAtual && l.data.getFullYear() === anoAtual,
    );
    const totalLancamentos = lancamentosDoMes.reduce(
      (sum, l) => sum + l.valor,
      0,
    );
    const saldoMensal = this.saldosMensais.find(
      (s) => s.mes === mesAtual + 1 && s.ano === anoAtual,
    );
    return saldoMensal
      ? saldoMensal.saldoMes + totalLancamentos
      : totalLancamentos;
  }
}
