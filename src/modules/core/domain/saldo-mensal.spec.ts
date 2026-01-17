import { SaldoMes } from './saldo-mensal';
import { DomainException } from './exceptions/domain.exception';

describe('SaldoMes - Domain Entity', () => {
  describe('criar', () => {
    it('deve criar um saldo mensal válido', () => {
      const saldoMes = SaldoMes.criar({
        mes: 1,
        ano: 2025,
        saldoMes: 1000,
      });

      expect(saldoMes).toBeInstanceOf(SaldoMes);
      expect(saldoMes.getMes()).toBe(1);
      expect(saldoMes.getAno()).toBe(2025);
      expect(saldoMes.getSaldoMes()).toBe(1000);
    });

    it('deve criar saldo mensal com valor zero', () => {
      const saldoMes = SaldoMes.criar({
        mes: 6,
        ano: 2025,
        saldoMes: 0,
      });

      expect(saldoMes.getSaldoMes()).toBe(0);
    });

    it('deve criar saldo mensal com valor negativo', () => {
      const saldoMes = SaldoMes.criar({
        mes: 12,
        ano: 2025,
        saldoMes: -500,
      });

      expect(saldoMes.getSaldoMes()).toBe(-500);
    });

    it('deve lançar DomainException quando mes for menor que 1', () => {
      expect(() => {
        SaldoMes.criar({
          mes: 0,
          ano: 2025,
          saldoMes: 100,
        });
      }).toThrow(DomainException);
      expect(() => {
        SaldoMes.criar({
          mes: 0,
          ano: 2025,
          saldoMes: 100,
        });
      }).toThrow('Mês deve estar entre 1 e 12');
    });

    it('deve lançar DomainException quando mes for maior que 12', () => {
      expect(() => {
        SaldoMes.criar({
          mes: 13,
          ano: 2025,
          saldoMes: 100,
        });
      }).toThrow(DomainException);
      expect(() => {
        SaldoMes.criar({
          mes: 13,
          ano: 2025,
          saldoMes: 100,
        });
      }).toThrow('Mês deve estar entre 1 e 12');
    });

    it('deve aceitar mes válido no limite inferior (1)', () => {
      const saldoMes = SaldoMes.criar({
        mes: 1,
        ano: 2025,
        saldoMes: 100,
      });

      expect(saldoMes.getMes()).toBe(1);
    });

    it('deve aceitar mes válido no limite superior (12)', () => {
      const saldoMes = SaldoMes.criar({
        mes: 12,
        ano: 2025,
        saldoMes: 100,
      });

      expect(saldoMes.getMes()).toBe(12);
    });

    it('deve lançar DomainException quando ano for menor que 1900', () => {
      expect(() => {
        SaldoMes.criar({
          mes: 6,
          ano: 1899,
          saldoMes: 100,
        });
      }).toThrow(DomainException);
      expect(() => {
        SaldoMes.criar({
          mes: 6,
          ano: 1899,
          saldoMes: 100,
        });
      }).toThrow('Ano deve ser válido');
    });

    it('deve lançar DomainException quando ano for maior que ano atual + 10', () => {
      const anoInvalido = new Date().getFullYear() + 11;

      expect(() => {
        SaldoMes.criar({
          mes: 6,
          ano: anoInvalido,
          saldoMes: 100,
        });
      }).toThrow(DomainException);
      expect(() => {
        SaldoMes.criar({
          mes: 6,
          ano: anoInvalido,
          saldoMes: 100,
        });
      }).toThrow('Ano deve ser válido');
    });

    it('deve aceitar ano no limite inferior (1900)', () => {
      const saldoMes = SaldoMes.criar({
        mes: 1,
        ano: 1900,
        saldoMes: 100,
      });

      expect(saldoMes.getAno()).toBe(1900);
    });

    it('deve aceitar ano no limite superior (ano atual + 10)', () => {
      const anoMaximo = new Date().getFullYear() + 10;
      const saldoMes = SaldoMes.criar({
        mes: 12,
        ano: anoMaximo,
        saldoMes: 100,
      });

      expect(saldoMes.getAno()).toBe(anoMaximo);
    });
  });

  describe('carregar', () => {
    it('deve carregar um saldo mensal existente com id', () => {
      const saldoMes = SaldoMes.carregar({
        id: 'saldo-123',
        mes: 3,
        ano: 2025,
        saldoMes: 2500,
      });

      expect(saldoMes.getId()).toBe('saldo-123');
      expect(saldoMes.getMes()).toBe(3);
      expect(saldoMes.getAno()).toBe(2025);
      expect(saldoMes.getSaldoMes()).toBe(2500);
    });

    it('deve lançar DomainException ao carregar com mes inválido', () => {
      expect(() => {
        SaldoMes.carregar({
          id: 'saldo-456',
          mes: 15,
          ano: 2025,
          saldoMes: 100,
        });
      }).toThrow('Mês deve estar entre 1 e 12');
    });

    it('deve lançar DomainException ao carregar com ano inválido', () => {
      expect(() => {
        SaldoMes.carregar({
          id: 'saldo-789',
          mes: 6,
          ano: 1800,
          saldoMes: 100,
        });
      }).toThrow('Ano deve ser válido');
    });
  });

  describe('getters', () => {
    it('getId deve retornar undefined para saldo criado', () => {
      const saldoMes = SaldoMes.criar({
        mes: 5,
        ano: 2025,
        saldoMes: 300,
      });

      expect(saldoMes.getId()).toBeUndefined();
    });

    it('deve retornar todos os valores corretamente', () => {
      const saldoMes = SaldoMes.carregar({
        id: 'saldo-abc',
        mes: 7,
        ano: 2024,
        saldoMes: -150.5,
      });

      expect(saldoMes.getId()).toBe('saldo-abc');
      expect(saldoMes.getMes()).toBe(7);
      expect(saldoMes.getAno()).toBe(2024);
      expect(saldoMes.getSaldoMes()).toBe(-150.5);
    });
  });

  describe('atualizarSaldoMes', () => {
    it('deve atualizar o saldo mensal', () => {
      const saldoMes = SaldoMes.criar({
        mes: 1,
        ano: 2025,
        saldoMes: 100,
      });

      saldoMes.atualizarSaldoMes(500);

      expect(saldoMes.getSaldoMes()).toBe(500);
    });

    it('deve permitir atualizar para valor negativo', () => {
      const saldoMes = SaldoMes.criar({
        mes: 1,
        ano: 2025,
        saldoMes: 100,
      });

      saldoMes.atualizarSaldoMes(-300);

      expect(saldoMes.getSaldoMes()).toBe(-300);
    });

    it('deve permitir atualizar para zero', () => {
      const saldoMes = SaldoMes.criar({
        mes: 1,
        ano: 2025,
        saldoMes: 1000,
      });

      saldoMes.atualizarSaldoMes(0);

      expect(saldoMes.getSaldoMes()).toBe(0);
    });
  });

  describe('adicionarSaldoMes', () => {
    it('deve adicionar valor ao saldo mensal', () => {
      const saldoMes = SaldoMes.criar({
        mes: 2,
        ano: 2025,
        saldoMes: 500,
      });

      saldoMes.adicionarSaldoMes(250);

      expect(saldoMes.getSaldoMes()).toBe(750);
    });

    it('deve lançar DomainException quando valor for negativo', () => {
      const saldoMes = SaldoMes.criar({
        mes: 2,
        ano: 2025,
        saldoMes: 500,
      });

      expect(() => {
        saldoMes.adicionarSaldoMes(-100);
      }).toThrow(DomainException);
      expect(() => {
        saldoMes.adicionarSaldoMes(-100);
      }).toThrow('Valor deve ser positivo');
    });

    it('deve adicionar valores decimais corretamente', () => {
      const saldoMes = SaldoMes.criar({
        mes: 3,
        ano: 2025,
        saldoMes: 100.5,
      });

      saldoMes.adicionarSaldoMes(50.25);

      expect(saldoMes.getSaldoMes()).toBe(150.75);
    });

    it('deve permitir adicionar zero', () => {
      const saldoMes = SaldoMes.criar({
        mes: 4,
        ano: 2025,
        saldoMes: 200,
      });

      saldoMes.adicionarSaldoMes(0);

      expect(saldoMes.getSaldoMes()).toBe(200);
    });
  });

  describe('subtrairSaldoMes', () => {
    it('deve subtrair valor do saldo mensal', () => {
      const saldoMes = SaldoMes.criar({
        mes: 5,
        ano: 2025,
        saldoMes: 1000,
      });

      saldoMes.subtrairSaldoMes(300);

      expect(saldoMes.getSaldoMes()).toBe(700);
    });

    it('deve lançar DomainException quando valor for negativo', () => {
      const saldoMes = SaldoMes.criar({
        mes: 5,
        ano: 2025,
        saldoMes: 1000,
      });

      expect(() => {
        saldoMes.subtrairSaldoMes(-50);
      }).toThrow(DomainException);
      expect(() => {
        saldoMes.subtrairSaldoMes(-50);
      }).toThrow('Valor deve ser positivo');
    });

    it('deve permitir saldo negativo após subtração', () => {
      const saldoMes = SaldoMes.criar({
        mes: 6,
        ano: 2025,
        saldoMes: 100,
      });

      saldoMes.subtrairSaldoMes(200);

      expect(saldoMes.getSaldoMes()).toBe(-100);
    });

    it('deve subtrair valores decimais corretamente', () => {
      const saldoMes = SaldoMes.criar({
        mes: 7,
        ano: 2025,
        saldoMes: 250.75,
      });

      saldoMes.subtrairSaldoMes(50.25);

      expect(saldoMes.getSaldoMes()).toBe(200.5);
    });

    it('deve permitir subtrair zero', () => {
      const saldoMes = SaldoMes.criar({
        mes: 8,
        ano: 2025,
        saldoMes: 500,
      });

      saldoMes.subtrairSaldoMes(0);

      expect(saldoMes.getSaldoMes()).toBe(500);
    });
  });

  describe('validações de imutabilidade', () => {
    it('não deve permitir redefinir id após carregamento', () => {
      const saldoMes = SaldoMes.carregar({
        id: 'saldo-999',
        mes: 10,
        ano: 2025,
        saldoMes: 1000,
      });

      expect(() => {
        (saldoMes as any).setId('novo-id');
      }).toThrow(DomainException);
      expect(() => {
        (saldoMes as any).setId('novo-id');
      }).toThrow('ID já foi definido');
    });
  });

  describe('casos de uso diversos', () => {
    it('deve acumular múltiplas operações de adicionar e subtrair', () => {
      const saldoMes = SaldoMes.criar({
        mes: 11,
        ano: 2025,
        saldoMes: 1000,
      });

      saldoMes.adicionarSaldoMes(500);
      saldoMes.subtrairSaldoMes(200);
      saldoMes.adicionarSaldoMes(100);

      expect(saldoMes.getSaldoMes()).toBe(1400);
    });

    it('deve criar saldos para todos os meses do ano', () => {
      const saldos = [];
      for (let mes = 1; mes <= 12; mes++) {
        const saldo = SaldoMes.criar({
          mes,
          ano: 2025,
          saldoMes: mes * 100,
        });
        saldos.push(saldo);
      }

      expect(saldos).toHaveLength(12);
      expect(saldos[0].getMes()).toBe(1);
      expect(saldos[11].getMes()).toBe(12);
    });
  });
});
