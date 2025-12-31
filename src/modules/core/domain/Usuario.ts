export interface CriarUsuarioProps {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
}

export class Usuario {
  private id: string;
  private nome: string;
  private email: string;
  private senha: string;
  private telefone?: string;
  private criadoEm: Date;

  private constructor(id?: string) {
    this.id = id;
  }

  public static criar(props: CriarUsuarioProps): Usuario {
    const { nome, email, senha, telefone } = props;
    const usuario = new Usuario();
    usuario.setNome(nome);
    usuario.setEmail(email);
    usuario.setSenha(senha);
    usuario.setTelefone(telefone);
    usuario.setCriadoEm(new Date());
    return usuario;
  }

  public static carregar(props: {
    id: string;
    nome: string;
    email: string;
    senha: string;
    criadoEm: Date;
    telefone?: string;
  }): Usuario {
    const usuario = new Usuario(props.id);
    usuario.setNome(props.nome);
    usuario.setEmail(props.email);
    usuario.setSenha(props.senha);
    usuario.setCriadoEm(props.criadoEm);
    usuario.setTelefone(props.telefone);
    return usuario;
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

  public getTelefone(): string | undefined {
    return this.telefone;
  }

  public getCriadoEm(): Date {
    return this.criadoEm;
  }

  private setNome(nome: string): void {
    this.nome = nome;
  }

  private setEmail(email: string): void {
    this.email = email;
  }

  private setSenha(senha: string): void {
    this.senha = senha;
  }

  private setTelefone(telefone?: string): void {
    this.telefone = telefone;
  }

  private setCriadoEm(criadoEm: Date): void {
    this.criadoEm = criadoEm;
  }

  public setId(id: string): void {
    if (this.id) {
      throw new Error('ID já foi definido');
    }
    this.id = id;
  }
}
