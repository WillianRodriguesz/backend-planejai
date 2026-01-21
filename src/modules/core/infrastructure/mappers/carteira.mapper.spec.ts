import { CarteiraMapper } from './carteira.mapper';
import { Carteira } from '../../domain/carteira';
import { Lancamento } from '../../domain/lancamento';
import { SaldoMes } from '../../domain/saldo-mensal';
import { Categoria } from '../../domain/categoria';
import { CarteiraModel } from '../models/carteira.model';
import { LancamentoModel } from '../models/lancamento.model';
import { SaldoMensalModel } from '../models/saldo-mensal.model';
import { CategoriaModel } from '../models/categoria.model';

describe('CarteiraMapper - Infrastructure Mapper', () => {
  let categoriaModel: CategoriaModel;
  let categoria: Categoria;

  beforeEach(() => {
    categoriaModel = new CategoriaModel();
    categoriaModel.id = 1;
    categoriaModel.nome = 'Alimentação';

    categoria = Categoria.carregar({ id: 1, nome: 'Alimentação' });
  });

  describe('ModelToDomain', () => {
    it('deve converter model para domain', () => {
      const model = new CarteiraModel();
      model.id = 'carteira-123';
      model.usuarioId = 'usuario-456';
      model.criadoEm = new Date('2025-01-01');
      model.lancamentos = [];
      model.saldosMensais = [];

      const domain = CarteiraMapper.ModelToDomain(model);

      expect(domain).toBeInstanceOf(Carteira);
      expect(domain.getId()).toBe('carteira-123');
      expect(domain.getUsuarioId()).toBe('usuario-456');
      expect(domain.getCriadoEm()).toEqual(new Date('2025-01-01'));
      expect(domain.getLancamentos()).toEqual([]);
      expect(domain.getSaldosMensais()).toEqual([]);
    });

    it('deve converter model com lançamentos', () => {
      const lancamentoModel = new LancamentoModel();
      lancamentoModel.id = 1;
      lancamentoModel.titulo = 'Compra';
      lancamentoModel.descricao = 'Desc';
      lancamentoModel.valor = 100;
      lancamentoModel.tipo = 'saida';
      lancamentoModel.data = new Date();
      lancamentoModel.categoria = categoriaModel;

      const model = new CarteiraModel();
      model.id = 'carteira-123';
      model.usuarioId = 'usuario-456';
      model.criadoEm = new Date();
      model.lancamentos = [lancamentoModel];
      model.saldosMensais = [];

      const domain = CarteiraMapper.ModelToDomain(model);

      expect(domain.getLancamentos()).toHaveLength(1);
      expect(domain.getLancamentos()[0]).toBeInstanceOf(Lancamento);
      expect(domain.getLancamentos()[0].getTitulo()).toBe('Compra');
    });

    it('deve converter model com saldos mensais', () => {
      const saldoModel = new SaldoMensalModel();
      saldoModel.id = 1;
      saldoModel.mes = 1;
      saldoModel.ano = 2025;
      saldoModel.saldoMes = 500;

      const model = new CarteiraModel();
      model.id = 'carteira-123';
      model.usuarioId = 'usuario-456';
      model.criadoEm = new Date();
      model.lancamentos = [];
      model.saldosMensais = [saldoModel];

      const domain = CarteiraMapper.ModelToDomain(model);

      expect(domain.getSaldosMensais()).toHaveLength(1);
      expect(domain.getSaldosMensais()[0]).toBeInstanceOf(SaldoMes);
      expect(domain.getSaldosMensais()[0].getSaldoMes()).toBe(500);
    });

    it('deve lidar com lancamentos undefined', () => {
      const model = new CarteiraModel();
      model.id = 'carteira-123';
      model.usuarioId = 'usuario-456';
      model.criadoEm = new Date();
      model.lancamentos = undefined as any;
      model.saldosMensais = undefined as any;

      const domain = CarteiraMapper.ModelToDomain(model);

      expect(domain.getLancamentos()).toEqual([]);
      expect(domain.getSaldosMensais()).toEqual([]);
    });
  });

  describe('ModelToDomainList', () => {
    it('deve converter lista de models para lista de domains', () => {
      const model1 = new CarteiraModel();
      model1.id = 'cart-1';
      model1.usuarioId = 'user-1';
      model1.criadoEm = new Date();
      model1.lancamentos = [];
      model1.saldosMensais = [];

      const model2 = new CarteiraModel();
      model2.id = 'cart-2';
      model2.usuarioId = 'user-2';
      model2.criadoEm = new Date();
      model2.lancamentos = [];
      model2.saldosMensais = [];

      const domains = CarteiraMapper.ModelToDomainList([model1, model2]);

      expect(domains).toHaveLength(2);
      expect(domains[0]).toBeInstanceOf(Carteira);
      expect(domains[1]).toBeInstanceOf(Carteira);
      expect(domains[0].getId()).toBe('cart-1');
      expect(domains[1].getId()).toBe('cart-2');
    });

    it('deve retornar array vazio para lista vazia', () => {
      const domains = CarteiraMapper.ModelToDomainList([]);

      expect(domains).toEqual([]);
    });
  });

  describe('DomainToModel', () => {
    it('deve converter domain para model', () => {
      const domain = Carteira.carregar({
        id: 'carteira-789',
        usuarioId: 'usuario-999',
        criadoEm: new Date('2025-02-01'),
      });

      const model = CarteiraMapper.DomainToModel(domain);

      expect(model).toBeInstanceOf(CarteiraModel);
      expect(model.id).toBe('carteira-789');
      expect(model.usuarioId).toBe('usuario-999');
      expect(model.criadoEm).toEqual(new Date('2025-02-01'));
      expect(model.lancamentos).toEqual([]);
      expect(model.saldosMensais).toEqual([]);
    });

    it('deve converter domain com lançamentos', () => {
      const lancamento = Lancamento.carregar({
        id: '1',
        titulo: 'Salário',
        descricao: 'Desc',
        valor: 3000,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      const domain = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-456',
        criadoEm: new Date(),
        lancamentos: [lancamento],
      });

      const model = CarteiraMapper.DomainToModel(domain);

      expect(model.lancamentos).toHaveLength(1);
      expect(model.lancamentos[0]).toBeInstanceOf(LancamentoModel);
      expect(model.lancamentos[0].titulo).toBe('Salário');
      expect(model.lancamentos[0].carteiraId).toBe('carteira-123');
    });

    it('deve converter domain com saldos mensais', () => {
      const saldoMes = SaldoMes.carregar({
        id: '1',
        mes: 3,
        ano: 2025,
        saldoMes: 1000,
      });

      const domain = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-456',
        criadoEm: new Date(),
        saldosMensais: [saldoMes],
      });

      const model = CarteiraMapper.DomainToModel(domain);

      expect(model.saldosMensais).toHaveLength(1);
      expect(model.saldosMensais[0]).toBeInstanceOf(SaldoMensalModel);
      expect(model.saldosMensais[0].saldoMes).toBe(1000);
      expect(model.saldosMensais[0].carteiraId).toBe('carteira-123');
    });

    it('deve definir carteiraId em todos os lançamentos', () => {
      const lancamento1 = Lancamento.carregar({
        id: '1',
        titulo: 'Lanc 1',
        descricao: 'Desc',
        valor: 100,
        tipoTransacao: 'entrada',
        categoria,
        data: new Date(),
      });

      const lancamento2 = Lancamento.carregar({
        id: '2',
        titulo: 'Lanc 2',
        descricao: 'Desc',
        valor: 200,
        tipoTransacao: 'saida',
        categoria,
        data: new Date(),
      });

      const domain = Carteira.carregar({
        id: 'carteira-xyz',
        usuarioId: 'usuario-abc',
        criadoEm: new Date(),
        lancamentos: [lancamento1, lancamento2],
      });

      const model = CarteiraMapper.DomainToModel(domain);

      expect(model.lancamentos[0].carteiraId).toBe('carteira-xyz');
      expect(model.lancamentos[1].carteiraId).toBe('carteira-xyz');
    });

    it('deve definir carteiraId em todos os saldos mensais', () => {
      const saldo1 = SaldoMes.carregar({
        id: '1',
        mes: 1,
        ano: 2025,
        saldoMes: 100,
      });

      const saldo2 = SaldoMes.carregar({
        id: '2',
        mes: 2,
        ano: 2025,
        saldoMes: 200,
      });

      const domain = Carteira.carregar({
        id: 'carteira-xyz',
        usuarioId: 'usuario-abc',
        criadoEm: new Date(),
        saldosMensais: [saldo1, saldo2],
      });

      const model = CarteiraMapper.DomainToModel(domain);

      expect(model.saldosMensais[0].carteiraId).toBe('carteira-xyz');
      expect(model.saldosMensais[1].carteiraId).toBe('carteira-xyz');
    });
  });

  describe('conversão bidirecional', () => {
    it('deve manter dados após conversão model->domain->model', () => {
      const originalModel = new CarteiraModel();
      originalModel.id = 'original-id';
      originalModel.usuarioId = 'original-user';
      originalModel.criadoEm = new Date('2025-03-01');
      originalModel.lancamentos = [];
      originalModel.saldosMensais = [];

      const domain = CarteiraMapper.ModelToDomain(originalModel);
      const convertedModel = CarteiraMapper.DomainToModel(domain);

      expect(convertedModel.id).toBe(originalModel.id);
      expect(convertedModel.usuarioId).toBe(originalModel.usuarioId);
      expect(convertedModel.criadoEm).toEqual(originalModel.criadoEm);
    });
  });
});
