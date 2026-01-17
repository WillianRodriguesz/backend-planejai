import { UsuarioMapper } from './usuario.mapper';
import { Usuario } from '../../domain/usuario';

describe('UsuarioMapper - Application Mapper', () => {
  describe('DomainToDto', () => {
    it('deve converter entidade de domínio para DTO', () => {
      const usuario = Usuario.criar({
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'hashedPassword',
        telefone: '+5511999999999',
        avatar: 'https://example.com/avatar.jpg',
      });

      // Simula ID e data de criação
      (usuario as any).id = 'user-123';
      const criadoEm = new Date('2023-01-01');
      (usuario as any).criadoEm = criadoEm;

      const dto = UsuarioMapper.DomainToDto(usuario);

      expect(dto).toEqual({
        id: 'user-123',
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '+5511999999999',
        avatar: 'https://example.com/avatar.jpg',
        criadoEm: criadoEm,
      });
    });

    it('deve converter usuário sem telefone e avatar', () => {
      const usuario = Usuario.criar({
        nome: 'Maria Santos',
        email: 'maria@example.com',
        senha: 'hashedPassword',
      });

      (usuario as any).id = 'user-456';

      const dto = UsuarioMapper.DomainToDto(usuario);

      expect(dto.telefone).toBeUndefined();
      expect(dto.avatar).toBeUndefined();
      expect(dto.id).toBe('user-456');
      expect(dto.nome).toBe('Maria Santos');
    });
  });

  describe('DomainToDtoList', () => {
    it('deve converter lista de entidades para lista de DTOs', () => {
      const usuarios = [
        Usuario.criar({
          nome: 'João Silva',
          email: 'joao@example.com',
          senha: 'hashedPassword1',
        }),
        Usuario.criar({
          nome: 'Maria Santos',
          email: 'maria@example.com',
          senha: 'hashedPassword2',
        }),
        Usuario.criar({
          nome: 'Pedro Oliveira',
          email: 'pedro@example.com',
          senha: 'hashedPassword3',
        }),
      ];

      (usuarios[0] as any).id = 'user-1';
      (usuarios[1] as any).id = 'user-2';
      (usuarios[2] as any).id = 'user-3';

      const dtos = UsuarioMapper.DomainToDtoList(usuarios);

      expect(dtos).toHaveLength(3);
      expect(dtos[0].id).toBe('user-1');
      expect(dtos[0].nome).toBe('João Silva');
      expect(dtos[1].id).toBe('user-2');
      expect(dtos[1].nome).toBe('Maria Santos');
      expect(dtos[2].id).toBe('user-3');
      expect(dtos[2].nome).toBe('Pedro Oliveira');
    });

    it('deve retornar lista vazia para entrada vazia', () => {
      const dtos = UsuarioMapper.DomainToDtoList([]);

      expect(dtos).toEqual([]);
      expect(dtos).toHaveLength(0);
    });
  });
});
