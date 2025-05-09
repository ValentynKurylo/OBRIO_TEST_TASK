import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { AppModule } from 'src/modules/app.module';
import { SeedService } from './seeds/admin.create.seed';

async function bootstrap():Promise<void> {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle("OBRIO Test Task").setDescription("You can test API")
    .setVersion("1.0.0").addTag("OBRIO").build()
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false, 
  });
  SwaggerModule.setup("/api/docs", app, document)
  
  const seedService = app.get(SeedService);
  await seedService.seedAdmin();

  await app.listen(process.env.PORT ?? 3001, ()=>{console.log(`Server start on port ${process.env.PORT ?? 3001}`)});
}
bootstrap();


