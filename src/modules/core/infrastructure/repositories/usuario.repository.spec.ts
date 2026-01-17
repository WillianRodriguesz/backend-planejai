import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRepositoryImpl } from './usuario.repository';
import { UsuarioModel } from '../models/usuario.model';
import { Usuario } from '../../domain/usuario';

describe('UsuarioRepositoryImpl - Infrastructure Repository', () => {
  let repository: UsuarioRepositoryImpl;
  let usuarioRepository: jest.Mocked<Repository<UsuarioModel>>;

  beforeEach(async () => {
    const mockRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioRepositoryImpl,
        {
          provide: getRepositoryToken(UsuarioModel),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<UsuarioRepositoryImpl>(UsuarioRepositoryImpl);
    usuarioRepository = module.get(getRepositoryToken(UsuarioModel));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('salvar', () => {
    it('deve salvar novo usuário com sucesso', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'senha123',
        telefone: '+5511999999999',
      });

      const usuarioModelSalvo = {
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'senha123',
        telefone: '+5511999999999',
      } as UsuarioModel;

      usuarioRepository.save.mockResolvedValue(usuarioModelSalvo);

      await repository.salvar(usuario);

      expect(usuarioRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: 'João Silva',
          email: 'joao@example.com',
          senha: 'senha123',
          telefone: '+5511999999999',
        }),
      );
    });

    it('deve salvar usuário com código de verificação', async () => {
      const usuario = Usuario.criar({
        nome: 'Maria Santos',
        email: 'maria@example.com',
        senha: 'senha456',
        telefone: '+5511888888888',
      });

      usuario.setCodigoVerificacao('123456');

      const usuarioModelSalvo = {
        id: 'usuario-456',
        codigoVerificacao: '123456',
      } as UsuarioModel;

      usuarioRepository.save.mockResolvedValue(usuarioModelSalvo);

      await repository.salvar(usuario);

      expect(usuarioRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          codigoVerificacao: '123456',
        }),
      );
    });

    it('deve incluir senha do usuário ao salvar', async () => {
      const usuario = Usuario.criar({
        nome: 'Pedro Costa',
        email: 'pedro@example.com',
        senha: 'senhaSegura123',
        telefone: '+5511777777777',
      });

      const usuarioModelSalvo = {
        id: 'usuario-789',
        senha: 'senhaSegura123',
      } as UsuarioModel;

      usuarioRepository.save.mockResolvedValue(usuarioModelSalvo);

      await repository.salvar(usuario);

      expect(usuarioRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          senha: 'senhaSegura123',
        }),
      );
    });

    it('deve propagar erro ao falhar ao salvar', async () => {
      const usuario = Usuario.criar({
        nome: 'Erro User',
        email: 'erro@example.com',
        senha: 'senha',
        telefone: '+5511666666666',
      });

      const erro = new Error('Database error');
      usuarioRepository.save.mockRejectedValue(erro);

      await expect(repository.salvar(usuario)).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('buscarPorId', () => {
    it('deve buscar usuário por ID com sucesso', async () => {
      const usuarioModel: Partial<UsuarioModel> = {
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        telefone: '+5511999999999',
        emailVerificado: true,
        criadoEm: new Date('2025-01-01'),
      };

      usuarioRepository.findOne.mockResolvedValue(usuarioModel as UsuarioModel);

      const resultado = await repository.buscarPorId('usuario-123');

      expect(resultado).toBeInstanceOf(Usuario);
      expect(resultado?.getId()).toBe('usuario-123');
      expect(resultado?.getNome()).toBe('João Silva');
      expect(resultado?.getEmail()).toBe('joao@example.com');
      expect(usuarioRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'usuario-123' },
      });
    });

    it('deve retornar null quando usuário não for encontrado', async () => {
      usuarioRepository.findOne.mockResolvedValue(null);

      const resultado = await repository.buscarPorId('usuario-inexistente');

      expect(resultado).toBeNull();
      expect(usuarioRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'usuario-inexistente' },
      });
    });

    it('deve buscar usuário com avatar', async () => {
      const usuarioModel: Partial<UsuarioModel> = {
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        telefone: '+5511999999999',
        avatar: 'https://example.com/avatar.jpg',
        emailVerificado: true,
        criadoEm: new Date('2025-01-01'),
      };

      usuarioRepository.findOne.mockResolvedValue(usuarioModel as UsuarioModel);

      const resultado = await repository.buscarPorId('usuario-123');

      expect(resultado?.getAvatar()).toBe('https://example.com/avatar.jpg');
    });

    it('deve propagar erro ao falhar busca', async () => {
      const erro = new Error('Database error');
      usuarioRepository.findOne.mockRejectedValue(erro);

      await expect(repository.buscarPorId('usuario-123')).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('buscarPorEmail', () => {
    it('deve buscar usuário por email com sucesso', async () => {
      const usuarioModel: Partial<UsuarioModel> = {
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        telefone: '+5511999999999',
        emailVerificado: true,
        criadoEm: new Date('2025-01-01'),
      };

      usuarioRepository.findOne.mockResolvedValue(usuarioModel as UsuarioModel);

      const resultado = await repository.buscarPorEmail('joao@example.com');

      expect(resultado).toBeInstanceOf(Usuario);
      expect(resultado?.getEmail()).toBe('joao@example.com');
      expect(usuarioRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'joao@example.com' },
      });
    });

    it('deve retornar null quando usuário não for encontrado', async () => {
      usuarioRepository.findOne.mockResolvedValue(null);

      const resultado = await repository.buscarPorEmail(
        'inexistente@example.com',
      );

      expect(resultado).toBeNull();
    });

    it('deve buscar email com letras maiúsculas', async () => {
      const usuarioModel: Partial<UsuarioModel> = {
        id: 'usuario-123',
        email: 'JOAO@EXAMPLE.COM',
        nome: 'João',
        senha: 'hash',
        telefone: '+5511999999999',
        emailVerificado: true,
        criadoEm: new Date(),
      };

      usuarioRepository.findOne.mockResolvedValue(usuarioModel as UsuarioModel);

      const resultado = await repository.buscarPorEmail('JOAO@EXAMPLE.COM');

      expect(resultado).not.toBeNull();
      expect(usuarioRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'JOAO@EXAMPLE.COM' },
      });
    });
  });

  describe('buscarPorTokenRedefinicao', () => {
    it('deve buscar usuário por token de redefinição', async () => {
      const usuarioModel: Partial<UsuarioModel> = {
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        telefone: '+5511999999999',
        tokenRedefinicaoSenha: 'tokenHash123',
        emailVerificado: true,
        criadoEm: new Date('2025-01-01'),
      };

      usuarioRepository.findOne.mockResolvedValue(usuarioModel as UsuarioModel);

      const resultado =
        await repository.buscarPorTokenRedefinicao('tokenHash123');

      expect(resultado).toBeInstanceOf(Usuario);
      expect(resultado?.getId()).toBe('usuario-123');
      expect(usuarioRepository.findOne).toHaveBeenCalledWith({
        where: { tokenRedefinicaoSenha: 'tokenHash123' },
      });
    });

    it('deve retornar null quando token não existir', async () => {
      usuarioRepository.findOne.mockResolvedValue(null);

      const resultado =
        await repository.buscarPorTokenRedefinicao('tokenInexistente');

      expect(resultado).toBeNull();
    });
  });

  describe('buscarTodos', () => {
    it('deve buscar todos os usuários', async () => {
      const usuariosModel: Partial<UsuarioModel>[] = [
        {
          id: 'usuario-1',
          nome: 'João',
          email: 'joao@example.com',
          senha: 'hash1',
          telefone: '+5511999999999',
          emailVerificado: true,
          criadoEm: new Date(),
        },
        {
          id: 'usuario-2',
          nome: 'Maria',
          email: 'maria@example.com',
          senha: 'hash2',
          telefone: '+5511888888888',
          emailVerificado: true,
          criadoEm: new Date(),
        },
      ];

      usuarioRepository.find.mockResolvedValue(usuariosModel as UsuarioModel[]);

      const resultado = await repository.buscarTodos();

      expect(resultado).toHaveLength(2);
      expect(resultado[0]).toBeInstanceOf(Usuario);
      expect(resultado[1]).toBeInstanceOf(Usuario);
      expect(usuarioRepository.find).toHaveBeenCalled();
    });

    it('deve retornar array vazio quando não houver usuários', async () => {
      usuarioRepository.find.mockResolvedValue([]);

      const resultado = await repository.buscarTodos();

      expect(resultado).toEqual([]);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar usuário parcialmente', async () => {
      const usuarioParcial = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva Atualizado',
        email: 'joao@example.com',
        senha: 'hashedpassword123',
        criadoEm: new Date(),
        telefone: '+5511999999999',
        emailVerificado: true,
      });

      await repository.atualizar('usuario-123', usuarioParcial);

      expect(usuarioRepository.update).toHaveBeenCalledWith(
        'usuario-123',
        expect.objectContaining({
          nome: 'João Silva Atualizado',
        }),
      );
    });

    it('deve incluir senha na atualização se fornecida', async () => {
      const usuarioComSenha = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João',
        email: 'joao@example.com',
        senha: 'hashedpassword123',
        criadoEm: new Date(),
        telefone: '+5511999999999',
        emailVerificado: true,
      });

      // Simulando que o usuário tem método getSenha
      (usuarioComSenha as any).senha = 'novaSenha123';
      usuarioComSenha.getSenha = jest.fn().mockReturnValue('novaSenha123');

      await repository.atualizar('usuario-123', usuarioComSenha);

      expect(usuarioRepository.update).toHaveBeenCalledWith(
        'usuario-123',
        expect.objectContaining({
          senha: 'novaSenha123',
        }),
      );
    });

    it('deve atualizar avatar do usuário', async () => {
      const usuarioComAvatar = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João',
        email: 'joao@example.com',
        senha: 'hashedpassword123',
        criadoEm: new Date(),
        telefone: '+5511999999999',
        avatar: 'https://example.com/new-avatar.jpg',
        emailVerificado: true,
      });

      await repository.atualizar('usuario-123', usuarioComAvatar);

      expect(usuarioRepository.update).toHaveBeenCalledWith(
        'usuario-123',
        expect.objectContaining({
          avatar: 'https://example.com/new-avatar.jpg',
        }),
      );
    });

    it('deve propagar erro ao falhar atualização', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João',
        email: 'joao@example.com',
        senha: 'hashedpassword123',
        criadoEm: new Date(),
        telefone: '+5511999999999',
        emailVerificado: true,
      });

      const erro = new Error('Database error');
      usuarioRepository.update.mockRejectedValue(erro);

      await expect(
        repository.atualizar('usuario-123', usuario),
      ).rejects.toThrow('Database error');
    });
  });

  describe('deletar', () => {
    it('deve deletar usuário por ID', async () => {
      await repository.deletar('usuario-123');

      expect(usuarioRepository.delete).toHaveBeenCalledWith('usuario-123');
    });

    it('deve propagar erro ao falhar deleção', async () => {
      const erro = new Error('Database error');
      usuarioRepository.delete.mockRejectedValue(erro);

      await expect(repository.deletar('usuario-123')).rejects.toThrow(
        'Database error',
      );
    });

    it('deve deletar múltiplos usuários sequencialmente', async () => {
      await repository.deletar('usuario-1');
      await repository.deletar('usuario-2');
      await repository.deletar('usuario-3');

      expect(usuarioRepository.delete).toHaveBeenCalledTimes(3);
      expect(usuarioRepository.delete).toHaveBeenCalledWith('usuario-1');
      expect(usuarioRepository.delete).toHaveBeenCalledWith('usuario-2');
      expect(usuarioRepository.delete).toHaveBeenCalledWith('usuario-3');
    });
  });
});
