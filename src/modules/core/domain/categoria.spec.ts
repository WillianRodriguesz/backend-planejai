import { Categoria } from './categoria';
import { DomainException } from './exceptions/domain.exception';

describe('Categoria - Domain Entity', () => {
  describe('criar', () => {
    it('deve criar uma categoria com nome válido', () => {
      const categoria = Categoria.criar({
        nome: 'Alimentação',
      });

      expect(categoria).toBeInstanceOf(Categoria);
      expect(categoria.getNome()).toBe('Alimentação');
    });

    it('deve lançar DomainException quando nome estiver vazio', () => {
      expect(() => {
        Categoria.criar({ nome: '' });
      }).toThrow(DomainException);
      expect(() => {
        Categoria.criar({ nome: '' });
      }).toThrow('Nome é obrigatório');
    });

    it('deve lançar DomainException quando nome for apenas espaços', () => {
      expect(() => {
        Categoria.criar({ nome: '   ' });
      }).toThrow(DomainException);
      expect(() => {
        Categoria.criar({ nome: '   ' });
      }).toThrow('Nome é obrigatório');
    });

    it('deve lançar DomainException quando nome for undefined', () => {
      expect(() => {
        Categoria.criar({ nome: undefined as any });
      }).toThrow(DomainException);
    });

    it('deve lançar DomainException quando nome for null', () => {
      expect(() => {
        Categoria.criar({ nome: null as any });
      }).toThrow(DomainException);
    });
  });

  describe('carregar', () => {
    it('deve carregar uma categoria existente com id e nome', () => {
      const categoria = Categoria.carregar({
        id: 1,
        nome: 'Transporte',
      });

      expect(categoria).toBeInstanceOf(Categoria);
      expect(categoria.getId()).toBe(1);
      expect(categoria.getNome()).toBe('Transporte');
    });

    it('deve lançar DomainException ao carregar categoria com nome vazio', () => {
      expect(() => {
        Categoria.carregar({
          id: 1,
          nome: '',
        });
      }).toThrow(DomainException);
    });

    it('deve carregar categoria com nome contendo caracteres especiais', () => {
      const categoria = Categoria.carregar({
        id: 2,
        nome: 'Saúde & Bem-estar',
      });

      expect(categoria.getNome()).toBe('Saúde & Bem-estar');
    });
  });

  describe('getId', () => {
    it('deve retornar o id da categoria carregada', () => {
      const categoria = Categoria.carregar({
        id: 5,
        nome: 'Educação',
      });

      expect(categoria.getId()).toBe(5);
    });

    it('deve retornar undefined para categoria criada sem id', () => {
      const categoria = Categoria.criar({
        nome: 'Lazer',
      });

      expect(categoria.getId()).toBeUndefined();
    });
  });

  describe('getNome', () => {
    it('deve retornar o nome da categoria', () => {
      const categoria = Categoria.criar({
        nome: 'Moradia',
      });

      expect(categoria.getNome()).toBe('Moradia');
    });

    it('deve retornar nome com espaços preservados', () => {
      const categoria = Categoria.criar({
        nome: '  Nome com espaços  ',
      });

      expect(categoria.getNome()).toBe('  Nome com espaços  ');
    });
  });

  describe('validações de imutabilidade', () => {
    it('não deve permitir redefinir id após carregamento', () => {
      const categoria = Categoria.carregar({
        id: 10,
        nome: 'Categoria Teste',
      });

      expect(() => {
        (categoria as any).setId(20);
      }).toThrow(DomainException);
      expect(() => {
        (categoria as any).setId(20);
      }).toThrow('ID já foi definido');
    });
  });

  describe('casos de uso diversos', () => {
    it('deve criar categorias com nomes diferentes', () => {
      const cat1 = Categoria.criar({ nome: 'Categoria A' });
      const cat2 = Categoria.criar({ nome: 'Categoria B' });

      expect(cat1.getNome()).not.toBe(cat2.getNome());
    });

    it('deve carregar múltiplas categorias com ids diferentes', () => {
      const cat1 = Categoria.carregar({ id: 1, nome: 'Cat 1' });
      const cat2 = Categoria.carregar({ id: 2, nome: 'Cat 2' });

      expect(cat1.getId()).not.toBe(cat2.getId());
    });
  });
});
