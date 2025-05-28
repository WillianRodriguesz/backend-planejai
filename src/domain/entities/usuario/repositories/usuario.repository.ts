import { PrismaService } from "src/Prisma/prisma.service";
import { IUsuarioRepository } from "./usuario.repository.interface";
import { Usuario } from "../usuario.entity";
import { CriarUsuarioDto } from "../dto/criar-usuario.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioRepository implements IUsuarioRepository{

    constructor (private readonly prisma: PrismaService){}

    private toDomain(usuarioPrisma: any): Usuario { //criei toDomain para converter um objeto cru vindo do Prisma (que é só um JSON, um objeto comum do banco) em uma instância da sua entidade Usuario,
    return new Usuario(
      usuarioPrisma.nome,
      usuarioPrisma.email,
      usuarioPrisma.senha,
      usuarioPrisma.id // usando o id que veio do banco
    );
  }
  
    async criarUsuario( usuario: Usuario): Promise<Usuario> {
        const novoUsuario = await this.prisma.usuario.create({
            data: {
                email: usuario.getEmail(),
                senha: usuario.getSenha(),
                nome: usuario.getNome()
            },
        });

    // converte para entidade antes de retornar
    return this.toDomain(novoUsuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> { // vai retornar um usuario ou null 
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email
      }
    });

    if (!usuario) {
      return null; // não lança erro aqui, deixa o caso de uso decidir o que fazer
    }

    return this.toDomain(usuario);
  }

    async listarTodos(): Promise<Usuario[]> {
        const usuariosPrisma = await this.prisma.usuario.findMany();
        return usuariosPrisma.map(usuarioPrisma => this.toDomain(usuarioPrisma));
    }

    async atualizarNome(usuario: Usuario): Promise<void>{
        await this.prisma.usuario.update({
            where: { id: usuario.getId() },
            data: { nome: usuario.getNome() }
     });
    }

    async atualizarSenha(usuario: Usuario): Promise<void> {
        await this.prisma.usuario.update({
            where: {id: usuario.getId() },
            data:{ senha: usuario.getSenha()}
        });
    }

    async deletar(id: string): Promise<void> {
        await this.prisma.usuario.delete({
            where: { id }
        });
    }

    async existeId(id: string): Promise<boolean> {
      const usuario = await this.prisma.usuario.findUnique({
        where: { id },
        select: { id: true}
      });
      return ! !usuario; // retorna true
      
    }
}