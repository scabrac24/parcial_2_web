import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateEstudianteDto {
  @IsInt()
  cedula: number;

  @IsString()
  @MinLength(1)
  nombre: string;

  @IsInt()
  @Min(1)
  semestre: number;

  @IsString()
  programa: string;

  @IsInt()
  promedio: number;
}
