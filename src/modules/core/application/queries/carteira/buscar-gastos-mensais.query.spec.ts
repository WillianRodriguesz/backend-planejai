import { BuscarGastosMensaisQuery } from './buscar-gastos-mensais.query';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { Lancamento } from '../../../domain/lancamento';
import { Categoria } from '../../../domain/categoria';

describe('BuscarGastosMensaisQuery - Application Query', () => {
  let query: BuscarGastosMensaisQuery;
  let carteiraRepository: jest.Mocked<CarteiraRepositoryImpl>;

  beforeEach(() => {
    carteiraRepository = {
      buscarLancamentosFiltrados: jest.fn(),
    } as any;

    query = new BuscarGastosMensaisQuery(carteiraRepository);
  });

  describe('execute', () => {
    it('deve buscar gastos mensais com sucesso', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const lancamentosMesAtual = [
        Lancamento.carregar({
          id: 'lanc-1',
          titulo: 'Supermercado',
          descricao: 'Compras do mês',
          valor: 500,
          data: new Date('2025-01-15'),
          tipoTransacao: 'saida',
          categoria,
        }),
        Lancamento.carregar({
          id: 'lanc-2',
          titulo: 'Restaurante',
          descricao: 'Almoço',
          valor: 300,
          data: new Date('2025-01-20'),
          tipoTransacao: 'saida',
          categoria,
        }),
      ];

      const lancamentosMesAnterior = [
        Lancamento.carregar({
          id: 'lanc-3',
          titulo: 'Supermercado',
          descricao: 'Compras',
          valor: 600,
          data: new Date('2024-12-15'),
          tipoTransacao: 'saida',
          categoria,
        }),
      ];

      carteiraRepository.buscarLancamentosFiltrados
        .mockResolvedValueOnce(lancamentosMesAtual)
        .mockResolvedValueOnce(lancamentosMesAnterior);

      const resultado = await query.execute('carteira-123', '2025-01');

      expect(resultado).toHaveProperty('totalGastos', 800);
      expect(resultado).toHaveProperty('quantidadeSaidas', 2);
      expect(resultado).toHaveProperty('relacaoMesAnterior');
      expect(resultado.relacaoMesAnterior.diferencaGastosMensal).toBe(-200);
      expect(resultado).toHaveProperty('gastosPorCategoria');
      expect(
        carteiraRepository.buscarLancamentosFiltrados,
      ).toHaveBeenCalledTimes(2);
    });

    it('deve calcular corretamente quando não há gastos no mês anterior', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const lancamentosMesAtual = [
        Lancamento.carregar({
          id: 'lanc-1',
          titulo: 'Supermercado',
          descricao: 'Compras do mês',
          valor: 500,
          data: new Date('2025-01-15'),
          tipoTransacao: 'saida',
          categoria,
        }),
      ];

      carteiraRepository.buscarLancamentosFiltrados
        .mockResolvedValueOnce(lancamentosMesAtual)
        .mockResolvedValueOnce([]);

      const resultado = await query.execute('carteira-123', '2025-01');

      expect(resultado.totalGastos).toBe(500);
      expect(resultado.relacaoMesAnterior.diferencaGastosMensal).toBe(-500);
    });

    it('deve processar múltiplas categorias corretamente', async () => {
      const categoriaAlimentacao = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const categoriaTransporte = Categoria.carregar({
        id: 2,
        nome: 'Transporte',
      });

      const lancamentos = [
        Lancamento.carregar({
          id: 'lanc-1',
          titulo: 'Supermercado',
          descricao: 'Compras',
          valor: 500,
          data: new Date('2025-01-15'),
          tipoTransacao: 'saida',
          categoria: categoriaAlimentacao,
        }),
        Lancamento.carregar({
          id: 'lanc-2',
          titulo: 'Uber',
          descricao: 'Corrida',
          valor: 200,
          data: new Date('2025-01-20'),
          tipoTransacao: 'saida',
          categoria: categoriaTransporte,
        }),
      ];

      carteiraRepository.buscarLancamentosFiltrados
        .mockResolvedValueOnce(lancamentos)
        .mockResolvedValueOnce([]);

      const resultado = await query.execute('carteira-123', '2025-01');

      expect(resultado.gastosPorCategoria).toHaveLength(2);
      expect(resultado.totalGastos).toBe(700);
    });
  });
});
