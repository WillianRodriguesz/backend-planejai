export interface UsuarioDto{
  id: string;
  nome: string;
  email: string;
  senha?: string; 
  id_carteira?: string;
}