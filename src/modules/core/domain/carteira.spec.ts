import { Carteira } from './carteira';
import { Lancamento } from './lancamento';
import { Categoria } from './categoria';
import { SaldoMes } from './saldo-mensal';
import { DomainException } from './exceptions/domain.exception';

describe('Carteira - Domain Entity', () => {
  let categoria: Categoria;

  beforeEach(() => {
    categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });
  });

  describe('criar', () => {
    it('deve criar uma carteira válida', () => {
      const carteira = Carteira.criar({
        usuarioId: 'usuario-123',
      });

      expect(carteira).toBeInstanceOf(Carteira);
      expect(carteira.getUsuarioId()).toBe('usuario-123');
      expect(carteira.getLancamentos()).toEqual([]);
      expect(carteira.getSaldosMensais()).toEqual([]);
      expect(carteira.getCriadoEm()).toBeInstanceOf(Date);
    });

    it('deve lançar DomainException quando usuarioId estiver vazio', () => {
      expect(() => {
        Carteira.criar({ usuarioId: '' });
      }).toThrow(DomainException);
      expect(() => {
        Carteira.criar({ usuarioId: '' });
      }).toThrow('UsuarioId é obrigatório');
    });

    it('deve lançar DomainException quando usuarioId for apenas espaços', () => {
      expect(() => {
        Carteira.criar({ usuarioId: '   ' });
      }).toThrow('UsuarioId é obrigatório');
    });
  });

  describe('carregar', () => {
    it('deve carregar uma carteira existente', () => {
      const data = new Date('2025-01-01');
      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-456',
        criadoEm: data,
      });

      expect(carteira.getId()).toBe('carteira-123');
      expect(carteira.getUsuarioId()).toBe('usuario-456');
      expect(carteira.getCriadoEm()).toEqual(data);
      expect(carteira.getLancamentos()).toEqual([]);
      expect(carteira.getSaldosMensais()).toEqual([]);
    });

    it('deve carregar carteira com lançamentos', () => {
      const lancamento = Lancamento.carregar({
        id: 'lanc-1',
        titulo: 'Compra',
        descricao: 'Desc',
        valor: 100,
        tipoTransacao: 'saida',
        categoria,
        data: new Date(),
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-456',
        criadoEm: new Date(),
        lancamentos: [lancamento],
      });

      expect(carteira.getLancamentos()).toHaveLength(1);
      expect(carteira.getLancamentos()[0]).toBe(lancamento);
    });

    it('deve carregar carteira com saldos mensais', () => {
      const saldo = SaldoMes.carregar({
        id: 'saldo-1',
        mes: 1,
        ano: 2025,
        saldoMes: 500,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-456',
        criadoEm: new Date(),
        saldosMensais: [saldo],
      });

      expect(carteira.getSaldosMensais()).toHaveLength(1);
      expect(carteira.getSaldosMensais()[0]).toBe(saldo);
    });
  });

  describe('adicionarLancamento', () => {
    it('deve adicionar lançamento de entrada e atualizar saldo mensal', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });
      const data = new Date('2025-01-15');

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Salário',
        valor: 3000,
        data,
      });

      expect(carteira.getLancamentos()).toHaveLength(1);
      expect(carteira.getLancamentos()[0].getTitulo()).toBe('Salário');
      expect(carteira.getSaldosMensais()).toHaveLength(1);
      expect(carteira.getSaldosMensais()[0].getSaldoMes()).toBe(3000);
    });

    it('deve adicionar lançamento de saída e atualizar saldo mensal', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });
      const data = new Date('2025-02-10');

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'saida',
        titulo: 'Compra',
        valor: 150,
        data,
      });

      expect(carteira.getLancamentos()).toHaveLength(1);
      expect(carteira.getSaldosMensais()).toHaveLength(1);
      expect(carteira.getSaldosMensais()[0].getSaldoMes()).toBe(-150);
    });

    it('deve adicionar múltiplos lançamentos no mesmo mês', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });
      const data = new Date('2025-01-15');

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Salário',
        valor: 3000,
        data,
      });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'saida',
        titulo: 'Compra',
        valor: 500,
        data,
      });

      expect(carteira.getLancamentos()).toHaveLength(2);
      expect(carteira.getSaldosMensais()).toHaveLength(1);
      expect(carteira.getSaldosMensais()[0].getSaldoMes()).toBe(2500);
    });

    it('deve criar saldos mensais diferentes para meses diferentes', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Janeiro',
        valor: 1000,
        data: new Date('2025-01-15'),
      });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Fevereiro',
        valor: 2000,
        data: new Date('2025-02-15'),
      });

      expect(carteira.getSaldosMensais()).toHaveLength(2);
      expect(carteira.getSaldosMensais()[0].getMes()).toBe(1);
      expect(carteira.getSaldosMensais()[1].getMes()).toBe(2);
    });
  });

  describe('excluirLancamento', () => {
    it('deve excluir lançamento e recalcular saldo mensal', () => {
      const data = new Date('2025-01-15');
      const lancamento = Lancamento.carregar({
        id: 'lanc-1',
        titulo: 'Compra',
        descricao: 'Desc',
        valor: 100,
        tipoTransacao: 'saida',
        categoria,
        data,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-456',
        criadoEm: new Date(),
        lancamentos: [lancamento],
      });

      carteira.excluirLancamento('lanc-1');

      expect(carteira.getLancamentos()).toHaveLength(0);
      expect(carteira.getLancamentosRemovidos()).toContain('lanc-1');
    });

    it('deve lançar DomainException ao excluir lançamento inexistente', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      expect(() => {
        carteira.excluirLancamento('lanc-inexistente');
      }).toThrow(DomainException);
      expect(() => {
        carteira.excluirLancamento('lanc-inexistente');
      }).toThrow('Lançamento com ID lanc-inexistente não encontrado');
    });

    it('deve recalcular saldo após exclusão', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });
      const data = new Date('2025-01-15');

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Entrada 1',
        valor: 1000,
        data,
      });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'saida',
        titulo: 'Saída 1',
        valor: 300,
        data,
      });

      const lancamentos = carteira.getLancamentos();
      const idPrimeiroLancamento = lancamentos[0].getId();

      carteira.excluirLancamento(idPrimeiroLancamento);

      expect(carteira.getLancamentos()).toHaveLength(1);
      expect(carteira.getSaldosMensais()[0].getSaldoMes()).toBe(-300);
    });
  });

  describe('atualizarLancamento', () => {
    it('deve atualizar titulo do lançamento', () => {
      const data = new Date('2025-01-15');
      const lancamento = Lancamento.carregar({
        id: 'lanc-1',
        titulo: 'Titulo Antigo',
        descricao: 'Desc',
        valor: 100,
        tipoTransacao: 'entrada',
        categoria,
        data,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-456',
        criadoEm: new Date(),
        lancamentos: [lancamento],
      });

      carteira.atualizarLancamento('lanc-1', {
        titulo: 'Titulo Novo',
      });

      expect(carteira.getLancamentos()[0].getTitulo()).toBe('Titulo Novo');
    });

    it('deve lançar DomainException ao atualizar lançamento inexistente', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      expect(() => {
        carteira.atualizarLancamento('lanc-inexistente', { titulo: 'Novo' });
      }).toThrow(DomainException);
      expect(() => {
        carteira.atualizarLancamento('lanc-inexistente', { titulo: 'Novo' });
      }).toThrow('Lançamento com ID lanc-inexistente não encontrado');
    });

    it('deve atualizar valor e recalcular saldo mensal', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });
      const data = new Date('2025-01-15');

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Salário',
        valor: 3000,
        data,
      });

      const idLancamento = carteira.getLancamentos()[0].getId();

      carteira.atualizarLancamento(idLancamento, {
        valor: 3500,
      });

      expect(carteira.getLancamentos()[0].getValor()).toBe(3500);
      expect(carteira.getSaldosMensais()[0].getSaldoMes()).toBe(3500);
    });

    it('deve recalcular saldos ao mudar data para outro mês', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Janeiro',
        valor: 1000,
        data: new Date('2025-01-15'),
      });

      const idLancamento = carteira.getLancamentos()[0].getId();

      carteira.atualizarLancamento(idLancamento, {
        data: new Date('2025-02-15'),
      });

      expect(carteira.getSaldosMensais()).toHaveLength(2);
      const saldoJan = carteira
        .getSaldosMensais()
        .find((s) => s.getMes() === 1);
      const saldoFev = carteira
        .getSaldosMensais()
        .find((s) => s.getMes() === 2);

      expect(saldoJan?.getSaldoMes()).toBe(0);
      expect(saldoFev?.getSaldoMes()).toBe(1000);
    });

    it('deve atualizar categoria do lançamento', () => {
      const novaCategoria = Categoria.carregar({ id: 2, nome: 'Transporte' });
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'saida',
        titulo: 'Compra',
        valor: 100,
        data: new Date('2025-01-15'),
      });

      const idLancamento = carteira.getLancamentos()[0].getId();

      carteira.atualizarLancamento(idLancamento, {
        categoria: novaCategoria,
      });

      expect(carteira.getLancamentos()[0].getCategoriaId()).toBe(2);
    });

    it('deve atualizar tipoTransacao e recalcular saldo', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Lancamento',
        valor: 500,
        data: new Date('2025-01-15'),
      });

      const idLancamento = carteira.getLancamentos()[0].getId();

      carteira.atualizarLancamento(idLancamento, {
        tipoTransacao: 'saida',
      });

      expect(carteira.getLancamentos()[0].getTipoTransacao()).toBe('saida');
      expect(carteira.getSaldosMensais()[0].getSaldoMes()).toBe(-500);
    });
  });

  describe('buscarSaldoMensal', () => {
    it('deve retornar saldo mensal existente', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Entrada',
        valor: 1000,
        data: new Date('2025-03-15'),
      });

      const saldo = carteira.buscarSaldoMensal(3, 2025);

      expect(saldo).toBe(1000);
    });

    it('deve retornar undefined para saldo inexistente', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      const saldo = carteira.buscarSaldoMensal(6, 2025);

      expect(saldo).toBeUndefined();
    });
  });

  describe('calcularTotalEntradasMensal', () => {
    it('deve calcular total de entradas do mês', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });
      const data = new Date('2025-01-15');

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Entrada 1',
        valor: 1000,
        data,
      });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Entrada 2',
        valor: 500,
        data,
      });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'saida',
        titulo: 'Saída',
        valor: 200,
        data,
      });

      const totalEntradas = carteira.calcularTotalEntradasMensal(1, 2025);

      expect(totalEntradas).toBe(1500);
    });

    it('deve retornar zero quando não houver entradas', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      const totalEntradas = carteira.calcularTotalEntradasMensal(1, 2025);

      expect(totalEntradas).toBe(0);
    });
  });

  describe('calcularTotalSaidasMensal', () => {
    it('deve calcular total de saídas do mês', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });
      const data = new Date('2025-02-15');

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'saida',
        titulo: 'Saída 1',
        valor: 300,
        data,
      });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'saida',
        titulo: 'Saída 2',
        valor: 150,
        data,
      });

      carteira.adicionarLancamento({
        categoria,
        tipoTransacao: 'entrada',
        titulo: 'Entrada',
        valor: 1000,
        data,
      });

      const totalSaidas = carteira.calcularTotalSaidasMensal(2, 2025);

      expect(totalSaidas).toBe(450);
    });

    it('deve retornar zero quando não houver saídas', () => {
      const carteira = Carteira.criar({ usuarioId: 'usuario-123' });

      const totalSaidas = carteira.calcularTotalSaidasMensal(2, 2025);

      expect(totalSaidas).toBe(0);
    });
  });

  describe('limparLancamentosRemovidos', () => {
    it('deve limpar lista de lançamentos removidos', () => {
      const data = new Date('2025-01-15');
      const lancamento = Lancamento.carregar({
        id: 'lanc-1',
        titulo: 'Compra',
        descricao: 'Desc',
        valor: 100,
        tipoTransacao: 'saida',
        categoria,
        data,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-456',
        criadoEm: new Date(),
        lancamentos: [lancamento],
      });

      carteira.excluirLancamento('lanc-1');
      expect(carteira.getLancamentosRemovidos()).toHaveLength(1);

      carteira.limparLancamentosRemovidos();
      expect(carteira.getLancamentosRemovidos()).toHaveLength(0);
    });
  });

  describe('validações de imutabilidade', () => {
    it('não deve permitir redefinir id após carregamento', () => {
      const carteira = Carteira.carregar({
        id: 'carteira-999',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
      });

      expect(() => {
        (carteira as any).setId('novo-id');
      }).toThrow(DomainException);
      expect(() => {
        (carteira as any).setId('novo-id');
      }).toThrow('ID já foi definido');
    });
  });
});
