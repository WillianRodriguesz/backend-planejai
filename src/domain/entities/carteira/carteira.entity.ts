import { Dinheiro } from '../../value-objects/dinheiro/dinheiro.value-object';
import { v4 as uuidv4 } from 'uuid';

export class Carteira {
  private readonly id: string;
  private idUsuario: string;
  private saldo: Dinheiro;

  constructor(idUsuario: string, saldoInicial: number) {
    this.id = uuidv4();
    this.idUsuario = idUsuario;
    this.saldo = new Dinheiro(saldoInicial);
  }

  public getId(): string {
    return this.id;
  }

  public getIdUsuario(): string {
    return this.idUsuario;
  }

  public getSaldo(): Dinheiro {
    return this.saldo;
  }

  public adicionarTransacao(valor: number, tipo: 'ENTRADA' | 'SAIDA'): void {
    if (tipo === 'ENTRADA') {
        this.saldo = new Dinheiro(this.saldo.getValor() + valor);
    } else {
        this.saldo = new Dinheiro(this.saldo.getValor() - valor);   
    }
  }
}