import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class AtualizarAvatarDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  avatar: string;
}
