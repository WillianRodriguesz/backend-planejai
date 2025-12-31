import { Usuario } from '../../domain/usuario';
import { UsuarioDto } from '../dtos/usuario/usuario.dto';

export class UsuarioMapper {
  static DomainToDto(domain: Usuario): UsuarioDto {
    return {
      id: domain.getId(),
      nome: domain.getNome(),
      email: domain.getEmail(),
      telefone: domain.getTelefone(),
      criadoEm: domain.getCriadoEm(),
    };
  }

  static DomainToDtoList(domains: Usuario[]): UsuarioDto[] {
    return domains.map((domain) => this.DomainToDto(domain));
  }
}
