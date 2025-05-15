import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable
} from 'typeorm';
import { Estudiante } from '../Estudiante/estudiante.entity';
import { Profesor } from '../Profesor/profesor.entity';
import { Evaluacion } from '../Evaluacion/evaluacion.entity';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column()
  presupuesto: number;

  @Column()
  notaFinal: number;

  @Column()
  estado: number;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFin: string;

  @ManyToOne(() => Estudiante, estudiante => estudiante.proyectos)
  lider: Estudiante;

  @ManyToMany(() => Profesor, profesor => profesor.mentorias)
  @JoinTable()
  mentores: Profesor[];

  @OneToMany(() => Evaluacion, evaluacion => evaluacion.proyecto)
  evaluaciones: Evaluacion[];
}

