import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

//implements HashService
@Injectable()
export class BcryptHashService {
  private readonly saltRounds = 10;

  async hash(senha: string): Promise<string> {
    return bcrypt.hash(senha, this.saltRounds);
  }

  async compare(senha: string, hash: string): Promise<boolean> {
    return bcrypt.compare(senha, hash);
  }
}