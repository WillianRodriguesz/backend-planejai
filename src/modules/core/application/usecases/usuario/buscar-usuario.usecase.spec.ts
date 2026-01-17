import { BuscarUsuarioUseCase } from './buscar-usuario.usecase';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { CarteiraRepository } from '../../../domain/repositories/carteira.repository';
import { Usuario } from '../../../domain/usuario';
import { Carteira } from '../../../domain/carteira';

describe('BuscarUsuarioUseCase - Application UseCase', () => {
  let useCase: BuscarUsuarioUseCase;
  let usuarioRepository: jest.Mocked<UsuarioRepository>;
  let carteiraRepository: jest.Mocked<CarteiraRepository>;

  beforeEach(() => {
    usuarioRepository = {
      buscarPorId: jest.fn(),
    } as any;

    carteiraRepository = {
      buscarPorUsuarioId: jest.fn(),
    } as any;

    useCase = new BuscarUsuarioUseCase(usuarioRepository, carteiraRepository);
  });

  describe('execute', () => {
    it('deve buscar usuário e carteira com sucesso', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-123',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      carteiraRepository.buscarPorUsuarioId.mockResolvedValue(carteira);

      const resultado = await useCase.execute('usuario-123');

      expect(resultado).toHaveProperty('usuario');
      expect(resultado).toHaveProperty('carteiraId', 'carteira-123');
      expect(resultado.usuario).toHaveProperty('id', 'usuario-123');
      expect(resultado.usuario).toHaveProperty('nome', 'João Silva');
      expect(usuarioRepository.buscarPorId).toHaveBeenCalledWith('usuario-123');
      expect(carteiraRepository.buscarPorUsuarioId).toHaveBeenCalledWith(
        'usuario-123',
      );
    });

    it('deve lançar erro quando usuário não for encontrado', async () => {
      usuarioRepository.buscarPorId.mockResolvedValue(null);

      await expect(useCase.execute('usuario-inexistente')).rejects.toThrow(
        'Usuário não encontrado',
      );
      expect(carteiraRepository.buscarPorUsuarioId).not.toHaveBeenCalled();
    });

    it('deve lançar erro quando carteira não for encontrada', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        emailVerificado: true,
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      carteiraRepository.buscarPorUsuarioId.mockResolvedValue(null);

      await expect(useCase.execute('usuario-123')).rejects.toThrow(
        'Carteira não encontrada',
      );
    });

    it('deve retornar estrutura correta com usuário e carteira', async () => {
      const usuario = Usuario.carregar({
        id: 'usuario-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        criadoEm: new Date(),
        telefone: '+5511999999999',
        emailVerificado: true,
      });

      const carteira = Carteira.carregar({
        id: 'carteira-456',
        usuarioId: 'usuario-123',
        criadoEm: new Date(),
        lancamentos: [],
        saldosMensais: [],
      });

      usuarioRepository.buscarPorId.mockResolvedValue(usuario);
      carteiraRepository.buscarPorUsuarioId.mockResolvedValue(carteira);

      const resultado = await useCase.execute('usuario-123');

      expect(resultado.usuario.telefone).toBe('+5511999999999');
      expect(resultado.carteiraId).toBe('carteira-456');
    });
  });
});
