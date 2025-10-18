import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { CarteiraDto } from '../application/dtos/carteira/carteira.dto';
import { AdicionarLancamentoDto } from '../application/dtos/lancamento/adicionar-lancamento.dto';
import {
  AdicionarLancamentoUseCase,
  AdicionarLancamentoUseCaseProps,
} from '../application/usecases/carteira/adicionar-lancamento.usecase';
import { Categoria } from 'src/modules/core/domain/categoria';

@Controller('carteira')
export class CarteiraController {
  constructor(
    private readonly adicionarLancamentoUseCase: AdicionarLancamentoUseCase,
  ) {}

  // @Get('/:idCarteira/saldo-mensal')
  // async listarPorId(
  //   @Param('idCarteira') id: string,
  //   @Query('data') data: string,
  // ): Promise<CarteiraDto> {
  //   return this.buscarSaldoMensalQuery.execute(id, data);
  // }

  @Post('/:idCarteira/novo-lancamento')
  async adicionarLancamento(
    @Param('idCarteira') idCarteira: string,
    @Body(ValidationPipe)
    body: {
      idCategoria: number;
      valor: number;
      descricao: string;
      data: string;
    },
  ): Promise<{ message: string }> {
    await this.adicionarLancamentoUseCase.execute({
      idCarteira,
      idCategoria: body.idCategoria,
      valor: body.valor,
      descricao: body.descricao,
      data: new Date(body.data),
    });

    return { message: 'Lançamento adicionado com sucesso' };
  }
}
