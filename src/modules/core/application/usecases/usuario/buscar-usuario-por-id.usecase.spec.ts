import { BuscarUsuarioPorIdUseCase } from './buscar-usuario-por-id.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { Usuario } from '../../../domain/usuario';

describe('BuscarUsuarioPorIdUseCase - Application UseCase', () => {
  let useCase: BuscarUsuarioPorIdUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorId: jest.fn(),
    } as any;

    useCase = new BuscarUsuarioPorIdUseCase(usuarioRepository);
  });

  describe('execute', () => {
    it('deve buscar usuário por ID com sucesso', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);

      const resultado = await useCase.execute('usuario-123');

      expect(resultado).not.toBeNull();
      expect(resultado).toHaveProperty('id', 'usuario-123');
      expect(resultado).toHaveProperty('nome', 'João Silva');
      expect(resultado).toHaveProperty('email', 'joao@example.com');
      expect(usuarioRepository.buscarPorId).toHaveBeenCalledWith('usuario-123');
    });

    it('deve retornar null quando usuário não for encontrado', async () => {
      usuarioRepository.buscarPorId.mockResolvedValue(null);

      const resultado = await useCase.execute('usuario-inexistente');

      expect(resultado).toBeNull();
      expect(usuarioRepository.buscarPorId).toHaveBeenCalledWith(
        'usuario-inexistente',
      );
    });

    it('deve retornar DTO com campos corretos', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date('2025-01-01'),
        telefone: '+5511999999999',
        avatar: 'https://example.com/avatar.jpg',
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);

      const resultado = await useCase.execute('usuario-123');

      expect(resultado).toHaveProperty('telefone', '+5511999999999');
      expect(resultado).toHaveProperty(
        'avatar',
        'https://example.com/avatar.jpg',
      );
    });
  });
});
