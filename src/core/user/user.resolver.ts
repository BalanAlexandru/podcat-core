import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserOutput } from './dto/user.output';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutput)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => UserOutput, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserOutput)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserOutput)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }
}
