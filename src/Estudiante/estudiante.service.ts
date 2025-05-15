import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CreateEstudianteDto } from '../Estudiante/create-estudiante.dto';
import { Estudiante } from './estudiante.entity';
import { Proyecto } from '../Proyecto/proyecto.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepo: Repository<Estudiante>,

    @InjectRepository(Proyecto)
    private proyectoRepo: Repository<Proyecto>,
  ) {}

  async crearEstudiante(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    if (createEstudianteDto.promedio <= 3.2 || createEstudianteDto.semestre < 4) {
      throw new BadRequestException('El promedio debe ser mayor a 3.2 y el semestre mayor o igual a 4.');
    }
    return this.estudianteRepo.save(createEstudianteDto);
  }

  async eliminarEstudiante(id: number) {
    const estudiante = await this.estudianteRepo.findOne({ where: { id } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

    const proyectosActivos = await this.proyectoRepo.count({
      where: { lider: { id }, estado: LessThan(4) },
    });

    if (proyectosActivos > 0) {
      throw new BadRequestException('No se puede eliminar. El estudiante tiene proyectos activos.');
    }

    return this.estudianteRepo.remove(estudiante);
  }
}
