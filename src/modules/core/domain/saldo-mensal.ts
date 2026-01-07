import { DomainException } from './exceptions/domain.exception';

export interface CriarSaldoMesProps {
  mes: number;
  ano: number;
  saldoMes: number;
}

export class SaldoMes {
  private id: string;
  private mes: number;
  private ano: number;
  private saldoMes: number;

  private constructor(id?: string) {
    this.id = id;
  }

  public static criar(props: CriarSaldoMesProps): SaldoMes {
    const { mes, ano, saldoMes } = props;
    const saldoMesEntity = new SaldoMes();
    saldoMesEntity.setMes(mes);
    saldoMesEntity.setAno(ano);
    saldoMesEntity.setSaldoMes(saldoMes);
    return saldoMesEntity;
  }

  public static carregar(props: {
    id: string;
    mes: number;
    ano: number;
    saldoMes: number;
  }): SaldoMes {
    const saldoMesEntity = new SaldoMes(props.id);
    saldoMesEntity.setMes(props.mes);
    saldoMesEntity.setAno(props.ano);
    saldoMesEntity.setSaldoMes(props.saldoMes);
    return saldoMesEntity;
  }

  private setId(id: string): void {
    if (this.id) {
      throw new DomainException('ID já foi definido');
    }
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public getMes(): number {
    return this.mes;
  }

  public getAno(): number {
    return this.ano;
  }

  public getSaldoMes(): number {
    return this.saldoMes;
  }

  public atualizarSaldoMes(novoSaldo: number): void {
    this.saldoMes = novoSaldo;
  }

  public adicionarSaldoMes(valor: number): void {
    if (valor < 0) {
      throw new DomainException('Valor deve ser positivo');
    }
    if (!this.saldoMes) {
      throw new DomainException('Saldo do mês não definido');
    }
    this.saldoMes += valor;
  }

  public subtrairSaldoMes(valor: number): void {
    if (valor < 0) {
      throw new DomainException('Valor deve ser positivo');
    }
    if (!this.saldoMes) {
      throw new DomainException('Saldo do mês não definido');
    }
    this.saldoMes -= valor;
  }

  private setMes(mes: number): void {
    if (mes < 1 || mes > 12) {
      throw new DomainException('Mês deve estar entre 1 e 12');
    }
    this.mes = mes;
  }

  private setAno(ano: number): void {
    if (ano < 1900 || ano > new Date().getFullYear() + 10) {
      throw new DomainException('Ano deve ser válido');
    }
    this.ano = ano;
  }

  private setSaldoMes(saldoMes: number): void {
    this.saldoMes = saldoMes;
  }
}