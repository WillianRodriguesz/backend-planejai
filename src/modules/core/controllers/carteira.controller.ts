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

@Controller('carteira')
export class CarteiraController {
  constructor(
    private readonly buscarSaldoMensalQuery: BuscarSaldoMensalQuery,
  ) {}

  @Get('/:idCarteira/saldo-mensal')
  async listarPorId(@Param('idCarteira') id: string, @Query('data') data: string): Promise<CarteiraDto> {
    return this.buscarSaldoMensalQuery.execute(id, data);
  }
}
