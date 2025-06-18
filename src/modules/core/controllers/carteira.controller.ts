import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BuscarCarteiraUseCase } from '../application/usecases/carteira/busca-carteira-id.usecase';

@Controller('carteira')
export class CarteiraController {
  constructor(private readonly buscarCarteiraUseCase: BuscarCarteiraUseCase) {}

  @Get(':id')
  async listarPorId(@Param('id') id: string) {
    return this.buscarCarteiraUseCase.execute(id);
  }

}
