import { DeletarUsuarioUseCase } from './deletar-usuario.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { Usuario } from '../../../domain/usuario';

describe('DeletarUsuarioUseCase - Application UseCase', () => {
  let useCase: DeletarUsuarioUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorId: jest.fn(),
      deletar: jest.fn(),
    } as any;

    useCase = new DeletarUsuarioUseCase(usuarioRepository);
  });

  describe('execute', () => {
    it('deve deletar usuário com sucesso', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      usuarioRepository.deletar.mockResolvedValue(undefined);

      await useCase.execute('usuario-123');

      expect(usuarioRepository.buscarPorId).toHaveBeenCalledWith('usuario-123');
      expect(usuarioRepository.deletar).toHaveBeenCalledWith('usuario-123');
    });

    it('deve lançar erro quando usuário não for encontrado', async () => {
      usuarioRepository.buscarPorId.mockResolvedValue(null);

      await expect(useCase.execute('usuario-inexistente')).rejects.toThrow(
        'Usuário não encontrado',
      );
      expect(usuarioRepository.deletar).not.toHaveBeenCalled();
    });

    it('deve chamar deletar apenas após validar existência', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);

      await useCase.execute('usuario-123');

      expect(usuarioRepository.buscarPorId).toHaveBeenCalled();
      expect(usuarioRepository.deletar).toHaveBeenCalled();
    });
  });
});
