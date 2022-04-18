import { UserService } from 'src/core/user/user.service';
import { AutzGuard } from './autz.guard';

const mockUserService = {
  userModel: undefined,
  hashingService: undefined,
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  getToken: jest.fn()
}

describe('AutzGuard', () => {

  it('should be defined', () => {
    expect(new AutzGuard(mockUserService as unknown as UserService)).toBeDefined();
  });

});
