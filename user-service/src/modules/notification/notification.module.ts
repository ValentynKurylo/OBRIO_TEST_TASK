import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { NOTIFICATION_SERVICE } from '../../common/consts/events.const';

@Module({
  providers: [NotificationService],
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://rabbitmq:5672'],
          queue: process.env.QUEUE_NAME ?? 'notification-service-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
