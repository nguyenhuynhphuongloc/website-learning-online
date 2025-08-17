import { Test, TestingModule } from '@nestjs/testing';
import { ResultReadingService } from './result-reading.service';

describe('ResultReadingService', () => {
  let service: ResultReadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultReadingService],
    }).compile();

    service = module.get<ResultReadingService>(ResultReadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
