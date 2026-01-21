import { BuscarCategoriaPorIdQuery } from './buscar-categoria-por-id.query';
import { CategoriaRepositoryImpl } from '../../../infrastructure/repositories/categoria.repository';
import { Categoria } from '../../../domain/categoria';
import { DomainException } from '../../../domain/exceptions/domain.exception';

describe('BuscarCategoriaPorIdQuery - Application Query', () => {
  let query: BuscarCategoriaPorIdQuery;
  let categoriaRepository: jest.Mocked<CategoriaRepositoryImpl>;

  beforeEach(() => {
    categoriaRepository = {
      buscarPorId: jest.fn(),
    } as any;

    query = new BuscarCategoriaPorIdQuery(categoriaRepository);
  });

  describe('execute', () => {
    it('deve buscar categoria por ID com sucesso', async () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Alimentação',
      });

      categoriaRepository.buscarPorId.mockResolvedValue(categoria);

      const resultado = await query.execute(1);

      expect(resultado).toHaveProperty('id', 1);
      expect(resultado).toHaveProperty('nome', 'Alimentação');
      expect(categoriaRepository.buscarPorId).toHaveBeenCalledWith(1);
    });

    it('deve lançar DomainException quando categoria não for encontrada', async () => {
      categoriaRepository.buscarPorId.mockResolvedValue(null);

      await expect(query.execute(999)).rejects.toThrow(DomainException);
      await expect(query.execute(999)).rejects.toThrow(
        'Categoria com ID 999 não encontrada',
      );
    });

    it('deve buscar categoria de transporte', async () => {
      const categoria = Categoria.carregar({
        id: 2,
        nome: 'Transporte',
      });

      categoriaRepository.buscarPorId.mockResolvedValue(categoria);

      const resultado = await query.execute(2);

      expect(resultado.id).toBe(2);
      expect(resultado.nome).toBe('Transporte');
      expect(categoriaRepository.buscarPorId).toHaveBeenCalledTimes(1);
    });

    it('deve buscar categoria de lazer', async () => {
      const categoria = Categoria.carregar({
        id: 3,
        nome: 'Lazer',
      });

      categoriaRepository.buscarPorId.mockResolvedValue(categoria);

      const resultado = await query.execute(3);

      expect(resultado).toEqual({
        id: 3,
        nome: 'Lazer',
      });
    });

    it('deve chamar repositório com ID correto', async () => {
      const categoria = Categoria.carregar({
        id: 42,
        nome: 'Educação',
      });

      categoriaRepository.buscarPorId.mockResolvedValue(categoria);

      await query.execute(42);

      expect(categoriaRepository.buscarPorId).toHaveBeenCalledWith(42);
      expect(categoriaRepository.buscarPorId).toHaveBeenCalledTimes(1);
    });
  });
});
