import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const MAX_NAME_LENGTH: number = 256;

export type UserDocument = User & Document;

@ObjectType()
export class User {

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ length: MAX_NAME_LENGTH })
  firstName: string;

  @Prop({ length: MAX_NAME_LENGTH })
  lastName: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User)