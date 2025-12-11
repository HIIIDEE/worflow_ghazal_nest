import { Test, TestingModule } from '@nestjs/testing';
import { TechniciensService } from './techniciens.service';

describe('TechniciensService', () => {
  let service: TechniciensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechniciensService],
    }).compile();

    service = module.get<TechniciensService>(TechniciensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
