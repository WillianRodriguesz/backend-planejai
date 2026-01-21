import { UsuarioConsentimento } from '../usuario-consentimento';

export interface UsuarioConsentimentoRepository {
  salvar(consentimento: UsuarioConsentimento): Promise<void>;
  buscarPorUsuarioId(usuarioId: string): Promise<UsuarioConsentimento | null>;
  buscarTodos(): Promise<UsuarioConsentimento[]>;
  atualizar(
    id: number,
    consentimento: Partial<UsuarioConsentimento>,
  ): Promise<void>;
  deletar(id: number): Promise<void>;
}
