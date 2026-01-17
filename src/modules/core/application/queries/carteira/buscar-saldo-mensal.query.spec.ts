import { NotFoundException } from '@nestjs/common';
import { BuscarSaldoMensalQuery } from './buscar-saldo-mensal.query';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { Carteira } from '../../../domain/carteira';
import { SaldoMes } from '../../../domain/saldo-mensal';

describe('BuscarSaldoMensalQuery - Application Query', () => {
  let query: BuscarSaldoMensalQuery;
  let carteiraRepository: jest.Mocked<CarteiraRepositoryImpl>;

  beforeEach(() => {
    carteiraRepository = {
      buscarPorId: jest.fn(),
    } as any;

    query = new BuscarSaldoMensalQuery(carteiraRepository);
  });

  describe('execute', () => {
    it('deve buscar saldo mensal com sucesso', async () => {
      const saldo = SaldoMes.criar({
        mes: 1,
        ano: 2025,
        saldoMes: 1500,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [saldo],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      const resultado = await query.execute('carteira-123', '2025-01-15');

      expect(resultado).toHaveProperty('mes', 1);
      expect(resultado).toHaveProperty('ano', 2025);
      expect(resultado).toHaveProperty('saldoMes');
      expect(resultado).toHaveProperty('entradas');
      expect(resultado).toHaveProperty('saidas');
      expect(carteiraRepository.buscarPorId).toHaveBeenCalledWith(
        'carteira-123',
      );
    });

    it('deve lançar NotFoundException quando carteira não for encontrada', async () => {
      carteiraRepository.buscarPorId.mockResolvedValue(null);

      await expect(
        query.execute('carteira-inexistente', '2025-01-15'),
      ).rejects.toThrow(NotFoundException);
      await expect(
        query.execute('carteira-inexistente', '2025-01-15'),
      ).rejects.toThrow('Carteira não encontrada');
    });

    it('deve retornar saldo 0 quando mês não existe', async () => {
      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      const resultado = await query.execute('carteira-123', '2025-01-15');

      expect(resultado.mes).toBe(1);
      expect(resultado.ano).toBe(2025);
      expect(resultado.saldoMes).toBe(0);
    });

    it('deve processar diferentes formatos de data', async () => {
      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      const resultado = await query.execute('carteira-123', '2025-12-31');

      expect(resultado.mes).toBe(12);
      expect(resultado.ano).toBe(2025);
    });
  });
});
