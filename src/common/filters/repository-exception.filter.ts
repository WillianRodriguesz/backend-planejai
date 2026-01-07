import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { RepositoryException } from '../../modules/core/infrastructure/exceptions/repository.exception';

@Catch(RepositoryException)
export class RepositoryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RepositoryExceptionFilter.name);

  catch(exception: RepositoryException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception.message, exception.stack);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Erro interno no servidor',
      error: 'Internal Server Error',
    });
  }
}
