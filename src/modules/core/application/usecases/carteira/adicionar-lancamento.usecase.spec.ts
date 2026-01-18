import { AdicionarLancamentoUseCase } from './adicionar-lancamento.usecase';
import { CarteiraRepositoryImpl } from '../../../infrastructure/repositories/carteira.repository';
import { CategoriaRepositoryImpl } from '../../../infrastructure/repositories/categoria.repository';
import { Carteira } from '../../../domain/carteira';
import { Categoria } from '../../../domain/categoria';
import { NotFoundException } from '@nestjs/common';

describe('AdicionarLancamentoUseCase', () => {
  let useCase: AdicionarLancamentoUseCase;
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

    useCase = new AdicionarLancamentoUseCase(
      carteiraRepository,
      categoriaRepository,
    );
  });

  describe('execute', () => {
    const validProps = {
      idCarteira: 'carteira-123',
      idCategoria: 1,
      tipoTransacao: 'saida' as const,
      titulo: 'Compra no supermercado',
      valor: 150.5,
      descricao: 'Compras do mês',
      data: new Date('2023-06-15'),
    };

    it('deve adicionar lançamento com sucesso', async () => {
      const carteira = Carteira.criar({
        usuarioId: 'user-123',
      });
      const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      categoriaRepository.buscarPorId.mockResolvedValue(categoria);

      await useCase.execute(validProps);

      expect(carteiraRepository.buscarPorId).toHaveBeenCalledWith(
        'carteira-123',
      );
      expect(categoriaRepository.buscarPorId).toHaveBeenCalledWith(1);
      expect(carteiraRepository.salvar).toHaveBeenCalledWith(carteira);
    });

    it('deve lançar NotFoundException se carteira não existir', async () => {
      carteiraRepository.buscarPorId.mockResolvedValue(null);

      await expect(useCase.execute(validProps)).rejects.toThrow(
        new NotFoundException('Carteira não encontrada'),
      );

      expect(categoriaRepository.buscarPorId).not.toHaveBeenCalled();
      expect(carteiraRepository.salvar).not.toHaveBeenCalled();
    });

    it('deve lançar NotFoundException se categoria não existir', async () => {
      const carteira = Carteira.criar({
        usuarioId: 'user-123',
      });

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      categoriaRepository.buscarPorId.mockResolvedValue(null);

      await expect(useCase.execute(validProps)).rejects.toThrow(
        new NotFoundException('Categoria não encontrada'),
      );

      expect(carteiraRepository.salvar).not.toHaveBeenCalled();
    });

    it('deve adicionar lançamento de entrada', async () => {
      const carteira = Carteira.criar({
        usuarioId: 'user-123',
      });
      const categoria = Categoria.carregar({ id: 2, nome: 'Salário' });

      const propsEntrada = {
        ...validProps,
        tipoTransacao: 'entrada' as const,
        titulo: 'Salário do mês',
        valor: 3000,
      };

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      categoriaRepository.buscarPorId.mockResolvedValue(categoria);

      await useCase.execute(propsEntrada);

      expect(carteiraRepository.salvar).toHaveBeenCalledWith(carteira);
    });

    it('deve adicionar lançamento sem descrição', async () => {
      const carteira = Carteira.criar({
        usuarioId: 'user-123',
      });
      const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });

      const propsSemDescricao = {
        ...validProps,
        descricao: undefined,
      };

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      categoriaRepository.buscarPorId.mockResolvedValue(categoria);

      await useCase.execute(propsSemDescricao);

      expect(carteiraRepository.salvar).toHaveBeenCalled();
    });

    it('deve adicionar lançamento com valor decimal', async () => {
      const carteira = Carteira.criar({
        usuarioId: 'user-123',
      });
      const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });

      const propsDecimal = {
        ...validProps,
        valor: 99.99,
      };

      carteiraRepository.buscarPorId.mockResolvedValue(carteira);
      categoriaRepository.buscarPorId.mockResolvedValue(categoria);

      await useCase.execute(propsDecimal);

      expect(carteiraRepository.salvar).toHaveBeenCalled();
    });
  });
});
