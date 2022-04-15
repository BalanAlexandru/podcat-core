import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationConfigModule } from './shared/config/application.config.module';
import { UserModule } from './core/user/user.module';

@Module({
  imports: [ApplicationConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
