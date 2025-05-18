import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionService } from './evaluacion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Evaluacion } from './evaluacion.entity';
import { Proyecto } from '../Proyecto/proyecto.entity';
import { Profesor } from '../Profesor/profesor.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const mockRepo = () => ({ findOne: jest.fn(), save: jest.fn() });

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let evaluacionRepo: Repository<Evaluacion>;
  let proyectoRepo: Repository<Proyecto>;
  let profesorRepo: Repository<Profesor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluacionService,
        { provide: getRepositoryToken(Evaluacion), useFactory: mockRepo },
        { provide: getRepositoryToken(Proyecto), useFactory: mockRepo },
        { provide: getRepositoryToken(Profesor), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    evaluacionRepo = module.get(getRepositoryToken(Evaluacion));
    proyectoRepo = module.get(getRepositoryToken(Proyecto));
    profesorRepo = module.get(getRepositoryToken(Profesor));
  });

  it('debería lanzar error si evaluador es mentor', async () => {
    proyectoRepo.findOne = jest.fn().mockResolvedValue({ mentores: [{ id: 1 }] });
    profesorRepo.findOne = jest.fn().mockResolvedValue({ id: 1 });

    await expect(
      service.crearEvaluacion({ proyectoId: 1, profesorId: 1, nota: 4 })
    ).rejects.toThrow(BadRequestException);
  });
});
