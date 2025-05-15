import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from '../Proyecto/create-proyecto.dto';
import { Proyecto } from './proyecto.entity';
import { Estudiante } from '../Estudiante/estudiante.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepo: Repository<Proyecto>,
  ) {}

  async crearProyecto(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    if (createProyectoDto.presupuesto <= 0) {
      throw new BadRequestException('El presupuesto debe ser mayor a 0.');
    }

    if (createProyectoDto.titulo.length <= 15) {
      throw new BadRequestException('El título debe tener más de 15 caracteres.');
    }

    return this.proyectoRepo.save(createProyectoDto);
  }

  async avanzarProyecto(id: number) {
    const proyecto = await this.proyectoRepo.findOne({ where: { id } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    if (proyecto.estado >= 4) {
      throw new BadRequestException('El proyecto ya está en su estado máximo.');
    }

    proyecto.estado += 1;
    return this.proyectoRepo.save(proyecto);
  }

  async findAllEstudiantes(id: number): Promise<Estudiante[]> {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id },
      relations: ['lider'],
    });

    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    return [proyecto.lider]; 
  }
}
