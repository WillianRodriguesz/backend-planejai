import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioModel } from '../models/usuario.model';

@Injectable()
export class LimpezaCodigosService {
  constructor(
    @InjectRepository(UsuarioModel)
    private readonly usuarioModelRepository: Repository<UsuarioModel>,
  ) {}

  @Cron('0 */15 * * * *')
  async limparCodigosExpirados() {
    const now = new Date();

    const usuariosComCodigosExpirados = await this.usuarioModelRepository
      .createQueryBuilder('usuario')
      .where('usuario.expiracao_codigo IS NOT NULL')
      .andWhere('usuario.expiracao_codigo < :now', { now })
      .andWhere('usuario.email_verificado = false')
      .getMany();

    if (usuariosComCodigosExpirados.length > 0) {
      await this.usuarioModelRepository
        .createQueryBuilder()
        .delete()
        .from(UsuarioModel)
        .where('id IN (:...ids)', {
          ids: usuariosComCodigosExpirados.map((u) => u.id),
        })
        .execute();

      console.log(
        `Deletados ${usuariosComCodigosExpirados.length} usuários com códigos expirados`,
      );
    }
  }
}
