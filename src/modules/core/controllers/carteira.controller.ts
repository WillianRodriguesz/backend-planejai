import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { SaldoMensalDto } from '../application/dtos/carteira/saldo-mensal.dto';
import { LancamentosPaginadosDto } from '../application/dtos/lancamento/lancamentos-paginados.dto';
import { BuscarSaldoMensalQuery } from '../application/queries/carteira/buscar-saldo-mensal.query';
import { BuscarTodosLancamentosQuery } from '../application/queries/carteira/buscar-todos-lancamentos.query';
import {
  AdicionarLancamentoUseCase,
  tipoTransacao,
} from '../application/usecases/carteira/adicionar-lancamento.usecase';
import { DateUtils } from '../domain/shared/data.utils';

@Controller('carteira')
export class CarteiraController {
  constructor(
    private readonly adicionarLancamentoUseCase: AdicionarLancamentoUseCase,
    private readonly buscarSaldoMensalQuery: BuscarSaldoMensalQuery,
    private readonly buscarTodosLancamentosQuery: BuscarTodosLancamentosQuery,
  ) {}

  @Get('/:idCarteira/saldo-mensal')
  async buscarSaldoMensal(
    @Param('idCarteira') id: string,
    @Query('data') data: string,
  ): Promise<SaldoMensalDto> {
    return this.buscarSaldoMensalQuery.execute(id, data);
  }

  @Get('/:idCarteira/lancamentos')
  async buscarTodosLancamentos(
    @Param('idCarteira') idCarteira: string,
    @Query('pagina') pagina: string = '1',
    @Query('itensPorPagina') itensPorPagina: string = '10',
  ): Promise<LancamentosPaginadosDto> {
    return this.buscarTodosLancamentosQuery.execute(
      idCarteira,
      parseInt(pagina, 10),
      parseInt(itensPorPagina, 10),
    );
  }

  @Post('/:idCarteira/novo-lancamento')
  async adicionarLancamento(
    @Param('idCarteira') idCarteira: string,
    @Body(ValidationPipe)
    body: {
      idCategoria: number;
      tipoTransacao: tipoTransacao;
      valor: number;
      titulo: string;
      descricao: string;
      data: string;
    },
  ): Promise<{ message: string }> {
    await this.adicionarLancamentoUseCase.execute({
      idCarteira,
      idCategoria: body.idCategoria,
      tipoTransacao: body.tipoTransacao,
      valor: body.valor,
      titulo: body.titulo,
      descricao: body.descricao,
      data: DateUtils.converterParaDate(body.data),
    });

    return { message: 'Lançamento adicionado com sucesso' };
  }
}
