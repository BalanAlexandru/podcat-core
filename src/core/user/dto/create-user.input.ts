import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: "The password of the user" })
  password: string;

  salt: string;
}
