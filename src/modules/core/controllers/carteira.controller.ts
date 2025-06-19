import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BuscarCarteiraPorIdUseCase } from '../application/usecases/carteira/buscar-carteira-id.usecase';
import { ListarCarteirasUseCase } from '../application/usecases/carteira/listar-carteiras.usecase';
import { CarteiraDto } from '../application/dtos/carteira/carteira.dto';

@Controller('carteira')
export class CarteiraController {
  constructor(
    private readonly buscarCarteiraPorIdUseCase: BuscarCarteiraPorIdUseCase,
    private readonly listarCarteirasUseCase: ListarCarteirasUseCase,
  ) {}

  @Get(':id')
  async listarPorId(@Param('id') id: string): Promise<CarteiraDto> {
    return this.buscarCarteiraPorIdUseCase.execute(id);
  }

  @Get('listar')
  async listarTodas(): Promise<CarteiraDto[]> {
    return this.listarCarteirasUseCase.execute();
  }
}
