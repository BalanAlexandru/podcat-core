import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const MAX_NAME_LENGTH: number = 256;

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {

  @Field(() => String, { description: 'Email of the user' })
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => String, { description: "The password of the user" })
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Field(() => String, { description: 'First name of the user' })
  @Prop({ length: MAX_NAME_LENGTH })
  firstName: string;

  @Field(() => String, { description: 'Last name of the user' })
  @Prop({ length: MAX_NAME_LENGTH })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User)