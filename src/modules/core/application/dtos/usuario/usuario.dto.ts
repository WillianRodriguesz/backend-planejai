export interface UsuarioDto {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  avatar?: string;
  criadoEm?: Date;
}
