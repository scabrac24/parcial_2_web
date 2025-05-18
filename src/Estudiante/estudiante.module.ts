import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './estudiante.entity';
import { Proyecto } from '../Proyecto/proyecto.entity';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Proyecto])],
  providers: [EstudianteService],
  controllers: [EstudianteController],
  exports: [EstudianteService],
})
export class EstudianteModule {}
