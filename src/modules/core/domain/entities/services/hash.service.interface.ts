export interface HashService {
  hash(senha: string): Promise<string>;
  compare(senha: string, hash: string): Promise<boolean>;
}