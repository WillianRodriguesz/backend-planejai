import { FiltrarLancamentosQuery } from './filtrar-lancamentos.query';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { Carteira } from '../../../domain/carteira';
import { Lancamento } from '../../../domain/lancamento';
import { Categoria } from '../../../domain/categoria';
import { DomainException } from '../../../domain/exceptions/domain.exception';

describe('FiltrarLancamentosQuery - Application Query', () => {
  let query: FiltrarLancamentosQuery;
  let carteiraRepository: jest.Mocked<CarteiraRepositoryImpl>;

  beforeEach(() => {
    carteiraRepository = {
      buscarPorId: jest.fn(),
      buscarLancamentosFiltrados: jest.fn(),
    } as any;

    query = new FiltrarLancamentosQuery(carteiraRepository);
  });

  describe('execute', () => {
    it('deve filtrar lançamentos por data', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      const lancamentosFiltrados = [
        Lancamento.carregar({
          id: 'lanc-1',
          titulo: 'Supermercado',
          descricao: 'Compras',
          valor: 500,
          data: new Date('2025-01-15'),
          tipoTransacao: 'saida',
          categoria,
        }),
      ];

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      carteiraRepository.buscarLancamentosFiltrados.mockResolvedValue(
        lancamentosFiltrados,
      );

      const resultado = await query.execute('carteira-123', {
        dataInicial: '2025-01-01',
        dataFinal: '2025-01-31',
      });

      expect(resultado).toHaveProperty('lancamentos');
      expect(resultado).toHaveProperty('total', 1);
      expect(resultado).toHaveProperty('pagina', 1);
      expect(resultado.lancamentos).toHaveLength(1);
      expect(carteiraRepository.buscarLancamentosFiltrados).toHaveBeenCalled();
    });

    it('deve filtrar lançamentos por categoria', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      const lancamentosFiltrados = [
        Lancamento.carregar({
          id: 'lanc-1',
          titulo: 'Supermercado',
          descricao: 'Compras',
          valor: 500,
          data: new Date('2025-01-15'),
          tipoTransacao: 'saida',
          categoria,
        }),
      ];

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      carteiraRepository.buscarLancamentosFiltrados.mockResolvedValue(
        lancamentosFiltrados,
      );

      const resultado = await query.execute('carteira-123', {
        idCategoria: 1,
      });

      expect(resultado.lancamentos).toHaveLength(1);
      expect(
        carteiraRepository.buscarLancamentosFiltrados,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          idCategoria: 1,
        }),
      );
    });

    it('deve filtrar lançamentos por tipo de transação', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Salário',
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      const lancamentosFiltrados = [
        Lancamento.carregar({
          id: 'lanc-1',
          titulo: 'Salário',
          descricao: 'Salário mensal',
          valor: 5000,
          data: new Date('2025-01-05'),
          tipoTransacao: 'entrada',
          categoria,
        }),
      ];

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      carteiraRepository.buscarLancamentosFiltrados.mockResolvedValue(
        lancamentosFiltrados,
      );

      const resultado = await query.execute('carteira-123', {
        tipoTransacao: 'entrada',
      });

      expect(resultado.lancamentos).toHaveLength(1);
      expect(
        carteiraRepository.buscarLancamentosFiltrados,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          tipoTransacao: 'entrada',
        }),
      );
    });

    it('deve filtrar lançamentos por título', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      const lancamentosFiltrados = [
        Lancamento.carregar({
          id: 'lanc-1',
          titulo: 'Supermercado Pão de Açúcar',
          descricao: 'Compras mensais',
          valor: 500,
          data: new Date('2025-01-15'),
          tipoTransacao: 'saida',
          categoria,
        }),
      ];

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      carteiraRepository.buscarLancamentosFiltrados.mockResolvedValue(
        lancamentosFiltrados,
      );

      const resultado = await query.execute('carteira-123', {
        titulo: 'Supermercado',
      });

      expect(resultado.lancamentos).toHaveLength(1);
      expect(
        carteiraRepository.buscarLancamentosFiltrados,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          titulo: 'Supermercado',
        }),
      );
    });

    it('deve ignorar tipoTransacao quando for "todos"', async () => {
      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      carteiraRepository.buscarLancamentosFiltrados.mockResolvedValue([]);

      await query.execute('carteira-123', {
        tipoTransacao: 'todos',
      });

      expect(
        carteiraRepository.buscarLancamentosFiltrados,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          tipoTransacao: undefined,
        }),
      );
    });

    it('deve aplicar paginação customizada', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      const lancamentosFiltrados = Array.from({ length: 25 }, (_, i) =>
        Lancamento.carregar({
          id: `lanc-${i + 1}`,
          titulo: `Lançamento ${i + 1}`,
          descricao: `Descrição ${i + 1}`,
          valor: 100,
          data: new Date('2025-01-15'),
          tipoTransacao: 'saida',
          categoria,
        }),
      );

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      carteiraRepository.buscarLancamentosFiltrados.mockResolvedValue(
        lancamentosFiltrados,
      );

      const resultado = await query.execute('carteira-123', {
        pagina: 2,
        itensPorPagina: 5,
      });

      expect(resultado.pagina).toBe(2);
      expect(resultado.itensPorPagina).toBe(5);
      expect(resultado.lancamentos).toHaveLength(5);
    });

    it('deve lançar DomainException quando carteira não for encontrada', async () => {
      carteiraRepository.buscarPorId.mockResolvedValue(null);

      await expect(query.execute('carteira-inexistente', {})).rejects.toThrow(
        DomainException,
      );
      await expect(query.execute('carteira-inexistente', {})).rejects.toThrow(
        'Carteira com ID carteira-inexistente não encontrada',
      );
    });

    it('deve retornar lista vazia quando não há lançamentos filtrados', async () => {
      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      carteiraRepository.buscarLancamentosFiltrados.mockResolvedValue([]);

      const resultado = await query.execute('carteira-123', {});

      expect(resultado.lancamentos).toHaveLength(0);
      expect(resultado.total).toBe(0);
    });
  });
});
