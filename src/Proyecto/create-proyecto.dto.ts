import { IsInt, IsString, MinLength, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProyectoDto {
  @IsString()
  @MinLength(16, { message: 'El título debe tener más de 15 caracteres.' })
  titulo: string;

  @IsString()
  area: string;

  @IsInt()
  @Min(1, { message: 'El presupuesto debe ser mayor a 0.' })
  presupuesto: number;

  @IsInt()
  notaFinal: number;

  @IsInt()
  estado: number;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsInt()
  liderId: number;
}
