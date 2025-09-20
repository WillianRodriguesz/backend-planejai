import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { CarteiraModel } from './carteira.model';
import { CategoriaModel } from './categoria.model';

@Entity('orcamentos')
@Unique(['carteiraId', 'categoriaId', 'mes', 'ano'])
export class OrcamentoModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'carteira_id' })
  carteiraId: string;

  @Column({ name: 'categoria_id', nullable: true })
  categoriaId: number;

  @Column({ type: 'int' })
  mes: number;

  @Column({ type: 'int' })
  ano: number;

  @Column({ name: 'valor_planejado', type: 'decimal', precision: 10, scale: 2 })
  valorPlanejado: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @ManyToOne(() => CarteiraModel, (carteira) => carteira.orcamentos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carteira_id' })
  carteira: CarteiraModel;

  @ManyToOne(() => CategoriaModel, (categoria) => categoria.orcamentos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaModel;
}
