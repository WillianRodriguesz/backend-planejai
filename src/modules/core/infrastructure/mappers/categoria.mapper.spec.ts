import { CategoriaMapper } from './categoria.mapper';
import { Categoria } from '../../domain/categoria';
import { CategoriaModel } from '../models/categoria.model';

describe('CategoriaMapper - Infrastructure Mapper', () => {
  describe('ModelToDomain', () => {
    it('deve converter model para domain', () => {
      const model = new CategoriaModel();
      model.id = 1;
      model.nome = 'Alimentação';

      const domain = CategoriaMapper.ModelToDomain(model);

      expect(domain).toBeInstanceOf(Categoria);
      expect(domain.getId()).toBe(1);
      expect(domain.getNome()).toBe('Alimentação');
    });

    it('deve converter model com caracteres especiais', () => {
      const model = new CategoriaModel();
      model.id = 5;
      model.nome = 'Saúde & Bem-estar';

      const domain = CategoriaMapper.ModelToDomain(model);

      expect(domain.getNome()).toBe('Saúde & Bem-estar');
    });
  });

  describe('ModelToDomainList', () => {
    it('deve converter lista de models para lista de domains', () => {
      const model1 = new CategoriaModel();
      model1.id = 1;
      model1.nome = 'Categoria 1';

      const model2 = new CategoriaModel();
      model2.id = 2;
      model2.nome = 'Categoria 2';

      const domains = CategoriaMapper.ModelToDomainList([model1, model2]);

      expect(domains).toHaveLength(2);
      expect(domains[0]).toBeInstanceOf(Categoria);
      expect(domains[1]).toBeInstanceOf(Categoria);
      expect(domains[0].getId()).toBe(1);
      expect(domains[1].getId()).toBe(2);
    });

    it('deve retornar array vazio para lista vazia', () => {
      const domains = CategoriaMapper.ModelToDomainList([]);

      expect(domains).toEqual([]);
    });
  });

  describe('DomainToModel', () => {
    it('deve converter domain para model', () => {
      const domain = Categoria.carregar({
        id: 3,
        nome: 'Transporte',
      });

      const model = CategoriaMapper.DomainToModel(domain);

      expect(model).toBeInstanceOf(CategoriaModel);
      expect(model.id).toBe(3);
      expect(model.nome).toBe('Transporte');
    });

    it('deve converter domain criado sem id', () => {
      const domain = Categoria.criar({
        nome: 'Nova Categoria',
      });

      const model = CategoriaMapper.DomainToModel(domain);

      expect(model.id).toBeUndefined();
      expect(model.nome).toBe('Nova Categoria');
    });
  });

  describe('DomainToModelList', () => {
    it('deve converter lista de domains para lista de models', () => {
      const domain1 = Categoria.carregar({ id: 1, nome: 'Dom 1' });
      const domain2 = Categoria.carregar({ id: 2, nome: 'Dom 2' });

      const models = CategoriaMapper.DomainToModelList([domain1, domain2]);

      expect(models).toHaveLength(2);
      expect(models[0]).toBeInstanceOf(CategoriaModel);
      expect(models[1]).toBeInstanceOf(CategoriaModel);
      expect(models[0].id).toBe(1);
      expect(models[1].id).toBe(2);
    });

    it('deve retornar array vazio para lista vazia', () => {
      const models = CategoriaMapper.DomainToModelList([]);

      expect(models).toEqual([]);
    });
  });

  describe('conversão bidirecional', () => {
    it('deve manter dados após conversão model->domain->model', () => {
      const originalModel = new CategoriaModel();
      originalModel.id = 10;
      originalModel.nome = 'Categoria Original';

      const domain = CategoriaMapper.ModelToDomain(originalModel);
      const convertedModel = CategoriaMapper.DomainToModel(domain);

      expect(convertedModel.id).toBe(originalModel.id);
      expect(convertedModel.nome).toBe(originalModel.nome);
    });
  });
});
