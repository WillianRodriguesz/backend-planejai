import { NotFoundException } from '@nestjs/common';
import { BuscarLancamentoPorIdQuery } from './buscar-lancamento-por-id.query';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { Carteira } from '../../../domain/carteira';
import { Lancamento } from '../../../domain/lancamento';
import { Categoria } from '../../../domain/categoria';

describe('BuscarLancamentoPorIdQuery - Application Query', () => {
  let query: BuscarLancamentoPorIdQuery;
  let carteiraRepository: jest.Mocked<CarteiraRepositoryImpl>;

  beforeEach(() => {
    carteiraRepository = {
      buscarPorId: jest.fn(),
    } as any;

    query = new BuscarLancamentoPorIdQuery(carteiraRepository);
  });

  describe('execute', () => {
    it('deve buscar lançamento por ID com sucesso', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const lancamento = Lancamento.carregar({
        id: 'lanc-123',
        titulo: 'Supermercado',
        descricao: 'Compras do mês',
        valor: 500,
        data: new Date('2025-01-15'),
        tipoTransacao: 'saida',
        categoria,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [lancamento],
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      const resultado = await query.execute('carteira-123', 'lanc-123');

      expect(resultado).toHaveProperty('id', 'lanc-123');
      expect(resultado).toHaveProperty('titulo', 'Supermercado');
      expect(resultado).toHaveProperty('valor', 500);
      expect(carteiraRepository.buscarPorId).toHaveBeenCalledWith(
        'carteira-123',
      );
    });

    it('deve lançar NotFoundException quando carteira não for encontrada', async () => {
      carteiraRepository.buscarPorId.mockResolvedValue(null);

      await expect(
        query.execute('carteira-inexistente', 'lanc-123'),
      ).rejects.toThrow(NotFoundException);
      await expect(
        query.execute('carteira-inexistente', 'lanc-123'),
      ).rejects.toThrow('Carteira não encontrada');
    });

    it('deve lançar NotFoundException quando lançamento não for encontrado', async () => {
      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      await expect(
        query.execute('carteira-123', 'lanc-inexistente'),
      ).rejects.toThrow(NotFoundException);
      await expect(
        query.execute('carteira-123', 'lanc-inexistente'),
      ).rejects.toThrow('Lançamento não encontrado');
    });

    it('deve buscar lançamento correto quando há múltiplos lançamentos', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      const lancamento1 = Lancamento.carregar({
        id: 'lanc-1',
        titulo: 'Supermercado',
        descricao: 'Compras',
        valor: 500,
        data: new Date('2025-01-15'),
        tipoTransacao: 'saida',
        categoria,
      });

      const lancamento2 = Lancamento.carregar({
        id: 'lanc-2',
        titulo: 'Restaurante',
        descricao: 'Almoço',
        valor: 300,
        data: new Date('2025-01-20'),
        tipoTransacao: 'saida',
        categoria,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [lancamento1, lancamento2],
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      const resultado = await query.execute('carteira-123', 'lanc-2');

      expect(resultado.id).toBe('lanc-2');
      expect(resultado.titulo).toBe('Restaurante');
    });
  });
});
