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
import { AdicionarLancamentoUseCase, AdicionarLancamentoUseCaseProps } from '../application/usecases/carteira/adicionar-lancamento.usecase';
import { Categoria } from 'src/modules/core/domain/categoria';

@Controller('carteira')
export class CarteiraController {
  constructor(
    private readonly buscarSaldoMensalQuery: any, // Temporário
    private readonly adicionarLancamentoUseCase: AdicionarLancamentoUseCase,
  ) {}

  @Get('/:idCarteira/saldo-mensal')
  async listarPorId(
    @Param('idCarteira') id: string,
    @Query('data') data: string,
  ): Promise<CarteiraDto> {
    return this.buscarSaldoMensalQuery.execute(id, data);
  }

  @Post('carteira/:idCarteira/novo-lancamento')
  async adicionarLancamento(
    @Param('idCarteira') idCarteira: string,
    @Body(ValidationPipe) props: AdicionarLancamentoUseCaseProps,
  ): Promise<{ message: string }> {
  
    await this.adicionarLancamentoUseCase.execute({
      idCarteira,
      idCategoria: props.idCategoria,
      valor: props.valor,
      descricao: props.descricao,
      data: props.data,
    });

    return { message: 'Lançamento adicionado com sucesso' };
  }
}
