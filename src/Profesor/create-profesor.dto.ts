import { IsInt, IsString, IsBoolean, Length } from 'class-validator';

export class CreateProfesorDto {
  @IsInt()
  cedula: number;

  @IsString()
  nombre: string;

  @IsString()
  departamento: string;

  @IsInt()
  @Length(5, 5, { message: 'La extensión debe tener exactamente 5 dígitos.' })
  extension: number;

  @IsBoolean()
  esParEvaluador: boolean;
}
