import { Lancamento } from '../../domain/lancamento';
import { LancamentoDto } from '../dtos/lancamento/lancamento.dto';

export class LancamentoMapper {
  static DomainToDto(lancamento: Lancamento): LancamentoDto {
    return {
      id: lancamento.getId(),
      titulo: lancamento.getTitulo(),
      descricao: lancamento.getDescricao(),
      valor: lancamento.getValor(),
      tipoTransacao: lancamento.getTipoTransacao(),
      data: lancamento.getData(),
      categoria: {
        id: lancamento.getCategoria().getId(),
        nome: lancamento.getCategoria().getNome(),
      },
    };
  }

  static DomainToDtoList(lancamentos: Lancamento[]): LancamentoDto[] {
    return lancamentos.map((lancamento) => this.DomainToDto(lancamento));
  }
}
