import { Controller, Post, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './create-estudiante.dto';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  create(@Body() dto: CreateEstudianteDto) {
    return this.estudianteService.crearEstudiante(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.estudianteService.eliminarEstudiante(id);
  }
}
