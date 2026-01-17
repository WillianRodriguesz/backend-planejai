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
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';

import { SaldoMensalDto } from '../application/dtos/carteira/saldo-mensal.dto';
import { GastosMensaisDto } from '../application/dtos/carteira/gastos-mensais.dto';
import { LancamentoDto } from '../application/dtos/lancamento/lancamento.dto';
import { LancamentosPaginadosDto } from '../application/dtos/lancamento/lancamentos-paginados.dto';
import { AtualizarLancamentoDto } from '../application/dtos/lancamento/atualizar-lancamento.dto';
import { FiltrarLancamentosDto } from '../application/dtos/lancamento/filtrar-lancamentos.dto';
import { BuscarSaldoMensalQuery } from '../application/queries/carteira/buscar-saldo-mensal.query';
import { BuscarTodosLancamentosQuery } from '../application/queries/carteira/buscar-todos-lancamentos.query';
import { BuscarLancamentoPorIdQuery } from '../application/queries/carteira/buscar-lancamento-por-id.query';
import { FiltrarLancamentosQuery } from '../application/queries/carteira/filtrar-lancamentos.query';
import { BuscarGastosMensaisQuery } from '../application/queries/carteira/buscar-gastos-mensais.query';
import {
  AdicionarLancamentoUseCase,
  tipoTransacao,
} from '../application/usecases/carteira/adicionar-lancamento.usecase';
import { AtualizarLancamentoUseCase } from '../application/usecases/carteira/atualizar-lancamento.usecase';
import { DeletarLancamentoUseCase } from '../application/usecases/carteira/deletar-lancamento.usecase';
import { DateUtils } from '../domain/shared/data.utils';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';

@ApiTags('carteiras')
@ApiCookieAuth('access_token')
@Controller('carteira')
export class CarteiraController {
  constructor(
    private readonly adicionarLancamentoUseCase: AdicionarLancamentoUseCase,
    private readonly atualizarLancamentoUseCase: AtualizarLancamentoUseCase,
    private readonly deletarLancamentoUseCase: DeletarLancamentoUseCase,
    private readonly buscarSaldoMensalQuery: BuscarSaldoMensalQuery,
    private readonly buscarTodosLancamentosQuery: BuscarTodosLancamentosQuery,
    private readonly buscarLancamentoPorIdQuery: BuscarLancamentoPorIdQuery,
    private readonly filtrarLancamentosQuery: FiltrarLancamentosQuery,
    private readonly buscarGastosMensaisQuery: BuscarGastosMensaisQuery,
  ) {}

  @ApiOperation({ summary: 'Buscar saldo mensal da carteira' })
  @ApiResponse({
    status: 200,
    description: 'Saldo retornado',
    type: SaldoMensalDto,
  })
  @ApiParam({ name: 'idCarteira', description: 'ID da carteira' })
  @ApiQuery({
    name: 'data',
    description: 'Data no formato YYYY-MM',
    example: '2023-01',
  })
  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Get('/:idCarteira')
  async buscarSaldoMensal(
    @Param('idCarteira') id: string,
    @Query('data') data: string,
  ): Promise<SaldoMensalDto> {
    return this.buscarSaldoMensalQuery.execute(id, data);
  }

  @ApiOperation({ summary: 'Buscar todos os lançamentos da carteira' })
  @ApiResponse({
    status: 200,
    description: 'Lançamentos retornados',
    type: LancamentosPaginadosDto,
  })
  @ApiParam({ name: 'idCarteira', description: 'ID da carteira' })
  @ApiQuery({ name: 'pagina', description: 'Número da página', example: '1' })
  @ApiQuery({
    name: 'itensPorPagina',
    description: 'Itens por página',
    example: '10',
  })
  @UseGuards(ThrottlerGuard, JwtAuthGuard)
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

  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Get('/:idCarteira/lancamentos/filtrar')
  async filtrarLancamentos(
    @Param('idCarteira') idCarteira: string,
    @Query('dataInicial') dataInicial?: string,
    @Query('dataFinal') dataFinal?: string,
    @Query('idCategoria') idCategoria?: string,
    @Query('titulo') titulo?: string,
    @Query('tipoTransacao') tipoTransacao?: 'entrada' | 'saida' | 'todos',
    @Query('pagina') pagina: string = '1',
    @Query('itensPorPagina') itensPorPagina: string = '10',
  ): Promise<LancamentosPaginadosDto> {
    const filtros: FiltrarLancamentosDto = {
      dataInicial,
      dataFinal,
      idCategoria: idCategoria ? parseInt(idCategoria, 10) : undefined,
      titulo,
      tipoTransacao: tipoTransacao || 'todos',
      pagina: parseInt(pagina, 10),
      itensPorPagina: parseInt(itensPorPagina, 10),
    };

    return this.filtrarLancamentosQuery.execute(idCarteira, filtros);
  }

  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Get('/:idCarteira/gastos-mensais')
  async buscarGastosMensais(
    @Param('idCarteira') idCarteira: string,
    @Query('mes') mes: string,
  ): Promise<GastosMensaisDto> {
    return this.buscarGastosMensaisQuery.execute(idCarteira, mes);
  }

  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Post('/:idCarteira/lancamento')
  async adicionarLancamento(
    @Param('idCarteira') idCarteira: string,
    @Body(ValidationPipe)
    body: {
      idCategoria: number;
      tipoTransacao: tipoTransacao;
      valor: number;
      titulo: string;
      descricao?: string;
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

  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Get('/:idCarteira/lancamento/:idLancamento')
  async buscarLancamentoPorId(
    @Param('idCarteira') idCarteira: string,
    @Param('idLancamento') idLancamento: string,
  ): Promise<LancamentoDto> {
    return this.buscarLancamentoPorIdQuery.execute(idCarteira, idLancamento);
  }

  @UseGuards(ThrottlerGuard, JwtAuthGuard)
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

  @UseGuards(ThrottlerGuard, JwtAuthGuard)
  @Delete('/:idCarteira/lancamento/:idLancamento')
  async deletarLancamento(
    @Param('idCarteira') idCarteira: string,
    @Param('idLancamento') idLancamento: string,
  ): Promise<{ message: string }> {
    await this.deletarLancamentoUseCase.execute(idCarteira, idLancamento);

    return { message: 'Lançamento excluído com sucesso' };
  }
}
