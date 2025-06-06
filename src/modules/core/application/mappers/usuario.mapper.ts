import { Usuario } from "../../domain/entities/usuario/usuario.entity";
import { CriarUsuarioDto } from "../dtos/usuario/criar-usuario.dto";
import { UsuarioDto } from "../dtos/usuario/usuario.dto";

export class UsuarioMapper {
    static toDto(usuario: Usuario): UsuarioDto{
        return new UsuarioDto(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail()    
        );
    }

    static toDtoList(usuarios: Usuario[]): UsuarioDto[]{
        return usuarios.map(usuario => UsuarioMapper.toDto(usuario));

    }

}