import { Test, TestingModule } from '@nestjs/testing';
import { BcryptHashServiceImpl } from './hash-bcrypt.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('BcryptHashServiceImpl - Infrastructure Service', () => {
  let service: BcryptHashServiceImpl;
  let bcryptMock: jest.Mocked<typeof bcrypt>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptHashServiceImpl],
    }).compile();

    service = module.get<BcryptHashServiceImpl>(BcryptHashServiceImpl);
    bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hash', () => {
    it('deve hashear senha com sucesso', async () => {
      const senha = 'minhasenha123';
      const hashedPassword = 'hashedPassword123';

      bcryptMock.hash = jest.fn().mockResolvedValue(hashedPassword);

      const resultado = await service.hash(senha);

      expect(resultado).toBe(hashedPassword);
      expect(bcryptMock.hash).toHaveBeenCalledWith(senha, 10);
    });

    it('deve usar 10 salt rounds', async () => {
      const senha = 'senha';
      bcryptMock.hash = jest.fn().mockResolvedValue('hash');

      await service.hash(senha);

      expect(bcryptMock.hash).toHaveBeenCalledWith(senha, 10);
    });

    it('deve hashear senhas diferentes resultando em hashes diferentes', async () => {
      bcryptMock.hash = jest
        .fn()
        .mockResolvedValueOnce('hash1')
        .mockResolvedValueOnce('hash2');

      const hash1 = await service.hash('senha1');
      const hash2 = await service.hash('senha2');

      expect(hash1).not.toBe(hash2);
      expect(bcryptMock.hash).toHaveBeenCalledTimes(2);
    });

    it('deve hashear senha vazia', async () => {
      bcryptMock.hash = jest.fn().mockResolvedValue('emptyHash');

      const resultado = await service.hash('');

      expect(resultado).toBe('emptyHash');
      expect(bcryptMock.hash).toHaveBeenCalledWith('', 10);
    });

    it('deve propagar erro do bcrypt', async () => {
      const erro = new Error('Erro do bcrypt');
      bcryptMock.hash = jest.fn().mockRejectedValue(erro);

      await expect(service.hash('senha')).rejects.toThrow('Erro do bcrypt');
    });
  });

  describe('compare', () => {
    it('deve retornar true quando senha corresponder ao hash', async () => {
      const senha = 'minhasenha123';
      const hash = 'hashedPassword123';

      bcryptMock.compare = jest.fn().mockResolvedValue(true);

      const resultado = await service.compare(senha, hash);

      expect(resultado).toBe(true);
      expect(bcryptMock.compare).toHaveBeenCalledWith(senha, hash);
    });

    it('deve retornar false quando senha não corresponder ao hash', async () => {
      const senha = 'senhaErrada';
      const hash = 'hashedPassword123';

      bcryptMock.compare = jest.fn().mockResolvedValue(false);

      const resultado = await service.compare(senha, hash);

      expect(resultado).toBe(false);
      expect(bcryptMock.compare).toHaveBeenCalledWith(senha, hash);
    });

    it('deve comparar múltiplas senhas corretamente', async () => {
      const hash = 'hash123';
      bcryptMock.compare = jest
        .fn()
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false);

      const resultado1 = await service.compare('senhaCorreta', hash);
      const resultado2 = await service.compare('senhaErrada', hash);

      expect(resultado1).toBe(true);
      expect(resultado2).toBe(false);
      expect(bcryptMock.compare).toHaveBeenCalledTimes(2);
    });

    it('deve lidar com senha vazia', async () => {
      bcryptMock.compare = jest.fn().mockResolvedValue(false);

      const resultado = await service.compare('', 'hash');

      expect(resultado).toBe(false);
      expect(bcryptMock.compare).toHaveBeenCalledWith('', 'hash');
    });

    it('deve propagar erro do bcrypt', async () => {
      const erro = new Error('Erro ao comparar');
      bcryptMock.compare = jest.fn().mockRejectedValue(erro);

      await expect(service.compare('senha', 'hash')).rejects.toThrow(
        'Erro ao comparar',
      );
    });
  });

  describe('saltRounds', () => {
    it('deve ter saltRounds configurado como 10', () => {
      expect((service as any).saltRounds).toBe(10);
    });
  });
});
