export interface TokenService {
  gerarToken(): TokenData;
  hashToken(token: string): string;
  validarFormatoToken(token: string): string | null;
  tokenExpirado(dataExpiracao: Date): boolean;
}

export interface TokenData {
  token: string;
  tokenHash: string;
}
