import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserOutput } from './dto/user.output';
import { HashedText, HashingService } from 'src/shared/utils/hashing/hashing.service';

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
    
    return UserOutput.fromEntity(userDoc);
  }

  async findOne(id: string): Promise<UserOutput> {
    const foundUserDoc = await this.userModel.findById(id).exec()

    return UserOutput.fromEntity(foundUserDoc)
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<UserOutput> {
    const updatedUserDoc = await this.userModel
      .findByIdAndUpdate(id, { firstName: updateUserInput.firstName, lastName: updateUserInput.lastName })
      .exec()

    return UserOutput.fromEntity(updatedUserDoc)
  }

  async remove(id: string): Promise<UserOutput> {
    const deletedUserDoc = await this.userModel.findByIdAndDelete(id).exec()

    return UserOutput.fromEntity(deletedUserDoc)
  }
}
