import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPasswordResetToUsuarios1768336776000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'usuarios',
      new TableColumn({
        name: 'token_redefinicao_senha',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'usuarios',
      new TableColumn({
        name: 'expiracao_token',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('usuarios', 'token_redefinicao_senha');
    await queryRunner.dropColumn('usuarios', 'expiracao_token');
  }
}
