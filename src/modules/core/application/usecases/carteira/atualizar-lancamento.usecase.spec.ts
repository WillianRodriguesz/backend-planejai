import { AtualizarLancamentoUseCase } from './atualizar-lancamento.usecase';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { CategoriaRepositoryImpl } from '../../../infrastructure/repositories/categoria.repository';
import { Carteira } from '../../../domain/carteira';
import { Lancamento } from '../../../domain/lancamento';
import { Categoria } from '../../../domain/categoria';
import { DomainException } from '../../../domain/exceptions/domain.exception';

describe('AtualizarLancamentoUseCase - Application UseCase', () => {
  let useCase: AtualizarLancamentoUseCase;
  let carteiraRepository: jest.Mocked<CarteiraRepositoryImpl>;
  let categoriaRepository: jest.Mocked<CategoriaRepositoryImpl>;

  beforeEach(() => {
    carteiraRepository = {
      buscarPorId: jest.fn(),
      salvar: jest.fn(),
    } as any;

    categoriaRepository = {
      buscarPorId: jest.fn(),
    } as any;

    useCase = new AtualizarLancamentoUseCase(
      carteiraRepository,
      categoriaRepository,
    );
  });

  describe('execute', () => {
    it('deve atualizar lançamento com sucesso', async () => {
      const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });
      const novaCategoria = Categoria.carregar({ id: 2, nome: 'Transporte' });

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
      categoriaRepository.buscarPorId.mockResolvedValue(novaCategoria);

      await useCase.execute({
        idCarteira: 'carteira-123',
        idLancamento: 'lanc-123',
        dados: {
          titulo: 'Uber',
          valor: 50,
          idCategoria: 2,
          tipoTransacao: 'saida',
          data: '2025-01-20',
        },
      });

      expect(carteiraRepository.buscarPorId).toHaveBeenCalledWith(
        'carteira-123',
      );
      expect(categoriaRepository.buscarPorId).toHaveBeenCalledWith(2);
      expect(carteiraRepository.salvar).toHaveBeenCalledWith(carteira);
    });

    it('deve lançar DomainException quando carteira não for encontrada', async () => {
      carteiraRepository.buscarPorId.mockResolvedValue(null);

      await expect(
        useCase.execute({
          idCarteira: 'carteira-inexistente',
          idLancamento: 'lanc-123',
          dados: { titulo: 'Teste' },
        }),
      ).rejects.toThrow(DomainException);
    });

    it('deve lançar DomainException quando categoria não for encontrada', async () => {
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
      categoriaRepository.buscarPorId.mockResolvedValue(null);

      await expect(
        useCase.execute({
          idCarteira: 'carteira-123',
          idLancamento: 'lanc-123',
          dados: { idCategoria: 999 },
        }),
      ).rejects.toThrow(DomainException);
    });

    it('deve atualizar apenas campos fornecidos', async () => {
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

      await useCase.execute({
        idCarteira: 'carteira-123',
        idLancamento: 'lanc-123',
        dados: { valor: 600 },
      });

      expect(carteiraRepository.salvar).toHaveBeenCalled();
    });
  });
});
