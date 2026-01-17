import { VerificarEmailUseCase } from './verificar-email.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';
import { Usuario } from '../../../domain/usuario';

describe('VerificarEmailUseCase', () => {
  let useCase: VerificarEmailUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;
  let carteiraRepository: jest.Mocked<CarteiraRepository>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorEmail: jest.fn(),
      atualizar: jest.fn(),
    } as any;

    carteiraRepository = {
      salvar: jest.fn(),
    } as any;

    useCase = new VerificarEmailUseCase(usuarioRepository, carteiraRepository);
  });

  describe('execute', () => {
    const validProps = {
      email: 'joao@example.com',
      codigo: 'ABC123',
    };

    it('deve verificar email com código válido', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: validProps.email,
        senha: 'hashedPassword',
      });
      usuario.setCodigoVerificacao(validProps.codigo);
      (usuario as any).id = 'user-123';

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);

      const resultado = await useCase.execute(validProps);

      expect(usuarioRepository.buscarPorEmail).toHaveBeenCalledWith(
        validProps.email,
      );
      expect(usuarioRepository.atualizar).toHaveBeenCalledWith(
        'user-123',
        usuario,
      );
      expect(carteiraRepository.salvar).toHaveBeenCalled();
      expect(resultado.id).toBe('user-123');
      expect(resultado.email).toBe(validProps.email);
    });

    it('deve lançar erro se usuário não existir', async () => {
      usuarioRepository.buscarPorEmail.mockResolvedValue(null);

      await expect(useCase.execute(validProps)).rejects.toThrow(
        'Usuário não encontrado',
      );

      expect(usuarioRepository.atualizar).not.toHaveBeenCalled();
    });

    it('deve lançar erro se email já estiver verificado', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: validProps.email,
        senha: 'hashedPassword',
      });
      usuario.setCodigoVerificacao(validProps.codigo);
      usuario.verificarEmail();

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);

      await expect(useCase.execute(validProps)).rejects.toThrow(
        'Email já verificado',
      );

      expect(usuarioRepository.atualizar).not.toHaveBeenCalled();
    });

    it('deve lançar erro se código for inválido', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: validProps.email,
        senha: 'hashedPassword',
      });
      usuario.setCodigoVerificacao('OUTRO123');

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);

      await expect(useCase.execute(validProps)).rejects.toThrow(
        'Código de verificação inválido',
      );
    });

    it('deve lançar erro se código estiver expirado', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: validProps.email,
        senha: 'hashedPassword',
      });
      usuario.setCodigoVerificacao(validProps.codigo);

      // Simula código expirado
      const expiracaoPassada = new Date(Date.now() - 1000);
      (usuario as any).expiracaoCodigo = expiracaoPassada;

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);

      await expect(useCase.execute(validProps)).rejects.toThrow(
        'Código de verificação expirado',
      );
    });

    it('deve criar carteira ao verificar email', async () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: validProps.email,
        senha: 'hashedPassword',
      });
      usuario.setCodigoVerificacao(validProps.codigo);
      (usuario as any).id = 'user-123';

      usuarioRepository.buscarPorEmail.mockResolvedValue(usuario);

      await useCase.execute(validProps);

      expect(carteiraRepository.salvar).toHaveBeenCalled();
      const carteiraSalva = carteiraRepository.salvar.mock.calls[0][0];
      expect(carteiraSalva).toBeDefined();
    });
  });
});
