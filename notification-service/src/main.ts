import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap():Promise<void> {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://rabbitmq:5672'],
      queue: process.env.QUEUE_NAME ?? 'notification-service-queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3002, ()=>{console.log(`Server start on port ${process.env.PORT ?? 3002}`)});
}
bootstrap();


