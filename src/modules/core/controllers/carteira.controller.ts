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
import { BuscarSaldoMensalQuery } from '../application/queries/carteira/buscar-saldo-mensal.query';
import {
  AdicionarLancamentoUseCase,
  tipoTransacao,
} from '../application/usecases/carteira/adicionar-lancamento.usecase';

@Controller('carteira')
export class CarteiraController {
  constructor(
    private readonly adicionarLancamentoUseCase: AdicionarLancamentoUseCase,
    private readonly buscarSaldoMensalQuery: BuscarSaldoMensalQuery,
  ) {}

  @Get('/:idCarteira/saldo-mensal')
  async buscarSaldoMensal(
    @Param('idCarteira') id: string,
    @Query('data') data: string,
  ): Promise<SaldoMensalDto> {
    return this.buscarSaldoMensalQuery.execute(id, data);
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
      data: new Date(body.data),
    });

    return { message: 'Lançamento adicionado com sucesso' };
  }
}
