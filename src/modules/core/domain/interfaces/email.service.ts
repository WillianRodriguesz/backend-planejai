export interface EmailService {
  enviarCodigoVerificacao(email: string, codigo: string): Promise<void>;
  enviarTokenRedefinicaoSenha(email: string, token: string): Promise<void>;
}
