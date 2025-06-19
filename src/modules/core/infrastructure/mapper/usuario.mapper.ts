import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { Usuario } from '../../domain/entities/usuario/usuario.entity';

type usuarioModel = Prisma.usuarioCreateInput;

@Injectable()
export class UsuarioMapper {
  modelToDomain(model: usuarioModel): Usuario {
    const usuario = new Usuario({
      id: model.id_usuario,
      email: model.email,
      nome: model.nome,
      senha: model.senha,
    });

    if (!usuario) {
      throw new Error('Erro ao transformar model do usuário para o dominio');
    }
    return usuario;
  }

  domainToModel(domain: Usuario): usuarioModel {
    return {
      id_usuario: domain.getId(),
      email: domain.getEmail(),
      nome: domain.getNome(),
      senha: domain.getSenha(),
    };
  }
}
