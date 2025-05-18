import { Controller, Post, Body } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { CreateEvaluacionDto } from './create-evaluacion.dto';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  create(@Body() dto: CreateEvaluacionDto) {
    return this.evaluacionService.crearEvaluacion(dto);
  }
}
