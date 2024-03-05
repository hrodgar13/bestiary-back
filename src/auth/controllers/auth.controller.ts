import {Controller, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {LocalAuthGuard} from "../guards/local.guard";
import {JwtAuthGuard} from "../guards/jwt.guard";
import {Roles} from "../decorators/roles.decorator";
import {RolesEnum} from "../roles/roles.enum";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('/signup')
    createUser(@Request() req) {
        return this.authService.createUser(req.body)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    login(@Request() req ) {
        return this.authService.login(req.body)
    }

    @UseGuards(JwtAuthGuard)
    @Roles([RolesEnum.ADMIN])
    @Patch('role/admin/:id')
    setRoleAsAdmin(@Param('id') userId: number) {
        return this.authService.setRoleAsAdmin(userId)
    }

}
