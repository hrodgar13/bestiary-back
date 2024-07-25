import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {UserService} from "../services/user.service";
import {JwtAuthGuard} from "../../auth/guards/jwt.guard";
import {UserProfileDto} from "../dtos/user-profile.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getUserProfile(
        @Req() req: any
    ): Promise<UserProfileDto> {
        return this.userService.getUserProfile(req.sub)
    }
}
