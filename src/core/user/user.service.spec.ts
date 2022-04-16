import { Test, TestingModule } from '@nestjs/testing';
import { HashingModule } from 'src/shared/utils/hashing/hashing.module';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import faker from '@faker-js/faker';
import { CreateUserInput } from './dto/create-user.input';
import { UserInputError } from 'apollo-server-express';
import { EntityNotFoundError } from 'src/shared/graphql/errors/entity-not-found.error';

const mockUserDocument = {
  id: faker.random.alphaNumeric(24),
  email: faker.internet.email(),
  password: faker.internet.password(20),
  salt: faker.random.alphaNumeric(32),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
}

class MockModel {
  static mockModel = new MockModel()

  constructor() {
    return MockModel.mockModel
  }

  save = jest.fn().mockResolvedValue(mockUserDocument)

  static findById = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUserDocument)
  })

  static findByIdAndUpdate = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUserDocument)
  })

  static findByIdAndDelete = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUserDocument)
  })
}

const input = new CreateUserInput()
input.email = mockUserDocument.email
input.password = mockUserDocument.password

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HashingModule],
      providers: [UserService, { provide: getModelToken(User.name), useValue: MockModel }],
    })
    .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create user when data is correct", async () => {
    const output = await service.create(input)

    expect(output).toBeDefined()
    expect(MockModel.mockModel.save).toBeCalled()
  })

  it("should throw exception when save fails", async () => {
    MockModel.mockModel.save = jest.fn(() => {return Promise.reject({ message: "This test should fail" })})

    await expect(service.create(input)).rejects.toThrowError(UserInputError)
    await expect(service.create(input)).rejects.toThrowError("This test should fail")
  })

  it("should find user when calling findOne if the id exists", async () => {
    const output = await service.findOne(mockUserDocument.id)

    expect(output).toBeDefined()
  })

  it("should throw exception when calling findOne if input is not valid", async () => {
    MockModel.findById = jest.fn(() => { return { exec: jest.fn().mockRejectedValue({ message: "This call should fail" }) } })

    await expect(service.findOne(mockUserDocument.id)).rejects.toThrowError(UserInputError)
    await expect(service.findOne(mockUserDocument.id)).rejects.toThrowError("This call should fail")
  })

  it("should throw exception when calling findOne if there's no entity found", async() => {
    MockModel.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(undefined)
    })

    await expect(service.findOne(mockUserDocument.id)).rejects.toThrowError(EntityNotFoundError)
    await expect(service.findOne(mockUserDocument.id)).rejects.toThrowError(`No user with id ${mockUserDocument.id} exists`)
  })

  it("should update user when calling update if the id exists", async () => {
    const output = await service.update(mockUserDocument.id, mockUserDocument)

    expect(output).toBeDefined()
  })

  it("should throw exception when calling update if input is not valid", async () => {
    MockModel.findByIdAndUpdate = jest.fn(() => { return { exec: jest.fn().mockRejectedValue({ message: "This call should fail" }) } })

    await expect(service.update(mockUserDocument.id, mockUserDocument)).rejects.toThrowError(UserInputError)
    await expect(service.update(mockUserDocument.id, mockUserDocument)).rejects.toThrowError("This call should fail")
  })

  it("should delete user when calling remove if the id exists", async () => {
    const output = await service.remove(mockUserDocument.id)

    expect(output).toBeDefined()
  })

  it("should throw exception when calling remove if input is not valid", async () => {
    MockModel.findByIdAndDelete = jest.fn(() => { return { exec: jest.fn().mockRejectedValue({ message: "This call should fail" }) } })

    await expect(service.remove(mockUserDocument.id)).rejects.toThrowError(UserInputError)
    await expect(service.remove(mockUserDocument.id)).rejects.toThrowError("This call should fail")
  })
});
