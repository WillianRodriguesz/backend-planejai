import { Inject, Injectable } from '@nestjs/common';
import { TermoRepository } from '../../../domain/repositories/termo.repository';
import { TipoTermo } from '../../../domain/termo';

@Injectable()
export class BuscarTermoAtivoUseCase {
  constructor(
    @Inject('TermoRepository')
    private readonly termoRepository: TermoRepository,
  ) {}

  async execute(tipo: TipoTermo) {
    return await this.termoRepository.buscarAtivoPorTipo(tipo);
  }
}
