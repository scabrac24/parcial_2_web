import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Proyecto } from '../Proyecto/proyecto.entity';
import { Evaluacion } from '../Evaluacion/evaluacion.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column()
  extension: number;

  @Column()
  esParEvaluador: boolean;

  @ManyToMany(() => Proyecto, proyecto => proyecto.mentores)
  mentorias: Proyecto[];

  @OneToMany(() => Evaluacion, evaluacion => evaluacion.profesor)
  evaluaciones: Evaluacion[]; 
}
