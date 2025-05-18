import { Controller, Post, Param, Patch, Get, Body } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './create-proyecto.dto';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  create(@Body() dto: CreateProyectoDto) {
    return this.proyectoService.crearProyecto(dto);
  }

  @Patch(':id/avanzar')
  avanzar(@Param('id') id: number) {
    return this.proyectoService.avanzarProyecto(id);
  }

  @Get(':id/estudiantes')
  getEstudiantes(@Param('id') id: number) {
    return this.proyectoService.findAllEstudiantes(id);
  }
}
