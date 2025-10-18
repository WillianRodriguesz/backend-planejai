import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { UsuarioModel } from './usuario.model';
import { LancamentoModel } from './lancamento.model';
import { SaldoMensalModel } from './saldo-mensal.model';

@Entity('carteiras')
export class CarteiraModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @ManyToOne(() => UsuarioModel, (usuario) => usuario.carteiras, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioModel;

  @OneToMany(() => LancamentoModel, (lancamento) => lancamento.carteira, {
    cascade: ['insert', 'update'],
  })
  lancamentos: LancamentoModel[];

  @OneToMany(() => SaldoMensalModel, (saldoMensal) => saldoMensal.carteira, {
    cascade: ['insert', 'update'],
  })
  saldosMensais: SaldoMensalModel[];
}
