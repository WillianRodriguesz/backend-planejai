import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CarteiraModel } from './carteira.model';
import { CategoriaModel } from './categoria.model';

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

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => {
        if (!value) return value;
        // Garante que a data seja salva sem conversão de timezone
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      from: (value: string) => {
        if (!value) return value;
        // Garante que a data seja lida como local sem conversão
        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
      },
    },
  })
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
