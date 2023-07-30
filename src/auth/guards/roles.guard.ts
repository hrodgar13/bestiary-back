import jwtDecode from "jwt-decode";
import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/roles.decorator";
import {RolesEnum} from "../roles/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass
        ])

        if(!requiredRoles) {
            return true
        }

        const rolePrefix = 'Bearer'

        const roleInfo = context.switchToHttp().getRequest().rawHeaders.find(item => item.includes(rolePrefix))

        if(!roleInfo) {
            throw new HttpException('Not_authenticated', HttpStatus.UNAUTHORIZED)
        }

        let payload: any = jwtDecode(roleInfo)

        return requiredRoles.some((role) => role === payload.role)
    }

}