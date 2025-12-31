export interface UsuarioDto {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  criadoEm?: Date;
}
