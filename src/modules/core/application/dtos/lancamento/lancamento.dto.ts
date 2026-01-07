export interface LancamentoDto {
  id: string;
  titulo: string;
  descricao: string;
  valor: number;
  tipoTransacao: 'entrada' | 'saida';
  data: Date;
  categoria: {
    id: number;
    nome: string;
  };
}
