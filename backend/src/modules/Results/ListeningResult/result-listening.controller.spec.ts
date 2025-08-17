import { Test, TestingModule } from '@nestjs/testing';
import { ResultListeningController } from './result-listening.controller';
import { ResultListeningService } from './result-listening.service';

describe('ResultListeningController', () => {
  let controller: ResultListeningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultListeningController],
      providers: [ResultListeningService],
    }).compile();

    controller = module.get<ResultListeningController>(ResultListeningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
