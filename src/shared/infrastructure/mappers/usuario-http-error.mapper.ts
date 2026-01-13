import { HttpException, HttpStatus } from '@nestjs/common';

export class UsuarioHttpErrorMapper {
  static map(error: any): never {
    const errorMappings: Record<
      string,
      { status: HttpStatus; message?: string }
    > = {
      'Email já cadastrado': { status: HttpStatus.CONFLICT },
      'Usuário não encontrado': { status: HttpStatus.NOT_FOUND },
      'Email já verificado': { status: HttpStatus.BAD_REQUEST },
      'Código inválido ou expirado': { status: HttpStatus.BAD_REQUEST },
      'Falha ao enviar email de verificação': {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Erro ao enviar email de verificação. Verifique as configurações de email.',
      },
      'Senha atual incorreta': { status: HttpStatus.BAD_REQUEST },
      'Nova senha deve ser diferente da atual': {
        status: HttpStatus.BAD_REQUEST,
      },
      'Usuário não autenticado': { status: HttpStatus.UNAUTHORIZED },
    };

    const mapping = errorMappings[error.message];
    if (mapping) {
      throw new HttpException(mapping.message || error.message, mapping.status);
    }

    throw new HttpException(
      'Erro interno do servidor',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
