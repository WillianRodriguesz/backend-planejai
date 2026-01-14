import { HttpException, HttpStatus } from '@nestjs/common';

export class UsuarioHttpErrorMapper {
  static map(error: any): never {
    const errorMappings: Record<
      string,
      { status: HttpStatus; message?: string }
    > = {
      'Email já cadastrado': {
        status: HttpStatus.CONFLICT,
        message: 'Este email já está cadastrado no sistema.',
      },
      'Usuário não encontrado': {
        status: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado com o email fornecido.',
      },
      'Email já verificado': {
        status: HttpStatus.BAD_REQUEST,
        message: 'Este email já foi verificado anteriormente.',
      },
      'Código de verificação inválido': {
        status: HttpStatus.BAD_REQUEST,
        message:
          'Código de verificação incorreto. Verifique e tente novamente.',
      },
      'Código de verificação expirado': {
        status: HttpStatus.BAD_REQUEST,
        message: 'Código de verificação expirado. Solicite um novo código.',
      },
      'Código inválido ou expirado': { status: HttpStatus.BAD_REQUEST },
      'Falha ao enviar email de verificação': {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Erro ao enviar email de verificação. Verifique as configurações de email.',
      },
      'Falha ao enviar email de redefinição de senha': {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Erro ao enviar email de redefinição de senha. Tente novamente mais tarde.',
      },
      'Token inválido ou expirado': {
        status: HttpStatus.BAD_REQUEST,
        message: 'Token de redefinição inválido ou expirado. Solicite um novo.',
      },
      'Senha atual incorreta': {
        status: HttpStatus.BAD_REQUEST,
        message: 'A senha atual fornecida está incorreta.',
      },
      'Nova senha deve ser diferente da atual': {
        status: HttpStatus.BAD_REQUEST,
        message: 'A nova senha deve ser diferente da senha atual.',
      },
      'Usuário não autenticado': {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Usuário não autenticado. Faça login novamente.',
      },
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
