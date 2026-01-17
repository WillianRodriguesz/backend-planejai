import { GastosMensaisService } from './gastos-mensais.service';
import { Lancamento } from '../lancamento';
import { Categoria } from '../categoria';

describe('GastosMensaisService - Domain Service', () => {
  let service: GastosMensaisService;

  beforeEach(() => {
    service = new GastosMensaisService();
  });

  const criarLancamento = (
    valor: number,
    categoriaId: number,
    categoriaNome: string,
  ): Lancamento => {
    const categoria = Categoria.carregar({
      id: categoriaId,
      nome: categoriaNome,
    });
    return Lancamento.criar({
      titulo: 'Teste',
      descricao: 'Teste desc',
      valor,
      tipoTransacao: 'saida',
      data: new Date(),
      categoria,
    });
  };

  describe('calcular', () => {
    it('deve calcular gastos mensais corretamente', () => {
      const lancamentos = [
        criarLancamento(100, 1, 'Alimentação'),
        criarLancamento(200, 2, 'Transporte'),
        criarLancamento(150, 1, 'Alimentação'),
      ];

      const resultado = service.calcular(lancamentos, 300);

      expect(resultado.totalGastos).toBe(450);
      expect(resultado.quantidadeSaidas).toBe(3);
      expect(resultado.gastosPorCategoria).toHaveLength(2);
    });

    it('deve calcular porcentagens corretamente', () => {
      const lancamentos = [
        criarLancamento(100, 1, 'Alimentação'),
        criarLancamento(400, 2, 'Transporte'),
      ];

      const resultado = service.calcular(lancamentos, 0);

      const alimentacao = resultado.gastosPorCategoria.find(
        (g) => g.categoria.id === 1,
      );
      const transporte = resultado.gastosPorCategoria.find(
        (g) => g.categoria.id === 2,
      );

      expect(alimentacao.porcentagem).toBe(20);
      expect(transporte.porcentagem).toBe(80);
    });

    it('deve calcular relação com mês anterior - aumento de gastos', () => {
      const lancamentos = [criarLancamento(500, 1, 'Alimentação')];
      const totalMesAnterior = 300;

      const resultado = service.calcular(lancamentos, totalMesAnterior);

      expect(resultado.relacaoMesAnterior.diferencaGastosMensal).toBe(-200);
      expect(resultado.relacaoMesAnterior.mensagemEconomia).toContain('a mais');
    });

    it('deve calcular relação com mês anterior - redução de gastos', () => {
      const lancamentos = [criarLancamento(200, 1, 'Alimentação')];
      const totalMesAnterior = 500;

      const resultado = service.calcular(lancamentos, totalMesAnterior);

      expect(resultado.relacaoMesAnterior.diferencaGastosMensal).toBe(300);
      expect(resultado.relacaoMesAnterior.mensagemEconomia).toContain(
        'Economizou',
      );
    });

    it('deve calcular relação com mês anterior - gastos iguais', () => {
      const lancamentos = [criarLancamento(300, 1, 'Alimentação')];
      const totalMesAnterior = 300;

      const resultado = service.calcular(lancamentos, totalMesAnterior);

      expect(resultado.relacaoMesAnterior.diferencaGastosMensal).toBe(0);
      expect(resultado.relacaoMesAnterior.mensagemEconomia).toContain('iguais');
    });

    it('deve retornar zero para lista vazia', () => {
      const resultado = service.calcular([], 0);

      expect(resultado.totalGastos).toBe(0);
      expect(resultado.quantidadeSaidas).toBe(0);
      expect(resultado.gastosPorCategoria).toHaveLength(0);
    });

    it('deve agrupar gastos da mesma categoria', () => {
      const lancamentos = [
        criarLancamento(100, 1, 'Alimentação'),
        criarLancamento(150, 1, 'Alimentação'),
        criarLancamento(200, 1, 'Alimentação'),
      ];

      const resultado = service.calcular(lancamentos, 0);

      expect(resultado.gastosPorCategoria).toHaveLength(1);
      expect(resultado.gastosPorCategoria[0].valor).toBe(450);
      expect(resultado.gastosPorCategoria[0].categoria.id).toBe(1);
    });
  });
});
