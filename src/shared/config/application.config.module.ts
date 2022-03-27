import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
                uri: configService.get<string>('MONGO_URI')
            }),
            inject: [ConfigService]
        }),
    ]
})
export class ApplicationConfigModule {}
