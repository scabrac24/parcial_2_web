import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from './evaluacion.entity';
import { Proyecto } from '../Proyecto/proyecto.entity';
import { Profesor } from '../Profesor/profesor.entity';
import { CreateEvaluacionDto } from '../Evaluacion/create-evaluacion.dto';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private evaluacionRepo: Repository<Evaluacion>,

    @InjectRepository(Proyecto)
    private proyectoRepo: Repository<Proyecto>,

    @InjectRepository(Profesor)
    private profesorRepo: Repository<Profesor>,
  ) {}

  async crearEvaluacion(createEvaluacionDto: CreateEvaluacionDto): Promise<Evaluacion> {
  const proyecto = await this.proyectoRepo.findOne({
    where: { id: createEvaluacionDto.proyectoId },
    relations: ['mentores'],
  });

  if (!proyecto) {
    throw new BadRequestException('Proyecto no encontrado');
  }

  const evaluador = await this.profesorRepo.findOne({
    where: { id: createEvaluacionDto.profesorId },
  });

  if (!evaluador) {
    throw new BadRequestException('Profesor no encontrado');
  }

  const esMentor = proyecto.mentores.some(m => m.id === evaluador.id);
  if (esMentor) {
    throw new BadRequestException('El evaluador no puede ser mentor del proyecto.');
  }

  const evaluacion = this.evaluacionRepo.create({
    proyecto,
    profesor: evaluador,
  });

  return this.evaluacionRepo.save(evaluacion);
}

}

