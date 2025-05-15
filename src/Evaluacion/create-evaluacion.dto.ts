import { IsInt, Min, Max } from 'class-validator';

export class CreateEvaluacionDto {
  @IsInt()
  proyectoId: number;

  @IsInt()
  profesorId: number;

  @IsInt()
  @Min(0)
  @Max(5)
  nota: number;
}
