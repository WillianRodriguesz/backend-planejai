import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFinancialTables1736000000000 implements MigrationInterface {
  name = 'CreateFinancialTables1736000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "saldos_mensais" ("id" SERIAL NOT NULL, "carteira_id" uuid NOT NULL, "mes" integer NOT NULL, "ano" integer NOT NULL, "saldo_mes" numeric(10,2) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_saldos_mensais_carteira_mes_ano" UNIQUE ("carteira_id", "mes", "ano"), CONSTRAINT "PK_saldos_mensais" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."categorias_tipo_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."categorias_tipo_enum" AS ENUM('entrada', 'saida', 'ambos')`,
    );
    await queryRunner.query(
      `CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, "tipo" "public"."categorias_tipo_enum" NOT NULL DEFAULT 'saida', CONSTRAINT "UQ_de8a2d8979f7820616e31dc1e15" UNIQUE ("nome"), CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."lancamentos_tipo_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lancamentos_tipo_enum" AS ENUM('entrada', 'saida')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lancamentos" ("id" SERIAL NOT NULL, "carteira_id" uuid NOT NULL, "categoria_id" integer, "titulo" character varying(150) NOT NULL, "descricao" character varying(150) NOT NULL, "valor" numeric(10,2) NOT NULL, "data" date NOT NULL, "tipo" "public"."lancamentos_tipo_enum" NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_863ece961e659a6e426dcff9d90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carteiras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_efe9dd56ffcf32615a6bb284619" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "telefone" character varying(20), "email" character varying(100) NOT NULL, "senha" character varying(255) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "saldos_mensais" ADD CONSTRAINT "FK_saldos_mensais_carteira" FOREIGN KEY ("carteira_id") REFERENCES "carteiras"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
      `ALTER TABLE "saldos_mensais" DROP CONSTRAINT "FK_saldos_mensais_carteira"`,
    );
    await queryRunner.query(`DROP TABLE "usuarios"`);
    await queryRunner.query(`DROP TABLE "carteiras"`);
    await queryRunner.query(`DROP TABLE "lancamentos"`);
    await queryRunner.query(`DROP TYPE "public"."lancamentos_tipo_enum"`);
    await queryRunner.query(`DROP TABLE "categorias"`);
    await queryRunner.query(`DROP TYPE "public"."categorias_tipo_enum"`);
    await queryRunner.query(`DROP TABLE "saldos_mensais"`);
  }
}
