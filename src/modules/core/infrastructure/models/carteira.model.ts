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
import { OrcamentoModel } from './orcamento.model';

@Entity('carteiras')
export class CarteiraModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @Column({
    name: 'saldo_inicial',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  saldoInicial: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @ManyToOne(() => UsuarioModel, (usuario) => usuario.carteiras, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioModel;

  @OneToMany(() => LancamentoModel, (lancamento) => lancamento.carteira)
  lancamentos: LancamentoModel[];

  @OneToMany(() => OrcamentoModel, (orcamento) => orcamento.carteira)
  orcamentos: OrcamentoModel[];
}
