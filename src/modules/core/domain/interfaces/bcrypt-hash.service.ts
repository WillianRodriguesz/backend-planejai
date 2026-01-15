export interface BcryptHashService {
  hash(senha: string): Promise<string>;
  compare(senha: string, hash: string): Promise<boolean>;
}
