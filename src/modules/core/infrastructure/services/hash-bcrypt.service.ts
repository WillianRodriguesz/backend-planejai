import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashService } from '../../domain/entities/services/hash.service.interface';

@Injectable()
export class BcryptHashService implements HashService {
  private readonly saltRounds = 10;

  async hash(senha: string): Promise<string> {
    return bcrypt.hash(senha, this.saltRounds);
  }

  async compare(senha: string, hash: string): Promise<boolean> {
    return bcrypt.compare(senha, hash);
  }
}