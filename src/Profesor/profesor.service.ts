import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfesorDto } from '../Profesor/create-profesor.dto';
import { Profesor } from './profesor.entity';
import { Evaluacion } from '../Evaluacion/evaluacion.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepo: Repository<Profesor>,

    @InjectRepository(Evaluacion)
    private evaluacionRepo: Repository<Evaluacion>,
  ) {}

  async crearProfesor(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    if (!/^\d{5}$/.test(createProfesorDto.extension.toString())) {
      throw new BadRequestException('La extensión debe tener exactamente 5 dígitos.');
    }
    return this.profesorRepo.save(createProfesorDto);
  }

  async asignarEvaluador(profesorId: number) {
    const evaluacionesActivas = await this.evaluacionRepo.count({
      where: {
        profesor: { id: profesorId },
       
      },
    });

    if (evaluacionesActivas >= 3) {
      throw new BadRequestException('El profesor ya tiene 3 evaluaciones activas.');
    }

    await this.profesorRepo.update(profesorId, { esParEvaluador: true });
  }
}
