import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { CarteiraModel } from './Carteira.model';

@Entity('saldos_mensais')
@Unique(['carteiraId', 'mes', 'ano'])
export class SaldoMensalModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'carteira_id' })
  carteiraId: string;

  @Column({ type: 'int' })
  mes: number;

  @Column({ type: 'int' })
  ano: number;

  @Column({ name: 'saldo_mes', type: 'decimal', precision: 10, scale: 2 })
  saldoMes: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @ManyToOne(() => CarteiraModel, (carteira) => carteira.saldosMensais, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carteira_id' })
  carteira: CarteiraModel;
}
