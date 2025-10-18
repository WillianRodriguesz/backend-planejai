import { Lancamento, TipoTransacao } from './lancamento';
import { SaldoMes } from './saldo-mensal';
import { Categoria } from './categoria';
import { DomainException } from './exceptions/domain.exception';

export interface CriarCarteiraProps {
  usuarioId: string;
}

export interface AdicionarLancamentoProps {
  categoria: Categoria;
  tipoTransacao: TipoTransacao;
  titulo: string;
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
    if (!usuarioId || usuarioId.trim() === '') {
      throw new DomainException('UsuarioId é obrigatório');
    }
    this.usuarioId = usuarioId;
  }

  private setId(id: string): void {
    if (this.id) {
      throw new DomainException('ID já foi definido');
    }
    this.id = id;
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
    const mes = lancamento.getData().getMonth() + Carteira.MES_OFFSET;
    const ano = lancamento.getData().getFullYear();
    this.recalcularSaldoMes(mes, ano);
  }

  public excluirLancamento(idLancamento: string): void {
    const lancamento = this.buscarLancamentoPorId(idLancamento);
    if (!lancamento) {
      throw new DomainException(
        `Lançamento com ID ${idLancamento} não encontrado`,
      );
    }
    const indice = this.lancamentos.findIndex(
      (l) => l.getId() === idLancamento,
    );
    this.lancamentos.splice(indice, 1);
    const mes = lancamento.getData().getMonth() + Carteira.MES_OFFSET;
    const ano = lancamento.getData().getFullYear();
    this.recalcularSaldoMes(mes, ano);
  }

  public buscarSaldoMensal(mes: number, ano: number): number | undefined {
    const saldoMes = this.buscarSaldoMes(mes, ano);
    if (!saldoMes) {
      console.error(`Saldo não encontrado para mês ${mes} e ano ${ano}`);
      return undefined;
    }
    return saldoMes.getSaldoMes();
  }

  public calcularTotalEntradasMensal(mes: number, ano: number): number {
    const lancamentosMes = this.buscarLancamentosPorMes(mes, ano);
    let valorTotalEntradas = 0;
    for (const lancamento of lancamentosMes) {
      if (lancamento.getTipoTransacao() === 'entrada') {
        valorTotalEntradas += Number(lancamento.getValor());
      }
    }
    return valorTotalEntradas;
  }

  public calcularTotalSaidasMensal(mes: number, ano: number): number {
    const lancamentosMes = this.buscarLancamentosPorMes(mes, ano);
    let valorTotalSaidas = 0;
    for (const lancamento of lancamentosMes) {
      if (lancamento.getTipoTransacao() === 'saida') {
        valorTotalSaidas += Number(lancamento.getValor());
      }
    }
    return valorTotalSaidas;
  }

  private buscarLancamentoPorId(id: string): Lancamento | undefined {
    return this.lancamentos.find((l) => l.getId() === id);
  }

  private buscarSaldoMes(mes: number, ano: number): SaldoMes | undefined {
    return this.saldosMensais.find(
      (s) => s.getMes() === mes && s.getAno() === ano,
    );
  }

  private buscarLancamentosPorMes(mes: number, ano: number): Lancamento[] {
    const lancamentosFiltrados: Lancamento[] = [];
    for (const lancamento of this.lancamentos) {
      const lancamentoMes =
        lancamento.getData().getMonth() + Carteira.MES_OFFSET;
      const lancamentoAno = lancamento.getData().getFullYear();
      if (lancamentoMes === mes && lancamentoAno === ano) {
        lancamentosFiltrados.push(lancamento);
      }
    }
    return lancamentosFiltrados;
  }

  private recalcularSaldoMes(mes: number, ano: number): void {
    const lancamentosMes = this.buscarLancamentosPorMes(mes, ano);
    let saldoCalculado = 0;

    for (const lancamento of lancamentosMes) {
      const tipo = lancamento.getTipoTransacao();
      const valor = Number(lancamento.getValor());

      if (tipo === 'entrada') {
        saldoCalculado += valor;
      } else if (tipo === 'saida') {
        saldoCalculado -= valor;
      }
    }

    const saldoMesExistente = this.buscarSaldoMes(mes, ano);

    if (!saldoMesExistente) {
      const novoSaldoMes = SaldoMes.criar({
        mes,
        ano,
        saldoMes: saldoCalculado,
      });
      this.saldosMensais.push(novoSaldoMes);
    } else {
      saldoMesExistente.atualizarSaldoMes(saldoCalculado);
    }
  }
}