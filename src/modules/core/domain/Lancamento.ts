export class Lancamento {
  constructor(
    public readonly id: string,
    public readonly carteiraId: string,
    public readonly valor: number,
    public readonly descricao: string,
    public readonly data: Date
  ) {}
}
