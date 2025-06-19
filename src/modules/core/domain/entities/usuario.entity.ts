import { v4 as uuidv4 } from 'uuid';
import { Carteira } from './carteira.entity';

interface UsuarioProps {
  id?: string;
  nome: string;
  email: string;
  senha: string;
}
export class Usuario {
  private id: string;
  private nome: string;
  private email: string;
  private senha: string;

  constructor(props: UsuarioProps) {
    this.id = this.setId(props.id);
    this.setNome(props.nome);
    this.setEmail(props.email);
    this.setSenha(props.senha);
  }

  public static criar(props: UsuarioProps): Usuario {
    return new Usuario(props);
  }

  private setId(id: string): string {
    if (!id) {
      id = uuidv4();
    }
    this.id = id;
    return this.id;
  }

  private setNome(nome: string): string {
    this.nome = nome;
    return this.nome;
  }

  private setEmail(email: string): string {
    this.email = email;
    return this.email;
  }

  private setSenha(senha: string): string {
    this.senha = senha;
    return this.senha;
  }
 

  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getSenha(): string {
    return this.senha;
  }

  public atualizarNome(nome: string): void {
    this.nome = nome;
  }

  public atualizarSenha(senha: string): void {
    this.senha = senha;
  }
}
