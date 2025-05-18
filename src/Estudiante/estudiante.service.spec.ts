import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estudiante } from './estudiante.entity';
import { Proyecto } from '../Proyecto/proyecto.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const mockEstudianteRepo = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

const mockProyectoRepo = () => ({
  findOne: jest.fn(),
});

describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudianteRepo: Repository<Estudiante>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(Estudiante),
          useFactory: mockEstudianteRepo,
        },
        {
          provide: getRepositoryToken(Proyecto),
          useFactory: mockProyectoRepo,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    estudianteRepo = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
  });

  describe('crearEstudiante', () => {
    it('debería crear un estudiante válido', async () => {
      const dto = { cedula: 123, nombre: 'Juan', semestre: 5, programa: 'Ing', promedio: 3.5 };
      const estudianteMock = { id: 1, ...dto };

      jest.spyOn(estudianteRepo, 'save').mockResolvedValue(estudianteMock as Estudiante);

      const result = await service.crearEstudiante(dto);
      expect(result).toEqual(estudianteMock);
    });

    it('debería lanzar error si promedio < 3.2', async () => {
      const dto = { cedula: 123, nombre: 'Ana', semestre: 5, programa: 'Ing', promedio: 3.0 };
      await expect(service.crearEstudiante(dto)).rejects.toThrow(BadRequestException);
    });

    it('debería lanzar error si semestre < 4', async () => {
      const dto = { cedula: 123, nombre: 'Luis', semestre: 2, programa: 'Ing', promedio: 3.8 };
      await expect(service.crearEstudiante(dto)).rejects.toThrow(BadRequestException);
    });
  });
});
