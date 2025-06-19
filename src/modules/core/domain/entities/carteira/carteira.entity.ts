import { Dinheiro } from '../../value-objects/dinheiro/dinheiro.value-object';
import { v4 as uuidv4 } from 'uuid';

interface CarteiraProps {
  id?: string;
  idUsuario: string;
  saldoInicial: number;
}

export class Carteira {
  private id: string;
  private idUsuario: string;
  private saldo: Dinheiro;

  constructor(props: CarteiraProps) {
    this.id = props.id || uuidv4();
    this.setIdUsuario(props.idUsuario);
    this.setSaldoInicial(props.saldoInicial);
  }

  public static criar(props: CarteiraProps): Carteira {
    return new Carteira(props);
  }

  private setIdUsuario(idUsuario: string): void {
    if (!idUsuario || typeof idUsuario !== 'string' || idUsuario.trim() === '') {
      throw new Error('O id do usuário é obrigatório e deve ser uma string válida');
    }
    this.idUsuario = idUsuario;
  }

  private setSaldoInicial(saldo: number): void {
    if (saldo == null) {
      saldo = 0;
    }
    this.saldo = new Dinheiro(saldo);
  }

  public getId(): string {
    return this.id;
  }

  public getSaldo(): Dinheiro {
    return this.saldo;
  }

  public getIdUsuario(): string {
    return this.idUsuario;
  }

  public adicionarSaldo(valor: number): void {
    const valorDinheiro = new Dinheiro(valor);
    this.saldo = this.saldo.somar(valorDinheiro);
  }

  public removerSaldo(valor: number): void {
    const valorDinheiro = new Dinheiro(valor);
    this.saldo = this.saldo.subtrair(valorDinheiro);
  }
}