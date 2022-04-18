import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserOutput } from './dto/user.output';
import { HashedText, HashingService } from 'src/shared/utils/hashing/hashing.service';
import { UserInputError } from 'apollo-server-express'
import { EntityNotFoundError } from 'src/shared/graphql/errors/entity-not-found.error';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly hashingService: HashingService
  ){}

  async create(createUserInput: CreateUserInput): Promise<UserOutput> {
    const hashedPassword: HashedText = await this.hashingService.hashPassword(createUserInput.password)

    createUserInput.password = hashedPassword.hash
    createUserInput.salt = hashedPassword.salt

    const userDoc: UserDocument = await new this.userModel(createUserInput).save()
      .catch(reason => {
        throw new UserInputError(reason.message)
      })
    
    return UserOutput.fromEntity(userDoc);
  }

  async findOne(id: string): Promise<UserOutput> {
    const foundUserDoc = await this.userModel.findById(id).exec()
      .catch(reason => {
        throw new UserInputError(reason.message)
      })

    if (!foundUserDoc) {
      throw new EntityNotFoundError(`No user with id ${id} exists`)
    }

    return UserOutput.fromEntity(foundUserDoc)
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<UserOutput> {
    const updatedUserDoc = await this.userModel
      .findByIdAndUpdate(id, { firstName: updateUserInput.firstName, lastName: updateUserInput.lastName })
      .exec()
      .catch(reason => {
        throw new UserInputError(reason.message)
      })

    return UserOutput.fromEntity(updatedUserDoc)
  }

  async remove(id: string): Promise<UserOutput> {
    const deletedUserDoc = await this.userModel.findByIdAndDelete(id).exec()
      .catch(reason => {
        throw new UserInputError(reason.message)
      })

    return UserOutput.fromEntity(deletedUserDoc)
  }
}
