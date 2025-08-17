import { Test, TestingModule } from '@nestjs/testing';
import { ResultListeningService } from './result-listening.service';

describe('ResultListeningService', () => {
  let service: ResultListeningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultListeningService],
    }).compile();

    service = module.get<ResultListeningService>(ResultListeningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
