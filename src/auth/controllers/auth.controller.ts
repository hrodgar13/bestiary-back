import { Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {LocalAuthGuard} from "../guards/local.guard";

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
}
