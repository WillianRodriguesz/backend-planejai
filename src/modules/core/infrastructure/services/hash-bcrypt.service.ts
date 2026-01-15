import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BcryptHashService } from '../../domain/interfaces/bcrypt-hash.service';

//implements HashService
@Injectable()
export class BcryptHashServiceImpl implements BcryptHashService {
  private readonly saltRounds = 10;

  async hash(senha: string): Promise<string> {
    return bcrypt.hash(senha, this.saltRounds);
  }

  async compare(senha: string, hash: string): Promise<boolean> {
    return bcrypt.compare(senha, hash);
  }
}
