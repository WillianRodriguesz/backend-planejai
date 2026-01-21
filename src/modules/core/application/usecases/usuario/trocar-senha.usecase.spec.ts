import { TrocarSenhaUseCase } from './trocar-senha.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../domain/interfaces/bcrypt-hash.service';
import { Usuario } from '../../../domain/usuario';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TrocarSenhaUseCase - Application UseCase', () => {
  let useCase: TrocarSenhaUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;
  let hashService: jest.Mocked<BcryptHashService>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorId: jest.fn(),
      atualizar: jest.fn(),
    } as any;

    hashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as any;

    useCase = new TrocarSenhaUseCase(usuarioRepository, hashService);
  });

  describe('execute', () => {
    it('deve trocar senha com sucesso', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'oldHashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      hashService.compare.mockResolvedValue(true);
      hashService.hash.mockResolvedValue('newHashedPassword');
      usuarioRepository.atualizar.mockResolvedValue(undefined);

      await useCase.execute({
        id: 'usuario-123',
        senhaAtual: 'oldPassword123',
        novaSenha: 'newPassword456',
      });

      expect(usuarioRepository.buscarPorId).toHaveBeenCalledWith('usuario-123');
      expect(hashService.compare).toHaveBeenCalledWith(
        'oldPassword123',
        'oldHashedPassword',
      );
      expect(hashService.hash).toHaveBeenCalledWith('newPassword456');
      expect(usuarioRepository.atualizar).toHaveBeenCalled();
    });

    it('deve lançar HttpException quando usuário não for encontrado', async () => {
      usuarioRepository.buscarPorId.mockResolvedValue(null);

      await expect(
        useCase.execute({
          id: 'usuario-inexistente',
          senhaAtual: 'oldPassword123',
          novaSenha: 'newPassword456',
        }),
      ).rejects.toThrow(HttpException);

      await expect(
        useCase.execute({
          id: 'usuario-inexistente',
          senhaAtual: 'oldPassword123',
          novaSenha: 'newPassword456',
        }),
      ).rejects.toThrow('Usuário não encontrado');
    });

    it('deve lançar HttpException quando senha atual estiver incorreta', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      hashService.compare.mockResolvedValue(false);

      await expect(
        useCase.execute({
          id: 'usuario-123',
          senhaAtual: 'wrongPassword',
          novaSenha: 'newPassword456',
        }),
      ).rejects.toThrow(HttpException);

      await expect(
        useCase.execute({
          id: 'usuario-123',
          senhaAtual: 'wrongPassword',
          novaSenha: 'newPassword456',
        }),
      ).rejects.toThrow('Senha atual incorreta');
    });

    it('deve usar HttpStatus.UNAUTHORIZED para senha incorreta', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      hashService.compare.mockResolvedValue(false);

      try {
        await useCase.execute({
          id: 'usuario-123',
          senhaAtual: 'wrongPassword',
          novaSenha: 'newPassword456',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(
          HttpStatus.UNAUTHORIZED,
        );
      }
    });

    it('deve hashear nova senha antes de salvar', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'oldHashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      hashService.compare.mockResolvedValue(true);
      hashService.hash.mockResolvedValue('newHashedPassword123');

      await useCase.execute({
        id: 'usuario-123',
        senhaAtual: 'oldPassword',
        novaSenha: 'newPassword',
      });

      expect(hashService.hash).toHaveBeenCalledWith('newPassword');
      expect(usuarioRepository.atualizar).toHaveBeenCalledWith(
        'usuario-123',
        expect.any(Usuario),
      );
    });

    it('não deve atualizar senha se validação falhar', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      hashService.compare.mockResolvedValue(false);

      try {
        await useCase.execute({
          id: 'usuario-123',
          senhaAtual: 'wrongPassword',
          novaSenha: 'newPassword',
        });
      } catch (error) {
        // Esperado
      }

      expect(usuarioRepository.atualizar).not.toHaveBeenCalled();
    });
  });
});
