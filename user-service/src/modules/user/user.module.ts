import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../entities/user.entity";
import {AuthModule} from "../auth/auth.module";
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(()=>AuthModule),
    NotificationModule
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
