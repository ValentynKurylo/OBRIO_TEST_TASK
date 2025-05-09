import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller'
import {ConfigModule, ConfigService} from "@nestjs/config";
import {BullModule} from "@nestjs/bull";
import {NotificationProcessor} from "./notification.processor";
import { ClientsModule, Transport } from '@nestjs/microservices';
import {SEND_PUSH} from "../../common/consts/envents.const";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.registerQueueAsync({
      name: SEND_PUSH,
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationProcessor],
})
export class NotificationModule {}
