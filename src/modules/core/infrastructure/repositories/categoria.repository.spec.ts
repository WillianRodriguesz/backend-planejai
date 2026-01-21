import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaRepositoryImpl } from './categoria.repository';
import { CategoriaModel } from '../models/categoria.model';
import { RepositoryException } from '../exceptions/repository.exception';
import { Categoria } from '../../domain/categoria';

describe('CategoriaRepositoryImpl - Infrastructure Repository', () => {
  let repository: CategoriaRepositoryImpl;
  let categoriaRepository: jest.Mocked<Repository<CategoriaModel>>;

  beforeEach(async () => {
    const mockRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriaRepositoryImpl,
        {
          provide: getRepositoryToken(CategoriaModel),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<CategoriaRepositoryImpl>(CategoriaRepositoryImpl);
    categoriaRepository = module.get(getRepositoryToken(CategoriaModel));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buscarPorId', () => {
    it('deve buscar categoria por ID com sucesso', async () => {
      const categoriaModel: Partial<CategoriaModel> = {
        id: 1,
        nome: 'Alimentação',
        tipo: 'saida',
      };

      categoriaRepository.findOne.mockResolvedValue(
        categoriaModel as CategoriaModel,
      );

      const resultado = await repository.buscarPorId(1);

      expect(resultado).toBeInstanceOf(Categoria);
      expect(resultado?.getId()).toBe(1);
      expect(resultado?.getNome()).toBe('Alimentação');
      expect(categoriaRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('deve retornar null quando categoria não for encontrada', async () => {
      categoriaRepository.findOne.mockResolvedValue(null);

      const resultado = await repository.buscarPorId(999);

      expect(resultado).toBeNull();
      expect(categoriaRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });

    it('deve buscar categoria de receita', async () => {
      const categoriaModel: Partial<CategoriaModel> = {
        id: 2,
        nome: 'Salário',
        tipo: 'entrada',
      };

      categoriaRepository.findOne.mockResolvedValue(
        categoriaModel as CategoriaModel,
      );

      const resultado = await repository.buscarPorId(2);

      expect(resultado).toBeInstanceOf(Categoria);
      expect(resultado?.getNome()).toBe('Salário');
    });

    it('deve lançar RepositoryException em caso de erro', async () => {
      const erro = new Error('Database error');
      categoriaRepository.findOne.mockRejectedValue(erro);

      await expect(repository.buscarPorId(1)).rejects.toThrow(
        RepositoryException,
      );
      await expect(repository.buscarPorId(1)).rejects.toThrow(
        'Erro interno ao buscar categoria',
      );
    });

    it('deve buscar categoria com ID 0', async () => {
      const categoriaModel: Partial<CategoriaModel> = {
        id: 0,
        nome: 'Categoria Zero',
        tipo: 'saida',
      };

      categoriaRepository.findOne.mockResolvedValue(
        categoriaModel as CategoriaModel,
      );

      const resultado = await repository.buscarPorId(0);

      expect(resultado).toBeInstanceOf(Categoria);
      expect(resultado?.getId()).toBe(0);
    });

    it('deve buscar categoria com caracteres especiais no nome', async () => {
      const categoriaModel: Partial<CategoriaModel> = {
        id: 5,
        nome: 'Restaurante & Bar',
        tipo: 'saida',
      };

      categoriaRepository.findOne.mockResolvedValue(
        categoriaModel as CategoriaModel,
      );

      const resultado = await repository.buscarPorId(5);

      expect(resultado?.getNome()).toBe('Restaurante & Bar');
    });
  });

  describe('buscarTodas', () => {
    it('deve buscar todas as categorias ordenadas por nome', async () => {
      const categoriasModel: Partial<CategoriaModel>[] = [
        { id: 1, nome: 'Alimentação', tipo: 'saida' },
        { id: 2, nome: 'Transporte', tipo: 'saida' },
        { id: 3, nome: 'Salário', tipo: 'entrada' },
      ];

      categoriaRepository.find.mockResolvedValue(
        categoriasModel as CategoriaModel[],
      );

      const resultado = await repository.buscarTodas();

      expect(resultado).toHaveLength(3);
      expect(resultado[0]).toBeInstanceOf(Categoria);
      expect(resultado[1]).toBeInstanceOf(Categoria);
      expect(resultado[2]).toBeInstanceOf(Categoria);
      expect(categoriaRepository.find).toHaveBeenCalledWith({
        order: { nome: 'ASC' },
      });
    });

    it('deve retornar array vazio quando não houver categorias', async () => {
      categoriaRepository.find.mockResolvedValue([]);

      const resultado = await repository.buscarTodas();

      expect(resultado).toEqual([]);
      expect(categoriaRepository.find).toHaveBeenCalledWith({
        order: { nome: 'ASC' },
      });
    });

    it('deve mapear múltiplas categorias corretamente', async () => {
      const categoriasModel: Partial<CategoriaModel>[] = [
        { id: 1, nome: 'Categoria 1', tipo: 'saida' },
        { id: 2, nome: 'Categoria 2', tipo: 'entrada' },
      ];

      categoriaRepository.find.mockResolvedValue(
        categoriasModel as CategoriaModel[],
      );

      const resultado = await repository.buscarTodas();

      expect(resultado[0].getId()).toBe(1);
      expect(resultado[0].getNome()).toBe('Categoria 1');
      expect(resultado[1].getId()).toBe(2);
      expect(resultado[1].getNome()).toBe('Categoria 2');
    });

    it('deve lançar RepositoryException em caso de erro', async () => {
      const erro = new Error('Database error');
      categoriaRepository.find.mockRejectedValue(erro);

      await expect(repository.buscarTodas()).rejects.toThrow(
        RepositoryException,
      );
      await expect(repository.buscarTodas()).rejects.toThrow(
        'Erro interno ao buscar categorias',
      );
    });

    it('deve buscar categorias com diferentes tipos', async () => {
      const categoriasModel: Partial<CategoriaModel>[] = [
        { id: 1, nome: 'Cat 1', tipo: 'saida' },
        { id: 2, nome: 'Cat 2', tipo: 'saida' },
        { id: 3, nome: 'Cat 3', tipo: 'entrada' },
      ];

      categoriaRepository.find.mockResolvedValue(
        categoriasModel as CategoriaModel[],
      );

      const resultado = await repository.buscarTodas();

      expect(resultado[0].getNome()).toBe('Cat 1');
      expect(resultado[1].getNome()).toBe('Cat 2');
      expect(resultado[2].getNome()).toBe('Cat 3');
    });

    it('deve buscar apenas categorias de saída', async () => {
      const categoriasModel: Partial<CategoriaModel>[] = [
        { id: 1, nome: 'Alimentação', tipo: 'saida' },
        { id: 2, nome: 'Transporte', tipo: 'saida' },
      ];

      categoriaRepository.find.mockResolvedValue(
        categoriasModel as CategoriaModel[],
      );

      const resultado = await repository.buscarTodas();

      expect(resultado).toHaveLength(2);
    });

    it('deve buscar apenas categorias de entrada', async () => {
      const categoriasModel: Partial<CategoriaModel>[] = [
        { id: 3, nome: 'Salário', tipo: 'entrada' },
        { id: 4, nome: 'Freelance', tipo: 'entrada' },
      ];

      categoriaRepository.find.mockResolvedValue(
        categoriasModel as CategoriaModel[],
      );

      const resultado = await repository.buscarTodas();

      expect(resultado).toHaveLength(2);
    });

    it('deve buscar grande quantidade de categorias', async () => {
      const categoriasModel: Partial<CategoriaModel>[] = Array.from(
        { length: 100 },
        (_, i) => ({
          id: i + 1,
          nome: `Categoria ${i + 1}`,
          tipo: (i % 2 === 0 ? 'saida' : 'entrada') as 'entrada' | 'saida',
        }),
      );

      categoriaRepository.find.mockResolvedValue(
        categoriasModel as CategoriaModel[],
      );

      const resultado = await repository.buscarTodas();

      expect(resultado).toHaveLength(100);
      expect(resultado[0]).toBeInstanceOf(Categoria);
      expect(resultado[99]).toBeInstanceOf(Categoria);
    });
  });
});
