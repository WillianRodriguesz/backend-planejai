import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/core/infrastructure/database/Prisma/prisma.service';
import { Usuario } from '../../domain/entities/usuario/usuario.entity';
import { UsuarioRepository } from '../../domain/entities/repositories/usuario.repository.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(usuarioPrisma: any): Usuario {
    return new Usuario(
      usuarioPrisma.nome,
      usuarioPrisma.email,
      usuarioPrisma.senha,
      usuarioPrisma.id_usuario, // Corrige id para id_usuario
    );
  }

  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    const novoUsuario = await this.prisma.usuario.create({
      data: {
        id_usuario: uuidv4(), // Gera um UUID para id_usuario
        email: usuario.getEmail(),
        senha: usuario.getSenha(),
        nome: usuario.getNome(),
      },
    });

    return this.toDomain(novoUsuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!usuario) {
      return null;
    }

    return this.toDomain(usuario);
  }

  async listarTodos(): Promise<Usuario[]> {
    const usuariosPrisma = await this.prisma.usuario.findMany();
    return usuariosPrisma.map((usuarioPrisma) => this.toDomain(usuarioPrisma));
  }

  async atualizarNome(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.update({
      where: { id_usuario: usuario.getId() }, // Corrige id para id_usuario
      data: { nome: usuario.getNome() },
    });
  }

  async atualizarSenha(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.update({
      where: { id_usuario: usuario.getId() }, // Corrige id para id_usuario
      data: { senha: usuario.getSenha() },
    });
  }

  async deletar(id: string): Promise<void> {
    await this.prisma.usuario.delete({
      where: { id_usuario: id }, // Corrige id para id_usuario
    });
  }

  async existeId(id: string): Promise<boolean> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id_usuario: id }, // Corrige id para id_usuario
      select: { id_usuario: true }, // Corrige id para id_usuario
    });
    return !!usuario;
  }
}