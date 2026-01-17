import { BuscarTodasCategoriasQuery } from './buscar-todas-categorias.query';
import { CategoriaRepositoryImpl } from '../../../infrastructure/repositories/categoria.repository';
import { Categoria } from '../../../domain/categoria';

describe('BuscarTodasCategoriasQuery', () => {
  let query: BuscarTodasCategoriasQuery;
  let categoriaRepository: jest.Mocked<CategoriaRepositoryImpl>;

  beforeEach(() => {
    categoriaRepository = {
      buscarTodas: jest.fn(),
    } as any;

    query = new BuscarTodasCategoriasQuery(categoriaRepository);
  });

  describe('execute', () => {
    it('deve retornar todas as categorias como DTOs', async () => {
      const categorias = [
        Categoria.carregar({ id: 1, nome: 'Alimentação' }),
        Categoria.carregar({ id: 2, nome: 'Transporte' }),
        Categoria.carregar({ id: 3, nome: 'Lazer' }),
      ];

      categoriaRepository.buscarTodas.mockResolvedValue(categorias);

      const resultado = await query.execute();

      expect(categoriaRepository.buscarTodas).toHaveBeenCalled();
      expect(resultado).toHaveLength(3);
      expect(resultado[0]).toEqual({ id: 1, nome: 'Alimentação' });
      expect(resultado[1]).toEqual({ id: 2, nome: 'Transporte' });
      expect(resultado[2]).toEqual({ id: 3, nome: 'Lazer' });
    });

    it('deve retornar lista vazia se não houver categorias', async () => {
      categoriaRepository.buscarTodas.mockResolvedValue([]);

      const resultado = await query.execute();

      expect(resultado).toEqual([]);
      expect(resultado).toHaveLength(0);
    });

    it('deve chamar o repositório apenas uma vez', async () => {
      const categorias = [Categoria.carregar({ id: 1, nome: 'Alimentação' })];

      categoriaRepository.buscarTodas.mockResolvedValue(categorias);

      await query.execute();

      expect(categoriaRepository.buscarTodas).toHaveBeenCalledTimes(1);
    });
  });
});
