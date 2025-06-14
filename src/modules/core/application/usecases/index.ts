import { CarteiraUseCases } from "./carteira";
import { UsuarioUseCases } from "./usuario";

export const CoreUseCases = [...UsuarioUseCases, ...CarteiraUseCases];
