import { Field, ObjectType } from "@nestjs/graphql";
import { UserDocument } from "../entities/user.entity";
import { faker } from "@faker-js/faker";

@ObjectType()
export class UserOutput {

    @Field({ description: "Unique user identifier: " + faker.random.alphaNumeric(16) })
    id: string;

    @Field({ description: "Email of the user: " + faker.internet.email() })
    email: string;
    
    @Field({ nullable: true, description: "First name of the user: " + faker.name.firstName() })
    firstName: string;
    
    @Field({ nullable: true, description: "Last name of the user: " + faker.name.lastName() })
    lastName: string;

    public static fromEntity(user: UserDocument): UserOutput {
        const userOutput: UserOutput = new UserOutput()

        userOutput.email = user.email
        userOutput.firstName = user.firstName
        userOutput.lastName = user.lastName
        userOutput.id = user.id

        return userOutput
    }
}