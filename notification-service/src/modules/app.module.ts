import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { NotificationModule } from './notification/notification.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true
    }),
    NotificationModule,
  ],
})
export class AppModule {}
