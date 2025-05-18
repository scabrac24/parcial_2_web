import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proyecto } from './proyecto.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const mockProyectoRepo = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
});

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repo: Repository<Proyecto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(Proyecto),
          useFactory: mockProyectoRepo,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repo = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
  });

  it('debería lanzar error si el presupuesto es <= 0', async () => {
    const dto = {
    titulo: 'Proyecto de Investigación en IA',
    area: 'IA',
    presupuesto: 0,
    estado: 0,
    fechaInicio: '2024-01-01',
    fechaFin: '2024-12-31',
    notaFinal: 4,         
    liderId: 1};          
    await expect(service.crearProyecto(dto)).rejects.toThrow(BadRequestException);
  });

  it('debería lanzar error si el título es muy corto', async () => {
    const dto = {
    titulo: 'Corto',
    area: 'IA',
    presupuesto: 50000,
    estado: 0,
    fechaInicio: '2024-01-01',
    fechaFin: '2024-12-31',
    notaFinal: 4,         
    liderId: 1};          
    await expect(service.crearProyecto(dto)).rejects.toThrow(BadRequestException);
  });
});