import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertCategories1736524800000 implements MigrationInterface {
  name = 'InsertCategories1736524800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "categorias" ("nome", "tipo") VALUES
      ('salário', 'entrada'),
      ('freelance', 'entrada'),
      ('alimentação', 'saida'),
      ('transporte', 'saida'),
      ('lazer', 'saida'),
      ('contas', 'saida'),
      ('outros', 'ambos'),
      ('cartão de crédito', 'saida'),
      ('academia', 'saida'),
      ('educação', 'saida'),
      ('aluguel', 'saida'),
      ('assinaturas', 'saida');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "categorias" WHERE "nome" IN ('salário', 'freelance', 'alimentação', 'transporte', 'lazer', 'contas', 'outros', 'cartão de crédito', 'academia', 'educação', 'aluguel', 'assinaturas');
    `);
  }
}
