import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFinancialTables1758396191673 implements MigrationInterface {
  name = 'CreateFinancialTables1758396191673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orcamentos" ("id" SERIAL NOT NULL, "carteira_id" uuid NOT NULL, "categoria_id" integer, "mes" integer NOT NULL, "ano" integer NOT NULL, "valor_planejado" numeric(10,2) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9d2e4782e7999ccdac105184869" UNIQUE ("carteira_id", "categoria_id", "mes", "ano"), CONSTRAINT "PK_de8d614c38e188b63ae17830fb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."categorias_tipo_enum" AS ENUM('entrada', 'saida', 'ambos')`,
    );
    await queryRunner.query(
      `CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, "tipo" "public"."categorias_tipo_enum" NOT NULL DEFAULT 'saida', CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15" UNIQUE ("nome"), CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lancamentos_tipo_enum" AS ENUM('entrada', 'saida')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lancamentos" ("id" SERIAL NOT NULL, "carteira_id" uuid NOT NULL, "categoria_id" integer, "titulo" character varying(150) NOT NULL, "valor" numeric(10,2) NOT NULL, "data" date NOT NULL, "tipo" "public"."lancamentos_tipo_enum" NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_863ece961e659a6e426dcff9d90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carteiras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "saldo_inicial" numeric(10,2) NOT NULL DEFAULT '0', "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_efe9dd56ffcf32615a6bb284619" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "telefone" character varying(20), "email" character varying(100) NOT NULL, "senha" character varying(255) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orcamentos" ADD CONSTRAINT "FK_6e00b7c9757ee343fc63ca5ea8e" FOREIGN KEY ("carteira_id") REFERENCES "carteiras"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orcamentos" ADD CONSTRAINT "FK_6b56835a7de71b416fc4dfdf222" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_7f9fe1deba37f70e9906d91b32d" FOREIGN KEY ("carteira_id") REFERENCES "carteiras"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" ADD CONSTRAINT "FK_434baf7634debc0b6ccd8cf4576" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "carteiras" ADD CONSTRAINT "FK_54ddf362222256150e7bd584495" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carteiras" DROP CONSTRAINT "FK_54ddf362222256150e7bd584495"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_434baf7634debc0b6ccd8cf4576"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lancamentos" DROP CONSTRAINT "FK_7f9fe1deba37f70e9906d91b32d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orcamentos" DROP CONSTRAINT "FK_6b56835a7de71b416fc4dfdf222"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orcamentos" DROP CONSTRAINT "FK_6e00b7c9757ee343fc63ca5ea8e"`,
    );
    await queryRunner.query(`DROP TABLE "usuarios"`);
    await queryRunner.query(`DROP TABLE "carteiras"`);
    await queryRunner.query(`DROP TABLE "lancamentos"`);
    await queryRunner.query(`DROP TYPE "public"."lancamentos_tipo_enum"`);
    await queryRunner.query(`DROP TABLE "categorias"`);
    await queryRunner.query(`DROP TYPE "public"."categorias_tipo_enum"`);
    await queryRunner.query(`DROP TABLE "orcamentos"`);
  }
}
