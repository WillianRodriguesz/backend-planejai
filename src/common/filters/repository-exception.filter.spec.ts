import { RepositoryExceptionFilter } from './repository-exception.filter';
import { RepositoryException } from '../../modules/core/infrastructure/exceptions/repository.exception';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';

describe('RepositoryExceptionFilter', () => {
  let filter: RepositoryExceptionFilter;
  let mockResponse: any;
  let mockHost: ArgumentsHost;

  beforeEach(() => {
    filter = new RepositoryExceptionFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
        getRequest: jest.fn(),
      }),
    } as unknown as ArgumentsHost;

    // Mock do logger para não poluir console nos testes
    jest.spyOn(filter['logger'], 'error').mockImplementation();
  });

  describe('catch', () => {
    it('deve capturar RepositoryException e retornar status 500', () => {
      const exception = new RepositoryException(
        'Erro ao acessar banco de dados',
      );

      filter.catch(exception, mockHost);

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erro interno no servidor',
        error: 'Internal Server Error',
      });
    });

    it('deve logar o erro com stack trace', () => {
      const exception = new RepositoryException('Erro de conexão');

      filter.catch(exception, mockHost);

      expect(filter['logger'].error).toHaveBeenCalledWith(
        exception.message,
        exception.stack,
      );
    });

    it('não deve expor detalhes do erro de repositório na resposta', () => {
      const exception = new RepositoryException(
        'Connection timeout to database server',
      );

      filter.catch(exception, mockHost);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Erro interno no servidor',
        }),
      );
      expect(mockResponse.json).not.toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('database'),
        }),
      );
    });

    it('deve sempre retornar Internal Server Error', () => {
      const exception = new RepositoryException('Qualquer erro de repositório');

      filter.catch(exception, mockHost);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Internal Server Error',
        }),
      );
    });
  });
});
