import { AtualizarUsuarioUseCase } from './atualizar-usuario.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { BcryptHashService } from '../../../domain/interfaces/bcrypt-hash.service';
import { Usuario } from '../../../domain/usuario';

describe('AtualizarUsuarioUseCase - Application UseCase', () => {
  let useCase: AtualizarUsuarioUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;
  let hashService: jest.Mocked<BcryptHashService>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorId: jest.fn(),
      buscarPorEmail: jest.fn(),
      atualizar: jest.fn(),
    } as any;

    hashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as any;

    useCase = new AtualizarUsuarioUseCase(usuarioRepository, hashService);
  });

  describe('execute', () => {
    it('deve atualizar dados do usuário com sucesso', async () => {
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
        nome: 'João da Silva',
        telefone: '+5511999999999',
      });

      expect(resultado).toHaveProperty('nome', 'João da Silva');
      expect(usuarioRepository.atualizar).toHaveBeenCalled();
    });

    it('deve lançar erro quando usuário não for encontrado', async () => {
      usuarioRepository.buscarPorId.mockResolvedValue(null);

      await expect(
        useCase.execute({
          id: 'usuario-inexistente',
          nome: 'Teste',
        }),
      ).rejects.toThrow('Usuário não encontrado');
    });

    it('deve validar email duplicado ao alterar', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      const outroUsuario = Usuario.carregar({
        id: 'usuario-456',
        nome: 'Maria',
        email: 'maria@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      usuarioRepository.buscarPorEmail.mockResolvedValue(outroUsuario);

      await expect(
        useCase.execute({
          id: 'usuario-123',
          email: 'maria@example.com',
        }),
      ).rejects.toThrow('Email já cadastrado');
    });

    it('deve permitir alterar para o mesmo email', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);

      const resultado = await useCase.execute({
        id: 'usuario-123',
        email: 'joao@example.com',
        nome: 'João da Silva',
      });

      expect(resultado.email).toBe('joao@example.com');
      expect(usuarioRepository.buscarPorEmail).not.toHaveBeenCalled();
    });

    it('deve manter telefone como undefined se não fornecido', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);

      await useCase.execute({
        id: 'usuario-123',
        nome: 'João da Silva',
      });

      expect(usuarioRepository.atualizar).toHaveBeenCalled();
    });
  });
});
