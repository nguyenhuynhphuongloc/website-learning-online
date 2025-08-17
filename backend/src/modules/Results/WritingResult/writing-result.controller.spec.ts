import { Test, TestingModule } from '@nestjs/testing';
import { WritingResultController } from './writing-result.controller';
import { WritingResultService } from './writing-result.service';

describe('WritingResultController', () => {
  let controller: WritingResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WritingResultController],
      providers: [WritingResultService],
    }).compile();

    controller = module.get<WritingResultController>(WritingResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
