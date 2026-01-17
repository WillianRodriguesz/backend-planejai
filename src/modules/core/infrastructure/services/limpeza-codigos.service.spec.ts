import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LimpezaCodigosService } from './limpeza-codigos.service';
import { UsuarioModel } from '../models/usuario.model';

describe('LimpezaCodigosService - Infrastructure Service', () => {
  let service: LimpezaCodigosService;
  let usuarioRepository: jest.Mocked<Repository<UsuarioModel>>;

  beforeEach(async () => {
    const mockQueryBuilder: any = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
      delete: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({ affected: 0 }),
    };

    const mockRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LimpezaCodigosService,
        {
          provide: getRepositoryToken(UsuarioModel),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LimpezaCodigosService>(LimpezaCodigosService);
    usuarioRepository = module.get(getRepositoryToken(UsuarioModel));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('limparCodigosExpirados', () => {
    it('deve buscar usuários com códigos expirados', async () => {
      const mockQueryBuilder = usuarioRepository.createQueryBuilder();

      await service.limparCodigosExpirados();

      expect(usuarioRepository.createQueryBuilder).toHaveBeenCalledWith(
        'usuario',
      );
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'usuario.expiracao_codigo IS NOT NULL',
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'usuario.expiracao_codigo < :now',
        expect.objectContaining({ now: expect.any(Date) }),
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'usuario.email_verificado = false',
      );
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });

    it('deve deletar usuários quando houver códigos expirados', async () => {
      const usuariosExpirados = [
        { id: 'user1', email: 'user1@example.com' },
        { id: 'user2', email: 'user2@example.com' },
      ] as UsuarioModel[];

      const mockQueryBuilder: any = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(usuariosExpirados),
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ affected: 2 }),
      };

      (usuarioRepository.createQueryBuilder as jest.Mock).mockReturnValue(
        mockQueryBuilder,
      );

      await service.limparCodigosExpirados();

      expect(mockQueryBuilder.delete).toHaveBeenCalled();
      expect(mockQueryBuilder.from).toHaveBeenCalledWith(UsuarioModel);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('id IN (:...ids)', {
        ids: ['user1', 'user2'],
      });
      expect(mockQueryBuilder.execute).toHaveBeenCalled();
    });

    it('não deve deletar quando não houver usuários expirados', async () => {
      const mockQueryBuilder: any = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        execute: jest.fn(),
      };

      (usuarioRepository.createQueryBuilder as jest.Mock).mockReturnValue(
        mockQueryBuilder,
      );

      await service.limparCodigosExpirados();

      expect(mockQueryBuilder.delete).not.toHaveBeenCalled();
      expect(mockQueryBuilder.execute).not.toHaveBeenCalled();
    });

    it('deve logar quantidade de usuários deletados', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const usuariosExpirados = [
        { id: 'user1' },
        { id: 'user2' },
        { id: 'user3' },
      ] as UsuarioModel[];

      const mockQueryBuilder: any = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(usuariosExpirados),
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ affected: 3 }),
      };

      (usuarioRepository.createQueryBuilder as jest.Mock).mockReturnValue(
        mockQueryBuilder,
      );

      await service.limparCodigosExpirados();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Deletados 3 usuários com códigos expirados',
      );

      consoleSpy.mockRestore();
    });

    it('deve usar data atual na query', async () => {
      const mockQueryBuilder = usuarioRepository.createQueryBuilder();

      await service.limparCodigosExpirados();

      const andWhereCall = (mockQueryBuilder.andWhere as jest.Mock).mock
        .calls[0];
      expect(andWhereCall[0]).toBe('usuario.expiracao_codigo < :now');
      expect(andWhereCall[1].now).toBeInstanceOf(Date);
    });

    it('deve buscar apenas usuários com email não verificado', async () => {
      const mockQueryBuilder = usuarioRepository.createQueryBuilder();

      await service.limparCodigosExpirados();

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'usuario.email_verificado = false',
      );
    });

    it('deve buscar apenas usuários com expiracao_codigo definida', async () => {
      const mockQueryBuilder = usuarioRepository.createQueryBuilder();

      await service.limparCodigosExpirados();

      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'usuario.expiracao_codigo IS NOT NULL',
      );
    });

    it('deve extrair ids corretamente dos usuários', async () => {
      const usuariosExpirados = [
        { id: 'id-abc', email: 'user1@example.com' },
        { id: 'id-def', email: 'user2@example.com' },
        { id: 'id-ghi', email: 'user3@example.com' },
      ] as UsuarioModel[];

      const mockQueryBuilder: any = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(usuariosExpirados),
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ affected: 3 }),
      };

      (usuarioRepository.createQueryBuilder as jest.Mock).mockReturnValue(
        mockQueryBuilder,
      );

      await service.limparCodigosExpirados();

      const deleteWhereCall = (mockQueryBuilder.where as jest.Mock).mock
        .calls[1];
      expect(deleteWhereCall[1]).toEqual({
        ids: ['id-abc', 'id-def', 'id-ghi'],
      });
    });
  });
});
