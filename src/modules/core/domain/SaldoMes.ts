export class SaldoMes {
  constructor(
    public readonly id: string,
    public readonly carteiraId: string,
    public readonly mes: number,
    public readonly ano: number,
    public readonly saldoMes: number,
  ) {}
}
