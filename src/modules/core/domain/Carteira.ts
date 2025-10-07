import { Lancamento } from './Lancamento';
import { SaldoMes } from './SaldoMes';
import { Categoria } from './Categoria';

export interface CriarCarteiraProps {
  usuarioId: string;
}

export interface AdicionarLancamentoProps {
  categoria: Categoria;
  valor: number;
  descricao: string;
  data: Date;
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

  private static readonly MES_OFFSET = 1;

  public static criar(props: CriarCarteiraProps): Carteira {
    const { usuarioId } = props;
    const carteira = new Carteira();
    carteira.setUsuarioId(usuarioId);
    carteira.setCriadoEm(new Date());
    carteira.setLancamentos([]);
    carteira.setSaldosMensais([]);
    return carteira;
  }

  public static carregar(props: {
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

  public adicionarLancamento(props: AdicionarLancamentoProps): void {
    const lancamento = Lancamento.criar(props);
    this.lancamentos.push(lancamento);
    this.atualizarSaldoMensal(lancamento);
  }

  private atualizarSaldoMensal(lancamento: Lancamento): void {
    const mes = lancamento.getData().getMonth() + Carteira.MES_OFFSET; // Mês de 1 a 12
    const ano = lancamento.getData().getFullYear();

    let saldoMes = this.saldosMensais.find(
      (s) => s.getMes() === mes && s.getAno() === ano,
    );

    if (!saldoMes) {
      saldoMes = SaldoMes.criar({
        mes,
        ano,
        saldoMes: 0,
      });
      this.saldosMensais.push(saldoMes);
    }

    const tipo = lancamento.getCategoria().getTipo();
    const valor = lancamento.getValor();

    if (tipo === 'entrada') {
      saldoMes.adicionarSaldoMes(valor);
    } else if (tipo === 'saida') {
      saldoMes.subtrairSaldoMes(valor);
    }
  }
}
