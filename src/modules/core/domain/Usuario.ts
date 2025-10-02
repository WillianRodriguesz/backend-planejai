export class Usuario {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly email: string,
    public readonly criadoEm: Date,
    public readonly telefone?: string,
  ) {}
}
