import { DomainExceptionFilter } from './domain-exception.filter';
import { DomainException } from '../../modules/core/domain/exceptions/domain.exception';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';

describe('DomainExceptionFilter', () => {
  let filter: DomainExceptionFilter;
  let mockResponse: any;
  let mockHost: ArgumentsHost;

  beforeEach(() => {
    filter = new DomainExceptionFilter();

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
  });

  describe('catch', () => {
    it('deve capturar DomainException e retornar status 400', () => {
      const exception = new DomainException('Erro de validação de domínio');

      filter.catch(exception, mockHost);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro de validação de domínio',
        error: 'Bad Request',
      });
    });

    it('deve formatar resposta corretamente com mensagem personalizada', () => {
      const exception = new DomainException('Nome é obrigatório');

      filter.catch(exception, mockHost);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Nome é obrigatório',
        }),
      );
    });

    it('deve sempre retornar Bad Request independente da mensagem', () => {
      const exception = new DomainException('Qualquer mensagem de erro');

      filter.catch(exception, mockHost);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Bad Request',
        }),
      );
    });
  });
});
