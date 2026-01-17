import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    jwtService = {
      verify: jest.fn(),
      sign: jest.fn(),
    } as any;

    guard = new JwtAuthGuard(jwtService);
  });

  describe('canActivate', () => {
    it('deve ser instanciado corretamente', () => {
      expect(guard).toBeDefined();
      expect(jwtService).toBeDefined();
    });

    it('deve ter o método canActivate', () => {
      expect(typeof guard.canActivate).toBe('function');
    });
  });
});
