import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './create-profesor.dto';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() dto: CreateProfesorDto) {
    return this.profesorService.crearProfesor(dto);
  }

  @Patch(':id/asignar-evaluador')
  asignarEvaluador(@Param('id') id: number) {
    return this.profesorService.asignarEvaluador(id);
  }
}
