export interface CriarUsuarioProps {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  avatar?: string;
}

import { DomainException } from './exceptions/domain.exception';

export class Usuario {
  private id: string;
  private nome: string;
  private email: string;
  private senha: string;
  private telefone: string;
  private avatar?: string;
  private criadoEm: Date;
  private emailVerificado: boolean;
  private codigoVerificacao?: string;
  private expiracaoCodigo?: Date;
  private tokenRedefinicaoSenha?: string;
  private expiracaoToken?: Date;

  private constructor(id?: string) {
    this.id = id;
  }

  public static criar(props: CriarUsuarioProps): Usuario {
    const { nome, email, senha, telefone, avatar } = props;
    const usuario = new Usuario();
    usuario.setNome(nome);
    usuario.setEmail(email);
    usuario.setSenha(senha);
    usuario.setTelefone(telefone);
    usuario.setAvatar(avatar);
    usuario.setCriadoEm(new Date());
    usuario.setEmailVerificado(false);
    return usuario;
  }

  public static carregar(props: {
    id: string;
    nome: string;
    email: string;
    senha: string;
    criadoEm: Date;
    telefone: string;
    avatar?: string;
    emailVerificado: boolean;
    codigoVerificacao?: string;
    expiracaoCodigo?: Date;
    tokenRedefinicaoSenha?: string;
    expiracaoToken?: Date;
  }): Usuario {
    const usuario = new Usuario(props.id);
    usuario.setNome(props.nome);
    usuario.setEmail(props.email);
    usuario.setSenha(props.senha);
    usuario.setCriadoEm(props.criadoEm);
    usuario.setTelefone(props.telefone);
    usuario.setAvatar(props.avatar);
    usuario.setEmailVerificado(props.emailVerificado);
    usuario.setCodigoVerificacao(props.codigoVerificacao);
    usuario.setExpiracaoCodigo(props.expiracaoCodigo);
    usuario.setTokenRedefinicaoSenha(props.tokenRedefinicaoSenha);
    usuario.setExpiracaoToken(props.expiracaoToken);
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

  public getTelefone(): string {
    return this.telefone;
  }

  public getAvatar(): string | undefined {
    return this.avatar;
  }

  public getCriadoEm(): Date {
    return this.criadoEm;
  }

  private setNome(nome: string): void {
    if (!nome) {
      throw new DomainException('Nome não pode ser vazio.');
    }
    this.nome = nome;
  }

  private setEmail(email: string): void {
    if (!email.includes('@')) {
      throw new DomainException('Email inválido.');
    }

    if (!email) {
      throw new DomainException('Email não pode ser vazio.');
    }

    this.email = email;
  }

  private setSenha(senha: string): void {
    if (senha.length < 8) {
      throw new DomainException('A senha deve ter pelo menos 8 caracteres.');
    }

    this.senha = senha;
  }

  private setTelefone(telefone: string): void {
    if (telefone && telefone.length < 10) {
      throw new DomainException('Telefone inválido.');
    }

    this.telefone = telefone;
  }

  private setAvatar(avatar?: string): void {
    this.avatar = avatar;
  }

  private setCriadoEm(criadoEm: Date): void {
    this.criadoEm = criadoEm;
  }

  public getEmailVerificado(): boolean {
    return this.emailVerificado;
  }

  public getCodigoVerificacao(): string | undefined {
    return this.codigoVerificacao;
  }

  public getExpiracaoCodigo(): Date | undefined {
    return this.expiracaoCodigo;
  }

  private setEmailVerificado(emailVerificado: boolean): void {
    this.emailVerificado = emailVerificado;
  }

  public setCodigoVerificacao(codigo: string): void {
    this.codigoVerificacao = codigo;
    this.expiracaoCodigo = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
  }

  private setExpiracaoCodigo(expiracao: Date): void {
    this.expiracaoCodigo = expiracao;
  }

  public verificarEmail(): void {
    this.emailVerificado = true;
    this.codigoVerificacao = undefined;
    this.expiracaoCodigo = undefined;
  }

  public getTokenRedefinicaoSenha(): string | undefined {
    return this.tokenRedefinicaoSenha;
  }

  public getExpiracaoToken(): Date | undefined {
    return this.expiracaoToken;
  }

  public setTokenRedefinicaoSenha(token: string): void {
    this.tokenRedefinicaoSenha = token;
    this.expiracaoToken = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
  }

  private setExpiracaoToken(expiracao?: Date): void {
    this.expiracaoToken = expiracao;
  }

  public limparTokenRedefinicaoSenha(): void {
    this.tokenRedefinicaoSenha = undefined;
    this.expiracaoToken = undefined;
  }

  public atualizarSenha(novaSenha: string): void {
    this.senha = novaSenha;
    this.limparTokenRedefinicaoSenha();
  }

  public setId(id: string): void {
    if (this.id) {
      throw new Error('ID já foi definido');
    }
    this.id = id;
  }
}
