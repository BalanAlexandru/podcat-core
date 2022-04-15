import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';

const TEST_PASSWORD = "testPassword"

describe('HasingService', () => {
  let service: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [HashingService],
    }).compile();

    service = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash a text', async () => {
    const hashedPassword = await service.hashPassword(TEST_PASSWORD)

    expect(hashedPassword).toBeDefined()
    expect(hashedPassword.hash).toBeDefined()
    expect(hashedPassword.salt).toBeDefined()
  });
});
