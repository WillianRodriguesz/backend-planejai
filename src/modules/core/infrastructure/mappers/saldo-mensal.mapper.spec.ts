import { SaldoMensalMapper } from './saldo-mensal.mapper';
import { SaldoMes } from '../../domain/saldo-mensal';
import { SaldoMensalModel } from '../models/saldo-mensal.model';

describe('SaldoMensalMapper - Infrastructure Mapper', () => {
  describe('ModelToDomain', () => {
    it('deve converter model para domain', () => {
      const model = new SaldoMensalModel();
      model.id = 1;
      model.mes = 1;
      model.ano = 2025;
      model.saldoMes = 1000.5;

      const domain = SaldoMensalMapper.ModelToDomain(model);

      expect(domain).toBeInstanceOf(SaldoMes);
      expect(domain?.getId()).toBe('1');
      expect(domain?.getMes()).toBe(1);
      expect(domain?.getAno()).toBe(2025);
      expect(domain?.getSaldoMes()).toBe(1000.5);
    });

    it('deve converter valor string para number', () => {
      const model = new SaldoMensalModel();
      model.id = 2;
      model.mes = 6;
      model.ano = 2025;
      model.saldoMes = '500.75' as any;

      const domain = SaldoMensalMapper.ModelToDomain(model);

      expect(domain?.getSaldoMes()).toBe(500.75);
      expect(typeof domain?.getSaldoMes()).toBe('number');
    });

    it('deve retornar null para model inválido sem mes', () => {
      const model = new SaldoMensalModel();
      model.id = 3;
      model.ano = 2025;
      model.saldoMes = 100;
      // sem mes

      const domain = SaldoMensalMapper.ModelToDomain(model);

      expect(domain).toBeNull();
    });

    it('deve retornar null para model inválido sem ano', () => {
      const model = new SaldoMensalModel();
      model.id = 4;
      model.mes = 5;
      model.saldoMes = 100;
      // sem ano

      const domain = SaldoMensalMapper.ModelToDomain(model);

      expect(domain).toBeNull();
    });

    it('deve retornar null para model inválido sem id', () => {
      const model = new SaldoMensalModel();
      model.mes = 7;
      model.ano = 2025;
      model.saldoMes = 100;
      // sem id

      const domain = SaldoMensalMapper.ModelToDomain(model);

      expect(domain).toBeNull();
    });

    it('deve retornar null para model null', () => {
      const domain = SaldoMensalMapper.ModelToDomain(null as any);

      expect(domain).toBeNull();
    });

    it('deve retornar null e logar erro quando domain lançar exceção', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const model = new SaldoMensalModel();
      model.id = 5;
      model.mes = 13; // inválido
      model.ano = 2025;
      model.saldoMes = 100;

      const domain = SaldoMensalMapper.ModelToDomain(model);

      expect(domain).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('ModelToDomainList', () => {
    it('deve converter lista de models para lista de domains', () => {
      const model1 = new SaldoMensalModel();
      model1.id = 1;
      model1.mes = 1;
      model1.ano = 2025;
      model1.saldoMes = 100;

      const model2 = new SaldoMensalModel();
      model2.id = 2;
      model2.mes = 2;
      model2.ano = 2025;
      model2.saldoMes = 200;

      const domains = SaldoMensalMapper.ModelToDomainList([model1, model2]);

      expect(domains).toHaveLength(2);
      expect(domains[0]).toBeInstanceOf(SaldoMes);
      expect(domains[1]).toBeInstanceOf(SaldoMes);
    });

    it('deve filtrar models inválidos', () => {
      const model1 = new SaldoMensalModel();
      model1.id = 1;
      model1.mes = 1;
      model1.ano = 2025;
      model1.saldoMes = 100;

      const model2 = new SaldoMensalModel();
      // sem dados válidos

      const domains = SaldoMensalMapper.ModelToDomainList([model1, model2]);

      expect(domains).toHaveLength(1);
      expect(domains[0].getId()).toBe('1');
    });

    it('deve retornar array vazio para lista vazia', () => {
      const domains = SaldoMensalMapper.ModelToDomainList([]);

      expect(domains).toEqual([]);
    });

    it('deve retornar array vazio para null/undefined', () => {
      const domains1 = SaldoMensalMapper.ModelToDomainList(null as any);
      const domains2 = SaldoMensalMapper.ModelToDomainList(undefined as any);

      expect(domains1).toEqual([]);
      expect(domains2).toEqual([]);
    });
  });

  describe('DomainToModel', () => {
    it('deve converter domain para model', () => {
      const domain = SaldoMes.carregar({
        id: '10',
        mes: 3,
        ano: 2025,
        saldoMes: 750.25,
      });

      const model = SaldoMensalMapper.DomainToModel(domain);

      expect(model).toBeInstanceOf(SaldoMensalModel);
      expect(model.id).toBe(10);
      expect(model.mes).toBe(3);
      expect(model.ano).toBe(2025);
      expect(model.saldoMes).toBe(750.25);
    });

    it('deve converter id string para number', () => {
      const domain = SaldoMes.carregar({
        id: '999',
        mes: 12,
        ano: 2025,
        saldoMes: 1500,
      });

      const model = SaldoMensalMapper.DomainToModel(domain);

      expect(model.id).toBe(999);
      expect(typeof model.id).toBe('number');
    });

    it('deve não definir id para domain criado sem id', () => {
      const domain = SaldoMes.criar({
        mes: 5,
        ano: 2025,
        saldoMes: 300,
      });

      const model = SaldoMensalMapper.DomainToModel(domain);

      expect(model.id).toBeUndefined();
    });

    it('deve converter saldo negativo', () => {
      const domain = SaldoMes.carregar({
        id: '20',
        mes: 8,
        ano: 2025,
        saldoMes: -250.5,
      });

      const model = SaldoMensalMapper.DomainToModel(domain);

      expect(model.saldoMes).toBe(-250.5);
    });
  });

  describe('DomainToModelList', () => {
    it('deve converter lista de domains para lista de models', () => {
      const domain1 = SaldoMes.carregar({
        id: '1',
        mes: 1,
        ano: 2025,
        saldoMes: 100,
      });

      const domain2 = SaldoMes.carregar({
        id: '2',
        mes: 2,
        ano: 2025,
        saldoMes: 200,
      });

      const models = SaldoMensalMapper.DomainToModelList([domain1, domain2]);

      expect(models).toHaveLength(2);
      expect(models[0]).toBeInstanceOf(SaldoMensalModel);
      expect(models[1]).toBeInstanceOf(SaldoMensalModel);
      expect(models[0].id).toBe(1);
      expect(models[1].id).toBe(2);
    });

    it('deve retornar array vazio para lista vazia', () => {
      const models = SaldoMensalMapper.DomainToModelList([]);

      expect(models).toEqual([]);
    });
  });

  describe('conversão bidirecional', () => {
    it('deve manter dados após conversão model->domain->model', () => {
      const originalModel = new SaldoMensalModel();
      originalModel.id = 50;
      originalModel.mes = 11;
      originalModel.ano = 2024;
      originalModel.saldoMes = 999.99;

      const domain = SaldoMensalMapper.ModelToDomain(originalModel);
      const convertedModel = SaldoMensalMapper.DomainToModel(domain!);

      expect(convertedModel.id).toBe(originalModel.id);
      expect(convertedModel.mes).toBe(originalModel.mes);
      expect(convertedModel.ano).toBe(originalModel.ano);
      expect(convertedModel.saldoMes).toBe(originalModel.saldoMes);
    });
  });
});
