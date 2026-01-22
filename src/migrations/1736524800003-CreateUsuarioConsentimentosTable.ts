import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsuarioConsentimentosTable1736524800003
  implements MigrationInterface
{
  name = 'CreateUsuarioConsentimentosTable1736524800003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuario_consentimentos" ("id" SERIAL NOT NULL, "usuario_id" uuid NOT NULL, "termo_lgpd_id" integer, "aceitou_lgpd" boolean NOT NULL DEFAULT false, "data_aceitou_lgpd" TIMESTAMP, "termo_termos_uso_id" integer, "aceitou_termos_uso" boolean NOT NULL DEFAULT false, "data_aceitou_termos_uso" TIMESTAMP, "termo_politica_privacidade_id" integer, "aceitou_politica_privacidade" boolean NOT NULL DEFAULT false, "data_aceitou_politica_privacidade" TIMESTAMP, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_usuario_consentimentos" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_consentimentos" ADD CONSTRAINT "FK_usuario_consentimentos_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_consentimentos" ADD CONSTRAINT "FK_usuario_consentimentos_termo_lgpd" FOREIGN KEY ("termo_lgpd_id") REFERENCES "termos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_consentimentos" ADD CONSTRAINT "FK_usuario_consentimentos_termo_termos_uso" FOREIGN KEY ("termo_termos_uso_id") REFERENCES "termos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_consentimentos" ADD CONSTRAINT "FK_usuario_consentimentos_termo_politica" FOREIGN KEY ("termo_politica_privacidade_id") REFERENCES "termos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuario_consentimentos" DROP CONSTRAINT "FK_usuario_consentimentos_termo_politica"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_consentimentos" DROP CONSTRAINT "FK_usuario_consentimentos_termo_termos_uso"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_consentimentos" DROP CONSTRAINT "FK_usuario_consentimentos_termo_lgpd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_consentimentos" DROP CONSTRAINT "FK_usuario_consentimentos_usuario"`,
    );
    await queryRunner.query(`DROP TABLE "usuario_consentimentos"`);
  }
}
