export class Dinheiro {
  private readonly valor: number;

  constructor(valor: number) {
    if (typeof valor !== 'number' || isNaN(valor)) {
      throw new Error('Valor deve ser um número válido');
    }
    if (valor < 0) {
      throw new Error('Valor não pode ser negativo');
    }
    this.valor = Number(valor.toFixed(2)); 
  }

  public getValor(): number {
    return this.valor;
  }

  public somar(outro: Dinheiro): Dinheiro {
    return new Dinheiro(this.valor + outro.getValor());
  }

  public subtrair(outro: Dinheiro): Dinheiro {
    if (outro.getValor() > this.valor) {
      throw new Error('Resultado da subtração não pode ser negativo');
    }
    return new Dinheiro(this.valor - outro.getValor());
  }

  public equals(outro: Dinheiro): boolean {
    return this.valor === outro.getValor();
  }

  public formatarBRL(): string {
    return this.valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
