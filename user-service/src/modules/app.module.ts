import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from 'src/modules/user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from 'src/modules/auth/auth.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { SeedService } from '../seeds/admin.create.seed';
import {User} from '../entities/user.entity'
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [],
  providers: [SeedService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
    NotificationModule,
  ],
})
export class AppModule {}
