import { CategoriaMapper } from './categoria.mapper';
import { Categoria } from '../../domain/categoria';

describe('CategoriaMapper - Application Mapper', () => {
  describe('DomainToDto', () => {
    it('deve converter entidade de domínio para DTO', () => {
      const categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });

      const dto = CategoriaMapper.DomainToDto(categoria);

      expect(dto).toEqual({
        id: 1,
        nome: 'Alimentação',
      });
    });

    it('deve converter categoria com nome diferente', () => {
      const categoria = Categoria.carregar({ id: 5, nome: 'Saúde' });

      const dto = CategoriaMapper.DomainToDto(categoria);

      expect(dto.id).toBe(5);
      expect(dto.nome).toBe('Saúde');
    });
  });

  describe('DomainToDtoList', () => {
    it('deve converter lista de entidades para lista de DTOs', () => {
      const categorias = [
        Categoria.carregar({ id: 1, nome: 'Alimentação' }),
        Categoria.carregar({ id: 2, nome: 'Transporte' }),
        Categoria.carregar({ id: 3, nome: 'Lazer' }),
      ];

      const dtos = CategoriaMapper.DomainToDtoList(categorias);

      expect(dtos).toHaveLength(3);
      expect(dtos[0]).toEqual({ id: 1, nome: 'Alimentação' });
      expect(dtos[1]).toEqual({ id: 2, nome: 'Transporte' });
      expect(dtos[2]).toEqual({ id: 3, nome: 'Lazer' });
    });

    it('deve retornar lista vazia para entrada vazia', () => {
      const dtos = CategoriaMapper.DomainToDtoList([]);

      expect(dtos).toEqual([]);
      expect(dtos).toHaveLength(0);
    });

    it('deve converter corretamente múltiplas categorias', () => {
      const categorias = [
        Categoria.carregar({ id: 10, nome: 'Educação' }),
        Categoria.carregar({ id: 20, nome: 'Moradia' }),
      ];

      const dtos = CategoriaMapper.DomainToDtoList(categorias);

      expect(dtos).toHaveLength(2);
      expect(dtos[0].id).toBe(10);
      expect(dtos[1].id).toBe(20);
    });
  });
});
