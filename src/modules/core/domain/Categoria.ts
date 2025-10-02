export class Categoria {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly tipo: 'entrada' | 'saida' | 'ambos',
  ) {}
}
