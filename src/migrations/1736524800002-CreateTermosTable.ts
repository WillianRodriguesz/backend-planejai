import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTermosTable1736524800002 implements MigrationInterface {
  name = 'CreateTermosTable1736524800002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "termos" ("id" SERIAL NOT NULL, "tipo" character varying(50) NOT NULL, "versao" character varying(10) NOT NULL, "titulo" character varying(255) NOT NULL, "texto" text NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_termos_tipo_versao" UNIQUE ("tipo", "versao"), CONSTRAINT "PK_termos" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "termos"`);
  }
}
