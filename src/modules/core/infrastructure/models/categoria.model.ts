import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LancamentoModel } from './lancamento.model';
import { OrcamentoModel } from './orcamento.model';


@Entity('categorias')
export class CategoriaModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  nome: string;

  @Column({
    length: 10,
    default: 'saida',
    type: 'varchar',
  })
  tipo: 'entrada' | 'saida' | 'ambos';

  @OneToMany(() => LancamentoModel, (lancamento) => lancamento.categoria)
  lancamentos: LancamentoModel[];

  @OneToMany(() => OrcamentoModel, (orcamento) => orcamento.categoria)
  orcamentos: OrcamentoModel[];
}
