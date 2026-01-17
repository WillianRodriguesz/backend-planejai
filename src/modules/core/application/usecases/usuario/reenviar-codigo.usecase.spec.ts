import { ReenviarCodigoUseCase } from './reenviar-codigo.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { EmailService } from '../../../domain/interfaces/email.service';
import { Usuario } from '../../../domain/usuario';

describe('ReenviarCodigoUseCase - Application UseCase', () => {
  let useCase: ReenviarCodigoUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;
  let emailService: jest.Mocked<EmailService>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorEmail: jest.fn(),
      atualizar: jest.fn(),
    } as any;

    emailService = {
      enviarCodigoVerificacao: jest.fn(),
    } as any;

    useCase = new ReenviarCodigoUseCase(usuarioRepository, emailService);
  });

  describe('execute', () => {
    it('deve reenviar código com sucesso', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: false,
      });

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
      usuarioRepository.atualizar.mockResolvedValue(undefined);
      emailService.enviarCodigoVerificacao.mockResolvedValue(undefined);

      const resultado = await useCase.execute({
        email: 'joao@example.com',
      });

      expect(resultado).toHaveProperty(
        'message',
        'Código reenviado com sucesso',
      );
      expect(usuarioRepository.buscarPorEmail).toHaveBeenCalledWith(
        'joao@example.com',
      );
      expect(usuarioRepository.atualizar).toHaveBeenCalled();
      expect(emailService.enviarCodigoVerificacao).toHaveBeenCalled();
    });

    it('deve lançar erro quando usuário não for encontrado', async () => {
      usuarioRepository.buscarPorEmail.mockResolvedValue(null);

      await expect(
        useCase.execute({
          email: 'inexistente@example.com',
        }),
      ).rejects.toThrow('Usuário não encontrado');
    });

    it('deve lançar erro quando email já estiver verificado', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);

      await expect(
        useCase.execute({
          email: 'joao@example.com',
        }),
      ).rejects.toThrow('Email já verificado');
    });

    it('deve gerar novo código de verificação', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: false,
        codigoVerificacao: 'OLD123',
      });

      const setCodigoSpy = jest.spyOn(usuario, 'setCodigoVerificacao');

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);

      await useCase.execute({
        email: 'joao@example.com',
      });

      expect(setCodigoSpy).toHaveBeenCalled();
      const novoCodigo = setCodigoSpy.mock.calls[0][0];
      expect(novoCodigo).toHaveLength(6);
      expect(novoCodigo).toMatch(/^[A-Z0-9]{6}$/);
    });

    it('deve enviar email com novo código', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: false,
      });

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);

      await useCase.execute({
        email: 'joao@example.com',
      });

      expect(emailService.enviarCodigoVerificacao).toHaveBeenCalledWith(
        'joao@example.com',
        expect.any(String),
      );
    });
  });
});
