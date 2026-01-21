import { UsuarioMapper } from './usuario.mapper';
import { Usuario } from '../../domain/usuario';
import { UsuarioModel } from '../models/usuario.model';

describe('UsuarioMapper - Infrastructure Mapper', () => {
  describe('ModelToDomain', () => {
    it('deve converter model para domain com todos os campos', () => {
      const model = new UsuarioModel();
      model.id = 'usuario-123';
      model.nome = 'João Silva';
      model.email = 'joao@example.com';
      model.senha = 'hashedPassword';
      model.criadoEm = new Date('2025-01-01');
      model.telefone = '11999999999';
      model.avatar = 'https://avatar.url';
      model.emailVerificado = true;
      model.codigoVerificacao = 'ABC123';
      model.expiracaoCodigo = new Date('2025-01-02');
      model.tokenRedefinicaoSenha = 'token123';
      model.expiracaoToken = new Date('2025-01-03');

      const domain = UsuarioMapper.ModelToDomain(model);

      expect(domain).toBeInstanceOf(Usuario);
      expect(domain.getId()).toBe('usuario-123');
      expect(domain.getNome()).toBe('João Silva');
      expect(domain.getEmail()).toBe('joao@example.com');
      expect(domain.getSenha()).toBe('hashedPassword');
      expect(domain.getCriadoEm()).toEqual(new Date('2025-01-01'));
      expect(domain.getTelefone()).toBe('11999999999');
      expect(domain.getAvatar()).toBe('https://avatar.url');
      expect(domain.getEmailVerificado()).toBe(true);
      expect(domain.getCodigoVerificacao()).toBe('ABC123');
      expect(domain.getExpiracaoCodigo()).toEqual(new Date('2025-01-02'));
      expect(domain.getTokenRedefinicaoSenha()).toBe('token123');
      expect(domain.getExpiracaoToken()).toEqual(new Date('2025-01-03'));
    });

    it('deve converter model com campos opcionais undefined', () => {
      const model = new UsuarioModel();
      model.id = 'usuario-456';
      model.nome = 'Maria';
      model.email = 'maria@example.com';
      model.senha = 'hash';
      model.criadoEm = new Date();
      model.emailVerificado = false;

      const domain = UsuarioMapper.ModelToDomain(model);

      expect(domain.getTelefone()).toBeUndefined();
      expect(domain.getAvatar()).toBeUndefined();
      expect(domain.getCodigoVerificacao()).toBeUndefined();
      expect(domain.getExpiracaoCodigo()).toBeUndefined();
      expect(domain.getTokenRedefinicaoSenha()).toBeUndefined();
      expect(domain.getExpiracaoToken()).toBeUndefined();
    });
  });

  describe('ModelToDomainList', () => {
    it('deve converter lista de models para lista de domains', () => {
      const model1 = new UsuarioModel();
      model1.id = 'user-1';
      model1.nome = 'Usuario 1';
      model1.email = 'user1@example.com';
      model1.senha = 'hash1';
      model1.criadoEm = new Date();
      model1.emailVerificado = true;

      const model2 = new UsuarioModel();
      model2.id = 'user-2';
      model2.nome = 'Usuario 2';
      model2.email = 'user2@example.com';
      model2.senha = 'hash2';
      model2.criadoEm = new Date();
      model2.emailVerificado = false;

      const domains = UsuarioMapper.ModelToDomainList([model1, model2]);

      expect(domains).toHaveLength(2);
      expect(domains[0]).toBeInstanceOf(Usuario);
      expect(domains[1]).toBeInstanceOf(Usuario);
      expect(domains[0].getId()).toBe('user-1');
      expect(domains[1].getId()).toBe('user-2');
    });

    it('deve retornar array vazio para lista vazia', () => {
      const domains = UsuarioMapper.ModelToDomainList([]);

      expect(domains).toEqual([]);
    });
  });

  describe('DomainToModel', () => {
    it('deve converter domain para model parcial com todos os campos', () => {
      const domain = Usuario.carregar({
        id: 'usuario-789',
        nome: 'Pedro Santos',
        email: 'pedro@example.com',
        senha: 'hashedPass',
        criadoEm: new Date('2025-02-01'),
        telefone: '11988888888',
        avatar: 'https://avatar2.url',
        emailVerificado: true,
        codigoVerificacao: 'XYZ789',
        expiracaoCodigo: new Date('2025-02-02'),
        tokenRedefinicaoSenha: 'token789',
        expiracaoToken: new Date('2025-02-03'),
      });

      const model = UsuarioMapper.DomainToModel(domain);

      expect(model.id).toBe('usuario-789');
      expect(model.nome).toBe('Pedro Santos');
      expect(model.email).toBe('pedro@example.com');
      expect(model.senha).toBe('hashedPass');
      expect(model.criadoEm).toEqual(new Date('2025-02-01'));
      expect(model.telefone).toBe('11988888888');
      expect(model.avatar).toBe('https://avatar2.url');
      expect(model.emailVerificado).toBe(true);
      expect(model.codigoVerificacao).toBe('XYZ789');
      expect(model.expiracaoCodigo).toEqual(new Date('2025-02-02'));
      expect(model.tokenRedefinicaoSenha).toBe('token789');
      expect(model.expiracaoToken).toEqual(new Date('2025-02-03'));
    });

    it('deve converter domain criado sem id', () => {
      const domain = Usuario.criar({
        nome: 'Novo Usuario',
        email: 'novo@example.com',
        senha: 'senha123',
      });

      const model = UsuarioMapper.DomainToModel(domain);

      expect(model.id).toBeUndefined();
      expect(model.nome).toBe('Novo Usuario');
      expect(model.email).toBe('novo@example.com');
    });

    it('deve retornar Partial<UsuarioModel>', () => {
      const domain = Usuario.carregar({
        id: 'test-id',
        nome: 'Test',
        email: 'test@example.com',
        senha: 'hash',
        criadoEm: new Date(),
        emailVerificado: false,
      });

      const model = UsuarioMapper.DomainToModel(domain);

      // Model é Partial, então pode ter propriedades undefined
      expect(model).toBeDefined();
      expect(model.id).toBe('test-id');
    });
  });

  describe('DomainToModelList', () => {
    it('deve converter lista de domains para lista de models parciais', () => {
      const domain1 = Usuario.carregar({
        id: 'dom-1',
        nome: 'Dom 1',
        email: 'dom1@example.com',
        senha: 'hash1',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      const domain2 = Usuario.carregar({
        id: 'dom-2',
        nome: 'Dom 2',
        email: 'dom2@example.com',
        senha: 'hash2',
        criadoEm: new Date(),
        emailVerificado: false,
      });

      const models = UsuarioMapper.DomainToModelList([domain1, domain2]);

      expect(models).toHaveLength(2);
      expect(models[0].id).toBe('dom-1');
      expect(models[1].id).toBe('dom-2');
    });

    it('deve retornar array vazio para lista vazia', () => {
      const models = UsuarioMapper.DomainToModelList([]);

      expect(models).toEqual([]);
    });
  });

  describe('conversão bidirecional', () => {
    it('deve manter dados após conversão model->domain->model', () => {
      const originalModel = new UsuarioModel();
      originalModel.id = 'original-id';
      originalModel.nome = 'Original User';
      originalModel.email = 'original@example.com';
      originalModel.senha = 'originalHash';
      originalModel.criadoEm = new Date('2025-03-01');
      originalModel.telefone = '11977777777';
      originalModel.emailVerificado = true;

      const domain = UsuarioMapper.ModelToDomain(originalModel);
      const convertedModel = UsuarioMapper.DomainToModel(domain);

      expect(convertedModel.id).toBe(originalModel.id);
      expect(convertedModel.nome).toBe(originalModel.nome);
      expect(convertedModel.email).toBe(originalModel.email);
      expect(convertedModel.senha).toBe(originalModel.senha);
      expect(convertedModel.criadoEm).toEqual(originalModel.criadoEm);
      expect(convertedModel.telefone).toBe(originalModel.telefone);
      expect(convertedModel.emailVerificado).toBe(
        originalModel.emailVerificado,
      );
    });
  });
});
