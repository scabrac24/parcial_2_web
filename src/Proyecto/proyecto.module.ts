import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { Estudiante } from '../Estudiante/estudiante.entity';
import { Profesor } from '../Profesor/profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Estudiante, Profesor])],
  providers: [ProyectoService],
  controllers: [ProyectoController],
  exports: [ProyectoService],
})
export class ProyectoModule {}
