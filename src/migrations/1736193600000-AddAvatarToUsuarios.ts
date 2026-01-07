import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvatarToUsuarios1736193600000 implements MigrationInterface {
  name = 'AddAvatarToUsuarios1736193600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD "avatar" character varying(50)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "avatar"`);
  }
}
