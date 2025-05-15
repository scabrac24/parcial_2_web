import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Proyecto } from '../Proyecto/proyecto.entity';
import { Profesor } from '../Profesor/profesor.entity';

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proyecto, proyecto => proyecto.evaluaciones)
  proyecto: Proyecto;

  @ManyToOne(() => Profesor, profesor => profesor.evaluaciones)
  profesor: Profesor;
}
