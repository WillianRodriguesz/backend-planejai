import { LancamentoMapper } from './lancamento.mapper';
import { Lancamento } from '../../domain/lancamento';
import { Categoria } from '../../domain/categoria';
import { LancamentoModel } from '../models/lancamento.model';
import { CategoriaModel } from '../models/categoria.model';

describe('LancamentoMapper - Infrastructure Mapper', () => {
  let categoria: Categoria;
  let categoriaModel: CategoriaModel;

  beforeEach(() => {
    categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });

    categoriaModel = new CategoriaModel();
    categoriaModel.id = 1;
    categoriaModel.nome = 'Alimentação';
  });

  describe('ModelToDomain', () => {
    it('deve converter model para domain', () => {
      const model = new LancamentoModel();
      model.id = 1;
      model.titulo = 'Compra Supermercado';
      model.descricao = 'Compras mensais';
      model.valor = 250.5;
      model.tipo = 'saida';
      model.data = new Date('2025-01-15');
      model.categoria = categoriaModel;

      const domain = LancamentoMapper.ModelToDomain(model);

      expect(domain).toBeInstanceOf(Lancamento);
      expect(domain.getId()).toBe('1');
      expect(domain.getTitulo()).toBe('Compra Supermercado');
      expect(domain.getDescricao()).toBe('Compras mensais');
      expect(domain.getValor()).toBe(250.5);
      expect(domain.getTipoTransacao()).toBe('saida');
      expect(domain.getData()).toEqual(new Date('2025-01-15'));
      expect(domain.getCategoria()).toBeDefined();
      expect(domain.getCategoriaId()).toBe(1);
    });

    it('deve converter valor string para number', () => {
      const model = new LancamentoModel();
      model.id = 2;
      model.titulo = 'Teste';
      model.descricao = 'Desc';
      model.valor = '100.50' as any;
      model.tipo = 'entrada';
      model.data = new Date();
      model.categoria = categoriaModel;

      const domain = LancamentoMapper.ModelToDomain(model);

      expect(domain.getValor()).toBe(100.5);
      expect(typeof domain.getValor()).toBe('number');
    });

    it('deve converter data string para Date', () => {
      const model = new LancamentoModel();
      model.id = 3;
      model.titulo = 'Teste';
      model.descricao = 'Desc';
      model.valor = 100;
      model.tipo = 'entrada';
      model.data = '2025-02-10' as any;
      model.categoria = categoriaModel;

      const domain = LancamentoMapper.ModelToDomain(model);

      expect(domain.getData()).toBeInstanceOf(Date);
    });
  });

  describe('ModelToDomainList', () => {
    it('deve converter lista de models para lista de domains', () => {
      const model1 = new LancamentoModel();
      model1.id = 1;
      model1.titulo = 'Lancamento 1';
      model1.descricao = 'Desc 1';
      model1.valor = 100;
      model1.tipo = 'entrada';
      model1.data = new Date();
      model1.categoria = categoriaModel;

      const model2 = new LancamentoModel();
      model2.id = 2;
      model2.titulo = 'Lancamento 2';
      model2.descricao = 'Desc 2';
      model2.valor = 200;
      model2.tipo = 'saida';
      model2.data = new Date();
      model2.categoria = categoriaModel;

      const domains = LancamentoMapper.ModelToDomainList([model1, model2]);

      expect(domains).toHaveLength(2);
      expect(domains[0]).toBeInstanceOf(Lancamento);
      expect(domains[1]).toBeInstanceOf(Lancamento);
      expect(domains[0].getId()).toBe('1');
      expect(domains[1].getId()).toBe('2');
    });

    it('deve retornar array vazio para lista vazia', () => {
      const domains = LancamentoMapper.ModelToDomainList([]);

      expect(domains).toEqual([]);
    });

    it('deve retornar array vazio para null/undefined', () => {
      const domains1 = LancamentoMapper.ModelToDomainList(null as any);
      const domains2 = LancamentoMapper.ModelToDomainList(undefined as any);

      expect(domains1).toEqual([]);
      expect(domains2).toEqual([]);
    });

    it('deve filtrar models sem id', () => {
      const model1 = new LancamentoModel();
      model1.id = 1;
      model1.titulo = 'Lancamento 1';
      model1.descricao = 'Desc';
      model1.valor = 100;
      model1.tipo = 'entrada';
      model1.data = new Date();
      model1.categoria = categoriaModel;

      const model2 = new LancamentoModel();
      // sem id

      const domains = LancamentoMapper.ModelToDomainList([model1, model2]);

      expect(domains).toHaveLength(1);
      expect(domains[0].getId()).toBe('1');
    });
  });

  describe('DomainToModel', () => {
    it('deve converter domain para model', () => {
      const domain = Lancamento.carregar({
        id: '10',
        titulo: 'Salário',
        descricao: 'Pagamento mensal',
        valor: 3000,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date('2025-01-31'),
      });

      const model = LancamentoMapper.DomainToModel(domain);

      expect(model).toBeInstanceOf(LancamentoModel);
      expect(model.id).toBe(10);
      expect(model.titulo).toBe('Salário');
      expect(model.descricao).toBe('Pagamento mensal');
      expect(model.valor).toBe(3000);
      expect(model.tipo).toBe('entrada');
      expect(model.data).toEqual(new Date('2025-01-31'));
      expect(model.categoriaId).toBe(1);
    });

    it('deve converter id string para number', () => {
      const domain = Lancamento.carregar({
        id: '999',
        titulo: 'Teste',
        descricao: 'Desc',
        valor: 100,
        tipoTransacao: 'saida',
        categoria,
        data: new Date(),
      });

      const model = LancamentoMapper.DomainToModel(domain);

      expect(model.id).toBe(999);
      expect(typeof model.id).toBe('number');
    });

    it('deve não definir id para domain criado sem id', () => {
      const domain = Lancamento.criar({
        titulo: 'Novo Lancamento',
        valor: 150,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      const model = LancamentoMapper.DomainToModel(domain);

      expect(model.id).toBeUndefined();
    });
  });

  describe('DomainToModelList', () => {
    it('deve converter lista de domains para lista de models', () => {
      const domain1 = Lancamento.carregar({
        id: '1',
        titulo: 'Dom 1',
        descricao: 'Desc',
        valor: 100,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      const domain2 = Lancamento.carregar({
        id: '2',
        titulo: 'Dom 2',
        descricao: 'Desc',
        valor: 200,
        tipoTransacao: 'saida',
        categoria,
        data: new Date(),
      });

      const models = LancamentoMapper.DomainToModelList([domain1, domain2]);

      expect(models).toHaveLength(2);
      expect(models[0]).toBeInstanceOf(LancamentoModel);
      expect(models[1]).toBeInstanceOf(LancamentoModel);
      expect(models[0].id).toBe(1);
      expect(models[1].id).toBe(2);
    });

    it('deve retornar array vazio para lista vazia', () => {
      const models = LancamentoMapper.DomainToModelList([]);

      expect(models).toEqual([]);
    });
  });

  describe('conversão bidirecional', () => {
    it('deve manter dados após conversão model->domain->model', () => {
      const originalModel = new LancamentoModel();
      originalModel.id = 50;
      originalModel.titulo = 'Original';
      originalModel.descricao = 'Descricao';
      originalModel.valor = 500.75;
      originalModel.tipo = 'entrada';
      originalModel.data = new Date('2025-03-15');
      originalModel.categoria = categoriaModel;

      const domain = LancamentoMapper.ModelToDomain(originalModel);
      const convertedModel = LancamentoMapper.DomainToModel(domain);

      expect(convertedModel.id).toBe(originalModel.id);
      expect(convertedModel.titulo).toBe(originalModel.titulo);
      expect(convertedModel.descricao).toBe(originalModel.descricao);
      expect(convertedModel.valor).toBe(originalModel.valor);
      expect(convertedModel.tipo).toBe(originalModel.tipo);
      expect(convertedModel.data).toEqual(originalModel.data);
    });
  });
});
