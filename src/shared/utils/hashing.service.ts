import { ConfigService } from "@nestjs/config"
import * as bcrypt from "bcrypt"

export interface HashedText {
    hash: string
    salt: string
}

/**
 * Receives the plain text password and a configuration service. It encrypts the password using the
 * pepper from the .env config file and a randomly generated salt.
 * @param password The plain text.
 * @param configService The nestjs config service. It is used to read the PEPPER variable.
 * @returns a structure of type {hash, salt}
 */
export async function hashPassword(password: string, configService: ConfigService): Promise<HashedText> {
    const pepperedPassword: string = pepperPassword(password, configService)
    const SALT: string = await bcrypt.genSalt()

    const SALTED_HASH = await bcrypt.hash(pepperedPassword, SALT)

    return { hash: SALTED_HASH, salt: SALT }
}

function pepperPassword(password: string, configService: ConfigService): string {
    const PEPPER: string = configService.get<string>('PEPPER')

    return Buffer.from(password + PEPPER).toString('base64')
}