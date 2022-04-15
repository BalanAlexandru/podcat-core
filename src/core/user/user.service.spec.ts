import { Test, TestingModule } from '@nestjs/testing';
import { HashingModule } from 'src/shared/utils/hashing/hashing.module';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  const mockUserModel = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HashingModule],
      providers: [UserService, { provide: getModelToken(User.name), useValue: mockUserModel }],
    })
    .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
