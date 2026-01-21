import { DeletarLancamentoUseCase } from './deletar-lancamento.usecase';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { Carteira } from '../../../domain/carteira';
import { Lancamento } from '../../../domain/lancamento';
import { Categoria } from '../../../domain/categoria';
import { DomainException } from '../../../domain/exceptions/domain.exception';

describe('DeletarLancamentoUseCase - Application UseCase', () => {
  let useCase: DeletarLancamentoUseCase;
  let carteiraRepository: jest.Mocked<CarteiraRepositoryImpl>;

  beforeEach(() => {
    carteiraRepository = {
      buscarPorId: jest.fn(),
      salvar: jest.fn(),
    } as any;

    useCase = new DeletarLancamentoUseCase(carteiraRepository);
  });

  describe('execute', () => {
    it('deve deletar lançamento com sucesso', async () => {
      const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });
      const lancamento = Lancamento.carregar({
        id: 'lanc-123',
        titulo: 'Supermercado',
        descricao: 'Compras',
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
      carteiraRepository.salvar.mockResolvedValue(undefined);

      await useCase.execute('carteira-123', 'lanc-123');

      expect(carteiraRepository.buscarPorId).toHaveBeenCalledWith(
        'carteira-123',
      );
      expect(carteiraRepository.salvar).toHaveBeenCalledWith(carteira);
    });

    it('deve lançar DomainException quando carteira não for encontrada', async () => {
      carteiraRepository.buscarPorId.mockResolvedValue(null);

      await expect(
        useCase.execute('carteira-inexistente', 'lanc-123'),
      ).rejects.toThrow(DomainException);
      await expect(
        useCase.execute('carteira-inexistente', 'lanc-123'),
      ).rejects.toThrow('Carteira com ID carteira-inexistente não encontrada');
    });

    it('deve chamar excluirLancamento no domínio', async () => {
      const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });
      const lancamento = Lancamento.carregar({
        id: 'lanc-123',
        titulo: 'Supermercado',
        descricao: 'Compras',
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

      const excluirSpy = jest.spyOn(carteira, 'excluirLancamento');

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);

      await useCase.execute('carteira-123', 'lanc-123');

      expect(excluirSpy).toHaveBeenCalledWith('lanc-123');
    });
  });
});
