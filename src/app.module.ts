import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationConfigModule } from './shared/config/application.config.module';
import { HasingService } from './shared/utils/hasing/hasing.service';

@Module({
  imports: [ApplicationConfigModule],
  controllers: [AppController],
  providers: [AppService, HasingService],
})
export class AppModule {}
