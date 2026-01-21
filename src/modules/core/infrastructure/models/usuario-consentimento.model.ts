import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsuarioModel } from './usuario.model';
import { TermoModel } from './termo.model';

@Entity('usuario_consentimentos')
export class UsuarioConsentimentoModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId: string;

  @ManyToOne(() => UsuarioModel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioModel;

  @Column({ name: 'termo_lgpd_id', nullable: true })
  termoLgpdId: number;

  @ManyToOne(() => TermoModel, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'termo_lgpd_id' })
  termoLgpd: TermoModel;

  @Column({ name: 'aceitou_lgpd', default: false })
  aceitouLgpd: boolean;

  @Column({ name: 'data_aceitou_lgpd', nullable: true })
  dataAceitouLgpd: Date;

  @Column({ name: 'termo_termos_uso_id', nullable: true })
  termoTermosUsoId: number;

  @ManyToOne(() => TermoModel, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'termo_termos_uso_id' })
  termoTermosUso: TermoModel;

  @Column({ name: 'aceitou_termos_uso', default: false })
  aceitouTermosUso: boolean;

  @Column({ name: 'data_aceitou_termos_uso', nullable: true })
  dataAceitouTermosUso: Date;

  @Column({ name: 'termo_politica_privacidade_id', nullable: true })
  termoPoliticaPrivacidadeId: number;

  @ManyToOne(() => TermoModel, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'termo_politica_privacidade_id' })
  termoPoliticaPrivacidade: TermoModel;

  @Column({ name: 'aceitou_politica_privacidade', default: false })
  aceitouPoliticaPrivacidade: boolean;

  @Column({ name: 'data_aceitou_politica_privacidade', nullable: true })
  dataAceitouPoliticaPrivacidade: Date;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}
