import { LoginUsuarioUseCase } from './login-usuario.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../domain/interfaces/bcrypt-hash.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../../../domain/usuario';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('LoginUsuarioUseCase', () => {
  let useCase: LoginUsuarioUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;
  let hashService: jest.Mocked<BcryptHashService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorEmail: jest.fn(),
    } as any;

    hashService = {
      compare: jest.fn(),
    } as any;

    jwtService = {
      sign: jest.fn(),
    } as any;

    useCase = new LoginUsuarioUseCase(
      usuarioRepository,
      hashService,
      jwtService,
      {} as any, // Mock cacheManager
    );
  });

  describe('execute', () => {
    const loginProps = {
      email: 'joao@example.com',
      senha: 'Senha123!',
    };

    it('deve fazer login com credenciais válidas', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: loginProps.email,
        senha: 'hashedPassword',
      });
      usuario.verificarEmail = jest.fn();
      (usuario as any).emailVerificado = true;

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
      hashService.compare.mockResolvedValue(true);
      jwtService.sign.mockReturnValue('jwt-token-123');

      const resultado = await useCase.execute(loginProps);

      expect(usuarioRepository.buscarPorEmail).toHaveBeenCalledWith(
        loginProps.email,
      );
      expect(hashService.compare).toHaveBeenCalledWith(
        loginProps.senha,
        usuario.getSenha(),
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: usuario.getId(),
        email: usuario.getEmail(),
      });
      expect(resultado.token).toBe('jwt-token-123');
    });

    it('deve lançar erro se usuário não existir', async () => {
      usuarioRepository.buscarPorEmail.mockResolvedValue(null);

      await expect(useCase.execute(loginProps)).rejects.toThrow(
        new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED),
      );

      expect(hashService.compare).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('deve lançar erro se senha estiver incorreta', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: loginProps.email,
        senha: 'hashedPassword',
      });

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
      hashService.compare.mockResolvedValue(false);

      await expect(useCase.execute(loginProps)).rejects.toThrow(
        new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED),
      );

      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('deve lançar erro se email não estiver verificado', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: loginProps.email,
        senha: 'hashedPassword',
      });
      // Email não verificado (padrão é false)

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
      hashService.compare.mockResolvedValue(true);

      await expect(useCase.execute(loginProps)).rejects.toThrow(
        new HttpException(
          'Email não verificado. Verifique seu email antes de fazer login.',
          HttpStatus.UNAUTHORIZED,
        ),
      );

      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('deve gerar token JWT com payload correto', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: loginProps.email,
        senha: 'hashedPassword',
      });
      (usuario as any).emailVerificado = true;
      (usuario as any).id = 'user-123';

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
      hashService.compare.mockResolvedValue(true);
      jwtService.sign.mockReturnValue('jwt-token-123');

      await useCase.execute(loginProps);

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'user-123',
        email: loginProps.email,
      });
    });
  });
});
