import { DomainException } from './domain.exception';

describe('DomainException', () => {
  it('deve criar uma exceção com mensagem', () => {
    const exception = new DomainException('Erro de domínio');

    expect(exception).toBeInstanceOf(DomainException);
    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Erro de domínio');
  });

  it('deve ter o nome correto da exceção', () => {
    const exception = new DomainException('Teste');

    expect(exception.name).toBe('DomainException');
  });

  it('deve ser lançável com throw', () => {
    expect(() => {
      throw new DomainException('Erro lançado');
    }).toThrow(DomainException);
  });

  it('deve ser capturável como DomainException', () => {
    try {
      throw new DomainException('Mensagem de erro');
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
      expect((error as DomainException).message).toBe('Mensagem de erro');
    }
  });

  it('deve ser capturável como Error', () => {
    try {
      throw new DomainException('Erro genérico');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('deve permitir mensagens vazias', () => {
    const exception = new DomainException('');

    expect(exception.message).toBe('');
  });

  it('deve preservar mensagem com caracteres especiais', () => {
    const mensagem = 'Erro: valor inválido! @#$%';
    const exception = new DomainException(mensagem);

    expect(exception.message).toBe(mensagem);
  });

  it('deve permitir mensagens longas', () => {
    const mensagemLonga = 'A'.repeat(1000);
    const exception = new DomainException(mensagemLonga);

    expect(exception.message).toBe(mensagemLonga);
  });
});
