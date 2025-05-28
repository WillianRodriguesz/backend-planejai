import { v4 as uuidv4 } from 'uuid';

export class Usuario {
  private readonly id: string;
  private nome: string;
  private email: string;
  private senha: string;

  constructor(nome: string, email: string, senha: string, id?: string) {
    this.id = id ?? uuidv4(); // se não passar, gera novo
    this.nome = nome;
    this.email = email;
    this.senha = senha;
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