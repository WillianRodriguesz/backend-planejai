import { NotFoundException } from '@nestjs/common';
import { BuscarTodosLancamentosQuery } from './buscar-todos-lancamentos.query';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { Carteira } from '../../../domain/carteira';
import { Lancamento } from '../../../domain/lancamento';
import { Categoria } from '../../../domain/categoria';

describe('BuscarTodosLancamentosQuery - Application Query', () => {
  let query: BuscarTodosLancamentosQuery;
  let carteiraRepository: jest.Mocked<CarteiraRepositoryImpl>;

  beforeEach(() => {
    carteiraRepository = {
      buscarPorId: jest.fn(),
    } as any;

    query = new BuscarTodosLancamentosQuery(carteiraRepository);
  });

  describe('execute', () => {
    it('deve buscar todos os lançamentos com paginação padrão', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const lancamentos = Array.from({ length: 15 }, (_, i) =>
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

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos,
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      const resultado = await query.execute('carteira-123');

      expect(resultado).toHaveProperty('lancamentos');
      expect(resultado).toHaveProperty('total', 15);
      expect(resultado).toHaveProperty('pagina', 1);
      expect(resultado).toHaveProperty('totalPaginas', 2);
      expect(resultado).toHaveProperty('itensPorPagina', 10);
      expect(resultado.lancamentos).toHaveLength(10);
      expect(carteiraRepository.buscarPorId).toHaveBeenCalledWith(
        'carteira-123',
      );
    });

    it('deve buscar lançamentos com paginação customizada', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const lancamentos = Array.from({ length: 25 }, (_, i) =>
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

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos,
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      const resultado = await query.execute('carteira-123', 2, 5);

      expect(resultado.pagina).toBe(2);
      expect(resultado.itensPorPagina).toBe(5);
      expect(resultado.lancamentos).toHaveLength(5);
      expect(resultado.totalPaginas).toBe(5);
      expect(resultado.total).toBe(25);
    });

    it('deve lançar NotFoundException quando carteira não for encontrada', async () => {
      carteiraRepository.buscarPorId.mockResolvedValue(null);

      await expect(query.execute('carteira-inexistente')).rejects.toThrow(
        NotFoundException,
      );
      await expect(query.execute('carteira-inexistente')).rejects.toThrow(
        'Carteira não encontrada',
      );
    });

    it('deve retornar lista vazia quando não há lançamentos', async () => {
      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      const resultado = await query.execute('carteira-123');

      expect(resultado.lancamentos).toHaveLength(0);
      expect(resultado.total).toBe(0);
      expect(resultado.totalPaginas).toBe(0);
    });

    it('deve retornar todos os itens quando há menos que o limite por página', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const lancamentos = Array.from({ length: 5 }, (_, i) =>
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

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos,
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      const resultado = await query.execute('carteira-123');

      expect(resultado.lancamentos).toHaveLength(5);
      expect(resultado.total).toBe(5);
      expect(resultado.totalPaginas).toBe(1);
    });
  });
});
