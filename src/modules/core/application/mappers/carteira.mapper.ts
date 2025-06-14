import { Injectable } from '@nestjs/common';
import { Carteira } from '../../domain/entities/carteira/carteira.entity';
import { CarteiraModel } from '../../infrastructure/models/carteira.model';
import { CarteiraDto } from '../dtos/carteira/carteira.dto';

export class CarteiraMapper {
  static domainToDto(domain: Carteira): CarteiraDto {
    return {
      id: domain.getId(),
      idUsuario: domain.getIdUsuario(),
      saldo: domain.getSaldo().getValor(),
    };
  }
}
