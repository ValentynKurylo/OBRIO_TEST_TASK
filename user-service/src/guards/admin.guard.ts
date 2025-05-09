import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLE_KEY} from "./role.auth.decorator";
import {RoleEnum} from "../common/enums";
import {ACCESS_DENIED, FORBIDDEN} from "../common/errors/errors";

@Injectable()
export class AdminGuard implements CanActivate{

    constructor(private jwtService: JwtService, private reflector: Reflector) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRole) return false

            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token) throw new UnauthorizedException(ACCESS_DENIED)

            const user = this.jwtService.verify(token)
            req.user = user

            if (user.role !== RoleEnum.ADMIN) throw new ForbiddenException(FORBIDDEN)


            return true
        }
        catch (e){
            throw new ForbiddenException(FORBIDDEN)
        }
    }

}

