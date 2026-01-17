import { RepositoryException } from './repository.exception';

describe('RepositoryException', () => {
  it('deve criar uma exceção com mensagem', () => {
    const exception = new RepositoryException('Erro de repositório');

    expect(exception).toBeInstanceOf(RepositoryException);
    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Erro de repositório');
  });

  it('deve ter o nome correto da exceção', () => {
    const exception = new RepositoryException('Teste');

    expect(exception.name).toBe('RepositoryException');
  });

  it('deve armazenar erro original', () => {
    const originalError = new Error('Erro original');
    const exception = new RepositoryException(
      'Erro de repositório',
      originalError,
    );

    expect(exception.originalError).toBe(originalError);
    expect(exception.originalError?.message).toBe('Erro original');
  });

  it('deve permitir criar exceção sem erro original', () => {
    const exception = new RepositoryException('Erro sem original');

    expect(exception.originalError).toBeUndefined();
  });

  it('deve ser lançável com throw', () => {
    expect(() => {
      throw new RepositoryException('Erro lançado');
    }).toThrow(RepositoryException);
  });

  it('deve ser capturável como RepositoryException', () => {
    try {
      throw new RepositoryException('Mensagem de erro');
    } catch (error) {
      expect(error).toBeInstanceOf(RepositoryException);
      expect((error as RepositoryException).message).toBe('Mensagem de erro');
    }
  });

  it('deve ser capturável como Error', () => {
    try {
      throw new RepositoryException('Erro genérico');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('deve preservar mensagem com caracteres especiais', () => {
    const mensagem = 'Erro: conexão falhou! @#$%';
    const exception = new RepositoryException(mensagem);

    expect(exception.message).toBe(mensagem);
  });

  it('deve encadear erro original na mensagem', () => {
    const originalError = new Error('Conexão timeout');
    const exception = new RepositoryException(
      'Falha ao conectar ao banco',
      originalError,
    );

    expect(exception.message).toBe('Falha ao conectar ao banco');
    expect(exception.originalError?.message).toBe('Conexão timeout');
  });
});
