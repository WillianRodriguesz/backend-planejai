import { PartialType } from "@nestjs/mapped-types";
import { CriarUsuarioDto } from "./criar-usuario.dto";

export class AtualizarParcialmenteUsuarioDto extends PartialType( CriarUsuarioDto ) {

}