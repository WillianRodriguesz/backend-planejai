import { Test, TestingModule } from '@nestjs/testing';
import { TokenServiceImpl } from './token.service';
import * as crypto from 'crypto';

describe('TokenServiceImpl - Infrastructure Service', () => {
  let service: TokenServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenServiceImpl],
    }).compile();

    service = module.get<TokenServiceImpl>(TokenServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('gerarToken', () => {
    it('deve gerar token com 64 caracteres hexadecimais', () => {
      const mockToken = 'a'.repeat(64);
      const mockHash = 'hash123';

      jest.spyOn(crypto, 'randomBytes').mockReturnValue({
        toString: jest.fn().mockReturnValue(mockToken),
      } as any);

      jest.spyOn(crypto, 'createHash').mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(mockHash),
      } as any);

      const resultado = service.gerarToken();

      expect(resultado.token).toBe(mockToken);
      expect(resultado.tokenHash).toBe(mockHash);
      expect(crypto.randomBytes).toHaveBeenCalledWith(32);
    });

    it('deve retornar token e tokenHash diferentes', () => {
      const mockToken = 'token123';
      const mockHash = 'hash456';

      jest.spyOn(crypto, 'randomBytes').mockReturnValue({
        toString: jest.fn().mockReturnValue(mockToken),
      } as any);

      jest.spyOn(crypto, 'createHash').mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(mockHash),
      } as any);

      const resultado = service.gerarToken();

      expect(resultado.token).not.toBe(resultado.tokenHash);
    });

    it('deve gerar tokens diferentes em cada chamada', () => {
      jest
        .spyOn(crypto, 'randomBytes')
        .mockReturnValueOnce({
          toString: jest.fn().mockReturnValue('token1'),
        } as any)
        .mockReturnValueOnce({
          toString: jest.fn().mockReturnValue('token2'),
        } as any);

      jest.spyOn(crypto, 'createHash').mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue('hash'),
      } as any);

      const resultado1 = service.gerarToken();
      const resultado2 = service.gerarToken();

      expect(resultado1.token).not.toBe(resultado2.token);
    });
  });

  describe('hashToken', () => {
    it('deve criar hash SHA-256 do token', () => {
      const token = 'meutoken123';
      const expectedHash = 'hashSHA256';

      const mockHashInstance = {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(expectedHash),
      };

      jest.spyOn(crypto, 'createHash').mockReturnValue(mockHashInstance as any);

      const resultado = service.hashToken(token);

      expect(resultado).toBe(expectedHash);
      expect(crypto.createHash).toHaveBeenCalledWith('sha256');
      expect(mockHashInstance.update).toHaveBeenCalledWith(token);
      expect(mockHashInstance.digest).toHaveBeenCalledWith('hex');
    });

    it('deve gerar hashes diferentes para tokens diferentes', () => {
      const mockHashInstance = {
        update: jest.fn().mockReturnThis(),
        digest: jest
          .fn()
          .mockReturnValueOnce('hash1')
          .mockReturnValueOnce('hash2'),
      };

      jest.spyOn(crypto, 'createHash').mockReturnValue(mockHashInstance as any);

      const hash1 = service.hashToken('token1');
      const hash2 = service.hashToken('token2');

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('validarFormatoToken', () => {
    beforeEach(() => {
      jest.spyOn(crypto, 'createHash').mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue('validHash'),
      } as any);
    });

    it('deve validar token com formato correto (64 caracteres hex)', () => {
      const tokenValido = 'a'.repeat(64);

      const resultado = service.validarFormatoToken(tokenValido);

      expect(resultado).toBe('validHash');
    });

    it('deve retornar null para token com menos de 64 caracteres', () => {
      const tokenInvalido = 'a'.repeat(63);

      const resultado = service.validarFormatoToken(tokenInvalido);

      expect(resultado).toBeNull();
    });

    it('deve retornar null para token com mais de 64 caracteres', () => {
      const tokenInvalido = 'a'.repeat(65);

      const resultado = service.validarFormatoToken(tokenInvalido);

      expect(resultado).toBeNull();
    });

    it('deve retornar null para token com caracteres não hexadecimais', () => {
      const tokenInvalido = 'g'.repeat(64);

      const resultado = service.validarFormatoToken(tokenInvalido);

      expect(resultado).toBeNull();
    });

    it('deve aceitar token com letras maiúsculas e minúsculas', () => {
      const tokenValido = 'Aa'.repeat(32);

      const resultado = service.validarFormatoToken(tokenValido);

      expect(resultado).toBe('validHash');
    });

    it('deve aceitar token apenas com números', () => {
      const tokenValido = '0123456789'.repeat(6) + '0123';

      const resultado = service.validarFormatoToken(tokenValido);

      expect(resultado).toBe('validHash');
    });

    it('deve retornar null para token com caracteres especiais', () => {
      const tokenInvalido = 'a'.repeat(63) + '@';

      const resultado = service.validarFormatoToken(tokenInvalido);

      expect(resultado).toBeNull();
    });

    it('deve retornar null para token vazio', () => {
      const resultado = service.validarFormatoToken('');

      expect(resultado).toBeNull();
    });

    it('deve retornar null para token com espaços', () => {
      const tokenInvalido = 'a'.repeat(63) + ' ';

      const resultado = service.validarFormatoToken(tokenInvalido);

      expect(resultado).toBeNull();
    });
  });

  describe('tokenExpirado', () => {
    it('deve retornar true quando data de expiração for no passado', () => {
      const dataPassado = new Date('2020-01-01');

      const resultado = service.tokenExpirado(dataPassado);

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando data de expiração for no futuro', () => {
      const dataFuturo = new Date('2099-12-31');

      const resultado = service.tokenExpirado(dataFuturo);

      expect(resultado).toBe(false);
    });

    it('deve retornar true quando data de expiração for exatamente agora', () => {
      jest.useFakeTimers();
      const agora = new Date('2025-01-15T12:00:00Z');
      jest.setSystemTime(agora);

      const dataExpiracao = new Date('2025-01-15T11:59:59Z');

      const resultado = service.tokenExpirado(dataExpiracao);

      expect(resultado).toBe(true);

      jest.useRealTimers();
    });

    it('deve considerar milissegundos na comparação', () => {
      jest.useFakeTimers();
      const agora = new Date('2025-01-15T12:00:00.000Z');
      jest.setSystemTime(agora);

      const dataExpiracao = new Date('2025-01-15T12:00:00.001Z');

      const resultado = service.tokenExpirado(dataExpiracao);

      expect(resultado).toBe(false);

      jest.useRealTimers();
    });
  });

  describe('integração entre métodos', () => {
    it('gerarToken deve usar hashToken internamente', () => {
      const mockToken = 'token123';
      const mockHash = 'hash123';

      jest.spyOn(crypto, 'randomBytes').mockReturnValue({
        toString: jest.fn().mockReturnValue(mockToken),
      } as any);

      jest.spyOn(crypto, 'createHash').mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(mockHash),
      } as any);

      const resultado = service.gerarToken();

      expect(resultado.tokenHash).toBe(mockHash);
    });

    it('validarFormatoToken deve usar hashToken para token válido', () => {
      const tokenValido = 'a'.repeat(64);
      const mockHash = 'hashResultado';

      jest.spyOn(crypto, 'createHash').mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(mockHash),
      } as any);

      const resultado = service.validarFormatoToken(tokenValido);

      expect(resultado).toBe(mockHash);
      expect(crypto.createHash).toHaveBeenCalledWith('sha256');
    });
  });
});
