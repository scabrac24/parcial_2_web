import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profesor } from './profesor.entity';
import { Evaluacion } from '../Evaluacion/evaluacion.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const mockProfesorRepo = () => ({
  save: jest.fn(),
  find: jest.fn(),
});

const mockEvaluacionRepo = () => ({
  find: jest.fn(),
});

describe('ProfesorService', () => {
  let service: ProfesorService;
  let profesorRepo: Repository<Profesor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorService,
        {
          provide: getRepositoryToken(Profesor),
          useFactory: mockProfesorRepo,
        },
        {
          provide: getRepositoryToken(Evaluacion),
          useFactory: mockEvaluacionRepo,
        },
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    profesorRepo = module.get<Repository<Profesor>>(getRepositoryToken(Profesor));
  });

  it('debería lanzar error si extensión no tiene 5 dígitos', async () => {
    const dto = { cedula: 111, nombre: 'Carlos', departamento: 'Sistemas', extension: 123, esParEvaluador: false };
    await expect(service.crearProfesor(dto)).rejects.toThrow(BadRequestException);
  });
});
