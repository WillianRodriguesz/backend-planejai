import { LancamentoMapper } from './lancamento.mapper';
import { Lancamento } from '../../domain/lancamento';
import { Categoria } from '../../domain/categoria';

describe('LancamentoMapper - Application Mapper', () => {
  const criarLancamento = (
    valor: number,
    tipoTransacao: 'entrada' | 'saida',
  ): Lancamento => {
    const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });
    return Lancamento.criar({
      titulo: 'Lançamento Teste',
      descricao: 'Descrição do teste',
      valor,
      tipoTransacao,
      data: new Date('2023-06-15'),
      categoria,
    });
  };

  describe('DomainToDto', () => {
    it('deve converter lançamento de saída para DTO', () => {
      const lancamento = criarLancamento(150.5, 'saida');
      (lancamento as any).id = 'lancamento-1';

      const dto = LancamentoMapper.DomainToDto(lancamento);

      expect(dto.id).toBe('lancamento-1');
      expect(dto.titulo).toBe('Lançamento Teste');
      expect(dto.descricao).toBe('Descrição do teste');
      expect(dto.valor).toBe(150.5);
      expect(dto.tipoTransacao).toBe('saida');
      expect(dto.data).toBeInstanceOf(Date);
      expect(dto.categoria).toEqual({
        id: 1,
        nome: 'Alimentação',
      });
    });

    it('deve converter lançamento de entrada para DTO', () => {
      const lancamento = criarLancamento(3000, 'entrada');
      (lancamento as any).id = 'lancamento-2';

      const dto = LancamentoMapper.DomainToDto(lancamento);

      expect(dto.tipoTransacao).toBe('entrada');
      expect(dto.valor).toBe(3000);
    });

    it('deve preservar categoria corretamente', () => {
      const categoria = Categoria.carregar({ id: 5, nome: 'Transporte' });
      const lancamento = Lancamento.criar({
        titulo: 'Uber',
        descricao: 'Corrida de Uber',
        valor: 25.5,
        tipoTransacao: 'saida',
        data: new Date('2023-06-15'),
        categoria,
      });
      (lancamento as any).id = 'lancamento-3';

      const dto = LancamentoMapper.DomainToDto(lancamento);

      expect(dto.categoria.id).toBe(5);
      expect(dto.categoria.nome).toBe('Transporte');
    });
  });

  describe('DomainToDtoList', () => {
    it('deve converter lista de lançamentos para lista de DTOs', () => {
      const lancamentos = [
        criarLancamento(100, 'saida'),
        criarLancamento(200, 'entrada'),
        criarLancamento(50, 'saida'),
      ];

      (lancamentos[0] as any).id = 'lanc-1';
      (lancamentos[1] as any).id = 'lanc-2';
      (lancamentos[2] as any).id = 'lanc-3';

      const dtos = LancamentoMapper.DomainToDtoList(lancamentos);

      expect(dtos).toHaveLength(3);
      expect(dtos[0].id).toBe('lanc-1');
      expect(dtos[0].valor).toBe(100);
      expect(dtos[1].id).toBe('lanc-2');
      expect(dtos[1].valor).toBe(200);
      expect(dtos[2].id).toBe('lanc-3');
      expect(dtos[2].valor).toBe(50);
    });

    it('deve retornar lista vazia para entrada vazia', () => {
      const dtos = LancamentoMapper.DomainToDtoList([]);

      expect(dtos).toEqual([]);
      expect(dtos).toHaveLength(0);
    });

    it('deve converter corretamente todos os tipos de transação', () => {
      const lancamentos = [
        criarLancamento(100, 'entrada'),
        criarLancamento(200, 'saida'),
      ];

      (lancamentos[0] as any).id = 'lanc-1';
      (lancamentos[1] as any).id = 'lanc-2';

      const dtos = LancamentoMapper.DomainToDtoList(lancamentos);

      expect(dtos[0].tipoTransacao).toBe('entrada');
      expect(dtos[1].tipoTransacao).toBe('saida');
    });
  });
});
