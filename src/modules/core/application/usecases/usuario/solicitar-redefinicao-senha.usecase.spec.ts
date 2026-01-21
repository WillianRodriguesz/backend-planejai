import { SolicitarRedefinicaoSenhaUseCase } from './solicitar-redefinicao-senha.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { EmailService } from '../../../domain/interfaces/email.service';
import { TokenService } from '../../../domain/interfaces/token.service';
import { Usuario } from '../../../domain/usuario';

describe('SolicitarRedefinicaoSenhaUseCase - Application UseCase', () => {
  let useCase: SolicitarRedefinicaoSenhaUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;
  let emailService: jest.Mocked<EmailService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorEmail: jest.fn(),
      atualizar: jest.fn(),
    } as any;

    emailService = {
      enviarTokenRedefinicaoSenha: jest.fn(),
    } as any;

    tokenService = {
      gerarToken: jest.fn(),
    } as any;

    useCase = new SolicitarRedefinicaoSenhaUseCase(
      usuarioRepository,
      emailService,
      tokenService,
    );
  });

  describe('execute', () => {
    it('deve solicitar redefinição de senha com sucesso', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
      tokenService.gerarToken.mockReturnValue({
        token: 'reset-token',
        tokenHash: 'reset-token-hash',
      });
      usuarioRepository.atualizar.mockResolvedValue(undefined);
      emailService.enviarTokenRedefinicaoSenha.mockResolvedValue(undefined);

      const resultado = await useCase.execute({
        email: 'joao@example.com',
      });

      expect(resultado).toHaveProperty('message');
      expect(resultado.message).toContain('Se o email existir');
      expect(tokenService.gerarToken).toHaveBeenCalled();
      expect(usuarioRepository.atualizar).toHaveBeenCalled();
      expect(emailService.enviarTokenRedefinicaoSenha).toHaveBeenCalledWith(
        'joao@example.com',
        'reset-token',
      );
    });

    it('deve retornar mensagem genérica quando usuário não for encontrado', async () => {
      usuarioRepository.buscarPorEmail.mockResolvedValue(null);

      const resultado = await useCase.execute({
        email: 'inexistente@example.com',
      });

      expect(resultado.message).toContain('Se o email existir');
      expect(emailService.enviarTokenRedefinicaoSenha).not.toHaveBeenCalled();
    });

    it('deve lançar erro quando email não estiver verificado', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: false,
      });

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);

      await expect(
        useCase.execute({
          email: 'joao@example.com',
        }),
      ).rejects.toThrow('Email não verificado');
    });

    it('deve definir token de redefinição no usuário', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      const setTokenSpy = jest.spyOn(usuario, 'setTokenRedefinicaoSenha');

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
      tokenService.gerarToken.mockReturnValue({
        token: 'reset-token',
        tokenHash: 'reset-token-hash',
      });

      await useCase.execute({
        email: 'joao@example.com',
      });

      expect(setTokenSpy).toHaveBeenCalledWith('reset-token-hash');
    });

    it('deve enviar email com token correto', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
      tokenService.gerarToken.mockReturnValue({
        token: 'generated-token-123',
        tokenHash: 'generated-token-hash',
      });

      await useCase.execute({
        email: 'joao@example.com',
      });

      expect(emailService.enviarTokenRedefinicaoSenha).toHaveBeenCalledWith(
        'joao@example.com',
        'generated-token-123',
      );
    });
  });
});
