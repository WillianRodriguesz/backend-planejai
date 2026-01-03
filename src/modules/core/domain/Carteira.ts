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
  descricao?: string;
  data: Date;
}

export class Carteira {
  private id: string;
  private usuarioId: string;
  private lancamentos: Lancamento[];
  private lancamentosRemovidos: string[];
  private saldosMensais: SaldoMes[];
  private criadoEm: Date;

  private constructor(id?: string) {
    this.id = id;
    this.lancamentosRemovidos = [];
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

  public getLancamentosRemovidos(): string[] {
    return this.lancamentosRemovidos;
  }

  public limparLancamentosRemovidos(): void {
    this.lancamentosRemovidos = [];
  }

  public getSaldosMensais(): SaldoMes[] {
    return this.saldosMensais;
  }

  public adicionarLancamento(props: AdicionarLancamentoProps): void {
    console.log('\n=== ADICIONAR LANÇAMENTO ===');
    console.log('Lançamentos ANTES de adicionar:', this.lancamentos.length);
    console.log(
      'Lista de IDs dos lançamentos atuais:',
      this.lancamentos.map((l) => ({
        id: l.getId(),
        titulo: l.getTitulo(),
        valor: l.getValor(),
        tipo: l.getTipoTransacao(),
      })),
    );

    const lancamento = Lancamento.criar(props);
    console.log('Novo lançamento criado:', {
      titulo: props.titulo,
      valor: props.valor,
      tipo: props.tipoTransacao,
      data: props.data,
    });

    this.lancamentos.push(lancamento);
    console.log('Lançamentos DEPOIS de adicionar:', this.lancamentos.length);

    const mes = lancamento.getData().getMonth() + Carteira.MES_OFFSET;
    const ano = lancamento.getData().getFullYear();
    console.log(`Recalculando saldo para mês ${mes}/${ano}`);

    this.recalcularSaldoMes(mes, ano);
    console.log('=== FIM ADICIONAR LANÇAMENTO ===\n');
  }

  public excluirLancamento(idLancamento: string): void {
    console.log('\n=== EXCLUIR LANÇAMENTO ===');
    console.log('Lançamentos ANTES de excluir:', this.lancamentos.length);
    console.log('Tentando excluir ID:', idLancamento);

    const lancamento = this.buscarLancamentoPorId(idLancamento);
    if (!lancamento) {
      throw new DomainException(
        `Lançamento com ID ${idLancamento} não encontrado`,
      );
    }
    const mesAntigo = lancamento.getData().getMonth() + Carteira.MES_OFFSET;
    const anoAntigo = lancamento.getData().getFullYear();
    console.log(`Lançamento encontrado no mês ${mesAntigo}/${anoAntigo}:`, {
      titulo: lancamento.getTitulo(),
      valor: lancamento.getValor(),
      tipo: lancamento.getTipoTransacao(),
    });

    const indice = this.lancamentos.findIndex(
      (l) => l.getId() === idLancamento,
    );
    this.lancamentos.splice(indice, 1);
    console.log('Lançamentos DEPOIS de excluir:', this.lancamentos.length);

    this.lancamentosRemovidos.push(idLancamento);
    console.log(`Recalculando saldo para mês ${mesAntigo}/${anoAntigo}`);

    this.recalcularSaldoMes(mesAntigo, anoAntigo);
    console.log('=== FIM EXCLUIR LANÇAMENTO ===\n');
  }

  public atualizarLancamento(
    idLancamento: string,
    props: {
      categoria?: Categoria;
      tipoTransacao?: TipoTransacao;
      titulo?: string;
      valor?: number;
      descricao?: string;
      data?: Date;
    },
  ): void {
    const lancamento = this.buscarLancamentoPorId(idLancamento);
    if (!lancamento) {
      throw new DomainException(
        `Lançamento com ID ${idLancamento} não encontrado`,
      );
    }

    const dataAntiga = lancamento.getData();
    const mesAntigo = dataAntiga.getMonth() + Carteira.MES_OFFSET;
    const anoAntigo = dataAntiga.getFullYear();

    // Atualizar campos
    if (props.titulo !== undefined) {
      lancamento.atualizarTitulo(props.titulo);
    }
    if (props.descricao !== undefined) {
      lancamento.atualizarDescricao(props.descricao);
    }
    if (props.valor !== undefined) {
      lancamento.atualizarValor(props.valor);
    }
    if (props.tipoTransacao !== undefined) {
      lancamento.atualizarTipoTransacao(props.tipoTransacao);
    }
    if (props.categoria !== undefined) {
      lancamento.atualizarCategoria(props.categoria);
    }
    if (props.data !== undefined) {
      lancamento.atualizarData(props.data);
    }

    // Recalcular saldos
    const dataNova = lancamento.getData();
    const mesNovo = dataNova.getMonth() + Carteira.MES_OFFSET;
    const anoNovo = dataNova.getFullYear();

    // Recalcular mês antigo se data mudou
    if (mesAntigo !== mesNovo || anoAntigo !== anoNovo) {
      this.recalcularSaldoMes(mesAntigo, anoAntigo);
    }

    // Recalcular mês novo
    this.recalcularSaldoMes(mesNovo, anoNovo);
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
    console.log(
      `Buscando lançamentos para ${mes}/${ano} em ${this.lancamentos.length} lançamentos totais`,
    );
    const lancamentosFiltrados: Lancamento[] = [];
    for (const lancamento of this.lancamentos) {
      const lancamentoMes =
        lancamento.getData().getMonth() + Carteira.MES_OFFSET;
      const lancamentoAno = lancamento.getData().getFullYear();
      console.log(
        `  Verificando lançamento: ${lancamento.getTitulo()} - Data: ${lancamentoMes}/${lancamentoAno}`,
      );
      if (lancamentoMes === mes && lancamentoAno === ano) {
        lancamentosFiltrados.push(lancamento);
        console.log(`    ✓ Incluído`);
      } else {
        console.log(`    ✗ Excluído (mês/ano diferente)`);
      }
    }
    console.log(`Total filtrados: ${lancamentosFiltrados.length}`);
    return lancamentosFiltrados;
  }

  private recalcularSaldoMes(mes: number, ano: number): void {
    console.log(`\n--- Recalculando saldo do mês ${mes}/${ano} ---`);
    console.log('Total de lançamentos na carteira:', this.lancamentos.length);

    const lancamentosMes = this.buscarLancamentosPorMes(mes, ano);
    console.log(
      `Lançamentos encontrados para ${mes}/${ano}:`,
      lancamentosMes.length,
    );
    console.log(
      'Detalhes dos lançamentos do mês:',
      lancamentosMes.map((l) => ({
        id: l.getId(),
        titulo: l.getTitulo(),
        valor: l.getValor(),
        tipo: l.getTipoTransacao(),
        data: l.getData(),
      })),
    );

    let saldoCalculado = 0;
    let totalEntradas = 0;
    let totalSaidas = 0;

    for (const lancamento of lancamentosMes) {
      const tipo = lancamento.getTipoTransacao();
      const valor = Number(lancamento.getValor());

      if (tipo === 'entrada') {
        saldoCalculado += valor;
        totalEntradas += valor;
        console.log(`  + Entrada: ${valor} (saldo parcial: ${saldoCalculado})`);
      } else if (tipo === 'saida') {
        saldoCalculado -= valor;
        totalSaidas += valor;
        console.log(`  - Saída: ${valor} (saldo parcial: ${saldoCalculado})`);
      }
    }

    console.log(`Total Entradas: ${totalEntradas}`);
    console.log(`Total Saídas: ${totalSaidas}`);
    console.log(`Saldo Final Calculado: ${saldoCalculado}`);

    const saldoMesExistente = this.buscarSaldoMes(mes, ano);

    if (!saldoMesExistente) {
      console.log('Criando NOVO saldo mensal');
      const novoSaldoMes = SaldoMes.criar({
        mes,
        ano,
        saldoMes: saldoCalculado,
      });
      this.saldosMensais.push(novoSaldoMes);
    } else {
      console.log(
        'Atualizando saldo mensal EXISTENTE de',
        saldoMesExistente.getSaldoMes(),
        'para',
        saldoCalculado,
      );
      saldoMesExistente.atualizarSaldoMes(saldoCalculado);
    }
    console.log(`--- Fim recálculo ${mes}/${ano} ---\n`);
  }
}
