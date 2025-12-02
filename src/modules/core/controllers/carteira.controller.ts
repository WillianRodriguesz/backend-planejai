import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { SaldoMensalDto } from '../application/dtos/carteira/saldo-mensal.dto';
import { LancamentoDto } from '../application/dtos/lancamento/lancamento.dto';
import { LancamentosPaginadosDto } from '../application/dtos/lancamento/lancamentos-paginados.dto';
import { AtualizarLancamentoDto } from '../application/dtos/lancamento/atualizar-lancamento.dto';
import { BuscarSaldoMensalQuery } from '../application/queries/carteira/buscar-saldo-mensal.query';
import { BuscarTodosLancamentosQuery } from '../application/queries/carteira/buscar-todos-lancamentos.query';
import { BuscarLancamentoPorIdQuery } from '../application/queries/carteira/buscar-lancamento-por-id.query';
import {
  AdicionarLancamentoUseCase,
  tipoTransacao,
} from '../application/usecases/carteira/adicionar-lancamento.usecase';
import { AtualizarLancamentoUseCase } from '../application/usecases/carteira/atualizar-lancamento.usecase';
import { DeletarLancamentoUseCase } from '../application/usecases/carteira/deletar-lancamento.usecase';
import { DateUtils } from '../domain/shared/data.utils';

@Controller('carteira')
export class CarteiraController {
  constructor(
    private readonly adicionarLancamentoUseCase: AdicionarLancamentoUseCase,
    private readonly atualizarLancamentoUseCase: AtualizarLancamentoUseCase,
    private readonly deletarLancamentoUseCase: DeletarLancamentoUseCase,
    private readonly buscarSaldoMensalQuery: BuscarSaldoMensalQuery,
    private readonly buscarTodosLancamentosQuery: BuscarTodosLancamentosQuery,
    private readonly buscarLancamentoPorIdQuery: BuscarLancamentoPorIdQuery,
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

  @Get('/:idCarteira/lancamento/:idLancamento')
  async buscarLancamentoPorId(
    @Param('idCarteira') idCarteira: string,
    @Param('idLancamento') idLancamento: string,
  ): Promise<LancamentoDto> {
    return this.buscarLancamentoPorIdQuery.execute(idCarteira, idLancamento);
  }

  @Put('/:idCarteira/lancamento/:idLancamento')
  async atualizarLancamento(
    @Param('idCarteira') idCarteira: string,
    @Param('idLancamento') idLancamento: string,
    @Body(ValidationPipe) body: AtualizarLancamentoDto,
  ): Promise<{ message: string }> {
    await this.atualizarLancamentoUseCase.execute({
      idCarteira,
      idLancamento,
      dados: body,
    });

    return { message: 'Lançamento atualizado com sucesso' };
  }

  @Delete('/:idCarteira/lancamento/:idLancamento')
  async deletarLancamento(
    @Param('idCarteira') idCarteira: string,
    @Param('idLancamento') idLancamento: string,
  ): Promise<{ message: string }> {
    await this.deletarLancamentoUseCase.execute(idCarteira, idLancamento);

    return { message: 'Lançamento excluído com sucesso' };
  }
}
