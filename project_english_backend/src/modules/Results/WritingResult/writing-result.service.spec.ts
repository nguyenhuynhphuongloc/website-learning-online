import { Test, TestingModule } from '@nestjs/testing';
import { WritingResultService } from './writing-result.service';

describe('WritingResultService', () => {
  let service: WritingResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WritingResultService],
    }).compile();

    service = module.get<WritingResultService>(WritingResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
