import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { UsuarioModel } from './Usuario.model';
import { LancamentoModel } from './Lancamento.model';
import { SaldoMensalModel } from './SaldoMensal.model';

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

  @OneToMany(() => LancamentoModel, (lancamento) => lancamento.carteira)
  lancamentos: LancamentoModel[];

  @OneToMany(() => SaldoMensalModel, (saldoMensal) => saldoMensal.carteira)
  saldosMensais: SaldoMensalModel[];
}
