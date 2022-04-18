import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: 'First name of the user' })
  firstName: string;

  @Field(() => String, { description: 'Last name of the user' })
  lastName: string;
}
