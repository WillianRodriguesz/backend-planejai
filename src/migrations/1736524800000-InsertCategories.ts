import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertCategories1736524800000 implements MigrationInterface {
  name = 'InsertCategories1736524800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "categorias" ("nome", "tipo") VALUES
      ('salario', 'entrada'),
      ('freelance', 'entrada'),
      ('alimentacao', 'saida'),
      ('transporte', 'saida'),
      ('lazer', 'saida'),
      ('contas', 'saida'),
      ('outros', 'ambos'),
      ('cartao de credito', 'saida');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "categorias" WHERE "nome" IN ('salario', 'freelance', 'alimentacao', 'transporte', 'lazer', 'contas', 'outros', 'cartaoCredito');
    `);
  }
}
