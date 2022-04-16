import { ApolloError } from "apollo-server-express";

export class EntityNotFoundError extends ApolloError {
    
    constructor(readonly message: string) {
        super(message, "ENTITY_NOT_FOUND")
    }
}