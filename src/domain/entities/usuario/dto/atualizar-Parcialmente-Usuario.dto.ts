import { CriarUsuarioDto } from "./criar-usuario.dto";
import { PartialType } from "@nestjs/mapped-types";

export class AtualizarParcialmenteUsuarioDto extends PartialType( CriarUsuarioDto ) {

}