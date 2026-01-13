import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailVerificationToUsuarios1768261665095
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD COLUMN "email_verificado" boolean NOT NULL DEFAULT false,
            ADD COLUMN "codigo_verificacao" character varying(6),
            ADD COLUMN "expiracao_codigo" TIMESTAMP
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "usuarios"
            DROP COLUMN "email_verificado",
            DROP COLUMN "codigo_verificacao",
            DROP COLUMN "expiracao_codigo"
        `);
  }
}
