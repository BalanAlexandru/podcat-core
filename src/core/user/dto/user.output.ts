import { UserDocument } from "../entities/user.entity";

export class UserOutput {

    id: string;

    email: string;
    
    firstName: string;
    
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