import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum TipoTermo {
  LGPD = 'lgpd',
  TERMOS_USO = 'termos_uso',
  POLITICA_PRIVACIDADE = 'politica_privacidade',
}

@Entity('termos')
export class TermoModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  tipo: TipoTermo;

  @Column({ length: 10 })
  versao: string;

  @Column({ length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  texto: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}
