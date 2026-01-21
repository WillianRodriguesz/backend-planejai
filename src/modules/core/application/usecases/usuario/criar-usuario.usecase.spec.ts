import { CriarUsuarioUseCase } from './criar-usuario.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';
import { BcryptHashService } from '../../../domain/interfaces/bcrypt-hash.service';
import { EmailService } from '../../../domain/interfaces/email.service';
import { Usuario } from '../../../domain/usuario';

describe('CriarUsuarioUseCase', () => {
  let useCase: CriarUsuarioUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;
  let carteiraRepository: jest.Mocked<CarteiraRepository>;
  let hashService: jest.Mocked<BcryptHashService>;
  let emailService: jest.Mocked<EmailService>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorEmail: jest.fn(),
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      atualizar: jest.fn(),
      deletar: jest.fn(),
    } as any;

    carteiraRepository = {
      salvar: jest.fn(),
      buscarPorUsuarioId: jest.fn(),
    } as any;

    hashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as any;

    emailService = {
      enviarCodigoVerificacao: jest.fn(),
      enviarTokenRedefinicaoSenha: jest.fn(),
    } as any;

    useCase = new CriarUsuarioUseCase(
      usuarioRepository,
      carteiraRepository,
      hashService,
      emailService,
    );
  });

  describe('execute', () => {
    const validProps = {
      nome: 'João Silva',
      email: 'joao@example.com',
      senha: 'Senha123!',
      telefone: '+5511999999999',
    };

    it('deve criar um novo usuário com sucesso', async () => {
      usuarioRepository.buscarPorEmail.mockResolvedValue(null);
      hashService.hash.mockResolvedValue('hashedPassword123');
      emailService.enviarCodigoVerificacao.mockResolvedValue(undefined);

      const resultado = await useCase.execute(validProps);

      expect(usuarioRepository.buscarPorEmail).toHaveBeenCalledWith(
        validProps.email,
      );
      expect(hashService.hash).toHaveBeenCalledWith(validProps.senha);
      expect(usuarioRepository.salvar).toHaveBeenCalled();
      expect(emailService.enviarCodigoVerificacao).toHaveBeenCalled();
      expect(resultado.message).toContain('Usuário criado');
    });

    it('deve lançar erro se email já estiver cadastrado', async () => {
      const usuarioExistente = Usuario.criar({
        nome: 'Outro Usuário',
        email: validProps.email,
        senha: 'hashedPassword',
      });

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuarioExistente);

      await expect(useCase.execute(validProps)).rejects.toThrow(
        'Email já cadastrado',
      );

      expect(hashService.hash).not.toHaveBeenCalled();
      expect(usuarioRepository.salvar).not.toHaveBeenCalled();
    });

    it('deve hashear a senha antes de salvar', async () => {
      usuarioRepository.buscarPorEmail.mockResolvedValue(null);
      hashService.hash.mockResolvedValue('hashedPassword123');

      await useCase.execute(validProps);

      expect(hashService.hash).toHaveBeenCalledWith(validProps.senha);

      const usuarioSalvo = usuarioRepository.salvar.mock.calls[0][0];
      expect(usuarioSalvo.getSenha()).toBe('hashedPassword123');
    });

    it('deve gerar código de verificação de 6 caracteres', async () => {
      usuarioRepository.buscarPorEmail.mockResolvedValue(null);
      hashService.hash.mockResolvedValue('hashedPassword123');

      await useCase.execute(validProps);

      const usuarioSalvo = usuarioRepository.salvar.mock.calls[0][0];
      const codigo = usuarioSalvo.getCodigoVerificacao();

      expect(codigo).toBeDefined();
      expect(codigo.length).toBe(6);
    });

    it('deve enviar email com código de verificação', async () => {
      usuarioRepository.buscarPorEmail.mockResolvedValue(null);
      hashService.hash.mockResolvedValue('hashedPassword123');

      await useCase.execute(validProps);

      expect(emailService.enviarCodigoVerificacao).toHaveBeenCalledWith(
        validProps.email,
        expect.any(String),
      );
    });

    it('deve criar usuário sem telefone', async () => {
      const propsSemTelefone = {
        nome: 'Maria Santos',
        email: 'maria@example.com',
        senha: 'Senha123!',
        telefone: undefined,
      };

      usuarioRepository.buscarPorEmail.mockResolvedValue(null);
      hashService.hash.mockResolvedValue('hashedPassword123');

      const resultado = await useCase.execute(propsSemTelefone);

      expect(resultado.message).toContain('Usuário criado');
      expect(usuarioRepository.salvar).toHaveBeenCalled();
    });
  });
});
