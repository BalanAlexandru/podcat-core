import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

/**
 * A module for configuring third party modules which the application
 * depends on.
 */
@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}), 
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
                dbName: 'podcat'
            }),
            inject: [ConfigService]
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true
        })
    ]
})
export class ApplicationConfigModule {}
