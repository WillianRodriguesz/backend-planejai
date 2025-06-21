
export interface LoginResponseDto {
  id: string;
  email: string;
  nome: string;
  token?: string; 
}

//define a estrutura dos dados retornados ao cliente após a autenticação (response DTO).