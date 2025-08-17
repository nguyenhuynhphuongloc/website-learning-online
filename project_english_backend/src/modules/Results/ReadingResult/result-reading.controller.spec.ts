import { Test, TestingModule } from '@nestjs/testing';
import { ResultReadingController } from './result-reading.controller';
import { ResultReadingService } from './result-reading.service';

describe('ResultReadingController', () => {
  let controller: ResultReadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultReadingController],
      providers: [ResultReadingService],
    }).compile();

    controller = module.get<ResultReadingController>(ResultReadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
