import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { Usuario } from '../../domain/entities/usuario.entity';

type usuarioModel = Prisma.usuarioGetPayload<{}>;
type usuarioModelProps = Prisma.usuarioCreateInput;

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

  domainToModel(domain: Usuario): usuarioModelProps {
    return {
      id_usuario: domain.getId(),
      email: domain.getEmail(),
      nome: domain.getNome(),
      senha: domain.getSenha(),
    };
  }
}
