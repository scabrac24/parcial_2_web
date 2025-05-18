import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './profesor.entity';
import { Evaluacion } from '../Evaluacion/evaluacion.entity';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor, Evaluacion])],
  providers: [ProfesorService],
  controllers: [ProfesorController],
  exports: [ProfesorService],
})
export class ProfesorModule {}
