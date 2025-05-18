import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './evaluacion.entity';
import { Proyecto } from '../Proyecto/proyecto.entity';
import { Profesor } from '../Profesor/profesor.entity';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion, Proyecto, Profesor])],
  providers: [EvaluacionService],
  controllers: [EvaluacionController],
  exports: [EvaluacionService],
})
export class EvaluacionModule {}
