import { AtualizarAvatarUseCase } from './atualizar-avatar.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { Usuario } from '../../../domain/usuario';

describe('AtualizarAvatarUseCase - Application UseCase', () => {
  let useCase: AtualizarAvatarUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorId: jest.fn(),
      atualizar: jest.fn(),
    } as any;

    useCase = new AtualizarAvatarUseCase(usuarioRepository);
  });

  describe('execute', () => {
    it('deve atualizar avatar com sucesso', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      usuarioRepository.atualizar.mockResolvedValue(undefined);

      const resultado = await useCase.execute({
        id: 'usuario-123',
        avatar: 'https://example.com/avatar.jpg',
      });

      expect(resultado).toHaveProperty('id', 'usuario-123');
      expect(resultado).toHaveProperty('nome', 'João Silva');
      expect(usuarioRepository.buscarPorId).toHaveBeenCalledWith('usuario-123');
      expect(usuarioRepository.atualizar).toHaveBeenCalled();
    });

    it('deve lançar erro quando usuário não for encontrado', async () => {
      usuarioRepository.buscarPorId.mockResolvedValue(null);

      await expect(
        useCase.execute({
          id: 'usuario-inexistente',
          avatar: 'https://example.com/avatar.jpg',
        }),
      ).rejects.toThrow('Usuário não encontrado');
    });

    it('deve atualizar avatar para URL diferente', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        avatar: 'https://example.com/old-avatar.jpg',
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);

      await useCase.execute({
        id: 'usuario-123',
        avatar: 'https://example.com/new-avatar.jpg',
      });

      expect(usuarioRepository.atualizar).toHaveBeenCalled();
    });
  });
});
