import { InputType, Field } from '@nestjs/graphql';
import { faker } from '@faker-js/faker';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: 'First name of the user' })
  firstName: string;

  @Field(() => String, { description: 'Last name of the user' })
  lastName: string;

  @Field(() => String, { description: `Authorization token: ${faker.random.alphaNumeric(64)}` })
  token?: string;
}
