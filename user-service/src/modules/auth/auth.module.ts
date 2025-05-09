import {forwardRef, Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    forwardRef(()=>UserModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions:{
        expiresIn: '12h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
