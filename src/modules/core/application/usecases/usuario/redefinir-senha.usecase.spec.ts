import { RedefinirSenhaUseCase } from './redefinir-senha.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../domain/interfaces/bcrypt-hash.service';
import { TokenService } from '../../../domain/interfaces/token.service';
import { Usuario } from '../../../domain/usuario';

describe('RedefinirSenhaUseCase - Application UseCase', () => {
  let useCase: RedefinirSenhaUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;
  let hashService: jest.Mocked<BcryptHashService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorTokenRedefinicao: jest.fn(),
      atualizar: jest.fn(),
    } as any;

    hashService = {
      hash: jest.fn(),
    } as any;

    tokenService = {
      validarFormatoToken: jest.fn(),
      tokenExpirado: jest.fn(),
    } as any;

    useCase = new RedefinirSenhaUseCase(
      usuarioRepository,
      hashService,
      tokenService,
    );
  });

  describe('execute', () => {
    it('deve redefinir senha com sucesso', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'oldHashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
        tokenRedefinicaoSenha: 'token-hash',
        expiracaoToken: new Date(Date.now() + 3600000),
      });

      tokenService.validarFormatoToken.mockReturnValue('token-hash');
      usuarioRepository.buscarPorTokenRedefinicao.mockResolvedValue(usuario);
      tokenService.tokenExpirado.mockReturnValue(false);
      hashService.hash.mockResolvedValue('newHashedPassword');
      usuarioRepository.atualizar.mockResolvedValue(undefined);

      const resultado = await useCase.execute({
        token: 'valid-token',
        novaSenha: 'newPassword123',
      });

      expect(resultado).toHaveProperty('id', 'usuario-123');
      expect(tokenService.validarFormatoToken).toHaveBeenCalledWith(
        'valid-token',
      );
      expect(hashService.hash).toHaveBeenCalledWith('newPassword123');
      expect(usuarioRepository.atualizar).toHaveBeenCalled();
    });

    it('deve lançar erro quando token for inválido', async () => {
      tokenService.validarFormatoToken.mockReturnValue(null);

      await expect(
        useCase.execute({
          token: 'invalid-token',
          novaSenha: 'newPassword123',
        }),
      ).rejects.toThrow('Token inválido ou expirado');
    });

    it('deve lançar erro quando usuário não for encontrado com token', async () => {
      tokenService.validarFormatoToken.mockReturnValue('token-hash');
      usuarioRepository.buscarPorTokenRedefinicao.mockResolvedValue(null);

      await expect(
        useCase.execute({
          token: 'valid-token',
          novaSenha: 'newPassword123',
        }),
      ).rejects.toThrow('Token inválido ou expirado');
    });

    it('deve lançar erro quando token estiver expirado', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'oldHashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
        tokenRedefinicaoSenha: 'token-hash',
        expiracaoToken: new Date(Date.now() - 1000),
      });

      tokenService.validarFormatoToken.mockReturnValue('token-hash');
      usuarioRepository.buscarPorTokenRedefinicao.mockResolvedValue(usuario);
      tokenService.tokenExpirado.mockReturnValue(true);

      await expect(
        useCase.execute({
          token: 'expired-token',
          novaSenha: 'newPassword123',
        }),
      ).rejects.toThrow('Token inválido ou expirado');
    });

    it('deve chamar atualizarSenha no domínio', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'oldHashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
        tokenRedefinicaoSenha: 'token-hash',
        expiracaoToken: new Date(Date.now() + 3600000),
      });

      const atualizarSenhaSpy = jest.spyOn(usuario, 'atualizarSenha');

      tokenService.validarFormatoToken.mockReturnValue('token-hash');
      usuarioRepository.buscarPorTokenRedefinicao.mockResolvedValue(usuario);
      tokenService.tokenExpirado.mockReturnValue(false);
      hashService.hash.mockResolvedValue('newHashedPassword');

      await useCase.execute({
        token: 'valid-token',
        novaSenha: 'newPassword123',
      });

      expect(atualizarSenhaSpy).toHaveBeenCalledWith('newHashedPassword');
    });
  });
});
