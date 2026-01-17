import { Test, TestingModule } from '@nestjs/testing';
import { EmailServiceImpl } from './email.service';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('EmailServiceImpl - Infrastructure Service', () => {
  let service: EmailServiceImpl;
  let mockTransporter: any;
  let nodemailerMock: jest.Mocked<typeof nodemailer>;

  beforeEach(async () => {
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
    };

    nodemailerMock = nodemailer as jest.Mocked<typeof nodemailer>;
    nodemailerMock.createTransport = jest.fn().mockReturnValue(mockTransporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailServiceImpl],
    }).compile();

    service = module.get<EmailServiceImpl>(EmailServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('enviarCodigoVerificacao', () => {
    it('deve enviar email de verificação com sucesso', async () => {
      const email = 'teste@example.com';
      const codigo = 'ABC123';

      await service.enviarCodigoVerificacao(email, codigo);

      expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: email,
          subject: 'Código de Verificação - Planejai',
        }),
      );
    });

    it('deve incluir código no email', async () => {
      const email = 'teste@example.com';
      const codigo = 'XYZ789';

      await service.enviarCodigoVerificacao(email, codigo);

      const callArgs = mockTransporter.sendMail.mock.calls[0][0];
      expect(callArgs.text).toContain(codigo);
      expect(callArgs.html).toContain(codigo);
    });

    it('deve incluir from e subject corretos', async () => {
      process.env.GMAIL_USER = 'noreply@planejai.com';
      const email = 'teste@example.com';
      const codigo = 'TEST123';

      await service.enviarCodigoVerificacao(email, codigo);

      const callArgs = mockTransporter.sendMail.mock.calls[0][0];
      expect(callArgs.from).toBe(process.env.GMAIL_USER);
      expect(callArgs.subject).toBe('Código de Verificação - Planejai');
    });

    it('deve lançar erro quando falhar ao enviar email', async () => {
      mockTransporter.sendMail.mockRejectedValue(new Error('SMTP error'));

      await expect(
        service.enviarCodigoVerificacao('teste@example.com', 'CODE'),
      ).rejects.toThrow('Falha ao enviar email de verificação');
    });

    it('deve logar sucesso ao enviar email', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const email = 'teste@example.com';

      await service.enviarCodigoVerificacao(email, 'CODE123');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Código de verificação enviado para ${email}`),
      );

      consoleSpy.mockRestore();
    });

    it('deve logar erro quando falhar', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockTransporter.sendMail.mockRejectedValue(new Error('Network error'));

      try {
        await service.enviarCodigoVerificacao('teste@example.com', 'CODE');
      } catch (error) {
        // Esperado
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao enviar email:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });

    it('deve incluir informação de expiração no email', async () => {
      await service.enviarCodigoVerificacao('teste@example.com', 'CODE123');

      const callArgs = mockTransporter.sendMail.mock.calls[0][0];
      expect(callArgs.text).toContain('15 minutos');
      expect(callArgs.html).toContain('15 minutos');
    });
  });

  describe('enviarTokenRedefinicaoSenha', () => {
    beforeEach(() => {
      process.env.FRONTEND_URL = 'https://planejai.com';
    });

    it('deve enviar email de redefinição com sucesso', async () => {
      const email = 'teste@example.com';
      const token = 'a'.repeat(64);

      await service.enviarTokenRedefinicaoSenha(email, token);

      expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: email,
          subject: 'Redefinição de Senha - Planejai',
        }),
      );
    });

    it('deve incluir link de redefinição no email', async () => {
      const email = 'teste@example.com';
      const token = 'token123';
      const expectedUrl = `${process.env.FRONTEND_URL}/redefinir-senha?token=${token}`;

      await service.enviarTokenRedefinicaoSenha(email, token);

      const callArgs = mockTransporter.sendMail.mock.calls[0][0];
      expect(callArgs.text).toContain(expectedUrl);
      expect(callArgs.html).toContain(expectedUrl);
    });

    it('deve incluir from e subject corretos', async () => {
      process.env.GMAIL_USER = 'noreply@planejai.com';
      const email = 'teste@example.com';
      const token = 'token456';

      await service.enviarTokenRedefinicaoSenha(email, token);

      const callArgs = mockTransporter.sendMail.mock.calls[0][0];
      expect(callArgs.from).toBe(process.env.GMAIL_USER);
      expect(callArgs.subject).toBe('Redefinição de Senha - Planejai');
    });

    it('deve lançar erro quando falhar ao enviar email', async () => {
      mockTransporter.sendMail.mockRejectedValue(new Error('SMTP error'));

      await expect(
        service.enviarTokenRedefinicaoSenha('teste@example.com', 'token'),
      ).rejects.toThrow('Falha ao enviar email de redefinição de senha');
    });

    it('deve logar sucesso ao enviar email', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const email = 'teste@example.com';

      await service.enviarTokenRedefinicaoSenha(email, 'token123');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `Link de redefinição de senha enviado para ${email}`,
        ),
      );

      consoleSpy.mockRestore();
    });

    it('deve logar erro quando falhar', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockTransporter.sendMail.mockRejectedValue(new Error('Connection error'));

      try {
        await service.enviarTokenRedefinicaoSenha('teste@example.com', 'token');
      } catch (error) {
        // Esperado
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao enviar email:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });

    it('deve incluir informação de expiração no email', async () => {
      await service.enviarTokenRedefinicaoSenha(
        'teste@example.com',
        'token123',
      );

      const callArgs = mockTransporter.sendMail.mock.calls[0][0];
      expect(callArgs.text).toContain('1 hora');
      expect(callArgs.html).toContain('1 hora');
    });

    it('deve construir URL com FRONTEND_URL correto', async () => {
      process.env.FRONTEND_URL = 'https://app.planejai.com.br';
      const token = 'mytoken';
      const expectedUrl =
        'https://app.planejai.com.br/redefinir-senha?token=mytoken';

      await service.enviarTokenRedefinicaoSenha('teste@example.com', token);

      const callArgs = mockTransporter.sendMail.mock.calls[0][0];
      expect(callArgs.html).toContain(expectedUrl);
    });
  });

  describe('transporter configuration', () => {
    it('deve criar transporter com configurações corretas', () => {
      process.env.GMAIL_USER = 'test@gmail.com';
      process.env.GMAIL_PASS = 'testpass';

      // Re-instantiate para pegar novas variáveis de ambiente
      new EmailServiceImpl();

      expect(nodemailerMock.createTransport).toHaveBeenCalledWith(
        expect.objectContaining({
          service: 'gmail',
          auth: expect.objectContaining({
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          }),
        }),
      );
    });
  });
});
