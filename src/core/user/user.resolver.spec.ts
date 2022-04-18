import faker from '@faker-js/faker';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { HashingModule } from 'src/shared/utils/hashing/hashing.module';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserOutput } from './dto/user.output';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  class MockModel {
    static mockModel = new MockModel()
  
    constructor() {
      return MockModel.mockModel
    }
  }

  const createUserInput: CreateUserInput = {
    email: faker.internet.email(),
    password: faker.internet.password(32),
    salt: ""
  }

  const updateUserInput: UpdateUserInput = {
    id: faker.random.alphaNumeric(24),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }

  const outputUser: UserOutput = {
    id: faker.random.alphaNumeric(24),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HashingModule],
      providers: [UserResolver, UserService, { provide: getModelToken(User.name), useValue: MockModel }],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create user', () => {
    service.create = jest.fn().mockReturnValue(outputUser)

    const output = resolver.createUser(createUserInput)

    expect(output).toBeDefined()
  })

  it('should find user', () => {
    service.findOne = jest.fn().mockReturnValue(outputUser)

    const output = resolver.findOne(outputUser.id)

    expect(output).toBeDefined()
  })

  it('should update user', () => {
    service.update = jest.fn().mockReturnValue(outputUser)

    const output = resolver.updateUser(updateUserInput)

    expect(output).toBeDefined()
  })

  it('should create user', () => {
    service.remove = jest.fn().mockReturnValue(outputUser)

    const output = resolver.removeUser(outputUser.id)

    expect(output).toBeDefined()
  })
});
