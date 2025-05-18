import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './Estudiante/estudiante.entity';
import { EstudianteModule } from './Estudiante/estudiante.module';
import { Profesor } from './Profesor/profesor.entity';
import { ProfesorModule } from './Profesor/profesor.module';
import { Proyecto } from './Proyecto/proyecto.entity';
import { ProyectoModule } from './Proyecto/proyecto.module';
import { Evaluacion } from './Evaluacion/evaluacion.entity';
import { EvaluacionModule } from './Evaluacion/evaluacion.module';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'parcial',
      username: 'postgres',
      password: 'Sofia03102008//',
      host: 'localhost',
      port: 5432,
      entities: [Estudiante, Profesor, Proyecto, Evaluacion],
      synchronize: true,
      dropSchema: true,
    }),
    EstudianteModule,
    ProfesorModule,
    ProyectoModule,
    EvaluacionModule,
  ],
})
export class AppModule {}

