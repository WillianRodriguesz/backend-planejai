import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CarteiraModel } from './Carteira.model';
import { CategoriaModel } from './Categoria.model';

@Entity('lancamentos')
export class LancamentoModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'carteira_id' })
  carteiraId: string;

  @Column({ name: 'categoria_id', nullable: true })
  categoriaId: number;

  @Column({ length: 150 })
  titulo: string;

  @Column({ length: 150 })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'date' })
  data: Date;

  @Column({ length: 10 })
  tipo: 'entrada' | 'saida';

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @ManyToOne(() => CarteiraModel, (carteira) => carteira.lancamentos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carteira_id' })
  carteira: CarteiraModel;

  @ManyToOne(() => CategoriaModel, (categoria) => categoria.lancamentos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaModel;
}
