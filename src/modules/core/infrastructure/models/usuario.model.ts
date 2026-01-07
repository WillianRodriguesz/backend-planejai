import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { CarteiraModel } from './carteira.model';

@Entity('usuarios')
export class UsuarioModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 20, nullable: true })
  telefone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  senha: string;

  @Column({ length: 50, nullable: true })
  avatar: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @OneToMany(() => CarteiraModel, (carteira) => carteira.usuario)
  carteiras: CarteiraModel[];
}
