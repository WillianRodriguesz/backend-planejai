import { Lancamento, TipoTransacao } from './lancamento';
import { Categoria } from './categoria';
import { DomainException } from './exceptions/domain.exception';

describe('Lancamento - Domain Entity', () => {
  let categoria: Categoria;

  beforeEach(() => {
    categoria = Categoria.carregar({
      id: 1,
      nome: 'Alimentação',
    });
  });

  describe('criar', () => {
    it('deve criar um lançamento válido com todos os campos', () => {
      const data = new Date('2025-01-15');
      const lancamento = Lancamento.criar({
        titulo: 'Compra Supermercado',
        descricao: 'Compras mensais',
        valor: 250.5,
        tipoTransacao: 'saida',
        categoria,
        data,
      });

      expect(lancamento).toBeInstanceOf(Lancamento);
      expect(lancamento.getTitulo()).toBe('Compra Supermercado');
      expect(lancamento.getDescricao()).toBe('Compras mensais');
      expect(lancamento.getValor()).toBe(250.5);
      expect(lancamento.getTipoTransacao()).toBe('saida');
      expect(lancamento.getCategoria()).toBe(categoria);
      expect(lancamento.getData()).toEqual(data);
    });

    it('deve criar lançamento sem descricao', () => {
      const lancamento = Lancamento.criar({
        titulo: 'Salário',
        valor: 3000,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      expect(lancamento.getDescricao()).toBe('');
    });

    it('deve lançar DomainException quando titulo estiver vazio', () => {
      expect(() => {
        Lancamento.criar({
          titulo: '',
          valor: 100,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date(),
        });
      }).toThrow(DomainException);
      expect(() => {
        Lancamento.criar({
          titulo: '',
          valor: 100,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date(),
        });
      }).toThrow('Título é obrigatório');
    });

    it('deve lançar DomainException quando titulo exceder 150 caracteres', () => {
      const tituloLongo = 'A'.repeat(151);

      expect(() => {
        Lancamento.criar({
          titulo: tituloLongo,
          valor: 100,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date(),
        });
      }).toThrow(DomainException);
      expect(() => {
        Lancamento.criar({
          titulo: tituloLongo,
          valor: 100,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date(),
        });
      }).toThrow('Título não pode ter mais de 150 caracteres');
    });

    it('deve aceitar titulo com exatamente 150 caracteres', () => {
      const titulo150 = 'A'.repeat(150);

      const lancamento = Lancamento.criar({
        titulo: titulo150,
        valor: 100,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      expect(lancamento.getTitulo()).toBe(titulo150);
    });

    it('deve lançar DomainException quando descricao exceder 150 caracteres', () => {
      const descricaoLonga = 'B'.repeat(151);

      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          descricao: descricaoLonga,
          valor: 100,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date(),
        });
      }).toThrow(DomainException);
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          descricao: descricaoLonga,
          valor: 100,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date(),
        });
      }).toThrow('Descrição não pode ter mais de 150 caracteres');
    });

    it('deve lançar DomainException quando valor for zero', () => {
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          valor: 0,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date(),
        });
      }).toThrow(DomainException);
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          valor: 0,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date(),
        });
      }).toThrow('Valor deve ser positivo');
    });

    it('deve lançar DomainException quando valor for negativo', () => {
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          valor: -100,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date(),
        });
      }).toThrow('Valor deve ser positivo');
    });

    it('deve lançar DomainException quando tipoTransacao for inválido', () => {
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          valor: 100,
          tipoTransacao: 'invalido' as TipoTransacao,
          categoria,
          data: new Date(),
        });
      }).toThrow(DomainException);
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          valor: 100,
          tipoTransacao: 'invalido' as TipoTransacao,
          categoria,
          data: new Date(),
        });
      }).toThrow('Tipo de transação deve ser "entrada" ou "saida"');
    });

    it('deve lançar DomainException quando categoria for null', () => {
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          valor: 100,
          tipoTransacao: 'entrada',
          categoria: null as any,
          data: new Date(),
        });
      }).toThrow(DomainException);
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          valor: 100,
          tipoTransacao: 'entrada',
          categoria: null as any,
          data: new Date(),
        });
      }).toThrow('Categoria é obrigatória');
    });

    it('deve lançar DomainException quando data for inválida', () => {
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          valor: 100,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date('invalid'),
        });
      }).toThrow(DomainException);
      expect(() => {
        Lancamento.criar({
          titulo: 'Teste',
          valor: 100,
          tipoTransacao: 'entrada',
          categoria,
          data: new Date('invalid'),
        });
      }).toThrow('Data deve ser válida');
    });
  });

  describe('carregar', () => {
    it('deve carregar um lançamento existente com id', () => {
      const data = new Date('2025-01-10');
      const lancamento = Lancamento.carregar({
        id: 'lanc-123',
        titulo: 'Pagamento',
        descricao: 'Teste',
        valor: 500,
        tipoTransacao: 'saida',
        categoria,
        data,
      });

      expect(lancamento.getId()).toBe('lanc-123');
      expect(lancamento.getTitulo()).toBe('Pagamento');
      expect(lancamento.getValor()).toBe(500);
    });

    it('deve carregar lançamento do tipo entrada', () => {
      const lancamento = Lancamento.carregar({
        id: 'lanc-456',
        titulo: 'Receita',
        descricao: 'Venda',
        valor: 1000,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      expect(lancamento.getTipoTransacao()).toBe('entrada');
    });
  });

  describe('getters', () => {
    it('deve retornar categoria id através de getCategoriaId', () => {
      const lancamento = Lancamento.criar({
        titulo: 'Teste',
        valor: 100,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      expect(lancamento.getCategoriaId()).toBe(1);
    });

    it('getId deve retornar undefined para lançamento criado', () => {
      const lancamento = Lancamento.criar({
        titulo: 'Teste',
        valor: 100,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      expect(lancamento.getId()).toBeUndefined();
    });
  });

  describe('métodos de atualização', () => {
    let lancamento: Lancamento;

    beforeEach(() => {
      lancamento = Lancamento.carregar({
        id: 'lanc-123',
        titulo: 'Titulo Original',
        descricao: 'Descricao Original',
        valor: 100,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date('2025-01-01'),
      });
    });

    it('deve atualizar titulo', () => {
      lancamento.atualizarTitulo('Novo Titulo');
      expect(lancamento.getTitulo()).toBe('Novo Titulo');
    });

    it('deve lançar erro ao atualizar titulo vazio', () => {
      expect(() => {
        lancamento.atualizarTitulo('');
      }).toThrow('Título é obrigatório');
    });

    it('deve atualizar descricao', () => {
      lancamento.atualizarDescricao('Nova Descricao');
      expect(lancamento.getDescricao()).toBe('Nova Descricao');
    });

    it('deve atualizar descricao para vazio', () => {
      lancamento.atualizarDescricao();
      expect(lancamento.getDescricao()).toBe('');
    });

    it('deve atualizar valor', () => {
      lancamento.atualizarValor(250.75);
      expect(lancamento.getValor()).toBe(250.75);
    });

    it('deve lançar erro ao atualizar valor negativo', () => {
      expect(() => {
        lancamento.atualizarValor(-50);
      }).toThrow('Valor deve ser positivo');
    });

    it('deve atualizar tipoTransacao', () => {
      lancamento.atualizarTipoTransacao('saida');
      expect(lancamento.getTipoTransacao()).toBe('saida');
    });

    it('deve lançar erro ao atualizar tipoTransacao inválido', () => {
      expect(() => {
        lancamento.atualizarTipoTransacao('invalido' as TipoTransacao);
      }).toThrow('Tipo de transação deve ser "entrada" ou "saida"');
    });

    it('deve atualizar categoria', () => {
      const novaCategoria = Categoria.carregar({ id: 2, nome: 'Transporte' });
      lancamento.atualizarCategoria(novaCategoria);

      expect(lancamento.getCategoria()).toBe(novaCategoria);
      expect(lancamento.getCategoriaId()).toBe(2);
    });

    it('deve atualizar data', () => {
      const novaData = new Date('2025-02-15');
      lancamento.atualizarData(novaData);
      expect(lancamento.getData()).toEqual(novaData);
    });

    it('deve lançar erro ao atualizar data inválida', () => {
      expect(() => {
        lancamento.atualizarData(new Date('invalid'));
      }).toThrow('Data deve ser válida');
    });
  });

  describe('validações de imutabilidade', () => {
    it('não deve permitir redefinir id após carregamento', () => {
      const lancamento = Lancamento.carregar({
        id: 'lanc-999',
        titulo: 'Teste',
        descricao: 'Desc',
        valor: 100,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      expect(() => {
        (lancamento as any).setId('novo-id');
      }).toThrow(DomainException);
      expect(() => {
        (lancamento as any).setId('novo-id');
      }).toThrow('ID já foi definido');
    });
  });

  describe('casos de uso diversos', () => {
    it('deve aceitar valores decimais', () => {
      const lancamento = Lancamento.criar({
        titulo: 'Compra',
        valor: 99.99,
        tipoTransacao: 'saida',
        categoria,
        data: new Date(),
      });

      expect(lancamento.getValor()).toBe(99.99);
    });

    it('deve criar lançamento de entrada e saída com mesma categoria', () => {
      const entrada = Lancamento.criar({
        titulo: 'Entrada',
        valor: 100,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      const saida = Lancamento.criar({
        titulo: 'Saída',
        valor: 50,
        tipoTransacao: 'saida',
        categoria,
        data: new Date(),
      });

      expect(entrada.getTipoTransacao()).toBe('entrada');
      expect(saida.getTipoTransacao()).toBe('saida');
      expect(entrada.getCategoriaId()).toBe(saida.getCategoriaId());
    });
  });
});
