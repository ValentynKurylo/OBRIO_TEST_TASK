import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ACCESS_DENIED} from "../common/errors/errors";
import { StatusEnum } from "src/common/enums";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService: JwtService) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token) throw new UnauthorizedException(ACCESS_DENIED)

            const user = this.jwtService.verify(token)
            if(user.status !== StatusEnum.ACCEPTED) throw new UnauthorizedException(ACCESS_DENIED)
            req.user = user
            return true;
        }
        catch (e){
            throw new UnauthorizedException(ACCESS_DENIED)
        }
    }

}