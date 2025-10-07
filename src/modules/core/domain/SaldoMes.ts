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

  private setMes(mes: number): void {
    this.mes = mes;
  }

  private setAno(ano: number): void {
    this.ano = ano;
  }

  private setSaldoMes(saldoMes: number): void {
    this.saldoMes = saldoMes;
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

  public setId(id: string): void {
    if (this.id) {
      throw new Error('ID já foi definido');
    }
    this.id = id;
  }

  public adicionarSaldoMes(valor: number): void {
    if (valor < 0) {
      throw new Error('Valor deve ser positivo');
    }

    if (!this.saldoMes) {
      throw new Error('Saldo do mês não definido');
    }
    this.saldoMes += valor;
  }

  public subtrairSaldoMes(valor: number): void {
    if (valor < 0) {
      throw new Error('Valor deve ser positivo');
    }

    if (!this.saldoMes) {
      throw new Error('Saldo do mês não definido');
    }
    this.saldoMes -= valor;
  }
}
