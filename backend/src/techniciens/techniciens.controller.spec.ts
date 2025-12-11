import { Test, TestingModule } from '@nestjs/testing';
import { TechniciensController } from './techniciens.controller';

describe('TechniciensController', () => {
  let controller: TechniciensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechniciensController],
    }).compile();

    controller = module.get<TechniciensController>(TechniciensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
