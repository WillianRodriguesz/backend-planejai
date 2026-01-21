import { CarteiraSaldoMensalMapper } from './saldo-mensal.mapper';
import { Carteira } from '../../domain/carteira';
import { SaldoMes } from '../../domain/saldo-mensal';
import { Lancamento } from '../../domain/lancamento';

describe('CarteiraSaldoMensalMapper - Application Mapper', () => {
  describe('DomainToDto', () => {
    it('deve converter carteira para DTO de saldo mensal', () => {
      const saldo = SaldoMes.criar({
        mes: 6,
        ano: 2023,
        saldoMes: 1500.5,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        saldosMensais: [saldo],
        lancamentos: [],
      });

      const dto = CarteiraSaldoMensalMapper.DomainToDto(carteira, 6, 2023);

      expect(dto).toEqual({
        mes: 6,
        ano: 2023,
        saldoMes: 1500.5,
        entradas: 0,
        saidas: 0,
      });
    });

    it('deve converter saldo mensal com valores zerados', () => {
      const saldo = SaldoMes.criar({
        mes: 1,
        ano: 2023,
        saldoMes: 0,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        saldosMensais: [saldo],
        lancamentos: [],
      });

      const dto = CarteiraSaldoMensalMapper.DomainToDto(carteira, 1, 2023);

      expect(dto.saldoMes).toBe(0);
      expect(dto.entradas).toBe(0);
      expect(dto.saidas).toBe(0);
    });

    it('deve calcular entradas e saídas corretamente', () => {
      const saldo = SaldoMes.criar({
        mes: 12,
        ano: 2023,
        saldoMes: -500.75,
      });

      const lancamento1 = Lancamento.criar({
        titulo: 'Salário',
        descricao: 'Salário',
        valor: 1000.0,
        data: new Date('2023-12-15'),
        categoria: { getId: () => 1, getNome: () => 'Salário' } as any,
        tipoTransacao: 'entrada',
      });

      const lancamento2 = Lancamento.criar({
        titulo: 'Aluguel',
        descricao: 'Aluguel',
        valor: 1500.75,
        data: new Date('2023-12-20'),
        categoria: { getId: () => 2, getNome: () => 'Moradia' } as any,
        tipoTransacao: 'saida',
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        saldosMensais: [saldo],
        lancamentos: [lancamento1, lancamento2],
      });

      const dto = CarteiraSaldoMensalMapper.DomainToDto(carteira, 12, 2023);

      expect(dto.saldoMes).toBe(-500.75);
      expect(dto.mes).toBe(12);
      expect(dto.ano).toBe(2023);
      expect(dto.entradas).toBe(1000.0);
      expect(dto.saidas).toBe(1500.75);
    });

    it('deve preservar valores decimais', () => {
      const saldo = SaldoMes.criar({
        mes: 3,
        ano: 2023,
        saldoMes: 1234.56,
      });

      const lancamento1 = Lancamento.criar({
        titulo: 'Receita',
        descricao: 'Receita',
        valor: 5000.99,
        data: new Date('2023-03-10'),
        categoria: { getId: () => 1, getNome: () => 'Receitas' } as any,
        tipoTransacao: 'entrada',
      });

      const lancamento2 = Lancamento.criar({
        titulo: 'Despesa',
        descricao: 'Despesa',
        valor: 3766.43,
        data: new Date('2023-03-15'),
        categoria: { getId: () => 2, getNome: () => 'Despesas' } as any,
        tipoTransacao: 'saida',
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        saldosMensais: [saldo],
        lancamentos: [lancamento1, lancamento2],
      });

      const dto = CarteiraSaldoMensalMapper.DomainToDto(carteira, 3, 2023);

      expect(dto.saldoMes).toBe(1234.56);
      expect(dto.entradas).toBe(5000.99);
      expect(dto.saidas).toBe(3766.43);
    });
  });
});
