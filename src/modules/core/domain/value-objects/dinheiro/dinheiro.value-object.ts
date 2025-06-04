export class Dinheiro {
    private readonly valor: number;
  
    constructor(valor: number) {
      if (valor < 0) {
        throw new Error('Valor não pode ser negativo');
      }
      this.valor = Number(valor.toFixed(2));
    }
  
    public getValor(): number {
      return this.valor;
    }
  }